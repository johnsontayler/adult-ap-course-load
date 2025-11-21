'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES } from '@/lib/constants';
import { Download, Twitter, Facebook, Link as LinkIcon, Home } from 'lucide-react';

export default function SharePage() {
  const router = useRouter();
  const { selectedWords } = useAppStore();
  const posterRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Placeholder for download functionality
    alert('Download feature coming soon! For now, take a screenshot of your course load.');
  };

  const handleShare = (platform: string) => {
    const text = encodeURIComponent('Check out my Adult AP Course Load! 🎓');
    const url = encodeURIComponent(window.location.href);

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleStartOver = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen paper-texture p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Share Your <span className="highlighter-blue">Course Load</span>
          </h1>
          <p className="text-xl text-gray-600">
            Show the world how you're leveling up in 2025
          </p>
        </motion.div>

        {/* Poster */}
        <motion.div
          ref={posterRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-neon-yellow via-neon-pink to-neon-blue p-8 rounded-3xl shadow-2xl mb-8"
        >
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              My 2025 Adult AP Course Load
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Don't peak in high school.
            </p>

            <div className="space-y-4">
              {CATEGORIES.map((category) => {
                const selectedWord = selectedWords[category.slug];
                return (
                  <div
                    key={category.slug}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="text-3xl">{category.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-medium">
                        {category.title}
                      </p>
                      <p className="text-xl font-bold">{selectedWord}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Created at theadultapcourseload.com
              </p>
            </div>
          </div>
        </motion.div>

        {/* Share Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <button
            onClick={handleDownload}
            className="flex flex-col items-center gap-2 p-6 bg-white border-2 border-gray-300 rounded-2xl hover:border-gray-900 transition-all"
          >
            <Download size={32} />
            <span className="text-sm font-semibold">Download</span>
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="flex flex-col items-center gap-2 p-6 bg-white border-2 border-gray-300 rounded-2xl hover:border-gray-900 transition-all"
          >
            <Twitter size={32} />
            <span className="text-sm font-semibold">Twitter</span>
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="flex flex-col items-center gap-2 p-6 bg-white border-2 border-gray-300 rounded-2xl hover:border-gray-900 transition-all"
          >
            <Facebook size={32} />
            <span className="text-sm font-semibold">Facebook</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-2 p-6 bg-white border-2 border-gray-300 rounded-2xl hover:border-gray-900 transition-all"
          >
            <LinkIcon size={32} />
            <span className="text-sm font-semibold">Copy Link</span>
          </button>
        </motion.div>

        {/* Start Over Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={handleStartOver}
            className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 font-semibold"
          >
            <Home size={20} />
            Start Over
          </button>
        </motion.div>
      </div>
    </div>
  );
}
