export type MoodType = 'Playful' | 'Serious' | 'Chaos Mode' | 'Overachiever' | 'Balanced';

export type CategorySlug = 
  | 'extracurriculars' 
  | 'leadership-roles' 
  | 'career-growth' 
  | 'volunteer-causes' 
  | 'skill-development' 
  | 'lifestyle';

export interface Category {
  slug: CategorySlug;
  title: string;
  description: string;
  icon: string;
}

export interface AppState {
  moods: MoodType[];
  categories: Record<CategorySlug, string[]>;
  magicNumber: number;
  selectedWords: Record<CategorySlug, string>;
  plan: string;
  setMoods: (moods: MoodType[]) => void;
  setCategoryItems: (slug: CategorySlug, items: string[]) => void;
  setMagicNumber: (num: number) => void;
  setSelectedWords: (words: Record<CategorySlug, string>) => void;
  setPlan: (plan: string) => void;
  resetApp: () => void;
}

export interface PlanRequest {
  categories: Record<string, string>;
  mood: string[];
}

export interface PlanResponse {
  plan: string;
  error?: string;
}
