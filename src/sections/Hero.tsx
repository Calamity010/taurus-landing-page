import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Star,
  Trophy,
  Check,
  Clock,
  FileText,
  Phone,
  Languages,
  Video,
  Code,
  Users,
  ArrowRight,
  Briefcase,
  Cloud,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const workflowItems = [
  {
    id: 'workflow',
    title: 'AI Recruiter Workflow',
    icon: Users,
    content: {
      heading: 'AI Recruiter Workflow',
      description: 'Create and configure your job in minutes.',
      steps: [
        { text: 'Upload job description or use a smart JD prompt', completed: true },
        { text: 'Choose avatar, digital twin, or AI voice', completed: true },
        { text: 'Define experience, salary, perks, and role details', completed: true },
        { text: 'Configure interview context and competencies', completed: true },
        { text: 'Launch the end-to-end AI recruiter workflow', completed: false },
      ],
    },
  },
  {
    id: 'resume',
    title: 'AI Resume Screener',
    icon: FileText,
    content: {
      heading: 'AI Resume Screener',
      description: 'Automatically filter and rank candidates.',
      steps: [
        { text: 'Parses resumes via bulk or individual uploads', completed: true },
        { text: 'Matches profiles to must-have and nice-to-have skills', completed: true },
        { text: 'Analyzes skill depth and role relevance', completed: true },
        { text: 'Identifies career gaps, tenure, and company tier', completed: true },
        { text: 'Classifies candidates as qualified or not qualified', completed: true },
      ],
    },
  },
  {
    id: 'phone',
    title: 'AI Phone Screener',
    icon: Phone,
    content: {
      heading: 'AI Phone Screener',
      description: 'Conduct automated phone screenings.',
      steps: [
        { text: 'AI makes outbound calls to candidates', completed: true },
        { text: 'Asks pre-configured screening questions', completed: true },
        { text: 'Evaluates responses in real-time', completed: true },
        { text: 'Generates call transcripts and summaries', completed: true },
        { text: 'Schedules follow-up interviews automatically', completed: false },
      ],
    },
  },
  {
    id: 'english',
    title: 'English Proficiency Test',
    icon: Languages,
    content: {
      heading: 'English Proficiency Test',
      description: 'Assess verbal communication skills.',
      steps: [
        { text: 'AI-powered speaking assessment', completed: true },
        { text: 'Evaluates pronunciation and fluency', completed: true },
        { text: 'Tests vocabulary and grammar', completed: true },
        { text: 'Provides detailed scoring report', completed: true },
        { text: 'Benchmarks against native speakers', completed: false },
      ],
    },
  },
  {
    id: 'video',
    title: 'AI Video Interviewer',
    icon: Video,
    content: {
      heading: 'AI Video Interviewer',
      description: 'Conduct human-like video interviews.',
      steps: [
        { text: 'AI interviewer with natural conversation', completed: true },
        { text: 'Adaptive questioning based on responses', completed: true },
        { text: 'Records and analyzes candidate responses', completed: true },
        { text: 'Evaluates soft skills and communication', completed: true },
        { text: 'Generates comprehensive interview report', completed: true },
      ],
    },
  },
  {
    id: 'coding',
    title: 'AI Coding Interview',
    icon: Code,
    content: {
      heading: 'AI Coding Interview',
      description: 'Technical assessments with proctoring.',
      steps: [
        { text: 'Supports 30+ programming languages', completed: true },
        { text: 'Real-time code execution and testing', completed: true },
        { text: 'AI-powered cheat detection', completed: true },
        { text: 'Automated code quality analysis', completed: true },
        { text: 'Detailed technical scoring report', completed: true },
      ],
    },
  },
  {
    id: 'handover',
    title: 'Human handover',
    icon: Users,
    content: {
      heading: 'Human Handover',
      description: 'Seamless transition to human recruiters.',
      steps: [
        { text: 'AI summarizes candidate interactions', completed: true },
        { text: 'Flags candidates needing human review', completed: true },
        { text: 'Schedules interviews with hiring managers', completed: true },
        { text: 'Provides context and recommendations', completed: true },
        { text: 'Maintains continuity in candidate experience', completed: true },
      ],
    },
  },
];

