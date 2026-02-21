import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const mediaOutlets = [
  { name: 'CNBC', domain: 'cnbc.com' },
  { name: 'YourStory', domain: 'yourstory.com' },
  { name: 'Economic Times', domain: 'economictimes.indiatimes.com' },
  { name: 'StartupPedia', domain: 'startuppedia.in' },
  { name: 'Business Insider', domain: 'businessinsider.com' },
  { name: 'TechCrunch', domain: 'techcrunch.com' },
];

const OutletLogo = ({ name, domain }: { name: string; domain: string }) => {
  const [imgSrc, setImgSrc] = useState(`https://logo.clearbit.com/${domain}`);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (imgSrc.includes('clearbit')) {
      setImgSrc(`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domain}&size=128`);
    } else {
      setError(true);
    }
  };

  if (error) {
    return <span className="text-xl font-bold text-slate-500 hover:text-white transition-colors shrink-0 px-8">{name}</span>;
  }

  return (
    <div className="flex items-center justify-center px-10 md:px-14 shrink-0 group">
      <img
        src={imgSrc}
        alt={`${name} logo`}
        className="h-6 md:h-8 w-auto object-contain transition-all duration-500 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
        onError={handleError}
      />
    </div>
  );
};

export default function FeaturedIn() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-20 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-sm font-semibold text-slate-500 uppercase tracking-[0.2em]"
        >
          Featured in
        </motion.h2>
      </div>

      <div className="relative w-full flex items-center overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden group select-none">
          <div 
            className="flex items-center animate-marquee py-4"
            style={{ animationDuration: '30s' }}
          >
            {[...mediaOutlets, ...mediaOutlets].map((outlet, i) => (
              <OutletLogo key={`${outlet.name}-${i}-a`} {...outlet} />
            ))}
          </div>
          <div 
            aria-hidden="true"
            className="flex items-center animate-marquee py-4"
            style={{ animationDuration: '30s' }}
          >
            {[...mediaOutlets, ...mediaOutlets].map((outlet, i) => (
              <OutletLogo key={`${outlet.name}-${i}-b`} {...outlet} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
