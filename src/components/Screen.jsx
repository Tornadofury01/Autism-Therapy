import { TopNav } from "./TopNav";
import { usePageTitle } from "../hooks/usePageTitle";

export function Screen({ backTo, title, children }) {
  usePageTitle(title);

  return (
    <div className="min-h-dvh">
      <TopNav backTo={backTo} />
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-5xl px-6 py-8 pb-28 outline-none"
      >
        {children}
      </main>
    </div>
  );
}
