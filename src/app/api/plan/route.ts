import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categories, mood, modifier } = body;

    if (!categories || !mood) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build the prompt
    const categoryList = Object.entries(categories)
      .map(([key, value]) => `- ${key}: ${value}`)
      .join('\n');

    const moodText = mood.join(', ');
    const modifierText = modifier ? `Make the plan ${modifier}.` : '';

    const prompt = `You are a life coach creating a personalized 6-month life redesign plan. The user selected these life goals through a playful MASH-style game:

${categoryList}

Their mood/vibe is: ${moodText}

${modifierText}

Create a comprehensive, actionable 6-month plan that incorporates ALL of these selections. Structure your response with these sections:

## Your AP Persona
(Create a creative 2-3 word label for their overachiever persona based on their selections)

## The Big Picture
(A 2-3 sentence summary connecting all their choices into a cohesive life vision)

## Month 1-2: Foundation
(Concrete steps to start each area)

## Month 3-4: Momentum
(How to build consistency and deepen engagement)

## Month 5-6: Integration
(How to make this sustainable long-term)

## Weekly Routine Suggestions
(A sample weekly schedule integrating all activities)

## Daily Rituals
(3-5 small daily practices that support their goals)

## Community & Resources
(Suggestions for finding local groups, online communities, or resources for each category. Be specific but acknowledge these are examples to inspire their own research)

Make it inspiring, practical, and fun. Match the tone to their mood selections.`;

    const response = await openai.responses.create({
      model: 'gpt-5-mini',
      input: [
        {
          role: 'system',
          content:
            'You are an enthusiastic life coach who creates actionable, inspiring plans with a playful tone.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_output_tokens: 5000,
    });

    const plan = response.output_text ?? 'Unable to generate plan';

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Error generating plan:', error);
    
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate plan. Please try again.' },
      { status: 500 }
    );
  }
}
