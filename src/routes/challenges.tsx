import { createFileRoute, Link } from "@tanstack/react-router";
import { Swords, Trophy, Flame } from "lucide-react";
import { toast } from "sonner";
import { Screen } from "@/components/BottomNav";
import { useAppState, useLatestResult } from "@/lib/store";

export const Route = createFileRoute("/challenges")({
  head: () => ({
    meta: [
      { title: "Life Battles — Rate My Life" },
      { name: "description", content: "Challenge friends to improve their Life Score the most in 30 days." },
      { property: "og:title", content: "Life Battles — Rate My Life" },
      { property: "og:description", content: "Who improves their Life Score the most wins." },
    ],
  }),
  component: Challenges,
});

function Challenges() {
  const [state] = useAppState();
  const { result } = useLatestResult();
  const first = state.history[0];
  const myDelta = result && first ? result.total - first.total : 0;

  return (
    <Screen>
      <h1 className="font-display text-4xl font-bold">Life Battles</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Not who has the best life — who <span className="text-primary">improves the most</span> in 30 days.
      </p>

      <div className="surface mt-6 p-5">
        <div className="flex items-center gap-2">
          <Flame className="size-4 text-accent" />
          <p className="font-display text-lg font-bold">Your improvement</p>
        </div>
        <p className="grad-score mt-2 font-display text-4xl font-bold">
          {myDelta >= 0 ? "+" : ""}
          {myDelta}
        </p>
        <p className="text-xs text-muted-foreground">
          {first && result ? `${first.total} → ${result.total} since your first test` : "Take the test to enter a battle"}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {state.battles.map((b) => (
          <div key={b.id} className="surface p-5">
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-bold">You vs {b.friend}</p>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                {b.endsIn} days left
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">You</p>
                <p className="font-display text-2xl font-bold text-primary">
                  {myDelta >= 0 ? "+" : ""}
                  {myDelta}
                </p>
              </div>
              <div className="rounded-xl bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">{b.friend}</p>
                <p className="font-display text-2xl font-bold text-accent">+{b.theirNow - b.theirStart}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => toast.success("Battle invite link copied — send it to a friend!")}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-display font-bold text-primary-foreground active:scale-[0.98]"
      >
        <Swords className="size-4" /> Start a new battle
      </button>

      <div className="surface mt-6 p-5">
        <div className="flex items-center gap-2">
          <Trophy className="size-4 text-gold" />
          <p className="font-display text-lg font-bold">Leaderboard · improvement</p>
        </div>
        <div className="mt-3 space-y-2">
          {[{ name: "You", avatar: "🔥", delta: myDelta }, ...state.friends.map((f) => ({ name: f.name, avatar: f.avatar, delta: f.delta }))]
            .sort((a, b) => b.delta - a.delta)
            .map((row, i) => (
              <div key={row.name} className="flex items-center gap-3 rounded-xl bg-background/50 px-4 py-2.5">
                <span className="w-4 text-xs text-muted-foreground">{i + 1}</span>
                <span className="text-lg">{row.avatar}</span>
                <span className="flex-1 text-sm font-medium">{row.name}</span>
                <span className={`text-sm font-bold ${row.delta >= 0 ? "text-primary" : "text-destructive"}`}>
                  {row.delta >= 0 ? "+" : ""}
                  {row.delta}
                </span>
              </div>
            ))}
        </div>
      </div>

      <Link to="/score" className="mt-4 block text-center text-xs text-muted-foreground underline">
        Open my 30-day plan
      </Link>
    </Screen>
  );
}
