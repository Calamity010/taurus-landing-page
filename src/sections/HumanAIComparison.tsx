import { motion } from 'framer-motion';
import { User, Bot, X, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HumanAIComparison() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-slate-400 mb-2">Optimize your company&apos;s...</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Human + Taurus AI Interviewer
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Human Side */}
          <div className="bg-card rounded-2xl shadow-soft p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                <User className="w-7 h-7 text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Human</h3>
                <p className="text-slate-400">Traditional interviewer</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-slate-400">Limited availability</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-slate-400">Inconsistent evaluation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-slate-400">Time zone constraints</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <span className="text-5xl font-bold text-slate-500">1</span>
                <p className="text-slate-400 mt-2">Concurrent interview</p>
              </div>
            </div>
          </div>

          {/* AI Side */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl shadow-glow-lg p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Taurus AI Interviewer</h3>
                <p className="text-blue-100">AI-powered solution</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-blue-100">24/7 availability</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-blue-100">Consistent evaluation criteria</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-blue-100">Global time zone coverage</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="text-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-5xl font-bold"
                >
                  ∞
                </motion.span>
                <p className="text-blue-100 mt-2">Concurrent interviews</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
