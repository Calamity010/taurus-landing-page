import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function G2Badges() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const badges = [
    { title: 'Leader', category: 'Video Interview', season: 'Winter 2026' },
    { title: 'High Performer', category: 'General', season: 'Winter 2026' },
    { title: 'Best Support', category: 'Enterprise', season: 'Winter 2026' },
    { title: 'Easiest Setup', category: 'Implementation', season: 'Winter 2026' },
    { title: 'Momentum Leader', category: 'Trending', season: 'Winter 2026' },
    { title: 'Best ROI', category: 'Small Business', season: 'Winter 2026' },
    { title: 'Leader', category: 'Asia', season: 'Winter 2026' },
    { title: 'Users Love Us', category: 'Satisfaction', season: 'Winter 2026' },
  ];

  return (
    <section ref={ref} className="py-20 bg-black relative overflow-hidden">
      {/* Background Noise/Texture Overlay (Optional, simple gradient here) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16">
          {/* Main Leader Badge (CSS Construction) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isVisible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="relative group"
          >
            <div className="w-32 h-40 md:w-40 md:h-48 bg-zinc-50 text-slate-900 relative shadow-[0_4px_20px_rgba(255,255,255,0.1)] border border-white/10 flex flex-col items-center justify-center p-4 text-center clip-path-badge transform transition-transform group-hover:scale-105 duration-300"
              style={{
                backgroundImage: `radial-gradient(#00000033 1px, transparent 1px)`,
                backgroundSize: '12px 12px'
              }}
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF4F00] to-[#FF8F00]" />
              <div className="uppercase text-[10px] font-bold tracking-widest mb-2 border-b border-black/10 pb-1 w-full text-slate-500">
                Winter 2026
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF4F00] to-[#FF2F00] text-white rounded-lg shadow-lg font-bold text-xl flex items-center justify-center mb-2">
                G2
              </div>
              <div className="font-extrabold text-xl md:text-2xl leading-none tracking-tight">
                Leader
              </div>
              {/* Badge Shape (CSS Clip Path helper below) */}
              <style>{`
                .clip-path-badge {
                  clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%);
                }
              `}</style>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-white/10 blur-xl rounded-full -z-10" />
          </motion.div>

          {/* Heading Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Leader of customer satisfaction
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="flex text-[#FF9E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <span className="text-white/80 text-lg font-medium">Rated 5/5</span>
            </div>
            <p className="mt-4 text-white/70 max-w-lg text-lg">
              Consistently rated as a leader in recruitment automation by G2 and industry experts.
            </p>
          </motion.div>
        </div>

        {/* Scrolling Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative w-full overflow-hidden mask-linear-fade"
        >
          {/* Gradient Masks for Marquee Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

          <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-8 py-8">
            {/* Repeat the badge list multiple times to create seamless loop */}
            {[...Array(3)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-8 shrink-0">
                {badges.map((badge, index) => (
                  <div 
                    key={`${groupIndex}-${index}`}
                    className="w-28 h-36 bg-zinc-50 text-slate-900 relative shadow-lg border border-white/5 flex flex-col items-center justify-center p-3 text-center clip-path-badge transform transition-transform hover:scale-110 duration-300 pointer-events-auto"
                    style={{
                        backgroundImage: `radial-gradient(#00000033 1px, transparent 1px)`,
                        backgroundSize: '10px 10px'
                    }}
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-[#FF4F00]" />
                    <div className="uppercase text-[8px] font-bold tracking-widest mb-1.5 border-b border-black/10 pb-1 w-full text-slate-500">
                      {badge.season}
                    </div>
                    <div className="w-8 h-8 bg-[#FF4F00] text-white rounded font-bold text-sm flex items-center justify-center mb-1.5 shadow-md">
                      G2
                    </div>
                    <div className="font-extrabold text-sm leading-tight mb-1">
                      {badge.title}
                    </div>
                    <div className="text-[9px] text-slate-500 leading-tight">
                        {badge.category}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

