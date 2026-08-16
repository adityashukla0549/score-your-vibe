import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, Flame, Share2, Sparkles, TrendingUp, Trophy, Lock } from "lucide-react";
import { toast } from "sonner";
import { Screen } from "@/components/BottomNav";
import { ScoreCard } from "@/components/ScoreCard";
import { CATEGORIES } from "@/lib/quiz-data";
import { buildPlan, shareText } from "@/lib/scoring";
import { useAppState, useLatestResult, useToggleTask } from "@/lib/store";

export const Route = createFileRoute("/score")({
  head: () => ({
    meta: [
      { title: "My Life Score — Rate My Life" },
      { name: "description", content: "Your Life Score, AI verdict, honest roast, share card and 30-day fix plan." },
      { property: "og:title", content: "My Life Score — Rate My Life" },
      { property: "og:description", content: "See your score out of 100 and the plan to raise it." },
    ],
  }),
  component: ScorePage,
});

function useCountUp(target: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1600);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return n;
}

function ScorePage() {
  const { result, hydrated } = useLatestResult();
  const [state] = useAppState();
  const toggle = useToggleTask();
  const [tab, setTab] = useState<"verdict" | "share" | "plan">("verdict");
  const shown = useCountUp(result?.total ?? 0, hydrated && !!result);

  if (!hydrated || !result) {
    return (
      <Screen>
        <div className="mt-24 text-center">
          <h1 className="font-display text-3xl font-bold">No score yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">Take the 2-minute test to unlock your Life Score.</p>
          <Link
            to="/quiz"
            className="mt-6 inline-flex rounded-2xl bg-primary px-6 py-3.5 font-display font-bold text-primary-foreground"
          >
            Rate my life
          </Link>
        </div>
      </Screen>
    );
  }

  const prev = state.history[state.history.length - 2];
  const delta = prev ? result.total - prev.total : null;
  const plan = buildPlan(result);
  const done = plan.tasks.filter((t) => state.planChecked.includes(t.id)).length;

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied! Go ruin a group chat.");
    } catch {
      toast.error("Couldn't copy on this device");
    }
  };

  const share = async () => {
    const text = shareText(result);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "My Life Score", text });
        return;
      } catch {
        /* cancelled */
      }
    }
    copy(text);
  };

  return (
    <Screen>
      <div className="animate-rise text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Your life score</p>
        <div className="mt-2 flex items-end justify-center gap-1">
          <span className="grad-score font-display text-[6.5rem] font-bold leading-none">{shown}</span>
          <span className="pb-4 text-2xl font-semibold text-muted-foreground">/100</span>
        </div>
        {delta !== null && (
          <div
            className={`mt-1 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
              delta >= 0 ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"
            }`}
          >
            <TrendingUp className="size-3.5" /> {prev!.total} → {result.total} ({delta >= 0 ? "+" : ""}
            {delta})
          </div>
        )}
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{result.interpretation}</p>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-2">
        {(Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]).map((k, i) => (
          <div key={k} className="animate-rise flex items-center gap-3" style={{ animationDelay: `${i * 60}ms` }}>
            <span className="w-40 shrink-0 text-sm text-muted-foreground">
              {CATEGORIES[k].emoji} {CATEGORIES[k].label}
            </span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${result.categories[k]}%`, backgroundImage: "var(--gradient-score)" }}
              />
            </div>
            <span className="w-8 text-right text-sm font-semibold">{result.categories[k]}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex rounded-2xl bg-secondary p-1">
        {(
          [
            ["verdict", "Verdict"],
            ["share", "Share"],
            ["plan", "Fix My Life"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
              tab === key ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "verdict" && (
        <div className="animate-rise mt-5 space-y-3">
          <div className="surface p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <p className="font-display text-lg font-bold">AI Verdict</p>
            </div>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              {[
                ["Biggest strength", result.verdict.strength],
                ["Biggest weakness", result.verdict.weakness],
                ["Biggest opportunity", result.verdict.opportunity],
                ["Surprising observation", result.verdict.surprise],
                ["Do this first", result.verdict.recommendation],
              ].map(([title, body]) => (
                <div key={title}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{title}</p>
                  <p className="mt-1 text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface border-accent/40 p-5">
            <div className="flex items-center gap-2">
              <Flame className="size-4 text-accent" />
              <p className="font-display text-lg font-bold">Brutally Honest Roast</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">{result.roast}</p>
            <button
              onClick={() => copy(`AI roasted me: "${result.roast}" — my Life Score is ${result.total}/100 😭`)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-xs font-semibold"
            >
              <Copy className="size-3.5" /> Copy roast
            </button>
          </div>

          {!state.isPro && (
            <Link to="/profile" className="surface flex items-center gap-3 p-4">
              <Lock className="size-4 text-gold" />
              <div>
                <p className="text-sm font-semibold">Unlock deeper AI analysis</p>
                <p className="text-xs text-muted-foreground">PRO gives per-category breakdowns and unlimited retakes.</p>
              </div>
            </Link>
          )}
        </div>
      )}

      {tab === "share" && (
        <div className="animate-rise mt-5">
          <ScoreCard result={result} name={state.name || undefined} />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={share}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 font-semibold text-primary-foreground active:scale-[0.98]"
            >
              <Share2 className="size-4" /> Share My Score
            </button>
            <button
              onClick={() => copy(shareText(result))}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 font-semibold active:scale-[0.98]"
            >
              <Copy className="size-4" /> Copy Text
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Tip: screenshot the card above for your Instagram Story.
          </p>
        </div>
      )}

      {tab === "plan" && (
        <div className="animate-rise mt-5">
          <div className="surface p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-lg font-bold">Your 30-Day Fix Plan</p>
                <p className="text-xs text-muted-foreground">
                  Focus: {plan.focus.map((f) => `${CATEGORIES[f].emoji} ${CATEGORIES[f].label}`).join(" · ")}
                </p>
              </div>
              <div className="text-right">
                <p className="grad-score font-display text-2xl font-bold">
                  {done}/{plan.tasks.length}
                </p>
                <p className="text-[10px] text-muted-foreground">done</p>
              </div>
            </div>

            {(["daily", "weekly"] as const).map((cadence) => (
              <div key={cadence} className="mt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{cadence} tasks</p>
                <div className="mt-2 space-y-2">
                  {plan.tasks
                    .filter((t) => t.cadence === cadence)
                    .map((t) => {
                      const checked = state.planChecked.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          onClick={() => toggle(t.id)}
                          className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                            checked ? "border-primary/50 bg-primary/10 text-muted-foreground line-through" : "border-border bg-card"
                          }`}
                        >
                          <span
                            className={`grid size-5 shrink-0 place-items-center rounded-md border ${
                              checked ? "border-primary bg-primary text-primary-foreground" : "border-border"
                            }`}
                          >
                            {checked ? "✓" : ""}
                          </span>
                          {t.text}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          <Link to="/challenges" className="surface mt-3 flex items-center gap-3 p-4">
            <Trophy className="size-4 text-gold" />
            <p className="text-sm font-semibold">Turn this into a Life Battle with a friend →</p>
          </Link>
        </div>
      )}
    </Screen>
  );
}
