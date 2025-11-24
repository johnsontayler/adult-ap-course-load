'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { CATEGORIES } from '@/lib/constants';
import { Download, Twitter, Facebook, Link as LinkIcon, Home } from 'lucide-react';
import EditorialTitle from '@/components/EditorialTitle';

export default function SharePage() {
  const router = useRouter();
  const { selectedWords } = useAppStore();
  const posterRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    alert('Export module pending implementation. Manual screen capture recommended.');
  };

  const handleShare = (platform: string) => {
    const text = encodeURIComponent('My 2025 Adult AP Course Load Analysis. See the report:');
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
    alert('Data source URL copied to clipboard.');
  };

  const handleStartOver = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen p-6 md:p-12 pt-32 md:pt-40">
      {/* Navigation Element */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-white border-b border-black">
        <div className="font-mono text-sm tracking-widest uppercase">
          The Adult AP / Distribution
        </div>
        <div className="font-mono text-xs md:text-sm">
          [ END OF LINE ]
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="mb-8">
            <EditorialTitle 
              title={`DISTRIBUTE\nFINDINGS`}
              highlightColor="bg-report-pink"
            />
          </div>
          <p className="font-mono text-sm uppercase tracking-widest text-gray-500">
            Publicly archive your 2025 optimization strategy.
          </p>
        </motion.div>

        {/* Poster */}
        <motion.div
          ref={posterRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 p-8 md:p-12 mb-16 border border-gray-200"
        >
          <div className="bg-white border-2 border-black p-8 md:p-12 relative overflow-hidden">
             {/* Decorative Corners */}
             <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-report-coral" />
             <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-report-blue" />
             <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-report-yellow" />
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-report-pink" />

            <div className="text-center mb-12 border-b-2 border-black pb-8">
              <h2 className="font-serif text-4xl md:text-5xl mb-4">
                Adult AP Course Load
              </h2>
              <div className="font-mono text-xs uppercase tracking-widest flex justify-center gap-4">
                <span>Est. 2025</span>
                <span>•</span>
                <span>Personal Curriculum</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CATEGORIES.map((category) => {
                const selectedWord = selectedWords[category.slug];
                return (
                  <div
                    key={category.slug}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-2 font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">
                      <span>{category.icon}</span>
                      <span>{category.title}</span>
                    </div>
                    <p className="font-serif text-2xl border-l-2 border-black pl-4">
                      {selectedWord}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                Generated at theadultapcourseload.com
              </p>
            </div>
          </div>
        </motion.div>

        {/* Share Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <button
            onClick={handleDownload}
            className="group flex flex-col items-center gap-4 p-8 bg-white border border-gray-200 hover:border-black transition-colors"
          >
            <Download size={24} className="text-gray-400 group-hover:text-black transition-colors" />
            <span className="font-mono text-xs uppercase tracking-widest">Save Image</span>
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="group flex flex-col items-center gap-4 p-8 bg-white border border-gray-200 hover:border-black transition-colors"
          >
            <Twitter size={24} className="text-gray-400 group-hover:text-black transition-colors" />
            <span className="font-mono text-xs uppercase tracking-widest">Twitter</span>
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="group flex flex-col items-center gap-4 p-8 bg-white border border-gray-200 hover:border-black transition-colors"
          >
            <Facebook size={24} className="text-gray-400 group-hover:text-black transition-colors" />
            <span className="font-mono text-xs uppercase tracking-widest">Facebook</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="group flex flex-col items-center gap-4 p-8 bg-white border border-gray-200 hover:border-black transition-colors"
          >
            <LinkIcon size={24} className="text-gray-400 group-hover:text-black transition-colors" />
            <span className="font-mono text-xs uppercase tracking-widest">Copy URL</span>
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
            className="group relative px-12 py-5 overflow-hidden font-mono text-sm uppercase tracking-widest bg-black text-white hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-colors duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home size={16} />
              Reinitialize Sequence
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
