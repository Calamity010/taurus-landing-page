import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function AnnouncementBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] w-full bg-primary overflow-hidden h-10">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex items-center gap-8 py-2.5 whitespace-nowrap"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 text-black text-sm font-medium">
            <Award className="w-4 h-4" />
            <span>Taurus Named G2 Grid Leader, wins 13 Badges for Summer&apos;25</span>
            <span className="mx-4">•</span>
            <Award className="w-4 h-4" />
            <span>Taurus Named G2 Grid Leader, wins 13 Badges for Summer&apos;25</span>
            <span className="mx-4">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
