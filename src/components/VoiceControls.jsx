import { IconGear, IconMic } from "./Icons";

export function VoiceControls({
  listening,
  thinking,
  onTalk,
  settingsOpen,
  onToggleSettings,
  readAloud,
  onReadAloud,
  speed,
  onSpeed,
  micNote,
  children,
}) {
  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          aria-expanded={settingsOpen}
          aria-controls="voice-settings"
          onClick={onToggleSettings}
          data-testid="voice-settings"
          className="inline-flex min-h-16 items-center gap-2 rounded-2xl px-3 text-lg font-bold text-blue"
        >
          <IconGear className="h-6 w-6" />
          Settings
        </button>
      </div>

      {settingsOpen ? (
        <div id="voice-settings" className="mt-2 rounded-3xl border border-line bg-paper p-4">
          <label className="flex min-h-16 cursor-pointer items-center gap-3 text-xl">
            <input
              type="checkbox"
              checked={readAloud}
              onChange={(event) => onReadAloud(event.target.checked)}
              data-testid="read-aloud"
              className="h-7 w-7 accent-blue"
            />
            Read answers out loud
          </label>
          <fieldset className="mt-4">
            <legend className="text-lg font-bold">Voice speed</legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                aria-pressed={speed === "normal"}
                onClick={() => onSpeed("normal")}
                data-testid="speed-normal"
                className={`min-h-16 rounded-2xl border-2 text-xl font-bold ${
                  speed === "normal" ? "border-blue bg-blue-soft" : "border-line bg-paper"
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                aria-pressed={speed === "slower"}
                onClick={() => onSpeed("slower")}
                data-testid="speed-slower"
                className={`min-h-16 rounded-2xl border-2 text-xl font-bold ${
                  speed === "slower" ? "border-blue bg-blue-soft" : "border-line bg-paper"
                }`}
              >
                Slower
              </button>
            </div>
          </fieldset>
        </div>
      ) : null}

      {micNote ? (
        <p className="mt-3 rounded-2xl bg-sand px-4 py-3 text-lg" role="status">
          {micNote}
        </p>
      ) : null}

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onTalk}
          disabled={thinking}
          aria-pressed={listening}
          data-testid="talk"
          className={`inline-flex min-h-16 w-full flex-wrap items-center justify-center gap-3 rounded-2xl px-6 text-center text-xl font-bold disabled:opacity-70 ${
            listening ? "talk-live border-2 border-blue bg-blue-soft text-ink" : "bg-blue text-on-blue"
          }`}
        >
          <IconMic />
          {listening ? "Listening... Tap to stop" : "Talk"}
          {listening ? (
            <span className="wave-bars" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
          ) : null}
        </button>
        {children}
      </div>
      <p className="sr-only" aria-live="polite">
        {listening ? "Listening. Tap to stop." : ""}
      </p>
    </div>
  );
}
