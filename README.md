Grammarly't 🎭

> *The grammar assistant that's always wrong, but never in doubt.*

A hilarious parody website inspired by Grammarly, featuring the same clean green + white aesthetic but with intentionally chaotic behavior, absurd suggestions, and playful chaos that makes you laugh (and maybe question your grammar choices).

🚀 How to Run

Option 1: Direct File
Simply open `index.html` in any modern browser.

Option 2: Local Server
Using Python
python -m http.server 8000

Then visit `http://localhost:8000`



✅ Currently Completed Features

🏠 Home Section (Landing)
- **Glitchy headline** that auto-changes every 3 seconds:
  - "Write better." → "Write bitter." → "Write... idk man." → and more
- **Escaping CTA button** that runs away when you hover (gives up after 5 attempts)
- **Stuck loading bar** that gets stuck at 99% forever (occasionally teases 99.9%)
- Clean Grammarly-style layout with green accents

✍️ Editor Section
- **Live grammar "checking"** with debounced input
- **Random red underlines** on perfectly fine words
- Wrong sentences sometimes marked as "Perfect!"
- Three chaos buttons:
  - **Make It Worse** - Applies transformations to ruin your text
  - **Gaslight Me** - Subtly changes your text and denies it
  - **Ignore All** - Clears everything with a sarcastic message
- Dynamic score display (completely meaningless)
- Suggestion panel with absurd recommendations

⭐ Why Us Section
- Unconvincing feature cards:
  - ❌ Accuracy
  - ❌ Reliability  
  - ✅ Confidence (highlighted)
- Animated stats counter:
  - 127% more wrong suggestions
  - 1 guy trusts us
  - 847M accidental users
  - 0 complaints resolved

💸 Premium Section
- Three pricing tiers:
  - **Free**: Ruins 1 sentence per day
  - **Pro**: Ruins unlimited sentences, faster
  - **Ultra Pro Max**: Personal insults included
- "Accidentally Subscribe" button with fake success responses

💬 Reviews Section
- Obviously fake testimonials
- Varied star ratings (1-5 stars)
- Humorous reviewer names and titles

🎯 Mock API Layer (Client-Side)
All "backend" functionality simulated with JavaScript:
- `GET /api/status` - Returns sassy status messages
- `POST /api/grammar` - The main chaos engine
- `POST /api/subscribe` - Fake subscription flow
- `GET /api/stats` - Returns funny statistics
- `makeWorse()` - Deliberately ruins text
- `gaslight()` - Psychological warfare mode

🎮 Easter Eggs
- **Konami Code** (↑↑↓↓←→←→BA) - Flips the screen upside down
- Random console messages for curious devs
- Occasional cursor changes after excessive mouse movement
