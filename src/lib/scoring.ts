import { CATEGORIES, CATEGORY_ORDER, QUESTIONS, type CategoryKey } from "./quiz-data";

export type Answers = Record<string, number>;

export type Result = {
  id: string;
  date: string;
  total: number;
  categories: Record<CategoryKey, number>;
  tags: string[];
  interpretation: string;
  verdict: {
    strength: string;
    weakness: string;
    opportunity: string;
    surprise: string;
    recommendation: string;
  };
  roast: string;
  quote: string;
};

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function scoreCategories(answers: Answers): Record<CategoryKey, number> {
  const buckets: Record<string, number[]> = {};
  for (const q of QUESTIONS) {
    const v = answers[q.id];
    if (v === undefined) continue;
    (buckets[q.category] ??= []).push(v);
  }
  const out = {} as Record<CategoryKey, number>;
  for (const key of CATEGORY_ORDER) {
    const arr = buckets[key] ?? [];
    out[key] = arr.length ? clamp(arr.reduce((a, b) => a + b, 0) / arr.length) : 50;
  }
  return out;
}

function collectTags(answers: Answers): string[] {
  const tags: string[] = [];
  for (const q of QUESTIONS) {
    const v = answers[q.id];
    const opt = q.options.find((o) => o.value === v);
    if (opt?.tag) tags.push(opt.tag);
  }
  return tags;
}

function interpret(total: number): string {
  if (total >= 85) return "You're operating at a level most people only post about. Protect this momentum — and don't get comfortable.";
  if (total >= 70) return "Genuinely strong life. A couple of loose threads, but the foundation is solid and you know it.";
  if (total >= 55) return "You're doing better than you think. You're not behind — you're mid-build, and one category is dragging the rest.";
  if (total >= 40) return "Messy season, not a failed life. Two small fixes would move this score fast — you already know which ones.";
  return "This is a reset point, not a verdict. Everything here is fixable in 30 days if you pick one thing and stay boring about it.";
}

const STRENGTH: Record<CategoryKey, string> = {
  money: "You handle money like someone who plans to be rich later, not loud now.",
  career: "Your career/study direction is real, not performative. That clarity is rare at your age.",
  relationships: "Your close relationships are genuinely healthy — that's the strongest safety net a person can have.",
  social: "Your social life is alive. People actually want you in the room, and you show up.",
  health: "Your body is the most maintained thing in your life. Energy is your unfair advantage.",
  wellbeing: "Your head is quiet in a very loud generation. That calm is a skill, not luck.",
  productivity: "You get things done without drama. Boring consistency is your superpower.",
  growth: "You're actively upgrading yourself. Most people your age are static and calling it stability.",
};

const WEAKNESS: Record<CategoryKey, string> = {
  money: "Money is your weak link — no system, no buffer, and every month resets to zero.",
  career: "Career/education direction is foggy. You're busy, but not aimed at anything specific.",
  relationships: "Your close relationships are running on low battery — depth is missing, not people.",
  social: "Your social life has quietly shrunk. Isolation is dressing itself up as 'being busy'.",
  health: "Health is the category you keep postponing, and it's taxing everything else.",
  wellbeing: "Your mental bandwidth is maxed out. You're managing stress instead of reducing it.",
  productivity: "Focus is leaking. Screen time and last-minute panic are eating your best hours.",
  growth: "Personal growth has stalled. You're consuming a lot and building almost nothing.",
};

const OPPORTUNITY: Record<CategoryKey, string> = {
  money: "Track every rupee for 30 days and auto-save 10% on day one of each month. Score jumps fast.",
  career: "Pick one skill that pays and go 45 minutes a day on it. In a month you'll be visibly ahead.",
  relationships: "One honest, phone-down conversation per week with the person who matters most.",
  social: "Schedule one real-life meetup weekly. Text plans become plans only when they get a date.",
  health: "Three 30-minute workouts and a fixed sleep window. Nothing else changes your score faster.",
  wellbeing: "Ten minutes offline every morning before your phone. Your baseline anxiety drops noticeably.",
  productivity: "Two 50-minute deep work blocks daily with your phone in another room.",
  growth: "Finish one course, one book, or one project. Completion is the habit you're missing.",
};

