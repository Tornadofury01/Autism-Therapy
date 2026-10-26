function Svg({ children, className = "h-7 w-7", fill = "none" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={fill}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function IconHome({ className }) {
  return (
    <Svg className={className}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
    </Svg>
  );
}

export function IconBack({ className }) {
  return (
    <Svg className={className}>
      <path d="M15 5 8 12l7 7" />
      <path d="M9 12h11" />
    </Svg>
  );
}

export function IconPlay({ className = "h-7 w-7" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M8 5.2v13.6l11-6.8z" />
    </svg>
  );
}

export function IconPause({ className = "h-7 w-7" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M6 4.5h4.2v15H6zM13.8 4.5H18v15h-4.2z" />
    </svg>
  );
}

export function IconRest({ className }) {
  return (
    <Svg className={className}>
      <path d="M4 17h16" />
      <path d="M7 17V9h10v8" />
      <path d="M7 12h10" />
    </Svg>
  );
}

export function IconCheck({ className }) {
  return (
    <Svg className={className}>
      <path d="M5 12.5 9.2 17 19 7" />
    </Svg>
  );
}

export function IconSend({ className }) {
  return (
    <Svg className={className}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </Svg>
  );
}

export function IconChat({ className }) {
  return (
    <Svg className={className}>
      <path d="M6 16.5 4 20l4.2-1.6A8.5 8.5 0 1 0 6 16.5z" />
    </Svg>
  );
}

export function IconPeople({ className }) {
  return (
    <Svg className={className}>
      <circle cx="9" cy="9" r="2.2" />
      <circle cx="16" cy="9.5" r="1.8" />
      <path d="M4.8 18.5c.6-2.4 2.3-3.6 4.2-3.6s3.6 1.2 4.2 3.6" />
      <path d="M13.2 15.2c1.5-.3 2.8.2 3.6 1.6.6 1 .9 1.8 1.1 2.2" />
    </Svg>
  );
}

export function IconDoor({ className }) {
  return (
    <Svg className={className}>
      <path d="M7 20V6.5A1.5 1.5 0 0 1 8.5 5h7A1.5 1.5 0 0 1 17 6.5V20" />
      <path d="M5 20h14" />
      <path d="M14 12.5h.5" />
    </Svg>
  );
}

export function IconVolume({ className }) {
  return (
    <Svg className={className}>
      <path d="M4 10h3.2L12 6.5v11L7.2 14H4z" />
      <path d="M16 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M18.2 7.2a6.2 6.2 0 0 1 0 9.6" />
    </Svg>
  );
}

export function IconSun({ className }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
    </Svg>
  );
}

export function IconChair({ className }) {
  return (
    <Svg className={className}>
      <path d="M8 11V6.5A1.5 1.5 0 0 1 9.5 5h5A1.5 1.5 0 0 1 16 6.5V11" />
      <path d="M6 11h12v3H6z" />
      <path d="M8 14v5M16 14v5" />
    </Svg>
  );
}

export function IconMask({ className }) {
  return (
    <Svg className={className}>
      <path d="M4 12c2.2-4 5-6 8-6s5.8 2 8 6c-2.2 4-5 6-8 6s-5.8-2-8-6z" />
      <path d="M9 12.5h6" />
    </Svg>
  );
}

export function IconTooth({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className ?? "h-7 w-7"}>
      <path
        fill="currentColor"
        d="M8 4.8c1.3 0 2 .9 4 .9s2.7-.9 4-.9c2.3 0 3.2 2 3.2 4.3 0 2.2-.7 3.8-1.4 5.3-.7 1.3-.9 2.8-.9 3.8 0 1.3-.8 2-1.9 2-1 0-1.7-.8-1.8-2.3-.1-1.3-.5-2.1-1.4-2.1s-1.3.8-1.4 2.1c-.1 1.5-.8 2.3-1.8 2.3-1.1 0-1.9-.7-1.9-2 0-1-.2-2.5-.9-3.8C5.5 12.9 4.8 11.3 4.8 9.1c0-2.3.9-4.3 3.2-4.3z"
      />
    </svg>
  );
}

