import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Screen } from "../components/Screen";
import { ChatBubble } from "../components/ChatBubble";
import { StarterQuestions } from "../components/StarterQuestions";
import { VoiceControls } from "../components/VoiceControls";
import { PrimaryButton, SecondaryButton, StopButton } from "../components/Buttons";
import { IconPlay, IconSend, IconVolume } from "../components/Icons";
import { chapterTitle, findChapter } from "../data/scenarios";
import { CALM_FALLBACK, MIC_OFF, MISSED_SPEECH, SPEAK_FALLBACK } from "../data/fallback";
import { useVisit } from "../context/VisitContext";

const LISTEN_MS = 15000;

function questionId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function preferredMime() {
  if (typeof MediaRecorder === "undefined") return "";
  const types = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"];
  return types.find((type) => MediaRecorder.isTypeSupported(type)) || "";
}

export function AskPage({ scenario }) {
  // TODO: Questions, answers, and recordings stay in memory for this screen only.
  // Do not persist them until privacy and data handling exist for real users.
  const [searchParams] = useSearchParams();
  const { lastChapterId } = useVisit();
  const requested = searchParams.get("chapter");
  const chapter =
    requested && requested !== "whole"
      ? findChapter(scenario, requested)
      : findChapter(scenario, lastChapterId) || scenario.chapters.at(-1);
  const about = requested === "whole" ? "The whole visit" : chapterTitle(chapter);
  const backToVideo = `/visit/${scenario.id}/watch?chapter=${chapter.id}`;

  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [retry, setRetry] = useState(null);
  const [listening, setListening] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [readAloud, setReadAloud] = useState(false);
  const [speed, setSpeed] = useState("normal");
  const [speakingId, setSpeakingId] = useState(null);
  const [micNote, setMicNote] = useState("");
  const [speakNote, setSpeakNote] = useState("");

  const historyRef = useRef([]);
  const idRef = useRef(1);
  const bottomRef = useRef(null);
  const busyRef = useRef(false);
  const listeningRef = useRef(false);
  const sendOnStop = useRef(true);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const listenTimer = useRef(null);
  const startingRef = useRef(false);
  const audioRef = useRef(null);
  const audioUrl = useRef("");
  const speakAbort = useRef(null);
  const readAloudRef = useRef(false);
  const readAloudTouched = useRef(false);
  const speedRef = useRef("normal");
  const mounted = useRef(true);

  const starters = (chapter.starterQuestions || []).map((text) => ({
    id: questionId(text),
    label: text,
  }));

  useEffect(() => {
    readAloudRef.current = readAloud;
  }, [readAloud]);

  useEffect(() => {
    speedRef.current = speed;
    if (audioRef.current) audioRef.current.playbackRate = speed === "slower" ? 0.85 : 1;
  }, [speed]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bottomRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "nearest",
    });
  }, [messages.length, thinking]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      sendOnStop.current = false;
      clearTimeout(listenTimer.current);
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      speakAbort.current?.abort();
      audioRef.current?.pause();
      if (audioUrl.current) URL.revokeObjectURL(audioUrl.current);
    };
  }, []);

  function nextId() {
    idRef.current += 1;
    return String(idRef.current);
  }

  function stopSpeech() {
    speakAbort.current?.abort();
    speakAbort.current = null;
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (audioUrl.current) {
      URL.revokeObjectURL(audioUrl.current);
      audioUrl.current = "";
    }
    setSpeakingId(null);
  }

  async function speakAnswer(text, messageId) {
    stopSpeech();
    const controller = new AbortController();
    speakAbort.current = controller;
    const timer = window.setTimeout(() => controller.abort(), 12000);
    setSpeakNote("");
    try {
      const response = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          text,
          speed: speedRef.current === "slower" ? 0.85 : 1,
        }),
      });
      const type = response.headers.get("content-type") || "";
      if (!response.ok || type.includes("json")) {
        if (mounted.current) setSpeakNote(SPEAK_FALLBACK);
        return;
      }
      const blob = await response.blob();
      if (controller.signal.aborted || !mounted.current) return;
      const url = URL.createObjectURL(blob);
      audioUrl.current = url;
      const audio = audioRef.current;
      if (!audio) return;
      audio.src = url;
      audio.playbackRate = speedRef.current === "slower" ? 0.85 : 1;
      audio.preservesPitch = true;
      audio.onended = () => {
        if (mounted.current) setSpeakingId(null);
      };
      setSpeakingId(messageId);
      await audio.play();
    } catch (error) {
      if (error?.name === "AbortError" || !mounted.current) return;
      setSpeakNote(SPEAK_FALLBACK);
      setSpeakingId(null);
    } finally {
      clearTimeout(timer);
    }
  }

  async function runQuestion(trimmed, { isRetry = false } = {}) {
    const answerId = nextId();
    if (isRetry) {
      setMessages((prev) => prev.filter((message) => !message.error));
    } else {
      setMessages((prev) => [...prev, { id: nextId(), from: "you", paragraphs: [trimmed] }]);
      setDraft("");
    }
    setRetry(null);
    setThinking(true);

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch("/api/ask-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          scenarioId: scenario.id,
          chapterId: chapter.id,
          question: trimmed,
          conversationHistory: historyRef.current,
        }),
      });
      const data = await response.json().catch(() => null);
      const failed = !response.ok || !data?.reply || data.error;
      const reply = failed ? CALM_FALLBACK : data.reply;
      if (!mounted.current) return;
      setMessages((prev) => [
        ...prev,
        { id: answerId, from: "answer", paragraphs: [reply], error: failed },
      ]);
      if (!failed) {
        historyRef.current = [
          ...historyRef.current,
          { role: "user", text: trimmed },
          { role: "assistant", text: reply },
        ];
        if (readAloudRef.current) void speakAnswer(reply, answerId);
      } else {
        setRetry({ kind: "ask", question: trimmed });
      }
    } catch {
      if (!mounted.current) return;
      setMessages((prev) => [
        ...prev,
        { id: answerId, from: "answer", paragraphs: [CALM_FALLBACK], error: true },
      ]);
      setRetry({ kind: "ask", question: trimmed });
    } finally {
      clearTimeout(timer);
      if (mounted.current) setThinking(false);
    }
  }

  async function ask(text, options) {
    const trimmed = text.trim();
    if (!trimmed || busyRef.current) return;
    busyRef.current = true;
    try {
      await runQuestion(trimmed, options);
    } finally {
      busyRef.current = false;
    }
  }

  async function onRecording(blob) {
    if (busyRef.current) return;
    busyRef.current = true;
    setThinking(true);
    setRetry(null);
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": blob.type || "audio/webm" },
        signal: controller.signal,
        body: blob,
      });
      const data = await response.json().catch(() => null);
      const transcript = data?.transcript?.trim() || "";
      if (!response.ok || data?.error || !transcript) {
        if (!mounted.current) return;
        setMessages((prev) => [
          ...prev,
          { id: nextId(), from: "answer", paragraphs: [MISSED_SPEECH], error: true },
        ]);
        setRetry({ kind: "listen" });
        return;
      }
      await runQuestion(transcript);
    } catch {
      if (!mounted.current) return;
      setMessages((prev) => [
        ...prev,
        { id: nextId(), from: "answer", paragraphs: [MISSED_SPEECH], error: true },
      ]);
      setRetry({ kind: "listen" });
    } finally {
      clearTimeout(timer);
      busyRef.current = false;
      if (mounted.current) setThinking(false);
    }
  }

  function stopListening(send) {
    sendOnStop.current = send;
    clearTimeout(listenTimer.current);
    const recorder = recorderRef.current;
    if (recorder && recorder.state === "recording") {
      recorder.stop();
      return;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    listeningRef.current = false;
    setListening(false);
  }

  async function startListening() {
    if (busyRef.current || listeningRef.current || startingRef.current) return;
    startingRef.current = true;
    setMicNote("");
    stopSpeech();
    if (!readAloudTouched.current) {
      readAloudRef.current = true;
      setReadAloud(true);
    }
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setMicNote(MIC_OFF);
      startingRef.current = false;
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mounted.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
      const mime = preferredMime();
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      const chunks = [];
      sendOnStop.current = true;
      recorder.ondataavailable = (event) => {
        if (event.data?.size) chunks.push(event.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        listeningRef.current = false;
        if (mounted.current) setListening(false);
        clearTimeout(listenTimer.current);
        // The recording is not kept. If this stop was a cancel, the blob is dropped here.
        if (!sendOnStop.current || !mounted.current) return;
        const blob = new Blob(chunks, { type: recorder.mimeType || mime || "audio/webm" });
        void onRecording(blob);
      };
      recorderRef.current = recorder;
      recorder.start();
      listeningRef.current = true;
      setListening(true);
      // Safety stop so the microphone cannot stay on. The number is not shown.
      listenTimer.current = window.setTimeout(() => stopListening(true), LISTEN_MS);
    } catch {
      if (mounted.current) setMicNote(MIC_OFF);
    } finally {
      startingRef.current = false;
    }
  }

  function toggleTalk() {
    if (listeningRef.current) {
      stopListening(true);
      return;
    }
    void startListening();
  }

  function changeReadAloud(next) {
    readAloudTouched.current = true;
    readAloudRef.current = next;
    setReadAloud(next);
    if (!next) stopSpeech();
  }

  function onRetry() {
    if (!retry || thinking || listening) return;
    if (retry.kind === "listen") {
      setRetry(null);
      setMessages((prev) => prev.filter((message) => !message.error));
      void startListening();
      return;
    }
    void ask(retry.question, { isRetry: true });
  }

  return (
    <Screen backTo={backToVideo} title="Ask a question">
      <audio ref={audioRef} preload="none" className="hidden" data-testid="answer-audio" />
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Ask a question</h1>
      </div>
      <p className="mt-3 text-xl" data-testid="about-label">
        <span className="font-bold">About: </span>
        {about}
      </p>
      <p className="mt-2 max-w-3xl text-lg text-ink-soft">
        Answers are for this practice visit. A grown-up can help with real questions.
      </p>

      <div className="mt-6 max-w-xl">
        <SecondaryButton to={backToVideo} data-testid="back-to-video">
          <IconPlay />
          Go Back to Video
        </SecondaryButton>
      </div>

      <div aria-live="polite" className="mt-8 space-y-4">
        {messages.length === 0 && !thinking ? (
          <p className="text-xl text-ink-soft">Tap a question, tap Talk, or type your own.</p>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              <ChatBubble from={message.from}>
                {message.paragraphs.map((paragraph, index) => (
                  <p key={`${message.id}-${index}`}>{paragraph}</p>
                ))}
              </ChatBubble>
              {message.from === "answer" && !message.error ? (
                <div className="mt-2 flex max-w-xl flex-wrap gap-3">
                  <SecondaryButton
                    className="w-auto"
                    data-testid={`play-${message.id}`}
                    onClick={() => speakAnswer(message.paragraphs[0], message.id)}
                  >
                    <IconVolume className={speakingId === message.id ? "speaker-live h-7 w-7" : "h-7 w-7"} />
                    {speakingId === message.id ? "Speaking" : "Play"}
                  </SecondaryButton>
                  {speakingId === message.id ? (
                    <StopButton className="w-auto" data-testid="stop-speech" onClick={stopSpeech}>
                      Stop
                    </StopButton>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))
        )}
        {thinking ? (
          <div className="flex justify-start">
            <div className="rounded-3xl bg-blue-soft px-5 py-4">
              <p className="mb-2 text-base font-bold text-ink-soft">Answer</p>
              <p className="sr-only">Thinking</p>
              <span className="thinking-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        ) : null}
        {speakNote ? <p className="text-lg text-ink-soft">{speakNote}</p> : null}
        <div ref={bottomRef} />
      </div>

      {retry && !thinking && !listening ? (
        <div className="mt-4 max-w-xs">
          <SecondaryButton data-testid="try-again" onClick={onRetry}>
            <IconSend />
            Try Again
          </SecondaryButton>
        </div>
      ) : null}

      <h2 className="mt-10 text-2xl font-bold">Questions you can tap</h2>
      <div className="mt-4">
        <StarterQuestions
          questions={starters}
          onAsk={(question) => {
            if (listeningRef.current) stopListening(false);
            if (!busyRef.current) void ask(question.label);
          }}
        />
      </div>

      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (listeningRef.current) stopListening(false);
          void ask(draft);
        }}
      >
        <label htmlFor="question" className="mb-2 block text-lg font-bold">
          Your question
        </label>
        <input
          id="question"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={300}
          autoComplete="off"
          placeholder="Type a question"
          disabled={thinking || listening}
          className="min-h-16 w-full rounded-2xl border-2 border-line bg-paper px-4 text-xl text-ink disabled:opacity-70"
        />
        <VoiceControls
          listening={listening}
          thinking={thinking}
          onTalk={toggleTalk}
          settingsOpen={settingsOpen}
          onToggleSettings={() => setSettingsOpen((open) => !open)}
          readAloud={readAloud}
          onReadAloud={changeReadAloud}
          speed={speed}
          onSpeed={setSpeed}
          micNote={micNote}
        >
          <PrimaryButton type="submit" data-testid="send" disabled={thinking || listening || !draft.trim()}>
            <IconSend />
            Send
          </PrimaryButton>
        </VoiceControls>
      </form>
    </Screen>
  );
}
