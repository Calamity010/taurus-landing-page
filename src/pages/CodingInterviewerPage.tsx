import { useState, useEffect, type KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Code2, Terminal, Cpu, Check,
  ListChecks, Sparkles, Brain, ShieldCheck,
  BarChart3, Clock, ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import CodingInterviewer from '@/components/CodingInterviewer';

/* ─── Typing placeholder hook ──────────────────────────────── */
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
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [display, deleting, idx, words]);

  return display;
}

/* ─── Page ─────────────────────────────────────────────────── */
const CodingInterviewerPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const placeholder = useTypewriter([
    'Python Developer',
    'Backend Engineer',
    'Full-Stack Developer',
    'Data Engineer',
    'DevOps Engineer',
    'Java Developer',
  ]);

  const handleStart = () => {
    if (!jobTitle.trim()) return;
    setModalOpen(true);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleStart();
  };

  const chips = [
    { icon: Brain, label: 'Role-specific problems' },
    { icon: ShieldCheck, label: 'Anti-cheating proctoring' },
    { icon: BarChart3, label: 'Instant scoring' },
    { icon: Clock, label: '30+ languages' },
  ];

  return (
    <div className="min-h-screen bg-background font-sans pt-20 text-white selection:bg-emerald-500/30">

      {/* ── Hero ── */}
      <section className="relative pt-16 pb-24 overflow-hidden">

        {/* bg grid */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:22px_22px]" />
        {/* emerald glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-emerald-500/5 blur-[100px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-4 py-1.5 text-sm font-medium text-emerald-400"
          >
            <Terminal className="h-4 w-4" />
            AI-Powered Technical Assessments
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]"
          >
            Conduct Coding Interviews
            <br />
            With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              AI Pilot
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Run live coding interviews with Taurus AI. Automate assessments, get instant scores and hire developers faster.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-600 text-sm mb-10"
          >
            Type the role you're hiring for — AI sets up a real coding round instantly.
          </motion.p>

          {/* ── "I want to hire" input ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mx-auto max-w-2xl"
          >
            <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.06]">
              <div className="flex items-center gap-3 rounded-xl bg-zinc-900/80 px-4 py-3">
                <div className="shrink-0 text-sm font-medium text-zinc-400 whitespace-nowrap select-none">
                  I want to hire
                </div>
                <div className="h-5 w-px bg-white/10 shrink-0" />
                <input
                  id="coding-job-title-input"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  onKeyDown={onKey}
                  placeholder={placeholder + '|'}
                  className="flex-1 bg-transparent text-base font-medium text-white outline-none placeholder:text-zinc-600"
                />
                <Button
                  id="start-coding-interview-btn"
                  onClick={handleStart}
                  disabled={!jobTitle.trim()}
                  className="shrink-0 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-2.5 text-sm font-bold text-black shadow-md shadow-emerald-500/20 transition-all duration-200 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Code2 className="mr-1.5 h-4 w-4" />
                  Start Interview
                </Button>
              </div>
            </div>
            <p className="mt-3 text-xs text-zinc-700">
              Try: "Python Developer", "Backend Engineer", "Full-Stack Developer" — Hit Enter to start
            </p>
          </motion.div>

          {/* chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {chips.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400">
                <Icon className="h-3.5 w-3.5 text-emerald-400" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* bg decorations */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
      </section>

      {/* ── IDE Mockup ── */}
      <section className="pb-28 bg-background relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d0d0f]"
          >
            {/* IDE Header */}
            <div className="bg-[#111114] px-4 py-2.5 flex items-center justify-between border-b border-black">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-zinc-500 font-mono">solution.py — Taurus AI Coding Interview</div>
              <div className="w-16" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
              {/* Code Editor */}
              <div className="border-r border-black p-0 font-mono text-sm text-left overflow-hidden">
                <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2 bg-[#111114]">
                  <Code2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-xs text-zinc-400">solution.py</span>
                  <span className="ml-auto text-xs text-emerald-500 bg-emerald-500/10 rounded px-1.5 py-0.5">Python</span>
                </div>
                <div className="p-5 overflow-x-auto">
                  <div className="flex">
                    <div className="select-none text-right text-zinc-700 mr-4 space-y-1.5 text-[13px] leading-6" style={{ minWidth: 24 }}>
                      {Array.from({ length: 13 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                    </div>
                    <div className="leading-6 text-[13px] space-y-0">
                      <div><span className="text-zinc-600"># Task: Find longest substring without repeating characters</span></div>
                      <div>&nbsp;</div>
                      <div><span className="text-purple-400">def </span><span className="text-yellow-300">longest_unique_substring</span><span className="text-zinc-200">(s):</span></div>
                      <div className="pl-6"><span className="text-purple-400">if not</span> <span className="text-zinc-200">s:</span> <span className="text-purple-400">return</span> <span className="text-orange-400">0</span></div>
                      <div className="pl-6"><span className="text-zinc-200">seen = {'{}'}</span></div>
                      <div className="pl-6"><span className="text-zinc-200">start = </span><span className="text-orange-400">0</span></div>
                      <div className="pl-6"><span className="text-zinc-200">max_len = </span><span className="text-orange-400">0</span></div>
                      <div>&nbsp;</div>
                      <div className="pl-6"><span className="text-purple-400">for</span> <span className="text-zinc-200">i, char</span> <span className="text-purple-400">in</span> <span className="text-zinc-300">enumerate(s):</span></div>
                      <div className="pl-12"><span className="text-purple-400">if</span> <span className="text-zinc-200">char</span> <span className="text-purple-400">in</span> <span className="text-zinc-200">seen</span> <span className="text-purple-400">and</span> <span className="text-zinc-200">start &lt;= seen[char]:</span></div>
                      <div className="pl-16"><span className="text-zinc-200">start = seen[char] + </span><span className="text-orange-400">1</span></div>
                      <div className="pl-12"><span className="text-purple-400">else</span><span className="text-zinc-200">:</span></div>
                      <div className="pl-16"><span className="text-zinc-200">max_len = max(max_len, i - start + </span><span className="text-orange-400">1</span><span className="text-zinc-200">)</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Interaction Panel */}
              <div className="bg-[#111114] flex flex-col">
                <div className="p-4 border-b border-black bg-[#111114]">
                  <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
                    <Cpu size={16} className="text-emerald-500" /> AI Interviewer
                  </h3>
                </div>
                <div className="flex-1 p-4 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-900/40 flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <Terminal size={13} className="text-emerald-400" />
                    </div>
                    <div className="bg-zinc-800/60 rounded-xl rounded-tl-none p-3 text-sm text-zinc-300 max-w-[80%]">
                      Can you explain the time complexity of your solution?
                    </div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 text-xs font-bold">U</div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl rounded-tr-none p-3 text-sm text-zinc-300 max-w-[80%]">
                      It's O(n) since we iterate through the string once using a sliding window approach.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-900/40 flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <Terminal size={13} className="text-emerald-400" />
                    </div>
                    <div className="bg-zinc-800/60 rounded-xl rounded-tl-none p-3 text-sm text-zinc-300 max-w-[80%]">
                      Correct! Space complexity is O(min(n, m)) where m is the character set. Can you handle Unicode?
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-black bg-[#111114] flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="text-xs text-emerald-500 flex items-center gap-1">
                      <Check size={12} /> All Test Cases Passed
                    </span>
                  </div>
                  <button className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 text-xs font-bold text-black transition-colors">
                    <Terminal size={13} /> Run Code
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why section ── */}
      <section className="py-24 bg-background border-t border-white/8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Why Choose Taurus AI Coding Interview Platform
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Transform your technical hiring process with AI. Conduct live coding interviews, evaluate candidates and get detailed reports — all in one session.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: 'Real-world Coding Environment',
                desc: 'Support for 30+ languages including Python, Java, C++, and JavaScript with syntax highlighting and keyboard shortcuts.',
                color: 'text-emerald-400 bg-emerald-500/8 border-emerald-500/20',
              },
              {
                icon: Terminal,
                title: 'AI Pair Programming',
                desc: 'The AI acts as a live interviewer, asking follow-up questions about complexity, edge cases, and optimization strategies.',
                color: 'text-cyan-400 bg-cyan-500/8 border-cyan-500/20',
              },
              {
                icon: ListChecks,
                title: 'Automated Grading',
                desc: 'Get instant scores on correctness, efficiency, code style, and problem-solving approach with detailed breakdowns.',
                color: 'text-violet-400 bg-violet-500/8 border-violet-500/20',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl border border-white/8 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
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

      {/* ── Pricing CTA ── */}
      <section className="py-20 bg-zinc-950 border-t border-white/8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Enterprise-Grade Coding Interview Platform
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Pricing starts as low as{' '}
              <strong className="text-white bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-lg text-emerald-400">
                $1.00
              </strong>{' '}
              per interview
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => document.getElementById('coding-job-title-input')?.focus(), 600);
                }}
                className="rounded-full px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base"
              >
                <Sparkles className="mr-2 h-4 w-4" /> Try Free Demo
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/contact-us'}
                className="rounded-full px-8 py-3 border-white/15 text-zinc-300 hover:bg-white/8 font-medium text-base"
              >
                Talk to sales <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Coding Interviewer Modal ── */}
      <CodingInterviewer
        isOpen={modalOpen}
        jobTitle={jobTitle}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CodingInterviewerPage;