function surpriseFor(cats: Record<CategoryKey, number>, tags: string[]): string {
  const best = CATEGORY_ORDER.reduce((a, b) => (cats[a] >= cats[b] ? a : b));
  const worst = CATEGORY_ORDER.reduce((a, b) => (cats[a] <= cats[b] ? a : b));
  if (tags.includes("doomscroller") && cats.growth >= 60)
    return `Surprising: you're growing despite ${9}+ hours of screen time. Imagine the score with half of it.`;
  if (cats.social >= 75 && cats.wellbeing < 55)
    return "Surprising: you're socially rich but internally drained — you're the friend everyone leans on and nobody checks on.";
  if (cats.money >= 75 && cats.health < 50)
    return "Surprising: you're financially disciplined but treat your body like a rental. Odd trade for someone this organised.";
  if (cats.productivity >= 75 && cats.social < 50)
    return "Surprising: your output is high but your calendar is empty of people. Productivity is quietly becoming avoidance.";
  return `Surprising: your ${CATEGORIES[best].label} score is carrying your entire life right now, while ${CATEGORIES[worst].label} silently drags it down ${Math.round((cats[best] - cats[worst]) / 2)} points.`;
}

function roastFor(cats: Record<CategoryKey, number>, tags: string[], total: number): string {
  const lines: string[] = [];
  if (cats.health < 50) lines.push("Your sleep schedule is a suggestion and your gym membership is basically charity.");
  if (cats.productivity < 50) lines.push("You have the focus of a browser with 40 tabs open and one of them is playing audio.");
  if (cats.money < 50) lines.push("Your budget strategy is 'hope', and your bank app opens like a horror movie.");
  if (tags.includes("situationship") || tags.includes("haunted"))
    lines.push("You're in a relationship with someone who hasn't been informed. Iconic.");
  if (tags.includes("course-hoarder")) lines.push("You own more unopened courses than actual completed skills.");
  if (cats.social < 50) lines.push("Your 'we should meet soon' has been in draft form since last semester.");
  if (cats.growth < 50) lines.push("Your five-year plan is currently a screenshot in your gallery.");
  if (lines.length === 0)
    lines.push("Honestly? Annoyingly put together. You're the friend everyone compares themselves to and quietly resents. Touch grass anyway.");
  const closer =
    total >= 70
      ? "Still, respect — you're doing well enough to be smug about it."
      : total >= 45
        ? "The good news: you're two habits away from being unbearable in a good way."
        : "The good news: rock bottom has excellent Wi-Fi and a 30-day plan waiting.";
  return lines.slice(0, 3).join(" ") + " " + closer;
}

function quoteFor(total: number): string {
  if (total >= 80) return "Built different, but still under construction.";
  if (total >= 65) return "Solid life, one bad habit away from elite.";
  if (total >= 50) return "Mid-build. The blueprint is fine, the discipline is loading.";
  return "Chaotic era. Main character arc pending.";
}

