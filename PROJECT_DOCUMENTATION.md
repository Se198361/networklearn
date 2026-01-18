# NetWorkLearn - Project Documentation

## 📖 Overview
NetWorkLearn is a comprehensive 65-level educational game that teaches computer networking concepts from absolute basics to advanced security topics. The game features a cyber/tech theme with neon colors, interactive activities, and instant audio/visual feedback.

---

## 🚀 How to Run This Project

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or bun package manager

### Installation Steps
1. Clone or download the project
2. Open terminal in the project directory
3. Run `npm install` or `bun install` to install dependencies
4. Run `npm run dev` or `bun dev` to start the development server
5. Open `http://localhost:5173` in your browser

### Build for Production
- Run `npm run build` to create a production build
- The output will be in the `dist` folder

---

## 📁 Project Structure & File Descriptions

### Root Files
| File | Description |
|------|-------------|
| `index.html` | Main HTML entry point with meta tags and SEO configuration |
| `vite.config.ts` | Vite bundler configuration |
| `tailwind.config.ts` | Tailwind CSS configuration with custom cyber theme colors |
| `tsconfig.json` | TypeScript compiler configuration |

### Source Files (`src/`)

#### Main Entry Files
| File | Description |
|------|-------------|
| `main.tsx` | Application entry point, renders App component to DOM |
| `App.tsx` | Root component with routing setup (React Router) |
| `App.css` | Global CSS styles (minimal, most styles in index.css) |
| `index.css` | Main stylesheet with CSS variables, animations, and cyber theme |

#### Pages (`src/pages/`)
| File | Description |
|------|-------------|
| `Index.tsx` | Landing page with hero section, features, and start game button |
| `Game.tsx` | Main game page managing sections, levels, and gameplay views |
| `NotFound.tsx` | 404 error page for invalid routes |

#### Game Components (`src/components/game/`)
| File | Description |
|------|-------------|
| `LevelCard.tsx` | Displays individual level with lock/complete status and click handling |
| `SectionCard.tsx` | Displays course section with progress bar and badge info |
| `LevelGame.tsx` | Main gameplay component with explanations, questions, and answer feedback |
| `ProgressHeader.tsx` | Top navigation bar showing score, progress, and badge count |
| `BadgeDisplay.tsx` | Grid display of all earnable badges (locked/unlocked states) |

#### Shared Components (`src/components/`)
| File | Description |
|------|-------------|
| `CircuitBackground.tsx` | Animated canvas background with circuit node animations |
| `NavLink.tsx` | Reusable navigation link component |

#### Data Files (`src/data/`)
| File | Description |
|------|-------------|
| `levels.ts` | All 65 levels data with questions, answers, sections, and badge definitions |

#### Hooks (`src/hooks/`)
| File | Description |
|------|-------------|
| `useGameProgress.ts` | Manages game state (completed levels, score, badges) in localStorage |
| `useSoundEffects.ts` | Web Audio API hook for playing game sounds (correct, incorrect, complete) |
| `use-toast.ts` | Toast notification hook (from shadcn/ui) |
| `use-mobile.tsx` | Mobile detection hook |

#### Utilities (`src/lib/`)
| File | Description |
|------|-------------|
| `utils.ts` | Utility functions (cn for className merging) |

#### UI Components (`src/components/ui/`)
Pre-built shadcn/ui components (buttons, cards, dialogs, etc.)

---

## 🎮 Game Features

### Progression System
- **65 Levels** across 6 sections
- **Local Storage** saves progress automatically (no login required)
- **Sequential Unlocking** - complete one level to unlock the next
- **Section Locking** - complete all levels in a section to unlock the next section

### Sections
1. **OSI Model Foundations** (Levels 1-10) - Badge: "OSI Master"
2. **TCP/IP Model** (Levels 11-18) - Badge: "TCP/IP Expert"
3. **IP Addressing** (Levels 19-28) - Badge: "IP Guru"
4. **Network Devices** (Levels 29-42) - Badge: "Hardware Hero"
5. **Core Protocols** (Levels 43-55) - Badge: "Protocol Pro"
6. **Network Attacks** (Levels 56-65) - Badge: "Security Champion"
7. **Grand Master** - Awarded for completing all 65 levels

### Sound Effects
- **Click** - Button interactions
- **Correct** - Right answer (ascending happy tone)
- **Incorrect** - Wrong answer (descending sad tone)
- **Complete** - Level completion (victory fanfare)
- **Unlock** - Badge/section unlock

---

## 🎨 Design System

### Color Palette (CSS Variables in `index.css`)
- **Primary Cyan**: `--neon-cyan: 180 100% 47%`
- **Magenta**: `--neon-magenta: 300 100% 50%`
- **Green**: `--neon-green: 120 100% 50%`
- **Yellow**: `--neon-yellow: 54 100% 50%`
- **Orange**: `--neon-orange: 30 100% 50%`
- **Purple**: `--neon-purple: 270 100% 60%`

### Typography
- **Monospace**: Used for technical terms, level numbers, scores
- **Sans-serif**: Used for body text and headings

### Animations (defined in `index.css`)
- `fade-in` - Opacity fade
- `slide-up` - Slide from bottom
- `scale-in` - Pop-in scale effect
- `glow-pulse` - Neon glow pulse

---

## 📊 Data Flow

```
User Action (click level) 
    → Game.tsx updates state 
    → LevelGame.tsx renders 
    → User answers question 
    → useSoundEffects plays audio 
    → useGameProgress saves to localStorage 
    → UI updates with new progress
```

---

## 🔧 Adding New Levels

1. Open `src/data/levels.ts`
2. Add new level object to the `levels` array:
```typescript
{
  id: 66,                          // Unique level ID
  title: "New Topic Title",        // Level display name
  section: 6,                      // Section number (1-6)
  sectionName: "Network Attacks",  // Section display name
  explanation: [                   // 3 bullet points explaining concept
    "First key point...",
    "Second key point...",
    "Third key point..."
  ],
  question: {
    id: "66-1",
    question: "Question text?",
    options: ["A", "B", "C", "D"],  // 4 answer options
    correctAnswer: 0,               // Index of correct answer (0-3)
    type: "multiple-choice"
  },
  studentsCompleted: 5000          // Display count
}
```
3. Update section's `levels` array if adding to existing section

---

## 🧪 Testing

Run tests with: `npm run test`

---

## 📝 Notes

- All styles use Tailwind CSS with custom theme extensions
- Components are React functional components with TypeScript
- State is managed locally (no external state library)
- Progress persists via browser localStorage under key `networklearn_progress`
