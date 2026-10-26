export function StarterQuestions({ questions, onAsk }) {
  return (
    <div className={`grid grid-cols-1 gap-3 ${questions.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {questions.map((question) => (
        <button
          key={question.id}
          type="button"
          onClick={() => onAsk(question)}
          data-testid={`starter-${question.id}`}
          className="min-h-16 rounded-2xl border-2 border-line bg-paper px-4 text-xl font-bold text-ink hover:bg-sand"
        >
          {question.label}
        </button>
      ))}
    </div>
  );
}
