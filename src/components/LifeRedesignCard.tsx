import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/constants';

export default function LifeRedesignCard() {
  return (
    <div className="lg:col-span-4 relative min-h-[50vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute w-[120%] h-[80%] bg-report-blue/20 rounded-full blur-3xl -top-20 -right-20"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="absolute w-[100%] h-[60%] bg-report-yellow/40 rounded-full blur-3xl bottom-0 -left-20 mix-blend-multiply"
      />
      
      <div className="relative z-10 w-full h-full flex flex-col p-6 py-12 font-mono text-xs text-gray-400 uppercase tracking-widest">
        <div className="border-t border-black/10 pt-4 mb-auto">
          <span className="text-black opacity-60 font-bold">My Adult AP Course Load</span>
          <br /> <br />
          Figure 1.1
          <br />
          Life Redesign
        </div>

        <div className="space-y-4 my-8">
          {CATEGORIES.map((category) => (
            <div key={category.slug} className="flex items-center justify-between border-b border-black/5 pb-2">
              <span className="text-black">
                {category.title}:
              </span>
              <span className="w-1/2 h-4 bg-black/5 rounded-sm" />
            </div>
          ))}
        </div>

        <div className="border-b border-black/10 pb-4 mt-auto text-right">
          Course
          <br />
          Pending
        </div>
      </div>
    </div>
  );
}
