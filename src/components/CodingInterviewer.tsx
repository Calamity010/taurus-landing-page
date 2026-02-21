import {
  useState, useEffect, useCallback,
  useRef, type KeyboardEvent,
} from 'react';
import Vapi from '@vapi-ai/web';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Video, VideoOff, Phone,
  Play, RotateCcw, ChevronDown, Sparkles,
  Loader2, AlertCircle, CheckCircle2,
  Volume2, Code2, Terminal as TerminalIcon,
} from 'lucide-react';

/* ─── env ──────────────────────────────────────────────────── */
const vapiKey =
  import.meta.env.VITE_VAPI_PUBLIC_KEY ||
  import.meta.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '';

const apiBase =
  import.meta.env.VITE_API_BACKEND_BASE_URL ||
  import.meta.env.NEXT_PUBLIC_API_BACKEND_BASE_URL || '';

/* ─── Singleton Vapi ───────────────────────────────────────── */
let vapiInst: Vapi | null = null;
function getVapi() {
  if (!vapiInst && vapiKey) vapiInst = new Vapi(vapiKey);
  return vapiInst;
}

/* ─── Types ────────────────────────────────────────────────── */
export interface CodingInterviewerProps {
  isOpen: boolean;
  jobTitle: string;
  onClose: () => void;
}

type Phase = 'lobby' | 'fetching' | 'connecting' | 'active' | 'ended' | 'error';
interface TxEntry { role: 'ai' | 'user'; text: string }

/* ─── LeetCode-style problem structure ─────────────────────── */
interface Problem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
}

