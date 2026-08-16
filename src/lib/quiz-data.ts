export type CategoryKey =
  | "money"
  | "career"
  | "relationships"
  | "social"
  | "health"
  | "wellbeing"
  | "productivity"
  | "growth";

export const CATEGORIES: Record<CategoryKey, { label: string; emoji: string }> = {
  money: { label: "Money", emoji: "💰" },
  career: { label: "Career/Education", emoji: "🎓" },
  relationships: { label: "Relationships", emoji: "❤️" },
  social: { label: "Social Life", emoji: "👥" },
  health: { label: "Health", emoji: "💪" },
  wellbeing: { label: "Wellbeing", emoji: "🧠" },
  productivity: { label: "Productivity", emoji: "⏰" },
  growth: { label: "Personal Growth", emoji: "🌱" },
};

export const CATEGORY_ORDER: CategoryKey[] = [
  "money",
  "career",
  "relationships",
  "social",
  "health",
  "wellbeing",
  "productivity",
  "growth",
];

export type Question = {
  id: string;
  category: CategoryKey;
  emoji: string;
  text: string;
  options: { label: string; value: number; tag?: string }[];
};

export const QUESTIONS: Question[] = [
  {
    id: "age",
    category: "growth",
    emoji: "🎂",
    text: "What's your age bracket?",
    options: [
      { label: "Under 18", value: 70, tag: "teen" },
      { label: "18–22 (peak chaos)", value: 75, tag: "college" },
      { label: "23–27", value: 72, tag: "early-career" },
      { label: "28+", value: 70, tag: "grown" },
    ],
  },
  {
    id: "status",
    category: "career",
    emoji: "🎓",
    text: "What best describes you right now?",
    options: [
      { label: "Student, fully in it", value: 70, tag: "student" },
      { label: "Student + side hustle", value: 88, tag: "hustler" },
      { label: "Working full-time", value: 82, tag: "working" },
      { label: "Between things rn", value: 45, tag: "searching" },
    ],
  },
  {
    id: "career_sat",
    category: "career",
    emoji: "🚀",
    text: "How satisfied are you with your career/study path?",
    options: [
      { label: "Living the dream", value: 95 },
      { label: "Pretty good, some doubts", value: 75 },
      { label: "Meh, going through motions", value: 45 },
      { label: "Actively questioning everything", value: 22 },
    ],
  },
  {
    id: "money_flow",
    category: "money",
    emoji: "💰",
    text: "End of the month, your bank balance is...",
    options: [
      { label: "Growing, I save every month", value: 95 },
      { label: "Stable-ish", value: 72 },
      { label: "Exactly ₹0.00", value: 40 },
      { label: "Borrowing from friends", value: 18 },
    ],
  },
  {
    id: "money_habit",
    category: "money",
    emoji: "🧾",
    text: "Do you track your spending?",
    options: [
      { label: "Yes, budget + investments", value: 95 },
      { label: "Roughly, in my head", value: 65 },
      { label: "Only when I panic", value: 38 },
      { label: "Tracking is for cowards", value: 15 },
    ],
  },
  {
    id: "sleep",
    category: "health",
    emoji: "😴",
    text: "Average sleep on a normal night?",
    options: [
      { label: "7–8 hrs, same time daily", value: 95 },
      { label: "6–7 hrs, decent", value: 72 },
      { label: "5–6 hrs, running on vibes", value: 42 },
      { label: "Sleep schedule? Never met her", value: 15 },
    ],
  },
  {
    id: "exercise",
    category: "health",
    emoji: "🏋️",
    text: "How often do you move your body?",
    options: [
      { label: "5+ times a week", value: 96 },
      { label: "2–4 times a week", value: 78 },
      { label: "Once in a while", value: 42 },
      { label: "Walking to the fridge counts?", value: 14 },
    ],
  },
  {
    id: "food",
    category: "health",
    emoji: "🥗",
    text: "Your typical daily food situation?",
    options: [
      { label: "Home-cooked, balanced", value: 92 },
      { label: "Mostly fine, weekend cheats", value: 74 },
      { label: "Half meals, half snacks", value: 45 },
      { label: "Instant noodles are a food group", value: 18 },
    ],
  },
  {
    id: "screen",
    category: "productivity",
    emoji: "📱",
    text: "Daily screen time (be honest)?",
    options: [
      { label: "Under 3 hrs", value: 95 },
      { label: "3–5 hrs", value: 74 },
      { label: "6–8 hrs", value: 40 },
      { label: "9+ hrs, phone is a limb", value: 12, tag: "doomscroller" },
    ],
  },
  {
    id: "focus",
    category: "productivity",
    emoji: "🎯",
    text: "How's your focus on deep work?",
    options: [
      { label: "Hours of flow, no problem", value: 94 },
      { label: "Good with a timer", value: 74 },
      { label: "Distracted every 10 min", value: 40 },
      { label: "I opened 14 tabs to answer this", value: 16 },
    ],
  },
  {
    id: "procrastination",
    category: "productivity",
    emoji: "⏰",
    text: "Deadlines and you...",
    options: [
      { label: "Done days early", value: 93 },
      { label: "Done on time, mild stress", value: 72 },
      { label: "Night-before special", value: 38 },
      { label: "Extensions are my personality", value: 15 },
    ],
  },
  {
    id: "social_freq",
    category: "social",
    emoji: "👥",
    text: "How often do you meet friends IRL?",
    options: [
      { label: "Multiple times a week", value: 94 },
      { label: "Weekly-ish", value: 76 },
      { label: "Once a month maybe", value: 42 },
      { label: "I text 'we should meet' and never do", value: 16, tag: "hermit" },
    ],
  },
  {
    id: "social_depth",
    category: "social",
    emoji: "🫂",
    text: "People you can call at 3am?",
    options: [
      { label: "3 or more", value: 95 },
      { label: "1–2", value: 76 },
      { label: "Maybe one, if they pick up", value: 45 },
      { label: "Zero, and I'm coping", value: 18 },
    ],
  },
  {
    id: "relationship",
    category: "relationships",
    emoji: "❤️",
    text: "Relationship status energy?",
    options: [
      { label: "Happy and secure", value: 94 },
      { label: "Single and genuinely fine", value: 78 },
      { label: "Complicated / situationship", value: 40, tag: "situationship" },
      { label: "Still checking their story at 2am", value: 20, tag: "haunted" },
    ],
  },
  {
    id: "family",
    category: "relationships",
    emoji: "🏠",
    text: "How connected do you feel to family?",
    options: [
      { label: "Very, we talk often", value: 92 },
      { label: "Decent, could be better", value: 70 },
      { label: "Distant but okay", value: 45 },
      { label: "Barely speaking", value: 20 },
    ],
  },
  {
    id: "mood",
    category: "wellbeing",
    emoji: "🧠",
    text: "How's your mental state most days?",
    options: [
      { label: "Calm and clear", value: 94 },
      { label: "Mostly fine, some noise", value: 72 },
      { label: "Stressed and tired", value: 38 },
      { label: "Running on anxiety fumes", value: 15 },
    ],
  },
  {
    id: "confidence",
    category: "wellbeing",
    emoji: "✨",
    text: "Confidence level, 0 to 100?",
    options: [
      { label: "Unshakeable", value: 95 },
      { label: "Solid most days", value: 74 },
      { label: "Depends who's in the room", value: 44 },
      { label: "Comparison is eating me alive", value: 18, tag: "comparer" },
    ],
  },
  {
    id: "goals",
    category: "growth",
    emoji: "🎯",
    text: "Do you have clear goals for this year?",
    options: [
      { label: "Written down with deadlines", value: 96 },
      { label: "Clear in my head", value: 72 },
      { label: "Vague vibes", value: 42 },
      { label: "Goal is to survive", value: 16 },
    ],
  },
  {
    id: "learning",
    category: "growth",
    emoji: "📚",
    text: "Learning something new lately?",
    options: [
      { label: "Yes, consistently", value: 94 },
      { label: "On and off", value: 68 },
      { label: "Bought a course, never opened it", value: 35, tag: "course-hoarder" },
      { label: "Nope", value: 16 },
    ],
  },
  {
    id: "habits",
    category: "growth",
    emoji: "🌱",
    text: "Your habit streak game?",
    options: [
      { label: "Multiple habits, 30+ days", value: 95 },
      { label: "One solid habit", value: 74 },
      { label: "Start Monday, quit Wednesday", value: 38 },
      { label: "What is a habit", value: 15 },
    ],
  },
];
