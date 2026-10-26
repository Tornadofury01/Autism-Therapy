import { useNavigate } from "react-router-dom";
import { IconBack, IconHome } from "./Icons";

const navButton =
  "inline-flex items-center gap-2 min-h-16 px-4 rounded-2xl text-xl font-bold text-ink hover:bg-sand";

export function TopNav({ backTo }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-line bg-cream">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <button type="button" className={navButton} onClick={() => navigate(backTo)} data-testid="back">
          <IconBack />
          Back
        </button>
        <button type="button" className={navButton} onClick={() => navigate("/")} data-testid="home">
          <IconHome />
          Home
        </button>
      </div>
    </header>
  );
}
