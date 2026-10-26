import { Screen } from "../components/Screen";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import { IconChat, IconCheck, IconPeople } from "../components/Icons";
import { chapterTitle } from "../data/scenarios";
import { useVisit } from "../context/VisitContext";

export function SummaryPage({ scenario }) {
  const { watched } = useVisit();
  const seen = new Set(watched);

  return (
    <Screen backTo={`/visit/${scenario.id}/watch?chapter=${scenario.chapters.at(-1).id}`} title="You did it">
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-soft text-green">
        <IconCheck className="h-14 w-14" />
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight" data-testid="summary-title">
        You did it!
      </h1>
      <p className="mt-3 max-w-2xl text-xl text-ink-soft">
        You reached the end of the {scenario.title.toLowerCase()} practice.
      </p>

      <h2 className="mt-10 text-2xl font-bold">Parts of this visit</h2>
      <p className="mt-2 text-lg text-ink-soft">Parts you finished are marked.</p>
      <ul className="mt-4 space-y-3">
        {scenario.chapters.map((chapter) => {
          const watchedChapter = seen.has(chapter.id);
          return (
            <li
              key={chapter.id}
              className="flex min-h-16 items-center gap-4 rounded-2xl border border-line bg-paper px-4 py-3"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                  watchedChapter ? "bg-green-soft text-green" : "bg-sand text-muted"
                }`}
                aria-hidden="true"
              >
                {watchedChapter ? (
                  <IconCheck />
                ) : (
                  <span className="h-5 w-5 rounded-full border-2 border-current" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xl font-bold">{chapterTitle(chapter)}</span>
                <span className="block text-lg text-ink-soft">
                  {chapter.sensoryNotes?.[0]?.text || `${chapter.durationSeconds} seconds`}
                </span>
              </span>
              {watchedChapter ? (
                <span className="text-lg font-bold text-green">Seen</span>
              ) : (
                <span className="sr-only">Not marked</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-10 grid max-w-xl gap-3">
        <PrimaryButton to={`/visit/${scenario.id}/ask?chapter=whole`} data-testid="ask-more">
          <IconChat />
          Ask More Questions
        </PrimaryButton>
        <SecondaryButton to={`/visit/${scenario.id}/practice`} data-testid="practice">
          <IconPeople />
          {scenario.practiceButton}
        </SecondaryButton>
      </div>
    </Screen>
  );
}