export function IconUtensils({ className }) {
  return (
    <Svg className={className}>
      <path d="M8 4v16" />
      <path d="M6 4v5a2 2 0 0 0 4 0V4" />
      <path d="M16 4c1.6 2 2 4 2 6.5S17.2 14 16 14V4z" />
      <path d="M16 14v6" />
    </Svg>
  );
}

export function IconScissors({ className }) {
  return (
    <Svg className={className}>
      <circle cx="7" cy="7" r="2.2" />
      <circle cx="7" cy="17" r="2.2" />
      <path d="M8.8 8.6 20 18" />
      <path d="M8.8 15.4 20 6" />
    </Svg>
  );
}

export function IconClipboard({ className }) {
  return (
    <Svg className={className}>
      <rect x="6" y="5" width="12" height="15" rx="2" />
      <path d="M9 5.5h6V4.8A1.2 1.2 0 0 0 13.8 3.5h-3.6A1.2 1.2 0 0 0 9 4.8z" />
      <path d="M9 11h6M9 15h4" />
    </Svg>
  );
}

export function IconDroplet({ className }) {
  return (
    <Svg className={className}>
      <path d="M12 3.5s5 5.4 5 9.2a5 5 0 0 1-10 0c0-3.8 5-9.2 5-9.2z" />
    </Svg>
  );
}

export function IconMic({ className }) {
  return (
    <Svg className={className}>
      <rect x="9" y="3.5" width="6" height="10" rx="3" />
      <path d="M7 11a5 5 0 0 0 10 0" />
      <path d="M12 16v4M9 20h6" />
    </Svg>
  );
}

export function IconGear({ className }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6" />
    </Svg>
  );
}

export function IconTrain({ className }) {
  return (
    <Svg className={className}>
      <rect x="6" y="4" width="12" height="12" rx="2" />
      <path d="M6 10h12" />
      <path d="M9 7.5h.5M14.5 7.5H15" />
      <path d="M8 16l-1.5 3M16 16l1.5 3" />
      <path d="M9 19h6" />
    </Svg>
  );
}

export function IconTicket({ className }) {
  return (
    <Svg className={className}>
      <path d="M4 8.5A2.5 2.5 0 0 0 6.5 11 2.5 2.5 0 0 0 4 13.5V17h16v-3.5A2.5 2.5 0 0 0 17.5 11 2.5 2.5 0 0 0 20 8.5V6H4z" />
      <path d="M12 7.5v9" />
    </Svg>
  );
}

export function IconColumns({ className }) {
  return (
    <Svg className={className}>
      <path d="M5 19V9M9.5 19V9M14.5 19V9M19 19V9" />
      <path d="M4 9h16L12 4.5z" />
      <path d="M4 19h16" />
    </Svg>
  );
}

export function IconMonument({ className }) {
  return (
    <Svg className={className}>
      <path d="M12 3.5 14.2 19H9.8z" />
      <path d="M8 20.5h8" />
    </Svg>
  );
}

export function IconColors({ className }) {
  return (
    <Svg className={className}>
      <circle cx="8" cy="9" r="2.4" />
      <circle cx="15.2" cy="8.2" r="2.4" />
      <circle cx="12" cy="15" r="2.4" />
    </Svg>
  );
}

export function IconTool({ className }) {
  return (
    <Svg className={className}>
      <circle cx="8" cy="8" r="3" />
      <path d="M10.2 10.2 19 19" />
      <path d="M16.5 16.5 19 14" />
    </Svg>
  );
}

export const icons = {
  home: IconHome,
  back: IconBack,
  play: IconPlay,
  pause: IconPause,
  rest: IconRest,
  check: IconCheck,
  send: IconSend,
  chat: IconChat,
  people: IconPeople,
  door: IconDoor,
  sound: IconVolume,
  light: IconSun,
  chair: IconChair,
  mask: IconMask,
  tooth: IconTooth,
  utensils: IconUtensils,
  scissors: IconScissors,
  clipboard: IconClipboard,
  droplet: IconDroplet,
  tool: IconTool,
  mic: IconMic,
  gear: IconGear,
  train: IconTrain,
  ticket: IconTicket,
  columns: IconColumns,
  monument: IconMonument,
};
