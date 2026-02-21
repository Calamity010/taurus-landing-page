import { useState } from 'react';
import { motion } from 'framer-motion';
import SampleReportModal from '@/components/SampleReportModal';
import { Video, BarChart3, Shield, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: Video,
    title: 'Human-like Interviews',
    description:
      'Our AI interviewer conducts human-like video interviews, coding assessments, phone and resume screenings, which help you find the right talent faster and easier.',
  },
  {
    icon: BarChart3,
    title: 'Data-driven Reports',
    description:
      'With our AI recruiting tools, you can make your hiring process smarter, simpler and more reliable with detailed data-driven reports.',
  },
  {
    icon: Shield,
    title: 'Interview Intelligence',
    description:
      'Built-in cheat detection and proctoring ensure coding assessments and interviews remain fair, secure, and trustworthy.',
  },
];

const checkItems = [
  'Instantly screens resumes against job requirements',
  'Generates detailed, easy-to-share reports',
  'Identifies top candidates for the next round',
];

export default function AIFeatures() {
  const [showReportModal, setShowReportModal] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} id="features" className="py-20 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">AI Recruiting</span>
            <br />
            Software
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our AI recruitment software empowers scaling teams and enterprises to streamline the hiring process with intelligent AI agents.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Illustration Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl shadow-soft-lg p-8">
              {/* Progress Circle */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#333"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={isVisible ? { strokeDashoffset: 283 * 0.2 } : {}}
                      transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#172554" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">80%</span>
                    <span className="text-xs text-slate-400">Score Obtained</span>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                {checkItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Share Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 1 }}
                onClick={() => setShowReportModal(true)}
                className="mt-6 w-full py-3 px-4 bg-secondary hover:bg-secondary/80 rounded-xl text-sm font-medium text-slate-300 transition-colors flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Share Report
              </motion.button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl opacity-50" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-50" />
          </motion.div>
        </div>
      </div>
      <SampleReportModal open={showReportModal} onOpenChange={setShowReportModal} />
    </section>
  );
}
