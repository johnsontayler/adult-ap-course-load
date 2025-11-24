'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES, INPUT_SUGGESTIONS } from '@/lib/constants';
import { CategorySlug } from '@/types';
import { X, Sparkles, ArrowLeft } from 'lucide-react';

export default function CategoryInputPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as CategorySlug;
  
  const { categories, setCategoryItems } = useAppStore();
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const category = CATEGORIES.find((c) => c.slug === slug);

  useEffect(() => {
    if (categories[slug]) {
      setItems(categories[slug]);
    }
  }, [slug, categories]);

  const handleAddItem = () => {
    if (inputValue.trim() && items.length < 5) {
      setItems([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleAddSuggestion = () => {
    const suggestions = INPUT_SUGGESTIONS[slug] || [];
    const availableSuggestions = suggestions.filter((s) => !items.includes(s));
    
    if (availableSuggestions.length > 0 && items.length < 5) {
      const randomSuggestion = availableSuggestions[
        Math.floor(Math.random() * availableSuggestions.length)
      ];
      setItems([...items, randomSuggestion]);
    }
  };

  const handleSave = () => {
    setCategoryItems(slug, items);
    router.push('/categories');
  };

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      {/* Navigation Element */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-white border-b border-black">
        <div className="font-mono text-sm tracking-widest uppercase">
          <Link href="/" className="hover:text-report-coral transition-colors">The Adult AP Course Load</Link> / Input
        </div>
        <div className="font-mono text-xs md:text-sm">
          [ DATA ENTRY ]
        </div>
      </div>

      <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto pt-20 md:pt-24 pb-6 px-6 md:px-12 h-full">
        {/* Header Section */}
        <div className="flex-none">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => router.push('/categories')}
            className="flex items-center gap-2 text-gray-500 hover:text-black mb-4 md:mb-8 font-mono text-sm uppercase tracking-widest group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Categories</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <div className="text-4xl md:text-5xl mb-2 md:mb-4">{category.icon}</div>
              <h1 className="font-serif text-4xl md:text-6xl text-black">
                {category.title}
              </h1>
            </div>
            <p className="font-mono text-gray-500 text-xs md:text-sm leading-relaxed border-l border-black pl-4 max-w-sm pb-2">
              {category.description}
            </p>
          </motion.div>
        </div>

        {/* Content Area - Flex-1 to fill space */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-none mb-4 md:mb-8"
          >
            <div className="flex gap-0 mb-3 md:mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                placeholder={`Enter ${category.title.toLowerCase()} variable...`}
                disabled={items.length >= 5}
                className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-b-2 border-gray-300 focus:border-black focus:outline-none text-base md:text-lg font-serif placeholder:font-sans placeholder:text-gray-400 disabled:bg-gray-100 transition-colors rounded-none"
              />
              <button
                onClick={handleAddItem}
                disabled={!inputValue.trim() || items.length >= 5}
                className="px-6 md:px-8 py-3 md:py-4 bg-black text-white hover:bg-report-blue hover:text-black disabled:bg-gray-200 disabled:text-gray-400 transition-colors font-mono uppercase tracking-widest text-xs md:text-sm"
              >
                Add
              </button>
            </div>

            <button
              onClick={handleAddSuggestion}
              disabled={items.length >= 5}
              className="flex items-center gap-2 text-gray-500 hover:text-report-blue font-mono text-[10px] md:text-xs uppercase tracking-widest disabled:text-gray-300 transition-colors"
            >
              <Sparkles size={14} />
              Generate Suggestion
            </button>
          </motion.div>

          {/* Items List - Scrollable if needed */}
          <div className="flex-1 overflow-y-auto min-h-0 border-t border-black mb-4 md:mb-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center justify-between bg-white px-4 md:px-6 py-3 md:py-5 border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <span className="font-mono text-[10px] md:text-xs text-gray-400">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <span className="text-lg md:text-xl font-serif">{item}</span>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-gray-300 hover:text-red-500 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
                >
                  <X size={18} />
                </button>
              </motion.div>
            ))}
            
            {/* Empty Slots */}
            {Array.from({ length: Math.max(0, 5 - items.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="px-4 md:px-6 py-3 md:py-5 border-b border-gray-100 bg-gray-50/30 text-gray-300 font-mono text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-4 md:gap-6">
                <span>0{items.length + i + 1}</span>
                <span>[ Empty Slot ]</span>
              </div>
            ))}
          </div>

          {/* Save Button Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-none flex justify-between items-center border-t-2 border-black pt-4 md:pt-8"
          >
            <div className="font-mono text-[10px] md:text-xs text-gray-500">
              STATUS: {items.length < 3 ? 'INCOMPLETE' : 'READY'}
              <br />
              REQ: {Math.max(0, 3 - items.length)} MORE
            </div>
            
            <button
              onClick={handleSave}
              disabled={items.length < 3}
              className={`group relative px-8 md:px-12 py-3 md:py-4 overflow-hidden font-mono text-xs md:text-sm uppercase tracking-widest transition-colors duration-300
                ${items.length < 3
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-report-blue hover:text-black'
                }
              `}
            >
              <span className="relative z-10">
                Confirm & Return
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
