import { useState, useEffect, type KeyboardEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Star, ShieldCheck, BarChart3, MessageSquare,
  Plus, Minus, ChevronDown, Check, Sparkles,
  Video, Brain, Shield, Clock, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import VideoInterviewer from '@/components/VideoInterviewer';

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                              */
/* ------------------------------------------------------------------ */

const TrustedBy = () => (
  <div className="py-12 bg-background border-b border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-sm font-semibold tracking-wider text-zinc-500 uppercase mb-8">
        TRUSTED BY MORE THAN 5,000 LEADING HR TEAMS OF ALL SIZES
      </p>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        {['Uber', 'IBM', 'Tencent', 'Meesho', 'Reliance', 'S.K. Rathi'].map((brand) => (
          <span key={brand} className="text-xl font-bold font-serif text-zinc-300 flex items-center">
            {brand}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  AI Video Interviewer Hero                                          */
/* ------------------------------------------------------------------ */

const VideoInterviewerHero = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const placeholders = [
    'Python Developer',
    'Product Manager',
    'Data Scientist',
    'Frontend Engineer',
    'Marketing Lead',
    'DevOps Engineer',
  ];

  // Typewriter effect for placeholder
  useEffect(() => {
    const target = placeholders[placeholderIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText.length < target.length) {
      timeout = setTimeout(() => setTypedText(target.slice(0, typedText.length + 1)), 80);
    } else if (!isDeleting && typedText.length === target.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => setTypedText(typedText.slice(0, -1)), 45);
    } else {
      setIsDeleting(false);
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, placeholderIndex]);

  const handlePrepare = () => {
    if (!jobTitle.trim()) return;
    setIsModalOpen(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handlePrepare();
  };

  const features = [
    { icon: Brain, label: 'AI-generated questions' },
    { icon: Shield, label: 'Anti-cheating proctoring' },
    { icon: BarChart3, label: 'Instant scoring' },
    { icon: Clock, label: 'Async or live mode' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Enter the role you want to hire for',
      desc: 'Simply type the job title and our AI generates a tailored interview in seconds.',
    },
    {
      step: '02',
      title: 'AI creates a custom interview',
      desc: 'Our model crafts role-specific questions covering skills, behavior, and culture fit.',
    },
    {
      step: '03',
      title: 'Candidate completes the interview',
      desc: 'Candidates join via link—no app required. AI conducts the full conversation.',
    },
    {
      step: '04',
      title: 'Receive detailed evaluation report',
      desc: 'Get structured scoring, sentiment analysis, and a hire/no-hire recommendation instantly.',
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navbar spacer */}
      <div className="h-24" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Background grid */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0f_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Radial gradient center glow */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
          <div className="mt-12 h-[500px] w-[900px] rounded-full bg-white/[0.03] blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-12 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-zinc-300 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-white" />
            <span>AI-powered • Real-time • Zero bias</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.05]"
          >
            AI Video
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600">
              Interviewer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-4 max-w-2xl text-lg text-zinc-400 leading-relaxed"
          >
            Records 🎥 &nbsp;·&nbsp; Evaluates 📊 &nbsp;·&nbsp; Detects cheating 🕵️‍♀️ &nbsp;·&nbsp; Delivers insights 💡
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mb-12 max-w-xl text-zinc-500 text-sm"
          >
            Type the role you're hiring for and let Taurus AI conduct a fully customized interview session in seconds.
          </motion.p>

          {/* ── The interactive input card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mx-auto max-w-2xl"
          >
            <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
              <div className="flex items-center gap-3 rounded-xl bg-zinc-900/80 px-4 py-3">
                {/* Prefix */}
                <div className="shrink-0 text-sm font-medium text-zinc-400 whitespace-nowrap select-none">
                  I want to hire
                </div>

                {/* Divider */}
                <div className="h-5 w-px bg-white/10 shrink-0" />

                {/* Input */}
                <input
                  id="job-title-input"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={typedText + '|'}
                  className="flex-1 bg-transparent text-base font-medium text-white outline-none placeholder:text-zinc-600"
                />

                {/* CTA */}
                <Button
                  id="prepare-simulation-btn"
                  onClick={handlePrepare}
                  disabled={!jobTitle.trim()}
                  className="shrink-0 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-zinc-900 shadow-md transition-all duration-200 hover:bg-zinc-100 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Video className="mr-1.5 h-4 w-4" />
                  Prepare Simulation
                </Button>
              </div>
            </div>

            <p className="mt-3 text-xs text-zinc-600">
              Try: "Python Developer", "Product Manager", "Data Scientist" — Hit Enter to start
            </p>
          </motion.div>

          {/* Feature chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-sm text-zinc-400"
              >
                <Icon className="h-3.5 w-3.5 text-zinc-300" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trusted by */}
      <TrustedBy />

      {/* Enterprise banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.05)_75%,transparent_75%)] [background-size:20px_20px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xs font-black text-black shadow-lg">
              G2
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-6 w-6 fill-zinc-200 text-zinc-200" />
              ))}
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Enterprise-Grade Video Interview Software
          </h2>
          <p className="text-xl font-medium text-zinc-300">
            Pricing starts as low as $1.00 per interview
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-background py-28">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">How AI Video Interviewer Works</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              From role to shortlist in minutes — no scheduling, no bias, no wasted time.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((item, idx) => (
              <StepAccordion key={idx} item={item} defaultOpen={idx === 0} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA bottom */}
      <div className="bg-zinc-950 border-t border-white/5 py-24 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Start interviewing smarter today
            </h2>
            <p className="text-zinc-400 mb-8">
              Join 5,000+ HR teams who use Taurus AI to hire better, faster, and fairer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => document.getElementById('job-title-input')?.focus(), 600);
                }}
                className="rounded-full px-8 py-3 bg-white text-black hover:bg-zinc-100 font-semibold text-base"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Try Free Demo
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = '/contact-us')}
                className="rounded-full px-8 py-3 border-white/20 text-zinc-300 hover:bg-white/10 font-medium text-base"
              >
                Talk to sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Interviewer Modal */}
      <VideoInterviewer
        isOpen={isModalOpen}
        jobTitle={jobTitle}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Accordion step component                                           */
