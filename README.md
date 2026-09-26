# 🏋️ FitLog — Workout Library & Daily Plan Tracker

FitLog is a dark, no-nonsense gym companion and workout library built for focused athletes. Pick a lift, lock it into today's plan, track exercises, duration, and calories burned, and watch the week's work add up.

---

## 🛠️ Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom dark design tokens
- **Typography**: [Oswald & Geist Sans/Mono](https://fonts.google.com/) via `next/font`
- **Icons & Graphics**: Custom lightweight SVG icons + curated fitness visual assets
- **Language**: TypeScript (strict type safety)

---

## ✨ Key Features

1. **Interactive Workout Library & 3x4 Grid**  
   Fetches comprehensive lift data from the FitLog API with loading spinners and error handling, displaying workouts in a responsive multi-column layout with category tags, equipment, duration, calories, and ratings.

2. **Real-Time Workout Sorting**  
   Dynamic sort dropdown allowing instant re-ordering of exercises by **Duration**, **Calories Burned**, or **Rating** (with active chevron indicator and highlighted states).

3. **In-Depth Workout Details View**  
   Dedicated dynamic routes (`/workout/:id`) showcasing high-res media, detailed descriptions, muscle group tags, structured key specs (Equipment, Difficulty, Sets, Reps, Duration, Calories, Rating), and 4-step execution instructions.

4. **Live Daily Plan & Saved Workouts Tracker (`/my-plan`)**  
   Tabbed interface switching between *Today's Plan* and *Saved* workouts, featuring real-time calculated metrics for total **Exercises**, cumulative **Minutes**, and **Calories Burned**.

5. **Toast Notifications & Interactive Actions**  
   Instant feedback toasts for adding lifts to the daily plan, bookmarking for later, marking exercises as completed, and removing items from the list.

6. **Responsive Navigation with Live Badges**  
   Sticky navigation bar featuring brand identity, active link tracking, mobile drawer menu, and live synchronized badge counters for active plan and saved lists.

7. **Custom 404 Error Page & Fallbacks**  
   Branded 404 page for unknown routes and graceful error fallbacks with quick-access return buttons to the workout library.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📬 Submission

- **Live Link**: 
- **GitHub Repository Link**: 
