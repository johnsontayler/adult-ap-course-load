'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES, AI_SUGGESTIONS } from '@/lib/constants';
import { CategorySlug } from '@/types';
import { X, Plus, Sparkles, ArrowLeft } from 'lucide-react';

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
    const suggestions = AI_SUGGESTIONS[slug] || [];
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
    <div className="min-h-screen p-6 md:p-12 pt-32 md:pt-40">
      {/* Navigation Element */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-white border-b border-black">
        <div className="font-mono text-sm tracking-widest uppercase">
          The Adult AP / Input
        </div>
        <div className="font-mono text-xs md:text-sm">
          [ DATA ENTRY ]
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => router.push('/categories')}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-12 font-mono text-sm uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return to Sector Map</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-6xl mb-6 grayscale opacity-50">{category.icon}</div>
          <h1 className="font-serif text-5xl md:text-6xl text-black mb-4">
            {category.title}
          </h1>
          <p className="font-mono text-gray-500 text-sm leading-relaxed border-l border-black pl-4 max-w-lg">
            {category.description}
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex gap-0 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder={`Enter ${category.title.toLowerCase()} variable...`}
              disabled={items.length >= 5}
              className="flex-1 px-6 py-4 bg-gray-50 border-b-2 border-gray-300 focus:border-black focus:outline-none text-lg font-serif placeholder:font-sans placeholder:text-gray-400 disabled:bg-gray-100 transition-colors rounded-none"
            />
            <button
              onClick={handleAddItem}
              disabled={!inputValue.trim() || items.length >= 5}
              className="px-8 py-4 bg-black text-white hover:bg-report-blue hover:text-black disabled:bg-gray-200 disabled:text-gray-400 transition-colors font-mono uppercase tracking-widest text-sm"
            >
              Add
            </button>
          </div>

          <button
            onClick={handleAddSuggestion}
            disabled={items.length >= 5}
            className="flex items-center gap-2 text-gray-500 hover:text-report-blue font-mono text-xs uppercase tracking-widest disabled:text-gray-300 transition-colors"
          >
            <Sparkles size={14} />
            Generate AI Suggestion
          </button>
        </motion.div>

        {/* Items List */}
        <div className="space-y-0 border-t border-black mb-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center justify-between bg-white px-6 py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-gray-400">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
                <span className="text-xl font-serif">{item}</span>
              </div>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={20} />
              </button>
            </motion.div>
          ))}
          
          {/* Empty Slots */}
          {Array.from({ length: Math.max(0, 5 - items.length) }).map((_, i) => (
            <div key={`empty-${i}`} className="px-6 py-6 border-b border-gray-100 bg-gray-50/30 text-gray-300 font-mono text-xs uppercase tracking-widest flex items-center gap-6">
              <span>0{items.length + i + 1}</span>
              <span>[ Empty Slot ]</span>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between items-center border-t-2 border-black pt-8"
        >
          <div className="font-mono text-xs text-gray-500">
            STATUS: {items.length < 3 ? 'INCOMPLETE' : 'READY'}
            <br />
            REQ: {Math.max(0, 3 - items.length)} MORE
          </div>
          
          <button
            onClick={handleSave}
            disabled={items.length < 3}
            className={`group relative px-12 py-4 overflow-hidden font-mono text-sm uppercase tracking-widest transition-colors duration-300
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
  );
}
