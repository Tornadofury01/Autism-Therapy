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
      <ol className="flex flex-wrap justify-center gap-3">
        {chapters.map((chapter, index) => {
          const Icon = icons[chapter.icon || chapterIcons[chapter.id]] ?? icons.door;
          const isCurrent = chapter.id === currentId;
          const seen = watchedIds.includes(chapter.id);
          const button = isCurrent
            ? "border-blue bg-blue-soft text-ink"
            : seen
              ? "border-green bg-green-soft text-ink"
              : "border-line bg-paper text-ink";

          return (
            <li
              key={chapter.id}
              className="w-[calc(50%-0.375rem)] min-w-0 sm:w-[calc(33.333%-0.5rem)] lg:w-[calc(20%-0.6rem)]"
            >
              <button
                type="button"
                onClick={() => onSelect(chapter.id)}
                aria-current={isCurrent ? "step" : undefined}
                data-testid={`chapter-${chapter.id}`}
                className={`flex h-full min-h-32 w-full flex-col items-center justify-center gap-1 rounded-2xl border-2 px-3 py-3 text-center ${button}`}
              >
                <span className="text-sm font-bold text-ink-soft">Part {index + 1}</span>
                <Icon className="h-7 w-7 shrink-0" />
                <span className="flex min-h-10 items-center text-base font-bold leading-tight">
                  {chapterTitle(chapter)}
                </span>
                <span className="text-sm font-bold text-ink-soft">
                  {chapter.durationSeconds ? `${chapter.durationSeconds} sec` : "\u00a0"}
                  {isCurrent ? <span className="text-blue"> · Now</span> : null}
                </span>
                {seen && !isCurrent ? <span className="sr-only">, seen</span> : null}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