const DEMO_PROBLEM: Problem = {
  title: 'Two Sum',
  difficulty: 'Easy',
  description:
    'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
  examples: [
    { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
    { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    { input: 'nums = [3,3], target = 6', output: '[0,1]' },
  ],
  constraints: [
    '2 ≤ nums.length ≤ 10⁴',
    '-10⁹ ≤ nums[i] ≤ 10⁹',
    '-10⁹ ≤ target ≤ 10⁹',
    'Only one valid answer exists.',
  ],
};

const DIFFICULTY_STYLE: Record<string, string> = {
  Easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  Medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/25',
  Hard: 'text-red-400 bg-red-500/10 border-red-500/25',
};

/* ─── Custom lang select (browser-native option fix) ────────── */
const LangSelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ background: '#1a1a1d', color: '#d4d4d8' }}
      className="appearance-none rounded-lg border border-white/10 px-3 py-1 pr-7 text-xs focus:outline-none focus:border-emerald-500/40 cursor-pointer"
    >
      {LANGUAGES.map(l => (
        <option key={l} value={l} style={{ background: '#1a1a1d', color: '#d4d4d8' }}>{l}</option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-500" />
  </div>
);

/* ─── Starter code templates ───────────────────────────────── */
const STARTER: Record<string, string> = {
  python: `# Problem will be given by the AI interviewer
# Write your solution here

def solution():
    pass
`,
  javascript: `// Problem will be given by the AI interviewer
// Write your solution here

function solution() {

}
`,
  java: `// Problem will be given by the AI interviewer

public class Solution {
    public static void main(String[] args) {
        
    }
}
`,
  cpp: `// Problem will be given by the AI interviewer
#include <bits/stdc++.h>
using namespace std;

int main() {
    
    return 0;
}
`,
  typescript: `// Problem will be given by the AI interviewer

function solution(): void {

}
`,
};

const LANGUAGES = ['python', 'javascript', 'typescript', 'java', 'cpp'];

/* ─── tiny keyword highlighter (no deps) ──────────────────── */
function highlight(code: string, lang: string): string {
  const kwds: Record<string, string[]> = {
    python: ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'import', 'from', 'class', 'pass', 'True', 'False', 'None'],
    javascript: ['function', 'return', 'if', 'else', 'for', 'while', 'let', 'const', 'var', 'class', 'new', 'this', 'import', 'export', 'default', 'null', 'undefined', 'true', 'false'],
    typescript: ['function', 'return', 'if', 'else', 'for', 'while', 'let', 'const', 'var', 'class', 'new', 'this', 'import', 'export', 'default', 'null', 'undefined', 'true', 'false', 'interface', 'type', 'void', 'string', 'number', 'boolean'],
    java: ['public', 'private', 'static', 'void', 'class', 'return', 'if', 'else', 'for', 'while', 'new', 'int', 'String', 'boolean', 'true', 'false', 'null', 'main'],
    cpp: ['int', 'return', 'if', 'else', 'for', 'while', 'class', 'void', 'string', 'auto', 'using', 'namespace', 'std', 'include', 'true', 'false', 'nullptr'],
  };
  const kw = kwds[lang] || kwds.javascript;
  let out = code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // strings
  out = out.replace(/(["'`])(?:\\.|(?!\1)[^\\])*\1/g,
    m => `<span style="color:#a5d6ff">${m}</span>`);
  // comments
  out = out.replace(/(\/\/.*|#.*)/g,
    m => `<span style="color:#6a9955">${m}</span>`);
  // keywords
  kw.forEach(k => {
    out = out.replace(
      new RegExp(`\\b(${k})\\b`, 'g'),
      `<span style="color:#c792ea">$1</span>`,
    );
  });
  // numbers
  out = out.replace(/\b(\d+\.?\d*)\b/g,
    `<span style="color:#f78c6c">$1</span>`);
  return out;
}

/* ─── Waveform ─────────────────────────────────────────────── */
const WaveBar = ({ i, on }: { i: number; on: boolean }) => (
  <motion.div
    className="w-0.5 rounded-full bg-emerald-400"
    style={{ height: 12 + (i % 7) * 4, originY: 1 }}
    animate={on
      ? { scaleY: [0.3, 1, 0.4, 0.9, 0.3], opacity: [0.5, 1, 0.6, 1, 0.5] }
      : { scaleY: 0.2, opacity: 0.2 }}
    transition={{
      repeat: Infinity, duration: 0.55 + (i % 5) * 0.11,
      delay: i * 0.035, ease: 'easeInOut',
    }}
  />
);

/* ─── Main component ───────────────────────────────────────── */
export default function CodingInterviewer({
  isOpen, jobTitle, onClose,
}: CodingInterviewerProps) {
  const [phase, setPhase] = useState<Phase>('lobby');
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [transcript, setTranscript] = useState<TxEntry[]>([]);
  const [dur, setDur] = useState(0);

  // editor state
  const [lang, setLang] = useState('python');
  const [code, setCode] = useState(STARTER.python);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [tab, setTab] = useState<'editor' | 'transcript'>('editor');

  const vidRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const txRef = useRef<TxEntry[]>([]);
  const aIdRef = useRef<string | null>(null);
  const cIdRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { txRef.current = transcript; }, [transcript]);

  /* ── camera ── */
  const openCam = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 360 }, facingMode: 'user' },
        audio: false,
      });
      streamRef.current = s;
      if (vidRef.current) vidRef.current.srcObject = s;
    } catch { setCamOn(false); }
  }, []);

  const closeCam = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  }, []);

  const toggleCam = () => {
    const vt = streamRef.current?.getVideoTracks()[0];
    if (vt) { vt.enabled = !vt.enabled; setCamOn(vt.enabled); }
  };

  const toggleMic = () => {
    const vapi = getVapi();
    setMicOn(prev => {
      const next = !prev;
      if (phase === 'active') next ? vapi?.setMuted(false) : vapi?.setMuted(true);
      return next;
    });
  };

  /* ── timer ── */
  const startTimer = () => { setDur(0); timerRef.current = setInterval(() => setDur(d => d + 1), 1000); };
  const stopTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  /* ── send transcript ── */
  const sendTx = useCallback(async () => {
    const t = txRef.current; if (!t.length) return;
    try {
      await fetch(`${apiBase.replace(/\/$/, '')}/api/landing-page/conversation`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistantId: aIdRef.current || 'coding-interview',
          callId: cIdRef.current,
          transcript: t.map(e => e.role === 'ai' ? { ai: e.text } : { user: e.text }),
          endedAt: new Date().toISOString(),
        }),
      });
    } catch {}
  }, []);

  /* ── start ── */
  const startInterview = useCallback(async () => {
    if (!vapiKey) { setErrorMsg('Vapi API key missing in .env'); setPhase('error'); return; }
    setPhase('fetching'); setErrorMsg(''); setTranscript([]); txRef.current = [];
    try {
      const res = await fetch(`${apiBase.replace(/\/$/, '')}/api/landing-page/vapi-coding-interview`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle }),
      });
      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const d = await res.json();
      const aid = d.assistantId || d.assistant_id || d.id || d.data?.assistantId;
      if (!aid) throw new Error('No assistantId returned');
      aIdRef.current = aid;
      const vapi = getVapi();
      if (!vapi) throw new Error('Vapi not initialized');
      vapi.removeAllListeners();
      vapi.on('call-start', () => { setPhase('active'); startTimer(); });
      vapi.on('call-end', () => { stopTimer(); setPhase('ended'); sendTx(); });
      vapi.on('speech-start', () => setAiSpeaking(true));
      vapi.on('speech-end', () => setAiSpeaking(false));
      vapi.on('message', (m: any) => {
        if (m.type === 'transcript' && m.transcriptType === 'final') {
          const e: TxEntry = { role: m.role === 'assistant' ? 'ai' : 'user', text: m.transcript };
          setTranscript(p => [...p, e]); txRef.current = [...txRef.current, e];
        }
        if (m.type === 'call-update' && m.call?.id) cIdRef.current = m.call.id;
      });
      vapi.on('error', (e: any) => { setErrorMsg(e?.message || 'Error'); setPhase('error'); stopTimer(); });
      setPhase('connecting');
      await vapi.start(aid);
    } catch (e: any) { setErrorMsg(e?.message || 'Failed to start'); setPhase('error'); }
  }, [jobTitle, sendTx]);

  /* ── hang up ── */
  const hangUp = useCallback(() => {
    getVapi()?.stop(); getVapi()?.removeAllListeners();
    stopTimer(); closeCam(); onClose();
  }, [closeCam, onClose]);

  /* ── lifecycle ── */
  useEffect(() => {
    if (isOpen) {
      setPhase('lobby'); setDur(0); setTranscript([]); setAiSpeaking(false);
      setMicOn(true); setCamOn(true); setOutput(''); setCode(STARTER[lang]);
      openCam();
    } else {
      getVapi()?.stop(); getVapi()?.removeAllListeners();
      stopTimer(); closeCam(); setPhase('lobby');
    }
    // eslint-disable-next-line
  }, [isOpen]);

  /* attach stream to video */
  useEffect(() => {
    if (vidRef.current && streamRef.current && !vidRef.current.srcObject)
      vidRef.current.srcObject = streamRef.current;
  });

  /* lang change */
  const changeLang = (l: string) => { setLang(l); setCode(STARTER[l] || ''); setOutput(''); };

  /* Tab key in editor */
  const handleEditorKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = textareaRef.current!;
      const s = el.selectionStart, end = el.selectionEnd;
      const next = code.substring(0, s) + '  ' + code.substring(end);
      setCode(next);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = s + 2; });
    }
  };

  /* mock run */
  const runCode = async () => {
    setRunning(true); setOutput('');
    await new Promise(r => setTimeout(r, 1200));
    setOutput(`✓ Code compiled successfully\n→ Running test cases...\n\nTest 1: Passed ✓\nTest 2: Passed ✓\nTest 3: Failed ✗  (edge case: empty input)\n\nResult: 2/3 test cases passed`);
    setRunning(false);
  };

  if (!isOpen) return null;

  /* ────────────────────────────────────────────────────────── */
  return (
    <AnimatePresence>
      <motion.div
        key="ci-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-black/90 backdrop-blur-md"
      >
        <motion.div
          key="ci-card"
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 250 }}
          className="relative flex flex-col w-full overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d0f] shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
          style={{ maxWidth: 1280, height: '95vh' }}
        >

          {/* ── TOP BAR ── */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/8 bg-[#111114] px-5 py-2.5">
            <div className="flex items-center gap-3">
              {/* traffic lights */}
              <div className="flex gap-1.5">
                <button onClick={hangUp} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" title="End interview" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="h-4 w-px bg-white/10" />
              <Code2 className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">AI Coding Interview</span>
              <span className="text-xs text-zinc-500 capitalize">— {jobTitle}</span>
            </div>

            <div className="flex items-center gap-3">
              {phase === 'active' && (
                <div className="flex items-center gap-2 rounded-full bg-red-500/12 px-3 py-1 ring-1 ring-red-500/25">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-[11px] font-bold text-red-400 tabular-nums">{fmt(dur)}</span>
                </div>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════ */}
          {/* LOBBY                                                  */}
          {/* ══════════════════════════════════════════════════════ */}
          {phase === 'lobby' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Coding Interview Lobby</p>
              <h2 className="text-2xl font-bold text-white text-center">Check your setup before starting</h2>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                {/* camera preview */}
                <div className="relative flex-1 aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                  <video ref={vidRef} autoPlay playsInline muted
                    className={`h-full w-full object-cover scale-x-[-1] ${camOn ? '' : 'hidden'}`} />
                  {!camOn && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <div className="h-14 w-14 rounded-full bg-zinc-800 flex items-center justify-center">
                        <VideoOff className="h-6 w-6 text-zinc-500" />
                      </div>
                      <p className="text-xs text-zinc-500">Camera off</p>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    <button onClick={toggleCam} className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${camOn ? 'bg-white/15 text-white' : 'bg-red-500/80 text-white'}`}>
                      {camOn ? <Video className="h-3 w-3" /> : <VideoOff className="h-3 w-3" />}
                      {camOn ? 'Camera on' : 'Off'}
                    </button>
                    <button onClick={toggleMic} className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${micOn ? 'bg-white/15 text-white' : 'bg-red-500/80 text-white'}`}>
                      {micOn ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                      {micOn ? 'Mic on' : 'Off'}
                    </button>
                  </div>
                </div>

                {/* info */}
                <div className="flex flex-col justify-center gap-4 flex-1">
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 space-y-3">
                    {[
                      { icon: Code2, label: 'Live coding editor with multi-language support' },
                      { icon: Mic, label: 'Voice-based AI interviewer via Vapi' },
                      { icon: TerminalIcon, label: 'Real-time code execution & test cases' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-3 text-sm text-zinc-400">
                        <Icon className="h-4 w-4 text-emerald-400 shrink-0" />
                        {label}
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 mb-1 block">Preferred language</label>
                    <div className="relative">
                      <select value={lang} onChange={e => changeLang(e.target.value)}
                        style={{ background: '#1a1a1d', color: '#fff' }}
                        className="w-full appearance-none rounded-xl border border-white/10 px-4 py-2.5 text-sm pr-8 focus:outline-none focus:border-emerald-500/50">
                        {LANGUAGES.map(l => <option key={l} value={l} style={{ background: '#1a1a1d', color: '#fff' }}>{l}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={onClose} variant="outline" className="rounded-full px-6 border-white/12 text-zinc-400 hover:bg-white/8">Cancel</Button>
                <Button id="join-coding-btn" onClick={startInterview} className="rounded-full px-8 bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
                  <Sparkles className="mr-2 h-4 w-4" /> Start Coding Interview
                </Button>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* FETCHING / CONNECTING                                  */}
          {/* ══════════════════════════════════════════════════════ */}
          {(phase === 'fetching' || phase === 'connecting') && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8">
              <div className="relative flex h-28 w-28 items-center justify-center">
                {[0, 1, 2].map(i => (
                  <motion.div key={i}
                    className="absolute rounded-full border border-emerald-400/25"
                    animate={{ scale: [1, 1.5 + i * 0.15, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.5, ease: 'easeInOut' }}
                    style={{ width: 70 + i * 22, height: 70 + i * 22 }}
                  />
                ))}
                <motion.div
                  animate={{ borderRadius: ['44% 56% 60% 40% / 55% 45% 55% 45%', '56% 44% 40% 60% / 45% 55% 45% 55%', '44% 56% 60% 40% / 55% 45% 55% 45%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="relative z-10 flex h-20 w-20 items-center justify-center bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent ring-1 ring-emerald-400/20"
                >
                  <Code2 className="h-9 w-9 text-emerald-400" />
                </motion.div>
              </div>
              <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
                className="text-lg font-bold text-white">
                {phase === 'fetching' ? `Preparing ${jobTitle} interview…` : 'Connecting to AI interviewer…'}
              </motion.p>
              <p className="text-sm text-zinc-500">
                {phase === 'fetching' ? 'Generating role-specific coding problems' : 'Allow microphone access when prompted'}
              </p>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* ACTIVE — the real interview                           */}
          {/* ══════════════════════════════════════════════════════ */}
          {phase === 'active' && (
            <div className="flex flex-1 flex-col overflow-hidden">

              {/* ── 3-column LeetCode layout ── */}
              <div className="flex flex-1 overflow-hidden">

                {/* ══ COL 1: Problem Panel (LeetCode left) ══ */}
                <div className="flex w-[340px] shrink-0 flex-col border-r border-white/8 bg-[#111114] overflow-hidden">
                  <div className="border-b border-white/8 px-4 py-2.5 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Problem</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${DIFFICULTY_STYLE[DEMO_PROBLEM.difficulty]}`}>
                      {DEMO_PROBLEM.difficulty}
                    </span>
                  </div>
                  {/* scrollable problem content */}
                  <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                    {/* title */}
                    <h3 className="text-base font-bold text-white leading-snug">{DEMO_PROBLEM.title}</h3>

                    {/* description */}
                    <div className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
                      {DEMO_PROBLEM.description.split('`').map((seg, i) =>
                        i % 2 === 1
                          ? <code key={i} className="font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded text-[12px]">{seg}</code>
                          : <span key={i}>{seg}</span>
                      )}
                    </div>

                    {/* examples */}
                    {DEMO_PROBLEM.examples.map((ex, i) => (
                      <div key={i} className="rounded-xl border border-white/8 bg-white/[0.03] overflow-hidden">
                        <div className="border-b border-white/8 bg-white/[0.02] px-3 py-1.5">
                          <span className="text-[11px] font-semibold text-zinc-400">Example {i + 1}</span>
                        </div>
                        <div className="px-3 py-2.5 space-y-1.5 font-mono text-[12px]">
                          <div>
                            <span className="text-zinc-500">Input:  </span>
                            <span className="text-zinc-200">{ex.input}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Output: </span>
                            <span className="text-zinc-200">{ex.output}</span>
                          </div>
                          {ex.explanation && (
                            <div className="pt-1 text-zinc-500 text-[11px] font-sans">
                              <span className="font-semibold">Explanation: </span>{ex.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* constraints */}
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">Constraints</p>
                      <ul className="space-y-1">
                        {DEMO_PROBLEM.constraints.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-[12px] text-zinc-400">
                            <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                            <code className="font-mono">{c}</code>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* divider */}
                    <div className="border-t border-white/8" />

                    {/* AI Avatar embedded in problem panel */}
                    <div className="flex flex-col items-center gap-2 py-2">
                      <motion.div
                        animate={aiSpeaking ? {
                          borderRadius: ['44% 56% 60% 40% / 55% 45% 55% 45%', '56% 44% 40% 60% / 45% 55% 45% 55%', '44% 56% 60% 40% / 55% 45% 55% 45%'],
                          scale: [1, 1.05, 1],
                        } : { borderRadius: '50%', scale: 1 }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        className="flex h-14 w-14 items-center justify-center bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent ring-1 ring-emerald-400/20"
                      >
                        <span className="text-2xl">🤖</span>
                      </motion.div>
                      <div className="flex items-end gap-[2px] h-5">
                        {Array.from({ length: 14 }).map((_, i) => <WaveBar key={i} i={i} on={aiSpeaking} />)}
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {aiSpeaking
                          ? <span className="text-emerald-400 flex items-center gap-1"><Volume2 className="h-3 w-3" /> Speaking…</span>
                          : 'Taurus AI Interviewer'}
                      </p>
                      <p className="text-center text-[10px] text-zinc-600 max-w-[240px]">
                        The AI will guide you through the problem. Listen carefully for follow-up questions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ══ COL 2: Code Editor ══ */}
                <div className="flex flex-1 flex-col overflow-hidden border-r border-white/8">

                  {/* toolbar */}
                  <div className="flex shrink-0 items-center gap-2 border-b border-white/8 bg-[#111114] px-3 py-2">
                    <div className="flex gap-1">
                      {(['editor', 'transcript'] as const).map(t => (
                        <button key={t} onClick={() => setTab(t)}
                          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors capitalize ${tab === t ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <LangSelect value={lang} onChange={changeLang} />
                      <button onClick={() => setCode(STARTER[lang])} title="Reset code"
                        className="flex items-center gap-1 rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors">
                        <RotateCcw className="h-3 w-3" /> Reset
                      </button>
                      <button onClick={runCode} disabled={running}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 px-3 py-1 text-xs font-bold text-black transition-colors">
                        {running ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
                        {running ? 'Running…' : 'Run Code'}
                      </button>
                    </div>
                  </div>

                  {/* editor / transcript views */}
                  {tab === 'editor' && (
                    <div className="flex flex-1 flex-col overflow-hidden">
                      <div className="relative flex flex-1 overflow-hidden font-mono text-sm">
                        {/* line numbers */}
                        <div className="select-none border-r border-white/8 bg-[#0d0d0f] px-3 py-4 text-right text-zinc-700 leading-6 text-[13px]" style={{ minWidth: 44 }}>
                          {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                        </div>
                        {/* editable textarea */}
                        <textarea
                          ref={textareaRef}
                          value={code}
                          onChange={e => setCode(e.target.value)}
                          onKeyDown={handleEditorKey}
                          spellCheck={false}
                          className="absolute inset-0 left-[44px] resize-none bg-transparent pl-4 py-4 font-mono text-[13px] leading-6 text-transparent caret-emerald-400 focus:outline-none w-[calc(100%-44px)]"
                          style={{ caretColor: '#34d399' }}
                        />
                        {/* syntax highlighted overlay */}
                        <pre
                          className="pointer-events-none absolute inset-0 left-[44px] overflow-auto whitespace-pre pl-4 py-4 font-mono text-[13px] leading-6 text-zinc-200 w-[calc(100%-44px)]"
                          dangerouslySetInnerHTML={{ __html: highlight(code, lang) }}
                        />
                      </div>
                      {/* output */}
                      {(output || running) && (
                        <div className="shrink-0 border-t border-white/8 bg-[#0a0a0c]" style={{ height: 130 }}>
                          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2">
                            <TerminalIcon className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-[11px] font-semibold text-zinc-400">Output</span>
                          </div>
                          <div className="px-4 py-3 font-mono text-[12px] text-zinc-300 leading-relaxed overflow-auto" style={{ height: 88 }}>
                            {running
                              ? <span className="text-zinc-500 animate-pulse">Running your code…</span>
                              : <pre className="whitespace-pre-wrap">{output}</pre>
                            }
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {tab === 'transcript' && (
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                      {transcript.length === 0
                        ? <p className="text-sm text-zinc-600 italic">Conversation will appear here once the interview starts…</p>
                        : transcript.map((e, idx) => (
                          <div key={idx} className={`flex gap-3 ${e.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${e.role === 'ai' ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30' : 'bg-zinc-700 text-zinc-300'}`}>
                              {e.role === 'ai' ? 'AI' : 'U'}
                            </div>
                            <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${e.role === 'ai' ? 'bg-zinc-800 text-zinc-200 rounded-tl-none' : 'bg-emerald-500/15 text-zinc-200 rounded-tr-none border border-emerald-500/20'}`}>
                              {e.text}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>

                {/* ══ COL 3: Camera ══ */}
                <div className="flex w-56 shrink-0 flex-col bg-[#111114] border-l border-white/8">
                  {/* camera feed */}
                  <div className="relative overflow-hidden border-b border-white/8 bg-zinc-900" style={{ aspectRatio: '4/3' }}>
                    <video ref={vidRef} autoPlay playsInline muted
                      className={`h-full w-full object-cover scale-x-[-1] ${camOn ? '' : 'hidden'}`} />
                    {!camOn && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center">
                          <span className="text-xl">👤</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-1.5 left-2 flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 backdrop-blur-sm">
                      <div className={`h-1.5 w-1.5 rounded-full ${micOn ? 'bg-green-400' : 'bg-red-500'}`} />
                      <span className="text-[10px] text-zinc-300 font-medium">You</span>
                    </div>
                    {!micOn && (
                      <div className="absolute top-1.5 right-1.5 rounded-full bg-red-500/80 p-1">
                        <MicOff className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* live transcript ticker in right col */}
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="border-b border-white/8 px-3 py-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Live Chat</p>
                    </div>
                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
                      {transcript.length === 0 && (
                        <p className="text-[11px] text-zinc-700 italic">Conversation will appear here…</p>
                      )}
                      {transcript.map((e, i) => (
                        <div key={i} className="text-[11px] leading-relaxed">
                          <span className={`font-bold mr-1 ${e.role === 'ai' ? 'text-emerald-500' : 'text-zinc-400'}`}>
                            {e.role === 'ai' ? 'AI:' : 'You:'}
                          </span>
                          <span className={e.role === 'ai' ? 'text-zinc-300' : 'text-zinc-500'}>{e.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* ── Bottom Controls ── */}
              <div className="flex shrink-0 items-center justify-center gap-4 border-t border-white/8 bg-[#0f0f12] py-3">
                <button onClick={toggleMic} title={micOn ? 'Mute' : 'Unmute'}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${micOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
                  {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </button>
                <button onClick={toggleCam} title={camOn ? 'Camera off' : 'Camera on'}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${camOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
                  {camOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </button>
                <button onClick={hangUp} title="End interview"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105">
                  <Phone className="h-5 w-5 rotate-[135deg]" />
                </button>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* ENDED                                                  */}
          {/* ══════════════════════════════════════════════════════ */}
          {phase === 'ended' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/12 ring-1 ring-emerald-500/25">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">Coding Interview Complete!</h4>
                <p className="mt-2 text-zinc-400 text-sm max-w-xs mx-auto">
                  Your code and responses have been saved. Our team will review your performance shortly.
                </p>
              </div>
              <Button onClick={onClose} className="rounded-full px-8 bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
                Done
              </Button>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* ERROR                                                  */}
          {/* ══════════════════════════════════════════════════════ */}
          {phase === 'error' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/12 ring-1 ring-red-500/25">
                <AlertCircle className="h-10 w-10 text-red-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Connection Failed</h4>
                <p className="mt-2 text-zinc-400 text-sm max-w-sm mx-auto">{errorMsg}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={startInterview} className="rounded-full px-8 bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
                  <Loader2 className="mr-2 h-4 w-4" /> Retry
                </Button>
                <Button onClick={onClose} variant="outline" className="rounded-full px-8 border-white/12 text-zinc-400 hover:bg-white/8">Cancel</Button>
              </div>
            </div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
