import { useState, useEffect, type KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Layers, Mic, Square, Circle,
  ArrowRight, Sparkles, BarChart3, Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import SystemDesignInterviewer from '@/components/SystemDesignInterviewer';

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
const SystemDesignInterviewerPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const placeholder = useTypewriter([
    'Backend Engineer',
    'Software Architect',
    'Full-Stack Engineer',
    'Platform Engineer',
    'Staff Engineer',
    'Principal Engineer',
  ]);

  const handleStart = () => { if (jobTitle.trim()) setModalOpen(true); };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') handleStart(); };

  const chips = [
    { icon: Layers, label: 'Architecture whiteboard' },
    { icon: Mic, label: 'Voice + drawing' },
    { icon: BarChart3, label: 'AI evaluation' },
    { icon: Clock, label: '45–60 min sessions' },
  ];

  const features = [
    {
      icon: Layers,
      title: 'Interactive Whiteboard',
      desc: 'Candidates draw live system architecture — boxes, circles, arrows, and labeled components — just like a real whiteboard session.',
      color: 'text-cyan-400 bg-cyan-500/8 border-cyan-500/20',
    },
    {
      icon: Mic,
      title: 'Voice + Visual',
      desc: 'Explain your design verbally while drawing. The AI follows along, asks follow-up questions on scalability, trade-offs, and bottlenecks.',
      color: 'text-violet-400 bg-violet-500/8 border-violet-500/20',
    },
    {
      icon: BarChart3,
      title: 'Holistic Scoring',
      desc: 'AI evaluates architecture quality, trade-off reasoning, communication clarity, and depth of technical knowledge.',
      color: 'text-emerald-400 bg-emerald-500/8 border-emerald-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans pt-20 text-white selection:bg-cyan-500/30">

      {/* ── Hero ── */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-cyan-500/5 blur-[100px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/8 px-4 py-1.5 text-sm font-medium text-cyan-400"
          >
            <Layers className="h-4 w-4" /> AI-Powered System Design Interviews
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]"
          >
            Run System Design
            <br />Interviews with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400">
              AI Pilot
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Conduct live architecture interviews with an AI that listens, watches the whiteboard, and probes on trade-offs — all without a human interviewer.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-zinc-600 text-sm mb-10"
          >
            Enter the role you're hiring for to start a system design session.
          </motion.p>

          {/* input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="mx-auto max-w-2xl"
          >
            <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30">
              <div className="flex items-center gap-3 rounded-xl bg-zinc-900/80 px-4 py-3">
                <div className="shrink-0 text-sm font-medium text-zinc-400 whitespace-nowrap select-none">
                  I want to hire
                </div>
                <div className="h-5 w-px bg-white/10 shrink-0" />
                <input
                  id="sd-job-title-input"
                  type="text"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  onKeyDown={onKey}
                  placeholder={placeholder + '|'}
                  className="flex-1 bg-transparent text-base font-medium text-white outline-none placeholder:text-zinc-600"
                />
                <Button
                  id="start-sd-btn"
                  onClick={handleStart}
                  disabled={!jobTitle.trim()}
                  className="shrink-0 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-6 py-2.5 text-sm font-bold text-black shadow-md shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Layers className="mr-1.5 h-4 w-4" /> Start Interview
                </Button>
              </div>
            </div>
            <p className="mt-3 text-xs text-zinc-700">
              Try: "Backend Engineer", "Software Architect", "Staff Engineer"
            </p>
          </motion.div>

          {/* chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {chips.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400">
                <Icon className="h-3.5 w-3.5 text-cyan-400" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Whiteboard mockup ── */}
      <section className="pb-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d0d0f]"
          >
            {/* title bar */}
            <div className="bg-[#111114] px-4 py-2.5 flex items-center justify-between border-b border-black">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-zinc-500 font-mono">System Design Whiteboard — Taurus AI</div>
              <div className="flex items-center gap-2">
                {[
                  { icon: Square, label: 'Box' },
                  { icon: Circle, label: 'Circle' },
                  { icon: ArrowRight, label: 'Arrow' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1 rounded-lg px-2 py-1 border border-white/8 bg-white/[0.04] text-[10px] text-zinc-400">
                    <Icon className="h-3 w-3" /> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* whiteboard preview */}
            <div className="relative h-[400px] overflow-hidden"
              style={{
                background: '#0a0a0d',
                backgroundImage: 'radial-gradient(#ffffff08 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            >
              {/* static demo diagram */}
              {/* client */}
              <div style={{ position: 'absolute', left: 60, top: 80, width: 100, height: 60, border: '2px solid #60a5fa', borderRadius: 8, background: '#60a5fa15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#60a5fa', fontSize: 11, fontWeight: 600 }}>Client</span>
              </div>
              {/* arrow client → lb */}
              <div style={{ position: 'absolute', left: 160, top: 108, width: 80, height: 2, background: '#94a3b8' }} />
              <div style={{ position: 'absolute', left: 236, top: 104, width: 0, height: 0, borderLeft: '8px solid #94a3b8', borderTop: '4px solid transparent', borderBottom: '4px solid transparent' }} />
              {/* load balancer */}
              <div style={{ position: 'absolute', left: 244, top: 70, width: 110, height: 76, border: '2px solid #34d399', borderRadius: 8, background: '#34d39915', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#34d399', fontSize: 11, fontWeight: 600, textAlign: 'center', padding: '0 4px' }}>Load Balancer</span>
              </div>
              {/* arrows lb → servers */}
              <div style={{ position: 'absolute', left: 354, top: 96, width: 70, height: 2, background: '#94a3b8', transform: 'rotate(-20deg)', transformOrigin: '0 50%' }} />
              <div style={{ position: 'absolute', left: 354, top: 110, width: 70, height: 2, background: '#94a3b8' }} />
              <div style={{ position: 'absolute', left: 354, top: 110, width: 70, height: 2, background: '#94a3b8', transform: 'rotate(20deg)', transformOrigin: '0 50%' }} />
              {/* servers */}
              {[40, 90, 140].map((top, i) => (
                <div key={i} style={{ position: 'absolute', left: 430, top, width: 90, height: 50, border: '2px solid #a78bfa', borderRadius: 8, background: '#a78bfa15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#a78bfa', fontSize: 10, fontWeight: 600 }}>API Server {i + 1}</span>
                </div>
              ))}
              {/* arrow → db */}
              <div style={{ position: 'absolute', left: 520, top: 108, width: 80, height: 2, background: '#94a3b8' }} />
              <div style={{ position: 'absolute', left: 596, top: 104, width: 0, height: 0, borderLeft: '8px solid #94a3b8', borderTop: '4px solid transparent', borderBottom: '4px solid transparent' }} />
              {/* database */}
              <div style={{ position: 'absolute', left: 604, top: 70, width: 110, height: 76, border: '2px solid #fbbf24', borderRadius: '50%', background: '#fbbf2415', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fbbf24', fontSize: 11, fontWeight: 600 }}>Database</span>
              </div>
              {/* cache */}
              <div style={{ position: 'absolute', left: 430, top: 220, width: 120, height: 50, border: '2px solid #f472b6', borderRadius: 8, background: '#f472b615', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#f472b6', fontSize: 11, fontWeight: 600 }}>Redis Cache</span>
              </div>
              {/* arrow lb → cache */}
              <div style={{ position: 'absolute', left: 354, top: 120, height: 140, width: 2, background: '#94a3b8', transform: 'rotate(5deg)', transformOrigin: '0 0' }} />

              {/* AI speech bubble */}
              <div style={{ position: 'absolute', right: 40, bottom: 40, maxWidth: 260 }}
                className="rounded-2xl rounded-br-none border border-cyan-500/30 bg-cyan-500/10 px-4 py-3">
                <p className="text-[12px] text-zinc-300 leading-relaxed">
                  <span className="text-cyan-400 font-semibold">AI Interviewer: </span>
                  How would you handle cache invalidation when data in the database changes?
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-background border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Complete System Design Interview Platform</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Give senior candidates a real design challenge — draw, explain, and get evaluated by AI with the depth of a senior engineer.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl border border-white/8 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300"
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
            <h2 className="text-4xl font-bold text-white mb-4">Evaluate Architects at Scale</h2>
            <p className="text-xl text-zinc-400 mb-8">
              Starting at{' '}
              <strong className="text-white bg-cyan-500/20 border border-cyan-500/30 px-2 py-0.5 rounded-lg text-cyan-400">
                $1.00
              </strong>{' '}
              per system design session
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => document.getElementById('sd-job-title-input')?.focus(), 600); }}
                className="rounded-full px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-base"
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

      <SystemDesignInterviewer isOpen={modalOpen} jobTitle={jobTitle} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default SystemDesignInterviewerPage;
