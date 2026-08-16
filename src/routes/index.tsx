import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Flame, Share2, Zap } from "lucide-react";
import { Screen } from "@/components/BottomNav";
import { useLatestResult } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rate My Life — AI Life Score out of 100" },
      {
        name: "description",
        content: "Answer 20 fun questions and get your AI Life Score out of 100, an honest verdict, a roast and a 30-day plan.",
      },
      { property: "og:title", content: "Rate My Life — AI Life Score out of 100" },
      { property: "og:description", content: "Get your Life Score, AI verdict, brutal roast and a 30-day fix plan." },
    ],
  }),
  component: Home,
});

function Home() {
  const { result, hydrated } = useLatestResult();

  return (
    <Screen>
      <div className="animate-rise">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" /> AI-powered · 20 questions · 2 minutes
        </div>
        <h1 className="mt-5 font-display text-[3.2rem] font-bold leading-[0.95]">
          Rate
          <br />
          My <span className="grad-score">Life</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Get scored out of 100 across 8 areas of your life. Then get an AI verdict, a brutally honest roast, and a
          30-day plan to fix the worst part.
        </p>

        <Link
          to="/quiz"
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-display text-lg font-bold text-primary-foreground glow transition-transform active:scale-[0.98]"
        >
          {hydrated && result ? "Retake the test" : "Rate my life"} <Zap className="size-5" />
        </Link>

        {hydrated && result && (
          <Link
            to="/score"
            className="mt-3 flex w-full items-center justify-between rounded-2xl border border-border bg-card px-5 py-4"
          >
            <span className="text-sm text-muted-foreground">Your last score</span>
            <span className="grad-score font-display text-2xl font-bold">{result.total}/100</span>
          </Link>
        )}
      </div>

      <div className="mt-10 space-y-3">
        {[
          { icon: Flame, title: "Brutally Honest Roast", body: "An AI that reads your answers and drags you, lovingly." },
          { icon: Share2, title: "Screenshot-worthy card", body: "A share card built for Stories and WhatsApp groups." },
          { icon: Sparkles, title: "Fix My Life in 30 days", body: "A daily/weekly checklist for your 3 weakest areas." },
        ].map((f, i) => (
          <div key={f.title} className="surface animate-rise p-4" style={{ animationDelay: `${i * 80 + 120}ms` }}>
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-secondary p-2.5">
                <f.icon className="size-4 text-primary" />
              </div>
              <div>
                <p className="font-display text-base font-semibold">{f.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{f.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Free forever for your first score · PRO from ₹99/month
      </p>
    </Screen>
  );
}
