import { Link } from "react-router-dom";
import { HomeArt } from "../components/Illustrations";
import { IconDoor, IconPeople } from "../components/Icons";
import { PrimaryButton } from "../components/Buttons";
import { usePageTitle } from "../hooks/usePageTitle";

export function HomePage() {
  usePageTitle("Home");

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 pt-16 pb-28">
      <main
        id="main"
        tabIndex={-1}
        className="flex w-full max-w-xl flex-col items-center gap-8 text-center outline-none"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-soft text-blue">
            <IconDoor className="h-8 w-8" />
          </span>
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Practice Visit</h1>
            <p className="mt-3 text-xl text-ink-soft">See a place before you visit it.</p>
          </div>
        </div>

        <HomeArt />

        <div className="flex w-full max-w-md flex-col items-center gap-2">
          <PrimaryButton to="/scenarios" data-testid="start">
            <IconDoor />
            Start a Practice Visit
          </PrimaryButton>
          <Link
            to="/grownups"
            data-testid="grownups"
            className="inline-flex min-h-16 items-center justify-center gap-2 rounded-2xl px-4 text-lg font-bold text-blue underline decoration-2 underline-offset-4"
          >
            <IconPeople className="h-6 w-6" />
            For Parents & Therapists
          </Link>
        </div>
      </main>
    </div>
  );
}
