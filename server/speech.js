import { GoogleGenerativeAI } from "@google/generative-ai";

// Fast model already used for answers. It accepts audio input for transcription.
const TRANSCRIBE_MODEL = "gemini-3.5-flash";

// Flash-Lite TTS is the low-latency read-aloud model. Swap this name to change models.
const TTS_MODEL = "gemini-3.8-flash-lite-tts";

// Sulafat is a warm prebuilt voice. Swap this name after listening to other options.
export const VOICE_NAME = "Sulafat";

const CALM_STYLE = "calm, warm, and steady";
const TRANSCRIBE_PROMPT =
  "Transcribe this audio exactly as spoken. Return only the transcription, no commentary.";

export function playbackSpeed(value) {
  return Number(value) === 0.85 ? 0.85 : 1;
}

export function transient(error) {
  const message = `${error?.status || ""} ${error?.message || ""}`;
  return /503|429|UNAVAILABLE|high demand|overloaded/i.test(message);
}

function cleanTranscript(text) {
  const value = String(text || "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .trim();
  if (!value || value.length < 2) return "";
  if (/^(no speech|silence|inaudible|\[.*\]|\(.*\))$/i.test(value)) return "";
  return value.slice(0, 300);
}

export async function transcribeAudio(buffer, mimeType) {
  const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({
    model: TRANSCRIBE_MODEL,
    generationConfig: { temperature: 0 },
  });
  const mime = String(mimeType || "audio/webm").split(";")[0].trim() || "audio/webm";
  const request = [
    { text: TRANSCRIBE_PROMPT },
    { inlineData: { mimeType: mime, data: buffer.toString("base64") } },
  ];

  try {
    const result = await model.generateContent(request);
    return cleanTranscript(result.response.text());
  } catch (error) {
    if (!transient(error)) throw error;
    const result = await model.generateContent(request);
    return cleanTranscript(result.response.text());
  }
}

function sampleRateFrom(mime) {
  const match = String(mime).match(/rate=(\d+)/i);
  return match ? Number(match[1]) : 24000;
}

function pcmToWav(pcm, sampleRate) {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

async function requestSpeech(text) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text,
                speech_metadata: { style: CALM_STYLE },
              },
            ],
          },
        ],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: { voice: VOICE_NAME },
          },
        },
      }),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    const error = new Error(detail.slice(0, 180));
    error.status = response.status;
    throw error;
  }

  const payload = await response.json();
  const parts = payload?.candidates?.[0]?.content?.parts || [];
  const part = parts.find((item) => item.inlineData?.data || item.inline_data?.data);
  const inline = part?.inlineData || part?.inline_data;
  if (!inline?.data) throw new Error("no audio");
  const audio = Buffer.from(inline.data, "base64");
  const mime = inline.mimeType || inline.mime_type || "";
  if (mime.includes("wav") || audio.subarray(0, 4).toString() === "RIFF") return audio;
  return pcmToWav(audio, sampleRateFrom(mime));
}

export async function synthesizeSpeech(text) {
  const spoken = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 600);
  if (!spoken) throw new Error("empty");
  try {
    return await requestSpeech(spoken);
  } catch (error) {
    if (!transient(error)) throw error;
    return requestSpeech(spoken);
  }
}
