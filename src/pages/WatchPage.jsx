import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Screen } from "../components/Screen";
import { ChapterProgress } from "../components/ChapterProgress";
import { PrimaryButton, SecondaryButton, StopButton } from "../components/Buttons";
import { IconCheck, IconChat, IconPause, IconPlay, IconRest } from "../components/Icons";
import { chapterTitle, findChapter } from "../data/scenarios";
import { useVisit } from "../context/VisitContext";

export function WatchPage({ scenario }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { watched, markWatched, rememberChapter } = useVisit();
  const chapter = findChapter(scenario, searchParams.get("chapter"));
  const index = scenario.chapters.findIndex((item) => item.id === chapter.id);
  const next = scenario.chapters[index + 1];
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [breakOpen, setBreakOpen] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  const breakRef = useRef(null);
  const keepRef = useRef(null);

  useEffect(() => {
    rememberChapter(chapter.id);
    setPlaying(false);
    setBreakOpen(false);
    setCheckIn(false);
  }, [chapter.id, rememberChapter]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      const pending = video.play();
      if (pending) pending.catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [playing, chapter.id]);

  useEffect(() => {
    if (breakOpen) breakRef.current?.focus();
  }, [breakOpen]);

  useEffect(() => {
    if (checkIn) keepRef.current?.focus();
  }, [checkIn]);

  useEffect(() => {
    if (!breakOpen && !checkIn) return undefined;
    function onKey(event) {
      if (event.key === "Escape") {
        setBreakOpen(false);
        setCheckIn(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [breakOpen, checkIn]);

  function openBreak() {
    videoRef.current?.pause();
    setPlaying(false);
    setCheckIn(false);
    setBreakOpen(true);
  }

  function openCheckIn() {
    videoRef.current?.pause();
    setPlaying(false);
    setBreakOpen(false);
    markWatched(chapter.id);
    setCheckIn(true);
  }

  function keepWatching() {
    setCheckIn(false);
    if (next) {
      setSearchParams({ chapter: next.id }, { replace: true });
      return;
    }
    navigate(`/visit/${scenario.id}/summary`);
  }

  function askAboutThis() {
    setCheckIn(false);
    navigate(`/visit/${scenario.id}/ask?chapter=${chapter.id}`);
  }

  const overlay = breakOpen || checkIn;

  return (
    <div className="min-h-dvh">
      <Screen backTo={`/visit/${scenario.id}/preview`} title={chapterTitle(chapter)}>
        <div inert={overlay ? true : undefined}>
          <p className="text-lg font-bold text-blue">{scenario.title}</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">{chapterTitle(chapter)}</h1>
          <p className="mt-2 text-xl text-ink-soft">
            Part {index + 1} of {scenario.chapters.length}. This part is {chapter.durationSeconds} seconds long.
          </p>

          <div
            key={chapter.id}
            className="animate-fade relative mt-6 aspect-video w-full overflow-hidden rounded-3xl border border-line bg-canvas"
          >
            <video
              ref={videoRef}
              className="h-full w-full bg-canvas object-contain"
              src={chapter.videoFile}
              playsInline
              preload="auto"
              aria-label={chapterTitle(chapter)}
              onEnded={openCheckIn}
              onLoadedData={(event) => {
                const video = event.currentTarget;
                if (video.paused && video.currentTime === 0) video.currentTime = 0.05;
              }}
            />
            {playing ? (
              <p className="absolute left-4 top-4 rounded-full bg-paper px-4 py-2 text-lg font-bold">Playing</p>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <button
                  type="button"
                  data-testid="play"
                  onClick={() => setPlaying(true)}
                  className="inline-flex min-h-20 items-center gap-3 rounded-2xl bg-blue px-8 text-2xl font-bold text-on-blue hover:bg-blue-deep"
                >
                  <IconPlay className="h-8 w-8" />
                  Play
                </button>
              </div>
            )}
          </div>

          <div className="mt-6">
            <ChapterProgress
              chapters={scenario.chapters}
              currentId={chapter.id}
              watchedIds={watched}
              onSelect={(id) => setSearchParams({ chapter: id }, { replace: true })}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3" role="group" aria-label="Playback">
            {playing ? (
              <StopButton data-testid="pause" onClick={() => setPlaying(false)}>
                <IconPause />
                Pause
              </StopButton>
            ) : (
              <PrimaryButton data-testid="play-bar" onClick={() => setPlaying(true)}>
                <IconPlay />
                Play
              </PrimaryButton>
            )}
            <StopButton data-testid="break" onClick={openBreak}>
              <IconRest />
              Take a Break
            </StopButton>
            <SecondaryButton data-testid="done-part" onClick={openCheckIn}>
              <IconCheck />
              Done with this part
            </SecondaryButton>
          </div>
        </div>
      </Screen>

      {breakOpen ? (
        <button
          ref={breakRef}
          type="button"
          data-testid="break-overlay"
          className="animate-fade fixed inset-x-0 bottom-0 top-20 z-20 flex items-center justify-center bg-[#243038]/35 p-6"
          onClick={() => setBreakOpen(false)}
        >
          <span className="max-w-lg rounded-3xl bg-cream px-8 py-10 text-center shadow-[0_16px_40px_rgba(28,40,48,0.12)]">
            <span className="block text-3xl font-bold text-ink">Take your time.</span>
            <span className="mt-3 block text-2xl text-ink-soft">Tap anywhere to continue.</span>
          </span>
        </button>
      ) : null}

      {checkIn ? (
        <div
          className="animate-fade fixed inset-x-0 bottom-0 top-20 z-20 flex items-center justify-center bg-[#243038]/25 p-4"
          onClick={() => setCheckIn(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkin-title"
            aria-describedby="checkin-next"
            data-testid="checkin"
            className="w-full max-w-lg rounded-3xl border border-line bg-paper p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="checkin-title" className="text-2xl font-bold">
              This part is finished.
            </h2>
            <p id="checkin-next" className="mt-2 text-xl text-ink-soft">
              {next ? `Next: ${chapterTitle(next)}.` : "Next: the end of the video."}
            </p>
            <div className="mt-5 grid gap-3">
              <PrimaryButton ref={keepRef} data-testid="keep-watching" onClick={keepWatching}>
                <IconPlay />
                Keep Watching
              </PrimaryButton>
              <SecondaryButton data-testid="have-question" onClick={askAboutThis}>
                <IconChat />
                I Have a Question
              </SecondaryButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
