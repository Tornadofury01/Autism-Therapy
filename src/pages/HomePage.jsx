import { Link } from "react-router-dom";
import { IconDoor, IconPeople } from "../components/Icons";
import { PrimaryButton } from "../components/Buttons";
import { usePageTitle } from "../hooks/usePageTitle";

export function HomePage() {
  usePageTitle();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 pt-16 pb-28">
      <main
        id="main"
        tabIndex={-1}
        className="flex w-full max-w-xl flex-col items-center gap-8 text-center outline-none"
      >
        <div className="flex flex-col items-center gap-2">
          <h1>
            <img src="/zien-logo.png" alt="Zien" className="mx-auto h-auto w-64 sm:w-80" />
          </h1>
          <p className="text-xl text-ink-soft">See a place before you visit it.</p>
        </div>

        <div className="flex w-full max-w-md flex-col items-center gap-2">
          <PrimaryButton to="/scenarios" data-testid="start">
            <IconDoor />
            Choose a place
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