export function buildResult(answers: Answers): Result {
  const categories = scoreCategories(answers);
  const tags = collectTags(answers);
  const weights: Record<CategoryKey, number> = {
    money: 1.1,
    career: 1.2,
    relationships: 1,
    social: 0.9,
    health: 1.2,
    wellbeing: 1.2,
    productivity: 1.1,
    growth: 1.1,
  };
  const totalW = CATEGORY_ORDER.reduce((s, k) => s + weights[k], 0);
  const total = clamp(CATEGORY_ORDER.reduce((s, k) => s + categories[k] * weights[k], 0) / totalW);

  const sorted = [...CATEGORY_ORDER].sort((a, b) => categories[b] - categories[a]);
  const best = sorted[0]!;
  const worst = sorted[sorted.length - 1]!;
  const second = sorted[sorted.length - 2]!;

  return {
    id: `r_${Date.now()}`,
    date: new Date().toISOString(),
    total,
    categories,
    tags,
    interpretation: interpret(total),
    verdict: {
      strength: `${CATEGORIES[best].emoji} ${CATEGORIES[best].label} (${categories[best]}/100) — ${STRENGTH[best]}`,
      weakness: `${CATEGORIES[worst].emoji} ${CATEGORIES[worst].label} (${categories[worst]}/100) — ${WEAKNESS[worst]}`,
      opportunity: `${CATEGORIES[second].emoji} ${CATEGORIES[second].label} — ${OPPORTUNITY[second]}`,
      surprise: surpriseFor(categories, tags),
      recommendation: OPPORTUNITY[worst],
    },
    roast: roastFor(categories, tags, total),
    quote: quoteFor(total),
  };
}

export type PlanTask = { id: string; text: string; cadence: "daily" | "weekly" };

const PLAN_TASKS: Record<CategoryKey, { daily: string[]; weekly: string[] }> = {
  money: {
    daily: ["Log every rupee you spend today", "No-spend check: skip one impulse buy"],
    weekly: ["Move 10% of income to savings", "Review the week's spending in 5 minutes"],
  },
  career: {
    daily: ["45 min on one career skill", "Write down one thing you learned"],
    weekly: ["Update resume/portfolio with one new item", "Message one person in your field"],
  },
  relationships: {
    daily: ["Send one genuine message to someone you love"],
    weekly: ["One phone-down conversation with your closest person", "Call family for 15 minutes"],
  },
  social: {
    daily: ["React/reply to one friend properly, not just 😂"],
    weekly: ["One IRL meetup with an actual date and time", "Plan one group activity"],
  },
  health: {
    daily: ["30 minutes of movement", "Sleep and wake at fixed times", "3 litres of water"],
    weekly: ["Cook 3 home meals", "One long walk or outdoor session"],
  },
  wellbeing: {
    daily: ["10 phone-free minutes after waking", "Write 3 lines in a journal"],
    weekly: ["One full offline hour", "Reflect: what drained me this week?"],
  },
  productivity: {
    daily: ["Two 50-min deep work blocks, phone in another room", "Pick tomorrow's top 3 tasks tonight"],
    weekly: ["Cut screen time by 1 hour/day average", "Weekly review + reset"],
  },
  growth: {
    daily: ["25 min on your current book/course", "Ship one tiny piece of a project"],
    weekly: ["Finish one module/chapter", "Reflect on the goal you're actually chasing"],
  },
};

export function buildPlan(result: Result): { focus: CategoryKey[]; tasks: PlanTask[] } {
  const focus = [...CATEGORY_ORDER].sort((a, b) => result.categories[a] - result.categories[b]).slice(0, 3);
  const tasks: PlanTask[] = [];
  for (const key of focus) {
    PLAN_TASKS[key].daily.forEach((t, i) => tasks.push({ id: `${key}-d${i}`, text: `${CATEGORIES[key].emoji} ${t}`, cadence: "daily" }));
    PLAN_TASKS[key].weekly.forEach((t, i) => tasks.push({ id: `${key}-w${i}`, text: `${CATEGORIES[key].emoji} ${t}`, cadence: "weekly" }));
  }
  return { focus, tasks };
}

export function shareText(result: Result): string {
  const top = CATEGORY_ORDER.map((k) => `${CATEGORIES[k].emoji} ${CATEGORIES[k].label}: ${result.categories[k]}`).join("\n");
  return `MY LIFE SCORE: ${result.total}/100 🔥\n\n${top}\n\n"${result.quote}"\n\nRate your life too 👉 ${typeof window !== "undefined" ? window.location.origin : "ratemylife.app"}`;
}