/* ------------------------------------------------------------------ */

function StepAccordion({
  item,
  defaultOpen,
}: {
  item: { step: string; title: string; desc: string };
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        open
          ? 'border-white/20 bg-white/[0.04]'
          : 'border-white/8 bg-white/[0.02] hover:border-white/15'
      }`}
    >
      <button
        className="flex w-full items-center justify-between p-6"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-6">
          <span
            className={`text-sm font-bold tracking-widest ${
              open ? 'text-white' : 'text-zinc-600'
            }`}
          >
            {item.step}
          </span>
          <h3 className={`text-left text-xl font-semibold ${open ? 'text-white' : 'text-zinc-500'}`}>
            {item.title}
          </h3>
        </div>
        {open ? (
          <Minus className="h-5 w-5 shrink-0 text-white/60" />
        ) : (
          <Plus className="h-5 w-5 shrink-0 text-zinc-600" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 pl-[4.5rem]">
          <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Phone Screener Hero (preserved)                                    */
/* ------------------------------------------------------------------ */

const Waveform = () => (
  <div className="absolute inset-0 z-0 flex items-center justify-center gap-[6px] opacity-20 pointer-events-none overflow-hidden">
    {Array.from({ length: 60 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-1.5 bg-zinc-800 rounded-full"
        animate={{ height: [20, Math.random() * 100 + 20, 20] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: Math.random() * 2,
        }}
        style={{ height: '40px' }}
      />
    ))}
  </div>
);

const PhoneScreenerHero = () => (
  <div className="min-h-screen bg-background font-sans relative overflow-hidden">
    <div className="h-20" />
    <Waveform />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: -100, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-1/2 -left-20 transform -translate-y-1/2 bg-green-900/30 border border-green-500/20 rounded-lg p-4 shadow-lg flex items-start gap-3 w-64 z-20 hidden lg:flex"
          >
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1 shrink-0">
              <Check className="w-4 h-4 text-white font-bold" />
            </div>
            <p className="text-sm font-bold text-white leading-tight">
              Auto-evaluates and scores based on job fit
            </p>
          </motion.div>

          <div className="bg-[#ff4400] p-6 rounded-[2.5rem] w-full max-w-[420px] mx-auto shadow-2xl relative">
            <div className="absolute top-6 right-6 w-16 h-16 bg-[#cc0000] rounded-2xl flex items-center justify-center shadow-inner border-b-4 border-[#990000]">
              <div className="w-8 h-8 bg-black rounded-full border-4 border-zinc-800 relative">
                <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-50" />
              </div>
            </div>
            <div className="absolute top-40 -right-3 w-3 h-24 bg-[#ffcccc] rounded-r-md border-l border-black/10" />
            <div className="absolute top-40 right-6 w-12 h-24 bg-gradient-to-b from-[#ff0000] to-[#cc0000] rounded-lg shadow-lg border-2 border-[#990000] flex items-center justify-center">
              <div className="w-full h-8 bg-white/20 blur-sm transform rotate-45" />
            </div>
            <div className="bg-[#0c0c0c] rounded-[2rem] p-6 pt-10 pb-8 relative overflow-hidden text-white shadow-inner min-h-[500px] flex flex-col">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="flex items-center gap-2 mb-8 relative z-10">
                <span className="text-green-400 text-xl">✨</span>
                <h2 className="text-xl font-bold tracking-tight">Try AI Phone Screener</h2>
              </div>
              <form className="space-y-4 relative z-10 flex-1">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-[#1e1e1e] border border-zinc-700/50 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500 transition-colors"
                />
                <div className="relative">
                  <select className="w-full bg-[#1e1e1e] border border-zinc-700/50 rounded-lg px-4 py-3 text-zinc-300 focus:outline-none focus:border-green-500 appearance-none cursor-pointer">
                    <option>Select Job Role</option>
                    <option>Software Engineer</option>
                    <option>Sales Representative</option>
                    <option>Customer Support</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
                <div className="flex gap-2">
                  <div className="w-24 bg-[#1e1e1e] border border-zinc-700/50 rounded-lg px-2 py-3 flex items-center justify-center gap-1 text-zinc-300 text-sm">
                    <span>🇮🇳</span>
                    <span>+91</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="flex-1 bg-[#1e1e1e] border border-zinc-700/50 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-[#86efac] hover:bg-[#4ade80] text-zinc-900 font-black text-lg h-14 rounded-xl uppercase tracking-wide shadow-lg hover:shadow-green-500/20 transition-all transform hover:scale-[1.02]">
                    RECEIVE PHONE CALL
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <TrustedBy />
    <div className="py-24 bg-background relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How AI Phone Screener works</h2>
          <p className="text-lg text-zinc-400">Automate your screening process in 5 simple steps</p>
        </div>
        <div className="space-y-4">
          {[
            { step: '01', title: 'Set Language and AI Voice', open: true },
            { step: '02', title: 'Upload Job Description', open: false },
            { step: '03', title: 'Share Interview Link or Phone Invite', open: false },
            { step: '04', title: 'AI Agent Screens Candidate', open: false },
            { step: '05', title: 'Get Screening Report', open: false },
          ].map((item, idx) => (
            <StepAccordion
              key={idx}
              item={{ step: item.step, title: item.title, desc: 'Configure this step to automate screening for your hiring pipeline.' }}
              defaultOpen={item.open}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  AgentPage Router                                                   */
/* ------------------------------------------------------------------ */

const agentData: Record<string, any> = {
  'video-interviewer': {
    title: 'AI Video Interviewer',
    headline: 'AI Video Interviewer',
    subheadline: "Taurus AI video interview software helps recruiters hire top talent faster and fairer.",
    description: "Records 🎥, Evaluates 📊, Detects cheating candidates 🕵️‍♀️ with detailed conversational intelligence 💭",
    heroImage: '/dashboard-mockup.png',
    features: [
      { title: 'Auto-proctoring', icon: ShieldCheck },
      { title: 'Sentiment Analysis', icon: MessageSquare },
      { title: 'Instant Scoring', icon: BarChart3 }
    ],
    theme: 'dark'
  },
  'phone-screener': {
    title: 'AI Phone Screener',
    headline: 'Screen candidates before lunch',
    subheadline: "Automated phone interview software that calls applicants, asks relevant questions, and shortlists the best fits instantly.",
    description: "Conduct thousands of phone screens simultaneously with our natural voice AI.",
    heroImage: null,
    features: [],
    theme: 'light'
  },
  'default': {
    title: 'AI Agent',
    headline: 'Automate your hiring',
    subheadline: 'Advanced AI solutions for modern recruitment teams.',
    description: '',
    theme: 'light'
  }
};

export default function AgentPage() {
  const { agentId } = useParams();

  if (agentId === 'video-interviewer') {
    return <VideoInterviewerHero />;
  }

  if (agentId === 'phone-screener') {
    return <PhoneScreenerHero />;
  }

  // Generic fallback
  const data = agentData[agentId as string] || agentData['default'];

  return (
    <div className="min-h-screen bg-background pt-24 font-sans">
      <div className="relative overflow-hidden bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            {data.headline}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            {data.subheadline}
          </p>
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-lg bg-white hover:bg-zinc-100 text-black font-bold"
            onClick={() => (window.location.href = '/contact-us')}
          >
            Get Started
          </Button>
        </div>
      </div>
      <TrustedBy />
    </div>
  );
}
