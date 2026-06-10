# DevFolio

A zero-setup GitHub portfolio generator. Enter any GitHub username and get a beautiful, shareable portfolio page — no database, no authentication, no API key required.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)
![GitHub API](https://img.shields.io/badge/GitHub-Public_API-181717?logo=github&logoColor=white)

## Features

- **Instant Portfolios** — generate a polished profile page for any GitHub username in seconds
- **Dynamic Accent Color** — hero glow and UI accents match the color of your top programming language
- **Repository Grid** — searchable, sortable by stars, forks, or last updated
- **Language Breakdown** — segmented bar chart with percentage breakdown across all repos
- **Recently Active Repos** — highlights repositories pushed to in the last 60 days
- **Stats Overview** — total repos, stars, forks, and languages at a glance
- **Shareable URLs** — every portfolio lives at `/u/[username]`
- **Share Button** — copies the portfolio URL to clipboard in one click
- **Loading Skeletons** — smooth loading states while fetching data
- **404 Handling** — graceful error page for invalid or non-existent usernames
- **Zero Config** — uses the public GitHub API; no credentials needed to get started

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Data | GitHub REST API (public) |
| Images | Next.js Image Optimization |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
git clone https://github.com/yourusername/devfolio.git
cd devfolio
npm install
```

### Environment Variables (Optional)

A GitHub token is not required but increases the API rate limit from 60 to 5,000 requests/hour.

```env
GITHUB_TOKEN=your_github_pat
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), enter a GitHub username, and explore.

## Project Structure

```
├── app/
│   ├── page.tsx                      # Home / username search
│   └── u/[username]/
│       ├── page.tsx                  # Portfolio page (SSR)
│       ├── loading.tsx               # Skeleton state
│       └── not-found.tsx             # 404 page
├── components/
│   ├── ProfileHero.tsx               # Avatar, bio, social links
│   ├── RepoGrid.tsx                  # Searchable repo list
│   ├── LanguageChart.tsx             # Segmented language bar
│   └── ShareButton.tsx              # Copy URL button
└── lib/github.ts                     # GitHub API fetcher
```

## License

MIT
