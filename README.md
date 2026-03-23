# TicTacMind AI

A web-based Tic-Tac-Toe game with a dark neon aesthetic where you can challenge an unbeatable AI or play against a friend locally. The AI is powered by the **Minimax algorithm** — it evaluates every possible game state and always plays optimally.

**Live demo:** [tictacmindai.netlify.app](https://tictacmindai.netlify.app)

---

## Features

- **vs AI mode** — play against the Minimax AI with three difficulty levels
- **vs Player mode** — local two-player mode on the same device
- **Difficulty levels**
  - Easy — AI plays completely randomly
  - Medium — AI plays optimally 70% of the time, randomly 30%
  - Hard — full unbeatable Minimax (never loses)
- **Play as X or O** — choose your mark; X always goes first
- **Score tracking** — persists across rounds until manually reset
- **Responsive layout** — fits any screen size without scrolling
- **PWA ready** — installable on mobile and desktop with offline support
- **Dark neon theme** — `#0d1117` background, neon purple `#a855f7` and cyan `#22d3ee` accents

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| UI primitives | Radix UI / shadcn/ui |
| Routing | React Router DOM |
| PWA | Web App Manifest + Service Worker |

---

## Project Structure

```
TicTacMindAI/
├── public/
│   ├── favicon.svg          # Neon X + O overlayed SVG favicon
│   ├── manifest.json        # PWA manifest
│   └── sw.js                # Service worker (cache-first)
├── src/
│   ├── components/
│   │   └── game/
│   │       ├── Board.jsx    # 3x3 grid container
│   │       ├── Cell.jsx     # Individual cell with neon X/O icons
│   │       ├── GameSettings.jsx  # Restart, Settings panel
│   │       ├── ScoreBoard.jsx    # YOU/DRAW/AI or PLAYER X/O scores
│   │       └── StatusBar.jsx     # Turn/result status text
│   ├── lib/
│   │   └── gameEngine.js    # Minimax algorithm + difficulty logic
│   ├── pages/
│   │   └── Game.jsx         # Main game page with all state
│   ├── main.jsx
│   └── index.css            # Dark neon CSS variables + utilities
├── index.html               # SEO meta tags, PWA, JSON-LD schema
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## How the AI Works

The AI uses the **Minimax algorithm** — a recursive decision-making algorithm from game theory.

For every empty cell, the AI simulates placing its mark and recursively evaluates all possible future game states. It assigns scores:
- `+10 - depth` for AI wins (prefers faster wins)
- `depth - 10` for human wins (prefers slower losses)
- `0` for draws

The AI always picks the move with the highest score, making it **mathematically unbeatable** on Hard difficulty — the best outcome a human can achieve is a draw.

```
getBestMove(board, difficulty, aiMark, humanMark)
  ├── easy   → random move
  ├── medium → 30% random, 70% minimax
  └── hard   → full minimax (optimal every time)
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Clone the repo
git clone https://github.com/anointedthedeveloper/tictacmindai.git
cd tictacmindai

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

The project is configured for static hosting. Deploy the `dist/` folder to any static host:

- **Netlify** — connect repo, build command `npm run build`, publish dir `dist`
- **Vercel** — same settings, auto-detected as Vite project
- **GitHub Pages** — set `base` in `vite.config.js` to your repo name

---

## License

MIT — free to use, modify, and distribute.

---

Developed by [anointedthedeveloper](https://github.com/anointedthedeveloper)
