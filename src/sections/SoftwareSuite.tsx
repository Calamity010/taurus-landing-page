import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Phone, FileText, Code, Cpu, ClipboardList, Check, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const suiteItems = [
  {
    id: 'video',
    title: 'AI video interviewer',
    icon: Video,
    description: 'Conduct human-like video interviews at scale.',
    features: [
      'Natural conversation flow with AI',
      'Adaptive questioning based on responses',
      'Multi-language support',
      'Detailed candidate analysis',
    ],
  },
  {
    id: 'phone',
    title: 'AI phone screener',
    icon: Phone,
    description: 'Automated phone screenings with AI.',
    features: [
      'Outbound AI calling',
      'Pre-configured screening questions',
      'Real-time response evaluation',
      'Automatic transcript generation',
    ],
  },
  {
    id: 'resume',
    title: 'AI resume screener',
    icon: FileText,
    description: 'Our resume screening software instantly filters, analyzes and ranks the resumes with detailed insights, enabling you to shortlist the right candidates quickly.',
    features: [
      'Instantly screens resumes against job requirements',
      'Generates detailed, easy-to-share reports',
      'Identifies top candidates for the next round',
    ],
  },
  {
    id: 'coding',
    title: 'AI coding interviewer',
    icon: Code,
    description: 'Technical assessments with AI proctoring.',
    features: [
      'Support for 30+ programming languages',
      'Real-time code execution',
      'AI-powered cheat detection',
      'Automated code quality analysis',
    ],
  },
  {
    id: 'mcqs',
    title: 'AI MCQs',
    icon: ClipboardList,
    description: 'Rapid technical and aptitude screening with automated grading.',
    features: [
      'Customizable question banks',
      'Cheat-proof timed assessments',
      'Instant grading and scoring',
      'Topic-wise performance analytics',
    ],
  },
  {
    id: 'system-design',
    title: 'AI system design interview',
    icon: Cpu,
    description: 'Evaluate architectural skills with interactive whiteboard sessions.',
    features: [
      'Interactive architectural discussions',
      'Assess scalability and trade-offs',
      'Real-time design feedback',
      'Comprehensive system design report',
    ],
  },
];

export default function SoftwareSuite() {
  const [activeTab, setActiveTab] = useState('resume');
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const activeItem = suiteItems.find((item) => item.id === activeTab) || suiteItems[2];

  return (
    <section ref={ref} id="ai-agents" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Recruitment Automation Software Suite
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explore our wide range of AI tools for recruitment to speed up your hiring process and deliver the talent your business needs to grow.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[380px,1fr] gap-8">
          {/* Tab List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {suiteItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                    isActive
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-card border-2 border-transparent hover:bg-secondary'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-primary' : 'bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                  </div>
                  <span className={`font-semibold ${isActive ? 'text-primary' : 'text-slate-300'}`}>
                    {item.title}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 ml-auto transition-transform ${
                      isActive ? 'text-primary translate-x-1' : 'text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-3xl p-8 h-full">
                {/* Visual Representation */}
                <div className="mb-8">
                  <div className="relative bg-card rounded-2xl shadow-soft p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        {(() => {
                          const Icon = activeItem.icon;
                          return <Icon className="w-6 h-6 text-black" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{activeItem.title}</h3>
                        <p className="text-sm text-slate-400">AI-Powered</p>
                      </div>
                    </div>

                    {/* Mock UI */}
                    <div className="space-y-3">
                      {activeItem.features.map((_, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">{idx + 1}</span>
                          </div>
                          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${85 - idx * 10}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.1 }}
                              className="h-full bg-primary rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {activeItem.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
