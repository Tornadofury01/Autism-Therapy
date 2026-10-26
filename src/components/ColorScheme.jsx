import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IconColors } from "./Icons";

const STORAGE_KEY = "practice-visit-scheme";

export const schemes = [
  { id: "warm", label: "Warm", swatch: "#234854", paper: "#f3efe8" },
  { id: "cool", label: "Cool", swatch: "#1d4e66", paper: "#e8eef1" },
  { id: "green", label: "Green", swatch: "#245c45", paper: "#e7efe6" },
  { id: "dark", label: "Dark", swatch: "#c5dde4", paper: "#1b2428" },
];

const ids = new Set(schemes.map((scheme) => scheme.id));

export function readScheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (ids.has(saved)) return saved;
  } catch {
    // The choice still works for this visit if storage is blocked.
  }
  return "warm";
}

export function applyScheme(id) {
  const scheme = ids.has(id) ? id : "warm";
  document.documentElement.dataset.scheme = scheme;
  try {
    localStorage.setItem(STORAGE_KEY, scheme);
  } catch {
    // Keep the choice for this visit even if it cannot be saved.
  }
  return scheme;
}

export function ColorScheme() {
  const location = useLocation();
  const [scheme, setScheme] = useState(readScheme);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    applyScheme(scheme);
  }, [scheme]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2">
      {open ? (
        <div
          id="color-schemes"
          className="w-64 rounded-3xl border-2 border-line bg-paper p-3"
        >
          <p className="px-2 pb-2 text-lg font-bold">Color scheme</p>
          <div className="grid gap-2">
            {schemes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={scheme === item.id}
                onClick={() => setScheme(item.id)}
                data-testid={`scheme-${item.id}`}
                className={`flex min-h-16 items-center gap-3 rounded-2xl border-2 px-3 text-left text-xl font-bold ${
                  scheme === item.id ? "border-blue bg-blue-soft text-ink" : "border-line bg-paper text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-8 w-8 shrink-0 rounded-full border-2 border-line"
                  style={{ background: `linear-gradient(135deg, ${item.paper} 50%, ${item.swatch} 50%)` }}
                />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="color-schemes"
        onClick={() => setOpen((value) => !value)}
        data-testid="color-schemes"
        className="inline-flex min-h-16 items-center gap-2 rounded-2xl border-2 border-line bg-paper px-4 text-lg font-bold text-ink"
      >
        <IconColors className="h-7 w-7" />
        Colors
      </button>
    </div>
  );
}
