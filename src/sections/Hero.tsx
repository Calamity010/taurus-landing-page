import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceInterviewer from '@/components/VoiceInterviewer';
import {
  Mic,
  Star,
  Trophy,
  Check,
  Clock,
  FileText,
  Phone,
  Cpu,
  ClipboardList,
  Video,
  Code,
  Users,
  ArrowRight,
  Briefcase,
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
        { text: 'Tracks metrics and optimizes future hiring cycles', completed: false },
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
        { text: 'Syncs qualified profiles directly to your ATS', completed: false },
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
        { text: 'Filters out non-serious or unreachable candidates', completed: false },
      ],
    },
  },
  {
    id: 'mcqs',
    title: 'AI MCQs',
    icon: ClipboardList,
    content: {
      heading: 'AI MCQs',
      description: 'Rapid technical and aptitude screening.',
      steps: [
        { text: 'Customizable question banks for any role', completed: true },
        { text: 'Automated grading with instant results', completed: true },
        { text: 'Cheat-proof timed assessment environment', completed: true },
        { text: 'Topic-wise performance analytics', completed: true },
        { text: 'Benchmarks candidates against global standards', completed: false },
        { text: 'Identifies knowledge gaps for training needs', completed: false },
      ],
    },
  },
  {
    id: 'system-design',
    title: 'AI System Design Interview',
    icon: Cpu,
    content: {
      heading: 'AI System Design Interview',
      description: 'Evaluate architectural and system design skills.',
      steps: [
        { text: 'Interactive whiteboard sessions with AI', completed: true },
        { text: 'Assess scalability and component choice', completed: true },
        { text: 'Evaluates trade-off discussions', completed: true },
        { text: 'Real-time feedback on design patterns', completed: true },
        { text: 'Comprehensive architecture skill report', completed: false },
        { text: 'Tests ability to handle failure scenarios', completed: false },
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
        { text: 'Detects emotional cues and confidence levels', completed: false },
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
        { text: 'Assess problem-solving speed and efficiency', completed: false },
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
        { text: 'Ensures a personal touch closes the deal', completed: false },
      ],
    },
  },
];

export default function Hero() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('workflow');
  const [isVoiceInterviewerOpen, setIsVoiceInterviewerOpen] = useState(false);
  
  // Use hovered tab if available, otherwise use active tab
  const displayTabId = hoveredTab || activeTab;
  const displayItem = workflowItems.find((item) => item.id === displayTabId) || workflowItems[0];

  return (
    <section className="relative min-h-screen pt-[72px] overflow-hidden">
      <VoiceInterviewer 
        isOpen={isVoiceInterviewerOpen} 
        onClose={() => setIsVoiceInterviewerOpen(false)} 
      />
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/3 to-background" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.06"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          }}
        />
        {/* Mountain illustration effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%]">
          <svg viewBox="0 0 1440 400" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#18181b" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M0,400 L0,250 Q200,150 400,200 T800,180 T1200,220 L1440,180 L1440,400 Z"
              fill="url(#mountainGrad)"
            />
            <path
              d="M0,400 L0,300 Q300,200 600,280 T1000,250 T1440,300 L1440,400 Z"
              fill="#27272a"
              fillOpacity="0.4"
            />
          </svg>
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
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft hover:shadow-soft-lg transition-shadow"
          >
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-white">4.9</span>
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
            className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft hover:shadow-soft-lg transition-shadow"
          >
            <Trophy className="w-4 h-4 text-orange-500" />
            <span className="font-medium text-slate-300">5 x Product of the day</span>
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
            Taurus
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
            className="gradient-primary text-black rounded-full px-8 py-6 text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02] group"
            onClick={() => setIsVoiceInterviewerOpen(true)}
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
                      ? 'bg-primary text-black shadow-glow'
                      : 'bg-card hover:bg-card/80 text-slate-300 shadow-soft hover:shadow-soft-lg'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-white/20' : 'bg-primary/10'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-primary'}`} />
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
              className="bg-card rounded-2xl shadow-soft-lg p-6 lg:p-8"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                {displayItem.content.heading}
              </h3>
              <p className="text-slate-400 mb-6">{displayItem.content.description}</p>

              <div className="space-y-3">
                {displayItem.content.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed
                          ? 'bg-green-500'
                          : 'bg-secondary'
                      }`}
                    >
                      {step.completed ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <span className={`text-sm ${step.completed ? 'text-slate-300' : 'text-slate-500'}`}>
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
