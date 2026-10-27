import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import scenarios from "../src/data/scenarios.js";
import { CALM_FALLBACK } from "../src/data/fallback.js";
import { buildSystemPrompt } from "./prompt.js";
import { playbackSpeed, synthesizeSpeech, transcribeAudio } from "./speech.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const PORT = Number(process.env.PORT) || 5173;

// gemini-2.0-flash was shut down on June 1, 2026.
// gemini-3.5-flash is the current fast model that answers reliably.
const MODEL = "gemini-3.5-flash";

const app = express();
app.use(express.json({ limit: "32kb" }));

function calm(res) {
  res.status(200).json({ reply: CALM_FALLBACK, error: true });
}

function asHistory(history) {
  if (!Array.isArray(history)) return [];
  const turns = history
    .filter(
      (turn) =>
        turn &&
        typeof turn.text === "string" &&
        turn.text.trim() &&
        (turn.role === "user" || turn.role === "assistant"),
    )
    .slice(-12)
    .map((turn) => ({
      role: turn.role === "assistant" ? "model" : "user",
      parts: [{ text: turn.text.trim().slice(0, 2000) }],
    }));

  while (turns.length && turns[0].role !== "user") turns.shift();
  const alternating = [];
  for (const turn of turns) {
    const previous = alternating.at(-1);
    if (previous && previous.role === turn.role) continue;
    alternating.push(turn);
  }
  if (alternating.at(-1)?.role !== "model" && alternating.length) {
    // A trailing user turn belongs in `question`, not in prior history.
    if (alternating.at(-1).role === "user") alternating.pop();
  }
  return alternating;
}

app.post("/api/ask-question", async (req, res) => {
  // TODO: Questions and answers stay in memory for this request only.
  // Do not log or store them until privacy and data handling exist for real users.
  const { scenarioId, chapterId, question, conversationHistory } = req.body ?? {};
  const scenario = scenarios[scenarioId];
  const chapter = scenario?.chapters?.find((item) => item.id === chapterId);
  const asked = typeof question === "string" ? question.trim().slice(0, 300) : "";

  if (!scenario || !chapter || !asked || !process.env.GEMINI_API_KEY) {
    calm(res);
    return;
  }

  const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({
    model: MODEL,
    systemInstruction: buildSystemPrompt(scenario, chapter),
    generationConfig: { temperature: 0.4 },
  });
  const chat = model.startChat({ history: asHistory(conversationHistory) });

  let timer;
  const pending = sendOnce(chat, asked);
  pending.catch(() => {});
  try {
    const result = await Promise.race([
      pending,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("timeout")), 10000);
      }),
    ]);
    const reply = result?.response?.text?.()?.trim();
    if (!reply) {
      calm(res);
      return;
    }
    res.json({ reply });
  } catch (error) {
    // Status only. The question itself is not logged.
    const message = String(error?.message || "");
    const status = message === "timeout" ? "timeout" : message.match(/\b(429|503|404|400)\b/)?.[1] || "failed";
    console.error(`ask-question ${status}`);
    calm(res);
  } finally {
    clearTimeout(timer);
  }
});

app.post("/api/transcribe", express.raw({ type: () => true, limit: "6mb" }), async (req, res) => {
  // Child-privacy requirement: the recording lives only in this request.
  // Do not write it to disk, logs, or a database. It is discarded after transcription.
  const audio = Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0);
  const mime = String(req.headers["content-type"] || "audio/webm");
  if (!process.env.GEMINI_API_KEY || audio.length < 100) {
    res.status(200).json({ transcript: "", error: true });
    return;
  }

  let timer;
  const pending = transcribeAudio(audio, mime);
  pending.catch(() => {});
  try {
    const transcript = await Promise.race([
      pending,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("timeout")), 10000);
      }),
    ]);
    if (!transcript) {
      res.status(200).json({ transcript: "", error: true });
      return;
    }
    res.json({ transcript });
  } catch (error) {
    const message = String(error?.message || "");
    const status = message === "timeout" ? "timeout" : message.match(/\b(429|503|404|400)\b/)?.[1] || "failed";
    console.error(`transcribe ${status}`);
    res.status(200).json({ transcript: "", error: true });
  } finally {
    clearTimeout(timer);
  }
});

app.post("/api/speak", async (req, res) => {
  // TODO: Do not log or store the spoken text until privacy handling exists.
  // Gemini TTS has no numeric speaking rate. The browser plays slower mode at 0.85.
  const text = typeof req.body?.text === "string" ? req.body.text : "";
  const speed = playbackSpeed(req.body?.speed);
  if (!process.env.GEMINI_API_KEY || !text.trim()) {
    res.status(200).json({ error: true });
    return;
  }

  let timer;
  const pending = synthesizeSpeech(text);
  pending.catch(() => {});
  try {
    const wav = await Promise.race([
      pending,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("timeout")), 10000);
      }),
    ]);
    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("X-Playback-Speed", String(speed));
    res.setHeader("Cache-Control", "no-store");
    res.send(wav);
  } catch (error) {
    const message = String(error?.message || "");
    const status = message === "timeout" ? "timeout" : message.match(/\b(429|503|404|400)\b/)?.[1] || "failed";
    console.error(`speak ${status}`);
    res.status(200).json({ error: true });
  } finally {
    clearTimeout(timer);
  }
});

function transient(error) {
  return /503|429|UNAVAILABLE|high demand|overloaded/i.test(String(error?.message || ""));
}

async function sendOnce(chat, asked) {
  try {
    return await chat.sendMessage(asked);
  } catch (error) {
    if (!transient(error)) throw error;
    return chat.sendMessage(asked);
  }
}

app.use((error, req, res, next) => {
  if (req.path === "/api/transcribe") {
    res.status(200).json({ transcript: "", error: true });
    return;
  }
  next(error);
});

if (process.env.NODE_ENV === "production") {
  const dist = path.join(root, "dist");
  app.use(express.static(dist));
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      next();
      return;
    }
    res.sendFile(path.join(dist, "index.html"));
  });
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

const server = app.listen(PORT, () => {
  console.log(`Zien is running at http://localhost:${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error(error.message);
  }
  process.exit(1);
});
