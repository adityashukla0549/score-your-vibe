import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { QUESTIONS } from "@/lib/quiz-data";
import { buildResult, type Answers } from "@/lib/scoring";
import { setState } from "@/lib/store";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "The Life Test — Rate My Life" },
      { name: "description", content: "20 quick questions about money, health, focus, love and goals. Get your Life Score." },
      { property: "og:title", content: "The Life Test — Rate My Life" },
      { property: "og:description", content: "20 quick questions. One honest score out of 100." },
    ],
  }),
  component: Quiz,
});

function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [analyzing, setAnalyzing] = useState(false);

  const q = QUESTIONS[step]!;
  const progress = ((step + (answers[q.id] !== undefined ? 1 : 0)) / QUESTIONS.length) * 100;

  const pick = (value: number) => {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 160);
    } else {
      setAnalyzing(true);
      const result = buildResult(next);
      setTimeout(() => {
        setState((s) => ({ ...s, history: [...s.history, result], planChecked: [], planStartedAt: null }));
        navigate({ to: "/score" });
      }, 1900);
    }
  };

  if (analyzing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-8 text-center">
        <Loader2 className="size-9 animate-spin text-primary" />
        <p className="font-display text-2xl font-bold">Analysing your life…</p>
        <p className="text-sm text-muted-foreground">Cross-checking 8 categories. This may hurt a little.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-md px-5 pb-10 pt-6">
        <div className="flex items-center gap-3">
          {step === 0 ? (
            <Link to="/" className="rounded-full bg-secondary p-2">
              <ArrowLeft className="size-4" />
            </Link>
          ) : (
            <button onClick={() => setStep(step - 1)} className="rounded-full bg-secondary p-2" aria-label="Back">
              <ArrowLeft className="size-4" />
            </button>
          )}
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundImage: "var(--gradient-score)" }}
            />
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {step + 1}/{QUESTIONS.length}
          </span>
        </div>

        <div key={q.id} className="animate-rise mt-12">
          <div className="text-5xl">{q.emoji}</div>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight">{q.text}</h1>

          <div className="mt-8 space-y-3">
            {q.options.map((o) => {
              const active = answers[q.id] === o.value;
              return (
                <button
                  key={o.label}
                  onClick={() => pick(o.value)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left text-base font-medium transition-all active:scale-[0.98] ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
