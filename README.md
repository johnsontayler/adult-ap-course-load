# The Adult AP Course Load

PROTOTYPE

A playful life-planning tool inspired by the MASH game. 

Built with Next.js 14, TypeScript, TailwindCSS, and Framer Motion.

Feel free to contribute if you find this fun and useful!

<img width="1426" height="702" alt="Screenshot 2025-11-24 at 1 09 38 PM" src="https://github.com/user-attachments/assets/7c7edfc2-3c67-4289-9c71-4f4aa9bcd69b" />



## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables:
```bash
cp .env.local.example .env.local
```
Add your OpenAI API key to `.env.local`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Interactive MASH-style life planning game
- Six life categories: Extracurriculars, Leadership Roles, Career Growth, Volunteer Causes, Skill Development, and Lifestyle
- Spiral animation to generate your "magic number"
- AI-powered 6-month life redesign plan using OpenAI
- Beautiful animations and playful high school AP aesthetic

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **AI**: OpenAI GPT-5

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable React components
├── store/           # Zustand state management
├── lib/             # Utility functions
└── types/           # TypeScript type definitions
```
