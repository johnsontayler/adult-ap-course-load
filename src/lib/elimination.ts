import { CategorySlug } from '@/types';

export interface EliminationStep {
  categorySlug: CategorySlug;
  item: string;
  index: number;
  eliminated: boolean;
}

export function runElimination(
  categories: Record<CategorySlug, string[]>,
  magicNumber: number
): {
  steps: EliminationStep[];
  selectedWords: Record<CategorySlug, string>;
} {
  // Flatten all items into a single array with metadata
  const allItems: EliminationStep[] = [];
  Object.entries(categories).forEach(([slug, items]) => {
    items.forEach((item) => {
      allItems.push({
        categorySlug: slug as CategorySlug,
        item,
        index: allItems.length,
        eliminated: false,
      });
    });
  });

  const steps: EliminationStep[] = [];
  let currentIndex = 0;
  let activeItems = [...allItems];

  // Continue eliminating until only one item per category remains
  while (true) {
    // Check if we have exactly one item per category
    const itemsPerCategory: Record<string, number> = {};
    activeItems.forEach((item) => {
      itemsPerCategory[item.categorySlug] = (itemsPerCategory[item.categorySlug] || 0) + 1;
    });

    const allCategoriesHaveOne = Object.values(itemsPerCategory).every((count) => count === 1);
    if (allCategoriesHaveOne) break;

    // Calculate next elimination index
    currentIndex = (currentIndex + magicNumber - 1) % activeItems.length;
    const eliminatedItem = activeItems[currentIndex];
    
    // Check if eliminating this would leave its category empty
    const categoryCount = activeItems.filter(
      (item) => item.categorySlug === eliminatedItem.categorySlug
    ).length;

    if (categoryCount > 1) {
      // Safe to eliminate
      eliminatedItem.eliminated = true;
      steps.push({ ...eliminatedItem });
      activeItems = activeItems.filter((_, idx) => idx !== currentIndex);
      
      // Adjust index if needed
      if (currentIndex >= activeItems.length && activeItems.length > 0) {
        currentIndex = 0;
      }
    } else {
      // Skip this item, move to next
      currentIndex = (currentIndex + 1) % activeItems.length;
    }

    // Safety check to prevent infinite loops
    if (steps.length > 1000) break;
  }

  // Build final selectedWords object
  const selectedWords: Record<CategorySlug, string> = {} as Record<CategorySlug, string>;
  activeItems.forEach((item) => {
    selectedWords[item.categorySlug] = item.item;
  });

  return { steps, selectedWords };
}
