# DevFolio — How to Run

## What it does
Enter any GitHub username and instantly generate a beautiful portfolio page showing:
- Profile info (bio, location, company, social links)
- Stats (repos, total stars, forks, languages used)
- Top repositories with search & sort
- Language breakdown chart
- Recently active repos
- Shareable URL at `/u/[username]`

---

## Prerequisites
- Node.js v18+
- That's it — no database, no auth, no API key required

---

## 1. Install Dependencies

```powershell
cd D:\Projects\devfolio
npm install
```

---

## 2. Run the App

```powershell
npm run dev
```

Open **http://localhost:3000**

---

## Optional: Add a GitHub Token (avoids rate limits)

The GitHub public API allows 60 requests/hour without a token. For development, add a token to get 5000 requests/hour:

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token (classic)"**
3. No scopes needed — just generate it
4. Create `.env.local`:

```env
GITHUB_TOKEN="ghp_your_token_here"
```

---

## How to Use

1. Type any GitHub username into the search box (e.g. `torvalds`, `gaearon`)
2. Or click one of the example profile buttons
3. Hit **Generate**
4. Share the URL — e.g. `http://localhost:3000/u/torvalds`

---

## Features

| Feature | Description |
|---------|-------------|
| 🎨 Dynamic hero | Avatar glow + accent bar matches top language color |
| 📊 Stats bar | Repos, stars, forks, languages at a glance |
| 🔍 Repo search | Filter by name or description |
| ↕️ Repo sort | Sort by stars, forks, or last updated |
| 🕐 Recently active | Repos pushed in the last 60 days |
| 📈 Language chart | Segmented bar with percentages |
| 🔗 Share button | Copies the portfolio URL to clipboard |
| ⚡ Loading skeleton | Smooth bone animation while fetching |
| 🚫 404 page | Clean not-found state for invalid usernames |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data | GitHub REST API (public) |
| Images | Next.js Image (optimized) |
| Icons | Lucide React |

---

## Folder Structure

```
devfolio/
├── app/
│   ├── u/[username]/
│   │   ├── page.tsx          # Portfolio page (server component)
│   │   ├── loading.tsx       # Skeleton loading state
│   │   └── not-found.tsx     # 404 for unknown users
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Home / search page
├── components/
│   ├── BackButton.tsx        # Back to home
│   ├── LanguageChart.tsx     # Language breakdown
│   ├── ProfileHero.tsx       # Avatar, bio, meta
│   ├── RecentActivity.tsx    # Recently pushed repos
│   ├── RepoGrid.tsx          # Searchable/sortable repo grid
│   ├── ShareButton.tsx       # Copy URL button
│   └── StatsBar.tsx          # Key stats row
└── lib/
    └── github.ts             # GitHub API fetcher + types
```
