import { forwardRef } from "react";
import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-3 min-h-16 px-6 rounded-2xl text-xl font-bold text-center";

function classes(...parts) {
  return parts.filter(Boolean).join(" ");
}

export const PrimaryButton = forwardRef(function PrimaryButton(
  { to, children, className = "", ...props },
  ref,
) {
  const cls = classes(base, "bg-blue text-on-blue hover:bg-blue-deep w-full", className);
  if (to) {
    return (
      <Link ref={ref} to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button ref={ref} type="button" className={cls} {...props}>
      {children}
    </button>
  );
});

export const SecondaryButton = forwardRef(function SecondaryButton(
  { to, children, className = "", ...props },
  ref,
) {
  const cls = classes(
    base,
    "bg-paper text-ink border-2 border-line hover:bg-sand w-full",
    className,
  );
  if (to) {
    return (
      <Link ref={ref} to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button ref={ref} type="button" className={cls} {...props}>
      {children}
    </button>
  );
});

export const StopButton = forwardRef(function StopButton(
  { children, className = "", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={classes(
        base,
        "bg-rose-soft text-rose border-2 border-rose/25 hover:bg-rose-deep w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
