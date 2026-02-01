import { motion } from 'framer-motion';
import { Award, Star, TrendingUp, Users, Zap } from 'lucide-react';

const badges = [
  { icon: Award, label: 'High Performer', region: 'Asia Pacific', season: 'Fall 2025' },
  { icon: Star, label: 'High Performer', region: 'Mid-Market', season: 'Fall 2025' },
  { icon: TrendingUp, label: 'Regional Leader', region: 'India', season: 'Fall 2025' },
  { icon: Users, label: 'Leader', region: 'Small Business', season: 'Fall 2025' },
  { icon: Zap, label: 'High Performer', region: 'Asia', season: 'Summer 2025' },
  { icon: Award, label: 'High Performer', region: 'Mid-Market', season: 'Summer 2025' },
  { icon: Star, label: 'High Performer', region: 'Asia Pacific', season: 'Summer 2025' },
  { icon: TrendingUp, label: 'Regional Leader', region: 'India', season: 'Summer 2025' },
];

export default function G2Badges() {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="relative">
        {/* First Row - Left to Right */}
        <div className="flex mb-4">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex gap-4"
          >
            {[...badges, ...badges].map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 h-28 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-4 hover:shadow-soft-lg transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G2</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-slate-900">{badge.label}</span>
                  </div>
                  <span className="text-xs text-slate-500">{badge.region}</span>
                  <span className="text-xs text-slate-400">{badge.season}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="flex">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex gap-4"
          >
            {[...badges.reverse(), ...badges].map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 h-28 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-4 hover:shadow-soft-lg transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G2</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-slate-900">{badge.label}</span>
                  </div>
                  <span className="text-xs text-slate-500">{badge.region}</span>
                  <span className="text-xs text-slate-400">{badge.season}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
