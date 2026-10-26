import { icons } from "./Icons";
import { chapterTitle } from "../data/scenarios";

const chapterIcons = {
  exterior: "door",
  "supreme-court": "clipboard",
  rotunda: "sun",
  reston: "ticket",
  train: "train",
  "station-exit": "door",
  "white-house": "columns",
  "to-monument": "monument",
  "at-monument": "sun",
  "by-the-water": "droplet",
  "along-the-mall": "sun",
  capitol: "columns",
  "train-home": "train",
};

export function ChapterProgress({ chapters, currentId, watchedIds = [], onSelect }) {
  return (
    <nav aria-label="Parts of this visit">
      <ol className="grid grid-cols-2 gap-2 px-1 py-1 sm:grid-cols-3 lg:grid-cols-5">
        {chapters.map((chapter, index) => {
          const Icon = icons[chapter.icon || chapterIcons[chapter.id]] ?? icons.door;
          const isCurrent = chapter.id === currentId;
          const seen = watchedIds.includes(chapter.id);
          const segment = isCurrent ? "bg-blue" : seen ? "bg-green" : "bg-sand";
          const button = isCurrent
            ? "border-blue bg-blue-soft text-ink"
            : seen
              ? "border-transparent bg-green-soft text-ink"
              : "border-transparent bg-sand text-ink";

          return (
            <li key={chapter.id} className="min-w-0">
              <div className={`mb-2 h-2 rounded-full ${segment}`} aria-hidden="true" />
              <button
                type="button"
                onClick={() => onSelect(chapter.id)}
                aria-current={isCurrent ? "step" : undefined}
                data-testid={`chapter-${chapter.id}`}
                className={`flex min-h-24 w-full flex-col items-center justify-center gap-1 rounded-2xl border-2 px-1 py-2 text-center ${button}`}
              >
                <Icon className="h-7 w-7" />
                <span className="text-base font-bold leading-tight">{chapterTitle(chapter)}</span>
                {chapter.durationSeconds ? (
                  <span className="text-sm font-bold text-ink-soft">{chapter.durationSeconds} sec</span>
                ) : null}
                {isCurrent ? (
                  <span className="text-sm font-bold text-blue">Now</span>
                ) : (
                  <span className="invisible text-sm" aria-hidden="true">
                    Now
                  </span>
                )}
                <span className="sr-only">
                  {`, part ${index + 1} of ${chapters.length}${
                    chapter.durationSeconds ? `, ${chapter.durationSeconds} seconds` : ""
                  }${seen ? ", seen" : ""}`}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
