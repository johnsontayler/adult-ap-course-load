'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES } from '@/lib/constants';
import EditorialTitle from '@/components/EditorialTitle';

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
    <div className="min-h-screen p-6 md:p-12 pt-32 md:pt-40">
      {/* Navigation Element */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-white border-b border-black">
        <div className="font-mono text-sm tracking-widest uppercase">
          The Adult AP / Chapter 2
        </div>
        <div className="font-mono text-xs md:text-sm">
          [ 002 / 005 ]
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-l-2 border-black pl-6"
        >
          <div className="mb-8">
            <EditorialTitle 
              title={`CONSTRUCT\nYOUR COURSE\nLOAD`}
              highlightColor="bg-report-pink"
            />
          </div>
          <p className="font-mono text-sm uppercase tracking-widest text-gray-500">
            Minimum 3 inputs required per category sector.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black border border-black mb-16">
          {CATEGORIES.map((category, index) => {
            const itemCount = categories[category.slug]?.length || 0;
            const isFilled = itemCount >= 3;

            return (
              <motion.button
                key={category.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCategoryClick(category.slug)}
                className={`relative p-8 md:p-12 text-left bg-white group hover:bg-gray-50 transition-colors
                  ${isFilled ? 'bg-report-blue/10' : ''}
                `}
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1} / SECTOR
                  </span>
                  <div className={`font-mono text-xs px-2 py-1 border border-black uppercase
                    ${isFilled ? 'bg-black text-white' : 'text-gray-400 border-gray-200'}
                  `}>
                    {isFilled ? 'Complete' : 'Pending'}
                  </div>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl mb-4 group-hover:text-report-blue transition-colors">
                  {category.title}
                </h3>
                <p className="font-mono text-xs text-gray-500 mb-6 max-w-sm leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center gap-4 font-mono text-xs">
                  <span className={`${isFilled ? 'text-black' : 'text-report-coral'}`}>
                    [{itemCount}] Items Logged
                  </span>
                  {!isFilled && (
                    <span className="text-gray-300">
                      // Min. 3 Required
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Continue Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-end"
        >
          <button
            onClick={handleContinue}
            disabled={!allCategoriesFilled}
            className={`group relative px-8 py-4 overflow-hidden font-mono text-sm uppercase tracking-widest transition-colors duration-300
              ${!allCategoriesFilled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-report-pink hover:text-black'
              }
            `}
          >
            <span className="relative z-10">
              {allCategoriesFilled ? 'Initialize Simulation →' : 'Awaiting Data Input'}
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
