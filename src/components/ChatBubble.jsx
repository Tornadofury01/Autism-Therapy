export function ChatBubble({ from, children }) {
  const isYou = from === "you";

  return (
    <div className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[40rem] rounded-3xl px-5 py-4 text-xl leading-relaxed ${
          isYou ? "bg-sand text-ink" : "bg-blue-soft text-ink"
        }`}
      >
        <p className="mb-2 text-base font-bold text-ink-soft">{isYou ? "You" : "Answer"}</p>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}