export default function Hero() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('workflow');
  
  // Use hovered tab if available, otherwise use active tab
  const displayTabId = hoveredTab || activeTab;
  const displayItem = workflowItems.find((item) => item.id === displayTabId) || workflowItems[0];

  return (
    <section className="relative min-h-screen pt-[72px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/3 to-white" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23172554" fill-opacity="0.06"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          }}
        />
        {/* Mountain illustration effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%]">
          <svg viewBox="0 0 1440 400" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M0,400 L0,250 Q200,150 400,200 T800,180 T1200,220 L1440,180 L1440,400 Z"
              fill="url(#mountainGrad)"
            />
            <path
              d="M0,400 L0,300 Q300,200 600,280 T1000,250 T1440,300 L1440,400 Z"
              fill="#dbe4ff"
              fillOpacity="0.4"
            />
          </svg>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {/* Cloud 1 - Massive, Very Slow, Top Layer */}
           <motion.div
              initial={{ x: '5vw' }}
              animate={{ x: '110vw' }}
              transition={{ repeat: Infinity, duration: 85, ease: "linear" }}
              className="absolute top-[5%] left-0 text-blue-100/40"
           >
              <motion.div
                animate={{ y: [0, -30, 10, -15, 0] }}
                transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
              >
                  <Cloud size={300} fill="currentColor" />
              </motion.div>
           </motion.div>

           {/* Cloud 2 - Large, Drifting Height */}
           <motion.div
              initial={{ x: '40vw' }}
              animate={{ x: '110vw' }}
              transition={{ repeat: Infinity, duration: 65, ease: "linear" }}
              className="absolute top-[15%] left-0 text-indigo-50/30"
           >
               <motion.div
                  animate={{ y: [0, 40, -20, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
               >
                  <Cloud size={180} fill="currentColor" />
               </motion.div>
           </motion.div>
           
           {/* Cloud 3 - Fast, High */}
           <motion.div
              initial={{ x: -150 }}
              animate={{ x: '110vw' }}
              transition={{ repeat: Infinity, duration: 45, ease: "linear", delay: 0 }}
              className="absolute top-[8%] left-0 text-white/40"
           >
               <motion.div
                  animate={{ y: [0, -15, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
               >
                  <Cloud size={120} fill="currentColor" />
               </motion.div>
           </motion.div>

           {/* Cloud 4 - Big, Lower Layer */}
           <motion.div
              initial={{ x: '75vw' }}
              animate={{ x: '110vw' }}
              transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
              className="absolute top-[30%] left-0 text-blue-50/30"
           >
               <motion.div
                  animate={{ y: [0, -25, 25, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
               >
                  <Cloud size={240} fill="currentColor" />
               </motion.div>
           </motion.div>

            {/* Cloud 5 - Fast, Scatter */}
           <motion.div
              initial={{ x: -100 }}
              animate={{ x: '110vw' }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear", delay: 15 }}
              className="absolute top-[20%] left-0 text-sky-100/40"
           >
               <motion.div
                  animate={{ y: [0, 20, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
               >
                  <Cloud size={90} fill="currentColor" />
               </motion.div>
           </motion.div>

           {/* Cloud 6 - Text Layer: Slow */}
           <motion.div
              initial={{ x: '25vw' }}
              animate={{ x: '110vw' }}
              transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
              className="absolute top-[12%] left-0 text-blue-50/20"
           >
               <motion.div
                  animate={{ y: [0, -40, 20, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 40, ease: "easeInOut" }}
               >
                  <Cloud size={200} fill="currentColor" />
               </motion.div>
           </motion.div>

           {/* Cloud 7 - Text Layer: Fast */}
           <motion.div
              initial={{ x: -100 }}
              animate={{ x: '110vw' }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear", delay: 5 }}
              className="absolute top-[28%] left-0 text-slate-200/40"
           >
               <motion.div
                  animate={{ y: [0, 30, -30, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
               >
                  <Cloud size={110} fill="currentColor" />
               </motion.div>
           </motion.div>

            {/* Cloud 8 - Background */}
           <motion.div
              initial={{ x: '10vw' }}
              animate={{ x: '110vw' }}
              transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
              className="absolute top-[22%] left-0 text-indigo-50/20"
           >
               <motion.div
                  animate={{ y: [0, -50, 50, 0] }}
                  transition={{ repeat: Infinity, duration: 60, ease: "easeInOut" }}
               >
                  <Cloud size={350} fill="currentColor" />
               </motion.div>
           </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 pt-24">
        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <a
            href="https://www.g2.com/products/ai-interviewer/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft hover:shadow-soft-lg transition-shadow"
          >
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-900">4.9</span>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </a>
          <a
            href="https://www.producthunt.com/products/ai-interviewer-by-taurushire"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft hover:shadow-soft-lg transition-shadow"
          >
            <Trophy className="w-4 h-4 text-orange-500" />
            <span className="font-medium text-slate-700">5 x Product of the day</span>
          </a>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">HIRE MORE HUMANS WITH AI</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-4">
            Taurus Hire
            <br />
            <span className="gradient-text">Platform</span>
          </h1>
        </motion.div>

        {/* AI Interviewer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mb-16"
        >
          <Button
            size="lg"
            className="gradient-primary text-white rounded-full px-8 py-6 text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02] group"
          >
            <div className="relative mr-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
            </div>
            Talk to AI Interviewer
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Workflow Tabs - Hover to show details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid lg:grid-cols-[320px,1fr] gap-6"
        >
          {/* Tab List */}
          <div className="space-y-2">
            {workflowItems.map((item) => {
              const Icon = item.icon;
              const isHovered = hoveredTab === item.id;
              const isActive = activeTab === item.id;
              const isSelected = isHovered || (hoveredTab === null && isActive);
              
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-primary text-white shadow-glow'
                      : 'bg-white/80 hover:bg-white text-slate-700 shadow-soft hover:shadow-soft-lg'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-white/20' : 'bg-primary/10'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <span className="font-medium text-sm">{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content - Shows on hover */}
          <AnimatePresence mode="wait">
            <motion.div
              key={displayTabId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-soft-lg p-6 lg:p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {displayItem.content.heading}
              </h3>
              <p className="text-slate-600 mb-6">{displayItem.content.description}</p>

              <div className="space-y-3">
                {displayItem.content.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed
                          ? 'bg-green-500'
                          : 'bg-slate-200'
                      }`}
                    >
                      {step.completed ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <span className={`text-sm ${step.completed ? 'text-slate-700' : 'text-slate-400'}`}>
                      {step.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
