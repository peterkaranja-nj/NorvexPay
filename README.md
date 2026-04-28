# NorvexPay — Frontend Simulation

A complete Next.js 14 + TypeScript + Tailwind CSS implementation of the NorvexPay payment infrastructure platform.

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS 3**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Getting Started

```bash
cd norvexpay

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages
| Route | Description |
|-------|-------------|
| `/` | Landing page (all 12 sections) |
| `/signin` | Sign in with mock auth |
| `/signup` | Multi-step signup (5 steps) |
| `/dashboard` | Overview with KPI cards + charts |
| `/dashboard/transactions` | Filterable + sortable transactions table |
| `/dashboard/analytics` | Charts: donut, bar, heatmap, funnel |
| `/dashboard/payment-links` | Create & manage payment links |
| `/dashboard/settings` | Business profile, team, security tabs |

## Design System
- **Fonts:** Plus Jakarta Sans (display), Instrument Serif (italic), JetBrains Mono (code)
- **Theme:** Light/Dark toggle via CSS variables
- **All data:** Simulated — no backend required

## Features Implemented
-  Page preloader with SVG animation
-  Custom cursor (dot + ring, desktop only)
-  Scroll progress bar
-  Mega-menu navigation with dropdowns
-  Hero with canvas particle system + live transaction feed
-  Trust bar with infinite marquee
-  Bento grid (7 animated cells: FX ticker, fraud gauge, webhook stream, card issuing 3D, uptime bars, world map, settlement chart)
-  Developer code playground (6 languages + sandbox simulation)
-  Solutions accordion with preview panel
-  Concentric security rings diagram
-  Animated metrics counters
-  Testimonials carousel with metrics
-  Pricing with interactive fee calculator
-  Multi-step signup with OTP input + confetti
-  Dashboard with drawer, charts, tables, sidebar
-  Toast notifications, skeleton states, error boundaries
-  Light/Dark mode toggle
-  `prefers-reduced-motion` respected
