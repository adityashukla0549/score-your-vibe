import { createFileRoute } from "@tanstack/react-router";
import { Check, Crown, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Screen } from "@/components/BottomNav";
import { setState, useAppState } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & PRO — Rate My Life" },
      { name: "description", content: "Track your Life Score progress over time and upgrade to Rate My Life PRO." },
      { property: "og:title", content: "Profile — Rate My Life" },
      { property: "og:description", content: "Your score history, progress and PRO plan." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const [state] = useAppState();
  const history = state.history;
  const first = history[0];
  const last = history[history.length - 1];
  const delta = first && last ? last.total - first.total : 0;

  return (
    <Screen>
      <h1 className="font-display text-4xl font-bold">Profile</h1>

      <div className="surface mt-5 p-5">
        <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Display name
        </label>
        <input
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
          placeholder="Your name"
          className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="surface mt-3 p-5">
        <p className="font-display text-lg font-bold">Progress</p>
        {history.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No assessments yet.</p>
        ) : (
          <>
            <p className="grad-score mt-2 font-display text-3xl font-bold">
              {first!.total} → {last!.total}{" "}
              <span className="text-lg">
                ({delta >= 0 ? "+" : ""}
                {delta})
              </span>
            </p>
            <div className="mt-4 flex items-end gap-2">
              {history.slice(-8).map((h) => (
                <div key={h.id} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg"
                    style={{ height: `${Math.max(8, h.total)}px`, backgroundImage: "var(--gradient-score)" }}
                  />
                  <span className="text-[10px] text-muted-foreground">{h.total}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setState((s) => ({ ...s, history: [], planChecked: [], planStartedAt: null }));
                toast.success("History cleared");
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-destructive"
            >
              <Trash2 className="size-3.5" /> Clear my data
            </button>
          </>
        )}
      </div>

      <div className="surface mt-3 border-gold/40 p-5">
        <div className="flex items-center gap-2">
          <Crown className="size-4 text-gold" />
          <p className="font-display text-lg font-bold">Rate My Life PRO</p>
          {state.isPro && <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">ACTIVE</span>}
        </div>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {[
            "Unlimited assessments (free = 1 per month)",
            "Deeper AI analysis per category",
            "Advanced progress tracking & trends",
            "Personalised 30/60/90-day plans",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
            </li>
          ))}
        </ul>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setState((s) => ({ ...s, isPro: true }));
              toast.success("PRO unlocked (demo payment)");
            }}
            className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold"
          >
            ₹99<span className="text-muted-foreground">/month</span>
          </button>
          <button
            onClick={() => {
              setState((s) => ({ ...s, isPro: true }));
              toast.success("PRO unlocked (demo payment)");
            }}
            className="rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
          >
            ₹499<span className="opacity-70">/year</span>
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">Payments are mocked in this MVP.</p>
      </div>
    </Screen>
  );
}
