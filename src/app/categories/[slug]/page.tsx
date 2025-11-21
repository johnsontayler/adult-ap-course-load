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
    <div className="min-h-screen paper-texture p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => router.push('/categories')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Categories</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.title}
          </h1>
          <p className="text-xl text-gray-600">{category.description}</p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder={`Add a ${category.title.toLowerCase()} option...`}
              disabled={items.length >= 5}
              className="flex-1 px-6 py-4 rounded-full border-2 border-gray-300 focus:border-gray-900 focus:outline-none text-lg disabled:bg-gray-100"
            />
            <button
              onClick={handleAddItem}
              disabled={!inputValue.trim() || items.length >= 5}
              className="px-6 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Plus size={24} />
            </button>
          </div>

          <button
            onClick={handleAddSuggestion}
            disabled={items.length >= 5}
            className="flex items-center gap-2 text-neon-pink hover:text-pink-600 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <Sparkles size={20} />
            Add AI Suggestion
          </button>
        </motion.div>

        {/* Items List */}
        <div className="space-y-3 mb-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between bg-white px-6 py-4 rounded-full border-2 border-gray-300 shadow-sm"
            >
              <span className="text-lg font-medium">{item}</span>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Help Text */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {items.length < 3 && `Add at least ${3 - items.length} more option(s)`}
            {items.length >= 3 && items.length < 5 && 'You can add up to 5 options'}
            {items.length === 5 && 'Maximum options reached'}
          </p>
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <button
            onClick={handleSave}
            disabled={items.length < 3}
            className={`px-12 py-4 rounded-full text-lg font-semibold transition-all ${
              items.length < 3
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
            }`}
          >
            Save & Continue
          </button>
        </motion.div>
      </div>
    </div>
  );
}
