'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES } from '@/lib/constants';
import { CheckCircle2, Circle } from 'lucide-react';

export default function CategoriesPage() {
  const router = useRouter();
  const { categories } = useAppStore();

  const allCategoriesFilled = CATEGORIES.every(
    (cat) => categories[cat.slug] && categories[cat.slug].length >= 3
  );

  const handleCategoryClick = (slug: string) => {
    router.push(`/categories/${slug}`);
  };

  const handleContinue = () => {
    if (allCategoriesFilled) {
      router.push('/game');
    }
  };

  return (
    <div className="min-h-screen paper-texture p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Build Your <span className="highlighter-pink">Course Load</span>
          </h1>
          <p className="text-xl text-gray-600">
            Add 3-5 options for each category. The game will choose for you.
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {CATEGORIES.map((category, index) => {
            const itemCount = categories[category.slug]?.length || 0;
            const isFilled = itemCount >= 3;

            return (
              <motion.button
                key={category.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleCategoryClick(category.slug)}
                className="bg-white rounded-2xl border-3 border-gray-300 hover:border-gray-900 transition-all p-6 text-left shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{category.icon}</div>
                  {isFilled ? (
                    <CheckCircle2 className="text-green-600" size={24} />
                  ) : (
                    <Circle className="text-gray-300" size={24} />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${isFilled ? 'text-green-600' : 'text-gray-400'}`}>
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} added
                  </span>
                  {!isFilled && (
                    <span className="text-xs text-gray-400">
                      (min 3 required)
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={handleContinue}
            disabled={!allCategoriesFilled}
            className={`px-12 py-4 rounded-full text-lg font-semibold transition-all ${
              !allCategoriesFilled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
            }`}
          >
            {allCategoriesFilled
              ? 'Continue to Game →'
              : 'Fill all categories to continue'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
