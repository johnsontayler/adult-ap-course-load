import { Category, MoodType } from '@/types';

export const MOODS: { value: MoodType; emoji: string; description: string }[] = [
  { value: 'Playful', emoji: '🎨', description: 'Keep it fun and creative' },
  { value: 'Serious', emoji: '🎯', description: 'Goal-oriented and focused' },
  { value: 'Chaos Mode', emoji: '🌪️', description: 'Embrace the unpredictable' },
  { value: 'Overachiever', emoji: '⭐', description: 'All-in, maximum effort' },
  { value: 'Balanced', emoji: '⚖️', description: 'Sustainable and steady' },
];

export const CATEGORIES: Category[] = [
  {
    slug: 'extracurriculars',
    title: 'Extracurricular',
    description: 'Hobbies, creative pursuits, fun activities',
    icon: '🎭',
  },
  {
    slug: 'leadership-roles',
    title: 'Leadership Role',
    description: 'Ways to lead, organize, or mentor others',
    icon: '👥',
  },
  {
    slug: 'career-growth',
    title: 'Career Growth',
    description: 'Professional development and goals',
    icon: '💼',
  },
  {
    slug: 'volunteer-causes',
    title: 'Volunteer Cause',
    description: 'Ways to give back to your community',
    icon: '❤️',
  },
  {
    slug: 'skill-development',
    title: 'Skill Development',
    description: 'New skills or knowledge to acquire',
    icon: '📚',
  },
  {
    slug: 'lifestyle',
    title: 'Lifestyle',
    description: 'Daily habits and wellness practices',
    icon: '🌱',
  },
];

export const AI_SUGGESTIONS: Record<string, string[]> = {
  'extracurriculars': ['Pottery', 'Rock climbing', 'Book club', 'Photography', 'Improv comedy'],
  'leadership-roles': ['Host a meetup', 'Mentor someone', 'Start a newsletter', 'Lead a workshop', 'Organize community events'],
  'career-growth': ['Build a side project', 'Learn a new framework', 'Speak at a conference', 'Write technical articles', 'Get a certification'],
  'volunteer-causes': ['Teach coding to kids', 'Community garden', 'Animal shelter', 'Food bank', 'Environmental cleanup'],
  'skill-development': ['Learn Spanish', 'Study design', 'Practice public speaking', 'Master a new language', 'Learn video editing'],
  'lifestyle': ['Morning meditation', 'Meal prep Sundays', 'Digital detox evenings', 'Weekly nature walks', 'Regular sleep schedule'],
};
