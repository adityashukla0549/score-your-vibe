import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Link2, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Screen } from "@/components/BottomNav";
import { setState, useAppState, useLatestResult } from "@/lib/store";

export const Route = createFileRoute("/friends")({
  head: () => ({
    meta: [
      { title: "Friends & Rate My Friend — Rate My Life" },
      { name: "description", content: "Compare Life Scores with friends and collect private, anonymous feedback about yourself." },
      { property: "og:title", content: "Friends — Rate My Life" },
      { property: "og:description", content: "Compare scores and get private feedback from friends." },
    ],
  }),
  component: Friends,
});

function Friends() {
  const [state] = useAppState();
  const { result } = useLatestResult();
  const [tab, setTab] = useState<"compare" | "rate">("compare");
  const myScore = result?.total ?? 0;
  const rateLink = `${typeof window !== "undefined" ? window.location.origin : ""}/rate/you-${state.friends.length}82f`;

  return (
    <Screen>
      <h1 className="font-display text-4xl font-bold">Friends</h1>

      <div className="mt-5 flex rounded-2xl bg-secondary p-1">
        {(
          [
            ["compare", "Compare"],
            ["rate", "Rate My Friend"],
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

      {tab === "compare" ? (
        <div className="animate-rise mt-5 space-y-3">
          <div className="surface flex items-center gap-3 p-4">
            <span className="text-2xl">🔥</span>
            <div className="flex-1">
              <p className="text-sm font-semibold">You</p>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full" style={{ width: `${myScore}%`, backgroundImage: "var(--gradient-score)" }} />
              </div>
            </div>
            <span className="font-display text-xl font-bold">{myScore}</span>
          </div>

          {state.friends.map((f) => (
            <div key={f.id} className="surface flex items-center gap-3 p-4">
              <span className="text-2xl">{f.avatar}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  {f.name}{" "}
                  <span className={`text-xs ${f.delta >= 0 ? "text-primary" : "text-destructive"}`}>
                    {f.delta >= 0 ? "+" : ""}
                    {f.delta}
                  </span>
                </p>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-muted-foreground/60" style={{ width: `${f.score}%` }} />
                </div>
              </div>
              <span className="font-display text-xl font-bold text-muted-foreground">{f.score}</span>
            </div>
          ))}

          <button
            onClick={() => {
              navigator.clipboard?.writeText(`Rate your life and compare with me — I got ${myScore}/100 👀`);
              toast.success("Invite copied");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-display font-bold text-primary-foreground active:scale-[0.98]"
          >
            <UserPlus className="size-4" /> Invite friends
          </button>
        </div>
      ) : (
        <div className="animate-rise mt-5 space-y-3">
          <div className="surface p-5">
            <p className="font-display text-lg font-bold">Get rated by your friends</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Send this private link. Friends answer fun questions about you, anonymously. Only you can see the
              answers, and you can delete them anytime.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-background/60 px-3 py-2.5">
              <Link2 className="size-4 shrink-0 text-primary" />
              <span className="truncate text-xs text-muted-foreground">{rateLink}</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(rateLink);
                toast.success("Private link copied");
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground"
            >
              <Copy className="size-4" /> Copy my private link
            </button>
          </div>

          <p className="pt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Private feedback ({state.feedback.length})
          </p>
          {state.feedback.length === 0 && (
            <p className="text-sm text-muted-foreground">Nothing yet. Share your link to start collecting.</p>
          )}
          {state.feedback.map((fb) => (
            <div key={fb.id} className="surface p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{fb.question}</p>
              <p className="mt-2 text-sm text-foreground/90">“{fb.answer}”</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{fb.from}</span>
                <button
                  onClick={() => {
                    setState((s) => ({ ...s, feedback: s.feedback.filter((x) => x.id !== fb.id) }));
                    toast.success("Feedback deleted");
                  }}
                  className="inline-flex items-center gap-1 text-xs text-destructive"
                >
                  <Trash2 className="size-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}

          {state.feedback.length > 0 && (
            <button
              onClick={() => {
                setState((s) => ({ ...s, feedback: [] }));
                toast.success("All feedback deleted");
              }}
              className="w-full rounded-2xl border border-destructive/40 px-6 py-3 text-sm font-semibold text-destructive"
            >
              Delete all feedback
            </button>
          )}
        </div>
      )}
    </Screen>
  );
}
