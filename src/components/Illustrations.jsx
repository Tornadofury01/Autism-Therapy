export function HomeArt() {
  return (
    <svg
      viewBox="0 0 560 300"
      role="img"
      aria-label="A quiet room with a window, a plant, and two chairs"
      className="h-auto w-full max-w-lg"
    >
      <rect x="8" y="8" width="544" height="284" rx="32" fill="var(--color-blue-soft)" />
      <rect x="36" y="168" width="488" height="96" rx="20" fill="var(--color-floor)" />
      <rect x="48" y="36" width="168" height="112" rx="16" fill="var(--color-window)" stroke="var(--color-blue)" strokeWidth="4" />
      <path d="M132 36v112M48 92h168" stroke="var(--color-blue)" strokeWidth="3" />
      <circle cx="108" cy="78" r="16" fill="var(--color-sun)" />
      <rect x="250" y="128" width="36" height="28" rx="6" fill="var(--color-wood)" />
      <path d="M268 128c-18-28-6-62 0-78 8 18 22 48 0 78z" fill="var(--color-leaf)" />
      <path d="M268 120c16-22 28-18 34-4-12 6-24 14-34 4z" fill="var(--color-leaf-light)" />
      <rect x="320" y="118" width="78" height="62" rx="16" fill="var(--color-paper)" stroke="var(--color-blue)" strokeWidth="3" />
      <path d="M332 180v28M386 180v28" stroke="var(--color-blue)" strokeWidth="3" />
      <rect x="430" y="128" width="70" height="52" rx="16" fill="var(--color-sand)" stroke="var(--color-blue)" strokeWidth="3" />
      <path d="M442 180v22M488 180v22" stroke="var(--color-blue)" strokeWidth="3" />
      <ellipse cx="250" cy="214" rx="70" ry="16" fill="var(--color-sand)" />
    </svg>
  );
}

function RoomShell({ children }) {
  return (
    <svg
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="800" height="450" fill="var(--color-canvas)" />
      <rect y="290" width="800" height="160" fill="var(--color-floor)" />
      <rect x="46" y="36" width="150" height="108" rx="14" fill="var(--color-window)" stroke="var(--color-blue)" strokeWidth="4" />
      <path d="M121 36v108M46 90h150" stroke="var(--color-blue)" strokeWidth="3" />
      <circle cx="96" cy="74" r="14" fill="var(--color-sun)" />
      {children}
    </svg>
  );
}

