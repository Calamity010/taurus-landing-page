import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { Video, Star, Clock } from 'lucide-react';

const stats = [
  { icon: Video, value:31023, label: 'Interviews completed', suffix: '' },
  { icon: Star, value: 4.6, label: 'Candidate experience rating', suffix: '/5' },
  { icon: Clock, value: 248184, label: 'HR manhours saved', suffix: '' },
];

function StatCard({ stat, isVisible }: { stat: typeof stats[0]; isVisible: boolean }) {
  const { count, startAnimation } = useCountUp(stat.value, 2000);

  useEffect(() => {
    if (isVisible) {
      startAnimation();
    }
  }, [isVisible, startAnimation]);

  const Icon = stat.icon;
  const displayValue = stat.value % 1 !== 0 
    ? count.toFixed(1) 
    : count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl shadow-soft p-8 text-center hover:shadow-soft-lg transition-shadow"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {displayValue}
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <p className="text-slate-400">{stat.label}</p>
    </motion.div>
  );
}

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Proven impact with our AI recruitment software
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
