import { Screen } from "../components/Screen";

export function PracticePage({ scenario }) {
  const examples = scenario.practiceExamples || [];

  return (
    <Screen backTo={`/visit/${scenario.id}/summary`} title="Practice talking">
      <p className="text-lg font-bold text-blue">{scenario.title}</p>
      <h1 className="mt-1 text-4xl font-bold tracking-tight">{scenario.practiceTitle}</h1>
      <p className="mt-4 max-w-3xl text-xl">
        This practice talk is not ready yet. Later, a child will be able to try short things to say. Nothing here starts on its own.
      </p>

      <h2 className="mt-10 text-2xl font-bold">Examples you may practice later</h2>
      <ul className="mt-4 max-w-xl space-y-3">
        {examples.map((line) => (
          <li key={line} className="rounded-3xl border border-line bg-paper px-5 py-4 text-xl">
            {line}
          </li>
        ))}
      </ul>
    </Screen>
  );
}
