import { useNavigate } from "react-router-dom";
import { Screen } from "../components/Screen";
import { PrimaryButton } from "../components/Buttons";
import { IconPlay } from "../components/Icons";
import { chapterTitle } from "../data/scenarios";
import { useVisit } from "../context/VisitContext";

export function PreviewPage({ scenario }) {
  const navigate = useNavigate();
  const { resetProgress } = useVisit();
  const notes = scenario.chapters.flatMap((chapter) =>
    (chapter.sensoryNotes || []).map((note, index) => ({
      ...note,
      id: `${chapter.id}-${index}`,
      chapter: chapterTitle(chapter),
    })),
  );

  function start() {
    resetProgress();
    navigate(`/visit/${scenario.id}/watch?chapter=${scenario.chapters[0].id}`);
  }

  return (
    <Screen backTo="/scenarios" title="What to expect">
      <p className="text-lg font-bold text-blue">{scenario.title}</p>
      <h1 className="mt-1 text-4xl font-bold tracking-tight">What to expect</h1>

      <div className="mt-6 max-w-3xl space-y-3 text-xl">
        {(scenario.introParagraphs || [scenario.intro]).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>Nothing starts until you tap play. You can pause any time.</p>
      </div>

      <h2 className="mt-10 text-2xl font-bold">The parts</h2>
      <ol className="mt-4 space-y-3">
        {scenario.chapters.map((chapter, index) => (
          <li
            key={chapter.id}
            className="flex min-h-16 items-center justify-between gap-4 rounded-3xl border border-line bg-paper px-5 py-4"
          >
            <span className="text-xl font-bold">
              {index + 1}. {chapterTitle(chapter)}
            </span>
            <span className="text-lg font-bold text-ink-soft">{chapter.durationSeconds} sec</span>
          </li>
        ))}
      </ol>

      <h2 className="mt-10 text-2xl font-bold">Things you might notice</h2>
      <ul className="mt-4 space-y-3">
        {notes.map((note) => (
          <li key={note.id} className="flex items-start gap-3 rounded-3xl border border-line bg-paper p-4 text-xl">
            <span className="text-2xl" aria-hidden="true">
              {note.icon}
            </span>
            <span>
              <span className="block text-lg font-bold text-ink-soft">{note.chapter}</span>
              {note.text}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-10 max-w-xl">
        <PrimaryButton onClick={start} data-testid="ready">
          <IconPlay />
          I&apos;m Ready to Watch
        </PrimaryButton>
      </div>
    </Screen>
  );
}
