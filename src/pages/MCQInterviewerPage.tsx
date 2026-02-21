import { useState, useEffect, type KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Brain, Eye, ShieldCheck, BarChart3,
  Clock, Sparkles, ArrowRight, CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import MCQInterviewer from '@/components/MCQInterviewer';

/* ─── Typewriter hook ───────────────────────────────────────── */
function useTypewriter(words: string[]) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const target = words[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && display.length < target.length) {
      t = setTimeout(() => setDisplay(target.slice(0, display.length + 1)), 75);
    } else if (!deleting && display.length === target.length) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && display.length > 0) {
      t = setTimeout(() => setDisplay(display.slice(0, -1)), 40);
    } else {
      setDeleting(false); setIdx(i => (i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [display, deleting, idx, words]);
  return display;
}

/* ─── Page ─────────────────────────────────────────────────── */
const MCQInterviewerPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const placeholder = useTypewriter([
    'Frontend Developer',
    'Backend Engineer',
    'Data Scientist',
    'Full-Stack Developer',
    'DevOps Engineer',
    'Python Developer',
  ]);

  const handleStart = () => { if (jobTitle.trim()) setModalOpen(true); };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') handleStart(); };

  const chips = [
    { icon: Brain, label: 'Role-specific questions' },
    { icon: Eye, label: 'AI proctoring' },
    { icon: BarChart3, label: 'Instant evaluation' },
    { icon: Clock, label: '15–30 min sessions' },
  ];

  const features = [
    {
      icon: Brain,
      title: 'Adaptive MCQ Engine',
      desc: 'AI dynamically generates questions tailored to the job role — from fundamentals to edge-case scenarios.',
      color: 'text-violet-400 bg-violet-500/8 border-violet-500/20',
    },
    {
      icon: Eye,
      title: 'AI Proctoring',
      desc: 'Camera monitoring ensures integrity. AI detects tab switching, absence, and anomalous behaviour in real time.',
      color: 'text-cyan-400 bg-cyan-500/8 border-cyan-500/20',
    },
    {
      icon: ShieldCheck,
      title: 'Instant Scoring',
      desc: 'Every answer is scored immediately. Get a full breakdown of correct answers, time taken, and topic coverage.',
      color: 'text-emerald-400 bg-emerald-500/8 border-emerald-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans pt-20 text-white selection:bg-violet-500/30">

      {/* ── Hero ── */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-violet-500/5 blur-[100px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-4 py-1.5 text-sm font-medium text-violet-400"
          >
            <Brain className="h-4 w-4" /> AI-Powered Multiple Choice Assessments
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]"
          >
            Automate MCQ Rounds
            <br />With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
              AI Examiner
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Run proctored MCQ interviews at scale. The AI asks questions verbally, records answers, and scores candidates instantly.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-zinc-600 text-sm mb-10"
          >
            Enter the role you're hiring for to launch a live MCQ session.
          </motion.p>

          {/* input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="mx-auto max-w-2xl"
          >
            <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-violet-500/30">
              <div className="flex items-center gap-3 rounded-xl bg-zinc-900/80 px-4 py-3">
                <div className="shrink-0 text-sm font-medium text-zinc-400 whitespace-nowrap select-none">
                  I want to hire
                </div>
                <div className="h-5 w-px bg-white/10 shrink-0" />
                <input
                  id="mcq-job-title-input"
                  type="text"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  onKeyDown={onKey}
                  placeholder={placeholder + '|'}
                  className="flex-1 bg-transparent text-base font-medium text-white outline-none placeholder:text-zinc-600"
                />
                <Button
                  id="start-mcq-btn"
                  onClick={handleStart}
                  disabled={!jobTitle.trim()}
                  className="shrink-0 rounded-xl bg-violet-500 hover:bg-violet-400 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-500/20 transition-all duration-200 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Brain className="mr-1.5 h-4 w-4" /> Start MCQ Round
                </Button>
              </div>
            </div>
            <p className="mt-3 text-xs text-zinc-700">
              Try: "Frontend Developer", "Data Scientist" — Hit Enter to start
            </p>
          </motion.div>

          {/* chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {chips.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400">
                <Icon className="h-3.5 w-3.5 text-violet-400" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-background border-t border-white/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How the AI MCQ Round Works</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">A completely automated, voice-based MCQ session — no human involvement needed</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Setup', desc: 'Candidate enables camera. AI proctor activates.' },
              { step: '02', title: 'Questions', desc: 'AI reads MCQ questions and options aloud.' },
              { step: '03', title: 'Answers', desc: 'Candidate speaks the answer (A, B, C or D).' },
              { step: '04', title: 'Results', desc: 'Instant score, topic breakdown, and report.' },
            ].map(({ step, title, desc }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-center"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-violet-400 font-bold text-sm border border-violet-500/20">
                  {step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-zinc-500">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MCQ Preview mockup ── */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0f] shadow-2xl"
          >
            {/* header */}
            <div className="bg-[#111114] px-4 py-3 flex items-center justify-between border-b border-black">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-zinc-500 font-mono">AI MCQ Round — Frontend Developer</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Eye className="h-2.5 w-2.5" /> Proctoring On
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col items-center gap-6">
              {/* AI orb */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 via-violet-400/10 to-transparent ring-2 ring-violet-500/30">
                <Brain className="h-9 w-9 text-violet-400" />
              </div>
              <div className="text-center max-w-lg">
                <p className="text-xs text-zinc-600 mb-2 uppercase tracking-wider">Question 3 of 20</p>
                <p className="text-lg font-semibold text-white leading-relaxed">
                  Which of the following React hooks is used to perform side effects in a functional component?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                {[
                  { opt: 'A', label: 'useState' },
                  { opt: 'B', label: 'useEffect', correct: true },
                  { opt: 'C', label: 'useContext' },
                  { opt: 'D', label: 'useReducer' },
                ].map(({ opt, label, correct }) => (
                  <div key={opt} className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${correct ? 'border-violet-500/40 bg-violet-500/10 text-violet-300' : 'border-white/8 bg-white/[0.02] text-zinc-400'}`}>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-bold text-xs ${correct ? 'bg-violet-500 text-white' : 'bg-white/5 text-zinc-500 border border-white/10'}`}>
                      {correct ? <CheckCircle2 className="h-4 w-4" /> : opt}
                    </span>
                    {label}
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-600 italic">Candidate said: "B" — Correct ✓</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-background border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Choose Taurus AI MCQ Platform</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Automate technical knowledge screening with role-specific, AI-generated MCQ rounds — no more manual question creation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl border border-white/8 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-zinc-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-zinc-950 border-t border-white/8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">Automate Your MCQ Screening Today</h2>
            <p className="text-xl text-zinc-400 mb-8">
              Starting at{' '}
              <strong className="text-white bg-violet-500/20 border border-violet-500/30 px-2 py-0.5 rounded-lg text-violet-400">
                $0.50
              </strong>{' '}
              per interview
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => document.getElementById('mcq-job-title-input')?.focus(), 600); }}
                className="rounded-full px-8 py-3 bg-violet-500 hover:bg-violet-400 text-white font-bold text-base"
              >
                <Sparkles className="mr-2 h-4 w-4" /> Try Free Demo
              </Button>
              <Button variant="outline"
                onClick={() => window.location.href = '/contact-us'}
                className="rounded-full px-8 py-3 border-white/15 text-zinc-300 hover:bg-white/8 font-medium text-base"
              >
                Talk to sales <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <MCQInterviewer isOpen={modalOpen} jobTitle={jobTitle} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default MCQInterviewerPage;
