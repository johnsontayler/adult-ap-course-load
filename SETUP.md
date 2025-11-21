# Setup Guide - The Adult AP Course Load

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-key-here
```

**Get your OpenAI API key:**
- Sign up at https://platform.openai.com
- Navigate to API Keys section
- Create a new secret key

### 3. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Project Structure

```
adult-ap-course-load/
├── src/
│   ├── app/                    # Next.js 14 App Router pages
│   │   ├── page.tsx           # Splash screen (/)
│   │   ├── onboarding/        # Mood selection
│   │   ├── categories/        # Category dashboard & inputs
│   │   ├── game/              # Spiral animation
│   │   ├── elimination/       # MASH elimination
│   │   ├── results/           # Final selections
│   │   ├── plan/              # AI-generated plan
│   │   ├── share/             # Share poster
│   │   ├── api/plan/          # OpenAI API route
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── SpiralAnimation.tsx
│   │   └── Confetti.tsx
│   ├── store/                 # Zustand state management
│   │   └── useAppStore.ts
│   ├── lib/                   # Utility functions
│   │   ├── constants.ts       # App constants
│   │   └── elimination.ts     # Elimination algorithm
│   └── types/                 # TypeScript types
│       └── index.ts
├── public/                    # Static assets
└── [config files]
```

---

## Key Features Implemented

### ✅ Complete User Flow
1. **Splash Screen** - Animated landing page
2. **Onboarding** - Multi-select mood cards
3. **Categories** - 6 life categories with progress tracking
4. **Category Input** - Add 3-5 items per category with AI suggestions
5. **Spiral Game** - Interactive canvas animation to generate magic number
6. **Elimination** - MASH-style counting elimination with animations
7. **Results** - Display final selections with confetti
8. **AI Plan** - OpenAI-powered 6-month life redesign plan
9. **Share** - Beautiful poster-style share screen

### ✅ Technical Implementation
- **Next.js 14 App Router** - Modern React framework
- **TypeScript** - Type safety throughout
- **Zustand** - Lightweight state management with localStorage persistence
- **Framer Motion** - Smooth animations and transitions
- **TailwindCSS** - Utility-first styling with custom design system
- **OpenAI Integration** - GPT-4 for personalized plan generation
- **Responsive Design** - Works on mobile, tablet, and desktop

### ✅ Design System
- **Colors**: Neon yellow (#FFEE58), pink (#FF79C6), blue (#7AD7F0)
- **Typography**: Inter font family
- **Aesthetic**: Playful high school AP / notebook theme
- **Animations**: Smooth transitions, confetti, spiral, strikethroughs

---

## How to Use the App

1. **Start**: Welcome screen with playful messaging
2. **Choose Your Vibe**: Select mood(s) - Playful, Serious, Chaos Mode, etc.
3. **Fill Categories**: Add 3-5 options for each of 6 life categories
   - Use "Add AI Suggestion" for inspiration
4. **Play the Game**: Tap the spiral animation to generate your magic number
5. **Watch Elimination**: Items are crossed out MASH-style
6. **See Results**: Your fate is revealed with celebration
7. **Generate Plan**: AI creates a personalized 6-month roadmap
8. **Share**: Download or share your course load

---

## Customization Options

### Change AI Model
In `src/app/api/plan/route.ts`, line 67:
```typescript
model: 'gpt-5-mini', // Change to preferred model
```

### Add More Categories
Edit `src/lib/constants.ts`:
- Add to `CATEGORIES` array
- Add AI suggestions to `AI_SUGGESTIONS`
- Update types in `src/types/index.ts`

### Modify Color Scheme
Edit `tailwind.config.ts`:
```typescript
colors: {
  neon: {
    yellow: "#FFEE58",  // Change these
    pink: "#FF79C6",
    blue: "#7AD7F0",
  }
}
```

---

## Troubleshooting

### OpenAI API Errors
- **"API key not configured"**: Add `OPENAI_API_KEY` to `.env.local`
- **Rate limit errors**: Wait a moment or upgrade OpenAI plan
- **Model not found**: Change model name in API route

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

---

## Next Steps / Future Enhancements

- **Design**: Update designs and functionality
- **Image Generation**: Create downloadable poster images with Canvas API
- **Social Sharing**: Real social media card previews
- **Email Plans**: Send plan as formatted email
- **Print Version**: PDF export with nice formatting

---

## Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript 5.4.5
- **Styling**: TailwindCSS 4.1.17
- **Animation**: Framer Motion 11.2.10
- **State**: Zustand 4.5.2
- **AI**: OpenAI API (GPT-5)
- **Icons**: Lucide React 0.554.0

---

## Support

For issues or questions:
1. Check this guide
2. Review code comments
3. Check Next.js docs: https://nextjs.org/docs
4. Check OpenAI docs: https://platform.openai.com/docs

---

## License

This is a demonstration project. Feel free to use and modify for your own purposes.
