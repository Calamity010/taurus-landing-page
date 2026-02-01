import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const mediaOutlets = [
  { name: 'CNBC', display: 'CNBC' },
  { name: 'YOURSTORY', display: 'YOURSTORY' },
  { name: 'The Economic Times', display: 'The Economic Times' },
  { name: 'ISN', display: 'ISN' },
  { name: 'STARTUPPEDIA', display: 'STARTUPPEDIA' },
];

export default function FeaturedIn() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Featured in
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {mediaOutlets.map((outlet, index) => (
            <motion.a
              key={outlet.name}
              href="#"
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="group"
            >
              <span className="text-xl md:text-2xl font-bold text-slate-400 group-hover:text-indigo-600 transition-colors duration-300">
                {outlet.display}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
