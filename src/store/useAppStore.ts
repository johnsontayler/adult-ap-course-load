import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, CategorySlug, MoodType } from '@/types';

const initialCategories: Record<CategorySlug, string[]> = {
  'extracurriculars': [],
  'leadership-roles': [],
  'career-growth': [],
  'volunteer-causes': [],
  'skill-development': [],
  'lifestyle': [],
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      moods: [],
      categories: initialCategories,
      magicNumber: 0,
      selectedWords: {} as Record<CategorySlug, string>,
      plan: '',
      
      setMoods: (moods: MoodType[]) => set({ moods }),
      
      setCategoryItems: (slug: CategorySlug, items: string[]) => 
        set((state) => ({
          categories: {
            ...state.categories,
            [slug]: items,
          },
        })),
      
      setMagicNumber: (num: number) => set({ magicNumber: num }),
      
      setSelectedWords: (words: Record<CategorySlug, string>) => 
        set({ selectedWords: words }),
      
      setPlan: (plan: string) => set({ plan }),
      
      resetApp: () => 
        set({
          moods: [],
          categories: initialCategories,
          magicNumber: 0,
          selectedWords: {} as Record<CategorySlug, string>,
          plan: '',
        }),
    }),
    {
      name: 'adult-ap-storage',
    }
  )
);
