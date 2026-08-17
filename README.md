# Life Score

Build a polished, mobile-first app called Rate My Life — an AI-powered social self-assessment app for Gen-Z and college students.

CORE FLOW:
User answers 15–20 fun questions about age, education/work, money, sleep, exercise, screen time, productivity, social life, relationships, career satisfaction, confidence, goals and habits.

Then generate a Life Score out of 100 with these categories:
💰 Money
🎓 Career/Education
❤️ Relationships
👥 Social Life
💪 Health
🧠 Wellbeing
⏰ Productivity
🌱 Personal Growth

Show an animated score reveal such as:
YOUR LIFE SCORE: 67/100

Give a short positive interpretation based on the score.

Create an AI Verdict containing:

Biggest strength

Biggest weakness

Biggest opportunity

One surprising observation

One practical recommendation

Also generate a funny “Brutally Honest AI Roast” based only on the user's answers. Keep it playful, never offensive or harmful.

Create a beautiful shareable score card optimized for Instagram Stories/WhatsApp showing the score, category scores and a short AI quote. Add Share My Score and Copy Share Text buttons to encourage viral growth.

Add Fix My Life: generate a personalized 30-day improvement plan based on the user's 2–3 weakest categories, with daily/weekly tasks that users can check off.

Add a progress dashboard showing previous scores and improvement, e.g. 63 → 67 (+4).

Add a basic social feature where users can invite friends, compare scores and create “Life Battles” based on who improves their score the most.

Add Rate My Friend, where users can send a private link for friends to answer fun questions about them. Keep feedback private and provide deletion controls.

DESIGN:
Dark-mode-first, premium, modern Gen-Z aesthetic. Large typography, rounded cards, subtle gradients, smooth animations and excellent mobile UX. The score/result screen should be highly screenshot-worthy. Avoid a generic corporate dashboard.

NAVIGATION:
Home | My Score | Challenges | Friends | Profile

MONETIZATION:
Freemium model. Free users get one assessment and basic results. Premium “Rate My Life PRO” can offer unlimited assessments, deeper AI analysis, advanced progress tracking and personalized plans. Use placeholder pricing of ₹99/month and ₹499/year. Payment can remain mocked for the MVP.

TECH:
Use React/Next.js + TypeScript + Tailwind if supported. Use Supabase for authentication/database if available. Keep API keys server-side. If a real AI API isn't available, use realistic mock AI responses.

IMPORTANT:
Build the MVP first: landing page → questionnaire → scoring → results → AI verdict/roast → share card → 30-day plan. Make the experience addictive, fast and highly shareable. Do not overbuild before the core flow works.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://score-your-vibe.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/19f2bf1b-0866-4a7e-a1f6-9c482284acd3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
