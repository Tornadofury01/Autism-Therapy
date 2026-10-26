import { Link } from "react-router-dom";
import { Screen } from "../components/Screen";
import { icons } from "../components/Icons";
import scenarios from "../data/scenarios";

const comingSoon = [
  {
    id: "food",
    title: "Ordering Food",
    description: "See a counter and how to order.",
    icon: "utensils",
  },
  {
    id: "haircut",
    title: "Haircut",
    description: "See a salon chair and a haircut.",
    icon: "scissors",
  },
];

export function ScenarioPage() {
  const ready = Object.values(scenarios);

  return (
    <Screen backTo="/" title="Choose a place">
      <h1 className="text-4xl font-bold tracking-tight">Choose a place</h1>
      <p className="mt-3 max-w-2xl text-xl text-ink-soft">Pick one visit to practice.</p>

      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {ready.map((place) => {
          const Icon = icons[place.icon] ?? icons.door;
          return (
            <li key={place.id}>
              <Link
                to={`/visit/${place.id}/preview`}
                data-testid={`scenario-${place.id}`}
                className="flex min-h-40 flex-col justify-between rounded-3xl border-2 border-line bg-paper p-6 text-ink text-left hover:border-blue hover:bg-blue-soft"
              >
                <span className="flex items-start gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-soft text-blue">
                    <Icon className="h-8 w-8" />
                  </span>
                  <span>
                    <span className="block text-2xl font-bold">{place.title}</span>
                    <span className="mt-2 block text-lg">{place.description}</span>
                  </span>
                </span>
                {(place.details || []).length > 0 && (
                  <span className="mt-4 block space-y-2">
                    {place.details.map((line) => (
                      <span key={line} className="block text-lg text-ink-soft">
                        {line}
                      </span>
                    ))}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
        {comingSoon.map((place) => {
          const Icon = icons[place.icon] ?? icons.door;
          return (
            <li key={place.id}>
              <div
                data-testid={`scenario-${place.id}`}
                className="flex min-h-40 flex-col justify-between rounded-3xl border-2 border-line bg-sand/60 p-6 text-ink"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sand text-ink-soft">
                    <Icon className="h-8 w-8" />
                  </span>
                  <span>
                    <span className="block text-2xl font-bold">{place.title}</span>
                    <span className="mt-1 block text-lg text-ink-soft">{place.description}</span>
                  </span>
                </span>
                <span className="mt-4 inline-flex min-h-12 w-fit items-center rounded-full bg-paper px-4 text-lg font-bold text-ink-soft">
                  Coming soon
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Screen>
  );
}
