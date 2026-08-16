import { CATEGORIES, CATEGORY_ORDER } from "@/lib/quiz-data";
import type { Result } from "@/lib/scoring";

export function ScoreCard({ result, name }: { result: Result; name?: string }) {
  return (
    <div
      id="share-card"
      className="relative overflow-hidden rounded-3xl border border-border p-6"
      style={{ backgroundImage: "var(--gradient-card)" }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full blur-3xl"
        style={{ backgroundImage: "var(--gradient-score)", opacity: 0.28 }}
      />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {name ? `${name}'s` : "My"} Life Score
        </p>
        <div className="mt-1 flex items-end gap-2">
          <span className="grad-score font-display text-7xl font-bold leading-none">{result.total}</span>
          <span className="pb-2 text-xl font-semibold text-muted-foreground">/100</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {CATEGORY_ORDER.map((k) => (
            <div key={k} className="rounded-xl bg-background/40 px-3 py-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="truncate">
                  {CATEGORIES[k].emoji} {CATEGORIES[k].label}
                </span>
                <span className="font-semibold text-foreground">{result.categories[k]}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${result.categories[k]}%`, backgroundImage: "var(--gradient-score)" }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 font-display text-lg leading-snug text-foreground">“{result.quote}”</p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">rate my life</p>
      </div>
    </div>
  );
}