export function RoomArt({ chapterId = "waiting" }) {
  if (chapterId === "checkin") {
    return (
      <RoomShell>
        <rect x="250" y="168" width="280" height="122" rx="16" fill="var(--color-paper)" stroke="var(--color-blue)" strokeWidth="4" />
        <rect x="280" y="198" width="90" height="64" rx="8" fill="var(--color-blue-soft)" stroke="var(--color-blue)" strokeWidth="3" />
        <path d="M296 220h58M296 238h40" stroke="var(--color-blue)" strokeWidth="3" />
        <rect x="560" y="150" width="28" height="140" rx="8" fill="var(--color-wood)" />
      </RoomShell>
    );
  }

  if (chapterId === "chair") {
    return (
      <RoomShell>
        <rect x="300" y="150" width="220" height="36" rx="16" fill="var(--color-leaf-light)" />
        <rect x="250" y="186" width="300" height="78" rx="24" fill="var(--color-paper)" stroke="var(--color-blue)" strokeWidth="4" />
        <path d="M280 264v48M520 264v48" stroke="var(--color-blue)" strokeWidth="5" />
        <circle cx="620" cy="120" r="28" fill="var(--color-window)" stroke="var(--color-blue)" strokeWidth="4" />
      </RoomShell>
    );
  }

  if (chapterId === "cleaning") {
    return (
      <RoomShell>
        <rect x="270" y="190" width="260" height="70" rx="22" fill="var(--color-paper)" stroke="var(--color-blue)" strokeWidth="4" />
        <path d="M300 260v40M500 260v40" stroke="var(--color-blue)" strokeWidth="5" />
        <rect x="560" y="168" width="36" height="48" rx="10" fill="var(--color-blue-soft)" stroke="var(--color-blue)" strokeWidth="3" />
        <path d="M578 150v20" stroke="var(--color-blue)" strokeWidth="3" />
        <circle cx="200" cy="210" r="22" fill="var(--color-green-soft)" stroke="var(--color-green)" strokeWidth="4" />
      </RoomShell>
    );
  }

  if (chapterId === "tools") {
    return (
      <RoomShell>
        <rect x="250" y="200" width="300" height="28" rx="10" fill="var(--color-wood)" />
        <circle cx="320" cy="168" r="26" fill="none" stroke="var(--color-blue)" strokeWidth="6" />
        <path d="M320 194v48" stroke="var(--color-blue)" strokeWidth="6" />
        <path d="M430 150v110" stroke="var(--color-ink-soft)" strokeWidth="6" />
        <circle cx="430" cy="140" r="10" fill="var(--color-ink-soft)" />
        <rect x="500" y="168" width="18" height="90" rx="8" fill="var(--color-blue)" />
      </RoomShell>
    );
  }

  if (chapterId === "done") {
    return (
      <RoomShell>
        <rect x="470" y="78" width="150" height="212" rx="12" fill="var(--color-paper)" stroke="var(--color-blue)" strokeWidth="4" />
        <path d="M548 78v212" stroke="var(--color-blue)" strokeWidth="3" />
        <circle cx="530" cy="184" r="5" fill="var(--color-blue)" />
        <rect x="180" y="176" width="160" height="70" rx="18" fill="var(--color-green-soft)" stroke="var(--color-green)" strokeWidth="4" />
        <path d="M210 246v36M310 246v36" stroke="var(--color-green)" strokeWidth="4" />
      </RoomShell>
    );
  }

  return (
    <RoomShell>
      <rect x="240" y="168" width="150" height="78" rx="18" fill="var(--color-paper)" stroke="var(--color-blue)" strokeWidth="4" />
      <path d="M262 246v40M368 246v40" stroke="var(--color-blue)" strokeWidth="4" />
      <rect x="430" y="184" width="130" height="62" rx="18" fill="var(--color-sand)" stroke="var(--color-blue)" strokeWidth="4" />
      <path d="M452 246v32M538 246v32" stroke="var(--color-blue)" strokeWidth="4" />
      <rect x="620" y="200" width="34" height="26" rx="6" fill="var(--color-wood)" />
      <path d="M637 200c-16-26-4-58 0-72 8 16 20 44 0 72z" fill="var(--color-leaf)" />
    </RoomShell>
  );
}

export function PreviewArt() {
  return (
    <svg
      viewBox="0 0 800 450"
      role="img"
      aria-label="A quiet drawing of a dentist waiting room"
      className="h-auto w-full"
    >
      <rect width="800" height="450" fill="var(--color-canvas)" />
      <rect y="290" width="800" height="160" fill="var(--color-floor)" />
      <rect x="46" y="36" width="150" height="108" rx="14" fill="var(--color-window)" stroke="var(--color-blue)" strokeWidth="4" />
      <path d="M121 36v108M46 90h150" stroke="var(--color-blue)" strokeWidth="3" />
      <circle cx="96" cy="74" r="14" fill="var(--color-sun)" />
      <rect x="240" y="168" width="150" height="78" rx="18" fill="var(--color-paper)" stroke="var(--color-blue)" strokeWidth="4" />
      <path d="M262 246v40M368 246v40" stroke="var(--color-blue)" strokeWidth="4" />
      <rect x="430" y="184" width="130" height="62" rx="18" fill="var(--color-sand)" stroke="var(--color-blue)" strokeWidth="4" />
      <path d="M452 246v32M538 246v32" stroke="var(--color-blue)" strokeWidth="4" />
      <rect x="620" y="200" width="34" height="26" rx="6" fill="var(--color-wood)" />
      <path d="M637 200c-16-26-4-58 0-72 8 16 20 44 0 72z" fill="var(--color-leaf)" />
    </svg>
  );
}
