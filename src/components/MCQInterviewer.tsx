import {
  useState, useEffect, useCallback, useRef,
} from 'react';
import Vapi from '@vapi-ai/web';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Video, VideoOff, Phone,
  Sparkles, AlertCircle, CheckCircle2,
  Volume2, Brain, ShieldCheck, Eye,
  ChevronRight, ChevronLeft, BarChart3,
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
export interface MCQInterviewerProps {
  isOpen: boolean;
  jobTitle: string;
  onClose: () => void;
}

type Phase = 'lobby' | 'fetching' | 'active' | 'results' | 'error';

interface MCQOption {
  label: string; // "A" | "B" | "C" | "D"
  text: string;
}

interface MCQQuestion {
  id: number;
  question: string;
  options: MCQOption[];
  correctAnswer?: string; // optional — backend may or may not send
  explanation?: string;
}

/* ─── Static fallback questions (used when backend has no questions endpoint) ─── */
function buildFallbackQuestions(jobTitle: string): MCQQuestion[] {
  const jt = jobTitle.toLowerCase();
  const isFrontend = jt.includes('front') || jt.includes('react') || jt.includes('vue');
  const isBackend = jt.includes('back') || jt.includes('node') || jt.includes('python') || jt.includes('java');

  const general: MCQQuestion[] = [
    {
      id: 1,
      question: 'Which data structure follows the LIFO (Last In, First Out) principle?',
      options: [
        { label: 'A', text: 'Queue' },
        { label: 'B', text: 'Stack' },
        { label: 'C', text: 'Linked List' },
        { label: 'D', text: 'Binary Tree' },
      ],
      correctAnswer: 'B',
      explanation: 'A Stack uses LIFO — the last element pushed is the first one popped.',
    },
    {
      id: 2,
      question: 'What is the time complexity of binary search on a sorted array?',
      options: [
        { label: 'A', text: 'O(n)' },
        { label: 'B', text: 'O(n²)' },
        { label: 'C', text: 'O(log n)' },
        { label: 'D', text: 'O(1)' },
      ],
      correctAnswer: 'C',
      explanation: 'Binary search halves the search space each step, giving O(log n) complexity.',
    },
    {
      id: 3,
      question: 'Which HTTP method is idempotent and used to update a resource completely?',
      options: [
        { label: 'A', text: 'POST' },
        { label: 'B', text: 'PATCH' },
        { label: 'C', text: 'PUT' },
        { label: 'D', text: 'DELETE' },
      ],
      correctAnswer: 'C',
      explanation: 'PUT replaces the entire resource and is idempotent — calling it multiple times gives the same result.',
    },
    {
      id: 4,
      question: 'In object-oriented programming, what does encapsulation mean?',
      options: [
        { label: 'A', text: 'A class can inherit from multiple parent classes' },
        { label: 'B', text: 'Bundling data and methods that operate on the data within one unit' },
        { label: 'C', text: 'Defining multiple methods with the same name but different parameters' },
        { label: 'D', text: 'Creating objects from abstract classes' },
      ],
      correctAnswer: 'B',
      explanation: 'Encapsulation bundles data (fields) and behavior (methods) together and controls access via modifiers.',
    },
    {
      id: 5,
      question: 'What does SQL\'s GROUP BY clause do?',
      options: [
        { label: 'A', text: 'Sorts query results in ascending order' },
        { label: 'B', text: 'Filters rows after aggregation' },
        { label: 'C', text: 'Groups rows sharing a common value for aggregate functions' },
        { label: 'D', text: 'Joins two tables on a matching column' },
      ],
      correctAnswer: 'C',
      explanation: 'GROUP BY groups rows with the same value in specified columns, enabling aggregate functions like COUNT, SUM.',
    },
  ];

  const frontendExtra: MCQQuestion[] = [
    {
      id: 6,
      question: 'In React, when does a component re-render?',
      options: [
        { label: 'A', text: 'Only when the page is refreshed' },
        { label: 'B', text: 'When its state or props change' },
        { label: 'C', text: 'When any component in the app updates' },
        { label: 'D', text: 'Only when the parent unmounts' },
      ],
      correctAnswer: 'B',
      explanation: 'React re-renders a component when its own state changes or when the props passed to it change.',
    },
    {
      id: 7,
      question: 'What is the purpose of the CSS `z-index` property?',
      options: [
        { label: 'A', text: 'Sets the zoom level of an element' },
        { label: 'B', text: 'Controls the horizontal position of an element' },
        { label: 'C', text: 'Controls the stacking order of positioned elements' },
        { label: 'D', text: 'Defines the element\'s border width' },
      ],
      correctAnswer: 'C',
      explanation: 'z-index controls which element appears on top when elements overlap in the stacking context.',
    },
  ];

  const backendExtra: MCQQuestion[] = [
    {
      id: 6,
      question: 'What is a database index and why is it useful?',
      options: [
        { label: 'A', text: 'A copy of the database stored in memory' },
        { label: 'B', text: 'A data structure that improves query performance at the cost of extra storage' },
        { label: 'C', text: 'The primary key column of a table' },
        { label: 'D', text: 'A stored procedure that validates data on insert' },
      ],
      correctAnswer: 'B',
      explanation: 'An index speeds up reads by maintaining a sorted structure over column(s), but takes extra space and slows writes slightly.',
    },
    {
      id: 7,
      question: 'What is the difference between authentication and authorisation?',
      options: [
        { label: 'A', text: 'They are the same concept' },
        { label: 'B', text: 'Authentication encrypts data; authorisation decrypts it' },
        { label: 'C', text: 'Authentication verifies who you are; authorisation determines what you can do' },
        { label: 'D', text: 'Authentication is server-side; authorisation is client-side' },
      ],
      correctAnswer: 'C',
      explanation: 'Auth-n = identity verification (login); Auth-z = permission checking (can this user access this resource).',
    },
  ];

  return [
    ...general,
    ...(isFrontend ? frontendExtra : isBackend ? backendExtra : []),
  ];
}

/* ─── Try to parse questions from backend response ─────────── */
function parseBackendQuestions(data: any): MCQQuestion[] | null {
  try {
    // Common response shapes
    const arr: any[] =
      data.questions ?? data.data?.questions ?? data.mcq ?? data.data?.mcq ?? null;
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr.map((q: any, i: number) => ({
      id: q.id ?? i + 1,
      question: q.question ?? q.text ?? q.q ?? '',
      options: (['A', 'B', 'C', 'D'] as const).map(lbl => ({
        label: lbl,
        text: q.options?.[lbl] ?? q[`option${lbl}`] ?? q.options?.[lbl.toLowerCase()] ?? `Option ${lbl}`,
      })).filter(o => o.text && o.text !== `Option ${o.label}`),
      correctAnswer: q.correctAnswer ?? q.correct_answer ?? q.answer ?? undefined,
      explanation: q.explanation ?? q.reason ?? undefined,
    })).filter(q => q.question && q.options.length >= 2);
  } catch { return null; }
}

/* ─── Waveform ─────────────────────────────────────────────── */
const WaveBar = ({ i, on }: { i: number; on: boolean }) => (
  <motion.div
    className="w-0.5 rounded-full bg-violet-400"
    style={{ height: 10 + (i % 6) * 3, originY: 1 }}
    animate={on
      ? { scaleY: [0.3, 1, 0.4, 0.9, 0.3], opacity: [0.5, 1, 0.6, 1, 0.5] }
      : { scaleY: 0.2, opacity: 0.2 }}
    transition={{ repeat: Infinity, duration: 0.55 + (i % 5) * 0.11, delay: i * 0.035, ease: 'easeInOut' }}
  />
);

const ProctoringIndicator = ({ active }: { active: boolean }) => (
  <motion.div
    animate={active ? { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] } : {}}
    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
    className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${
      active ? 'bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/30' : 'bg-zinc-800 text-zinc-600'
    }`}
  >
    <Eye className="h-3 w-3" />
    {active ? 'Proctoring Active' : 'Proctoring Off'}
  </motion.div>
);

/* ════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                              */
/* ════════════════════════════════════════════════════════════ */
export default function MCQInterviewer({ isOpen, jobTitle, onClose }: MCQInterviewerProps) {
  const [phase, setPhase] = useState<Phase>('lobby');
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [dur, setDur] = useState(0);

  // MCQ state
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);            // current question index
  const [answers, setAnswers] = useState<Record<number, string>>({}); // qId → selected label
  const [revealed, setRevealed] = useState(false);    // show correct after select
  const [score, setScore] = useState(0);

  const vidRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const aIdRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQ = questions[qIndex] ?? null;
  const totalQ = questions.length;
  const progress = totalQ > 0 ? ((qIndex + (answers[currentQ?.id] ? 1 : 0)) / totalQ) * 100 : 0;
  const selectedForCurrent = currentQ ? answers[currentQ.id] : undefined;

  /* ── timer ── */
  const startTimer = () => { setDur(0); timerRef.current = setInterval(() => setDur(d => d + 1), 1000); };
  const stopTimer = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  /* ── camera ── */
  const openCam = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
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
  const toggleMic = () => setMicOn(prev => !prev);

  /* ── start interview: fetch questions + connect Vapi ── */
  const startInterview = useCallback(async () => {
    setPhase('fetching'); setErrorMsg('');
    setQIndex(0); setAnswers({}); setRevealed(false); setScore(0);

    // 1. Fetch questions
    let qs: MCQQuestion[] | null = null;
    try {
      const res = await fetch(`${apiBase.replace(/\/$/, '')}/api/landing-page/vapi-mcq-interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle }),
      });
      if (res.ok) {
        const data = await res.json();
        aIdRef.current = data.assistantId ?? data.assistant_id ?? data.id ?? data.data?.assistantId ?? null;
        qs = parseBackendQuestions(data);
      }
    } catch { /* fall through to static */ }

    if (!qs || qs.length === 0) qs = buildFallbackQuestions(jobTitle);
    setQuestions(qs);

    // 2. Connect Vapi for AI voice proctoring (optional — don't block on failure)
    if (vapiKey && aIdRef.current) {
      try {
        const vapi = getVapi();
        if (vapi) {
          vapi.removeAllListeners();
          vapi.on('speech-start', () => setAiSpeaking(true));
          vapi.on('speech-end', () => setAiSpeaking(false));
          vapi.on('call-end', () => setAiSpeaking(false));
          await vapi.start(aIdRef.current);
        }
      } catch { /* voice proctoring failed — still show questions */ }
    }

    startTimer();
    setPhase('active');
  }, [jobTitle]);

  /* ── select an option ── */
  const selectOption = (label: string) => {
    if (!currentQ || selectedForCurrent) return; // already answered
    setAnswers(prev => ({ ...prev, [currentQ.id]: label }));
    setRevealed(true);
  };

  /* ── next question ── */
  const nextQuestion = () => {
    if (!currentQ) return;
    setRevealed(false);
    if (qIndex + 1 >= totalQ) {
      // Calculate score
      const s = questions.reduce((acc, q) => {
        const ans = answers[q.id];
        return acc + (ans && q.correctAnswer && ans === q.correctAnswer ? 1 : 0);
      }, 0);
      setScore(s);
      stopTimer();
      getVapi()?.stop();
      setPhase('results');
    } else {
      setQIndex(i => i + 1);
    }
  };

  /* ── previous question ── */
  const prevQuestion = () => {
    if (qIndex === 0) return;
    setRevealed(!!answers[questions[qIndex - 1]?.id]);
    setQIndex(i => i - 1);
  };

  /* ── hang up ── */
  const hangUp = useCallback(() => {
    getVapi()?.stop(); getVapi()?.removeAllListeners();
    stopTimer(); closeCam(); onClose();
  }, [closeCam, onClose]);

  /* ── lifecycle ── */
  useEffect(() => {
    if (isOpen) {
      setPhase('lobby'); setDur(0); setAiSpeaking(false);
      setMicOn(true); setCamOn(true);
      setQuestions([]); setQIndex(0); setAnswers({}); setRevealed(false);
      openCam();
    } else {
      getVapi()?.stop(); getVapi()?.removeAllListeners();
      stopTimer(); closeCam(); setPhase('lobby');
    }
    // eslint-disable-next-line
  }, [isOpen]);

  useEffect(() => {
    if (vidRef.current && streamRef.current && !vidRef.current.srcObject)
      vidRef.current.srcObject = streamRef.current;
  });

  if (!isOpen) return null;

  /* ─────────────────────────────────────────────────────────
     OPTION CARD
  ───────────────────────────────────────────────────────── */
  const getOptionStyle = (label: string) => {
    if (!revealed || !selectedForCurrent) {
      // Not yet answered — highlight hovered only
      return selectedForCurrent === label
        ? 'border-violet-500 bg-violet-500/12 text-white'
        : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-violet-400/50 hover:bg-violet-500/8 cursor-pointer';
    }
    // Answered — show correct / wrong / neutral
    const isCorrect = currentQ?.correctAnswer && label === currentQ.correctAnswer;
    const isSelected = label === selectedForCurrent;
    if (isCorrect) return 'border-emerald-500/60 bg-emerald-500/12 text-emerald-200';
    if (isSelected && !isCorrect) return 'border-red-500/50 bg-red-500/10 text-red-300';
    return 'border-white/8 bg-transparent text-zinc-600 opacity-60';
  };

  const getLabelStyle = (label: string) => {
    if (!revealed || !selectedForCurrent) {
      return selectedForCurrent === label
        ? 'bg-violet-500 border-violet-400 text-white'
        : 'bg-violet-500/10 border-violet-500/20 text-violet-400';
    }
    const isCorrect = currentQ?.correctAnswer && label === currentQ.correctAnswer;
    const isSelected = label === selectedForCurrent;
    if (isCorrect) return 'bg-emerald-500 border-emerald-400 text-white';
    if (isSelected) return 'bg-red-500 border-red-400 text-white';
    return 'bg-white/5 border-white/10 text-zinc-600';
  };

  const hasCorrectInfo = questions.some(q => q.correctAnswer);

  return (
    <AnimatePresence>
      <motion.div
        key="mcq-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-black/90 backdrop-blur-md"
      >
        <motion.div
          key="mcq-card"
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 250 }}
          className="relative flex flex-col w-full overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d0f] shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
          style={{ maxWidth: 1100, height: '94vh' }}
        >

          {/* ── TOP BAR ── */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/8 bg-[#111114] px-5 py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <button onClick={hangUp} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" title="End" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="h-4 w-px bg-white/10" />
              <Brain className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-semibold text-white">AI MCQ Interview</span>
              <span className="text-xs text-zinc-500 capitalize">— {jobTitle}</span>
            </div>
            <div className="flex items-center gap-3">
              {phase === 'active' && (
                <>
                  <ProctoringIndicator active={camOn} />
                  <div className="flex items-center gap-2 rounded-full bg-red-500/12 px-3 py-1 ring-1 ring-red-500/25">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                    <span className="text-[11px] font-bold text-red-400 tabular-nums">{fmt(dur)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ══ LOBBY ══════════════════════════════════════════════ */}
          {phase === 'lobby' && (
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col items-center gap-6 px-6 py-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">MCQ Interview Lobby</p>
                <h2 className="text-2xl font-bold text-white text-center">Ready for your MCQ round?</h2>
                <p className="text-sm text-zinc-500 max-w-md text-center">
                  You'll see one question at a time with 4 options. Click an option to answer. Camera stays on for AI proctoring.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                  <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 sm:w-64 shrink-0" style={{ aspectRatio: '4/3' }}>
                    <video ref={vidRef} autoPlay playsInline muted
                      className={`h-full w-full object-cover scale-x-[-1] ${camOn ? '' : 'hidden'}`} />
                    {!camOn && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <VideoOff className="h-8 w-8 text-red-400" />
                        <p className="text-sm text-red-400 font-medium">Camera required</p>
                      </div>
                    )}
                    {camOn && <div className="absolute top-2 right-2"><ProctoringIndicator active={true} /></div>}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                      <button onClick={toggleCam} className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${camOn ? 'bg-white/15 text-white' : 'bg-red-500/80 text-white'}`}>
                        {camOn ? <Video className="h-3 w-3" /> : <VideoOff className="h-3 w-3" />}
                        {camOn ? 'Camera on' : 'Off'}
                      </button>
                      <button onClick={toggleMic} className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${micOn ? 'bg-white/15 text-white' : 'bg-red-500/80 text-white'}`}>
                        {micOn ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                        {micOn ? 'Mic on' : 'Off'}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4 flex-1 min-w-0">
                    <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 space-y-3">
                      <p className="text-xs font-bold text-violet-400 uppercase tracking-wider">How it works</p>
                      {[
                        { icon: Brain, label: 'Questions appear one at a time on screen' },
                        { icon: ChevronRight, label: 'Click any option card to select your answer' },
                        { icon: CheckCircle2, label: 'Instant feedback — then click Next to continue' },
                        { icon: Eye, label: 'AI proctor monitors camera throughout' },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-3 text-sm text-zinc-400">
                          <Icon className="h-4 w-4 text-violet-400 shrink-0" />
                          {label}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 flex items-start gap-2">
                      <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-300/80 leading-relaxed">
                        <strong>Keep your camera on.</strong> Turning it off flags a proctoring violation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 pt-2">
                  <div className="flex gap-3">
                    <Button onClick={onClose} variant="outline" className="rounded-full px-6 border-white/12 text-zinc-400 hover:bg-white/8">Cancel</Button>
                    <Button
                      id="join-mcq-btn"
                      onClick={startInterview}
                      disabled={!camOn}
                      className="rounded-full px-8 bg-violet-500 hover:bg-violet-400 text-white font-bold shadow-lg shadow-violet-500/25 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="mr-2 h-4 w-4" /> Start MCQ Interview
                    </Button>
                  </div>
                  {!camOn && <p className="text-xs text-red-400">Please enable your camera to start the proctored interview</p>}
                </div>
              </div>
            </div>
          )}

          {/* ══ FETCHING ═══════════════════════════════════════════ */}
          {phase === 'fetching' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
              <div className="relative flex h-24 w-24 items-center justify-center">
                {[0, 1, 2].map(i => (
                  <motion.div key={i}
                    className="absolute rounded-full border border-violet-400/25"
                    animate={{ scale: [1, 1.5 + i * 0.15, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.5 }}
                    style={{ width: 60 + i * 20, height: 60 + i * 20 }}
                  />
                ))}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                  className="relative z-10 flex h-16 w-16 items-center justify-center bg-gradient-to-br from-violet-500/20 to-transparent ring-1 ring-violet-400/20 rounded-full"
                >
                  <Brain className="h-7 w-7 text-violet-400" />
                </motion.div>
              </div>
              <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
                className="text-lg font-bold text-white">
                Loading {jobTitle} MCQ questions…
              </motion.p>
              <p className="text-sm text-zinc-500">Generating role-specific questions</p>
            </div>
          )}

          {/* ══ ACTIVE ═════════════════════════════════════════════ */}
          {phase === 'active' && currentQ && (
            <div className="flex flex-1 overflow-hidden">

              {/* ── LEFT sidebar: camera + AI voice ── */}
              <div className="flex w-52 shrink-0 flex-col border-r border-white/8 bg-[#111114]">

                {/* camera */}
                <div className="relative overflow-hidden border-b border-white/8 bg-zinc-950" style={{ aspectRatio: '4/3' }}>
                  <video ref={vidRef} autoPlay playsInline muted
                    className={`h-full w-full object-cover scale-x-[-1] ${camOn ? '' : 'hidden'}`} />
                  {!camOn && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-red-950/30">
                      <VideoOff className="h-6 w-6 text-red-400" />
                      <p className="text-[10px] text-red-400">⚠ Violation</p>
                    </div>
                  )}
                  <div className="absolute top-1.5 left-1.5">
                    <ProctoringIndicator active={camOn} />
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 backdrop-blur-sm">
                    <div className={`h-1.5 w-1.5 rounded-full ${micOn ? 'bg-green-400' : 'bg-red-500'}`} />
                    <span className="text-[9px] text-zinc-300">You</span>
                  </div>
                </div>

                {/* AI avatar */}
                <div className="flex flex-col items-center gap-2 border-b border-white/8 bg-zinc-950 py-3 px-3">
                  <motion.div
                    animate={aiSpeaking ? {
                      borderRadius: ['44% 56% 60% 40% / 55% 45% 55% 45%', '56% 44% 40% 60% / 45% 55% 45% 55%'],
                      scale: [1, 1.06, 1],
                    } : { borderRadius: '50%', scale: 1 }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="flex h-12 w-12 items-center justify-center bg-gradient-to-br from-violet-500/20 ring-1 ring-violet-400/20"
                  >
                    <span className="text-xl">🤖</span>
                  </motion.div>
                  <div className="flex items-end gap-[2px] h-4">
                    {Array.from({ length: 10 }).map((_, i) => <WaveBar key={i} i={i} on={aiSpeaking} />)}
                  </div>
                  <p className="text-[10px] text-zinc-400 text-center">
                    {aiSpeaking
                      ? <span className="text-violet-400 flex items-center gap-1"><Volume2 className="h-3 w-3" /> Speaking…</span>
                      : 'AI Proctor'}
                  </p>
                </div>

                {/* question navigator */}
                <div className="flex flex-1 flex-col overflow-hidden p-3 gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Questions</p>
                  <div className="grid grid-cols-5 gap-1.5 overflow-y-auto flex-1 content-start">
                    {questions.map((q, i) => {
                      const ans = answers[q.id];
                      const isActive = i === qIndex;
                      const isCorrect = ans && q.correctAnswer && ans === q.correctAnswer;
                      const isWrong = ans && q.correctAnswer && ans !== q.correctAnswer;
                      const isAnswered = !!ans && !q.correctAnswer; // answered but no correct info
                      return (
                        <button
                          key={q.id}
                          onClick={() => { setQIndex(i); setRevealed(!!answers[q.id]); }}
                          className={`h-7 w-7 rounded-lg text-[11px] font-bold transition-all border ${
                            isActive
                              ? 'border-violet-500 bg-violet-500/20 text-violet-300 scale-105'
                              : isCorrect
                                ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-400'
                                : isWrong
                                  ? 'border-red-500/40 bg-red-500/10 text-red-400'
                                  : isAnswered
                                    ? 'border-violet-400/30 bg-violet-500/10 text-violet-400'
                                    : 'border-white/10 bg-white/[0.03] text-zinc-600 hover:border-violet-500/30'
                          }`}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── MAIN: question area ── */}
              <div className="flex flex-1 flex-col overflow-hidden">

                {/* progress bar */}
                <div className="shrink-0">
                  <div className="flex items-center justify-between border-b border-white/8 bg-[#111114] px-5 py-2.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-zinc-400">
                        Question <span className="text-violet-400 font-bold">{qIndex + 1}</span> of <span className="text-white">{totalQ}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">{Math.round(progress)}% complete</span>
                    </div>
                  </div>
                  {/* progress track */}
                  <div className="h-1 w-full bg-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-600 to-violet-400"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* question + options */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQ.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="flex flex-col gap-6 max-w-2xl mx-auto"
                    >
                      {/* Question text */}
                      <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 px-6 py-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="h-6 w-6 flex items-center justify-center rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold border border-violet-500/30">
                            {qIndex + 1}
                          </span>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-500">Question</p>
                        </div>
                        <p className="text-lg font-semibold text-white leading-relaxed">
                          {currentQ.question}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 gap-3">
                        {currentQ.options.map((opt, idx) => {
                          const isSelected = selectedForCurrent === opt.label;
                          const isCorrectOpt = currentQ.correctAnswer === opt.label;
                          return (
                            <motion.button
                              key={opt.label}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.07 }}
                              onClick={() => selectOption(opt.label)}
                              disabled={!!selectedForCurrent}
                              className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${getOptionStyle(opt.label)} ${!selectedForCurrent ? 'hover:shadow-md hover:shadow-violet-500/10 active:scale-[0.99]' : ''}`}
                            >
                              {/* label badge */}
                              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-bold text-sm border transition-colors ${getLabelStyle(opt.label)}`}>
                                {opt.label}
                              </span>
                              {/* option text */}
                              <span className="flex-1 text-sm leading-relaxed font-medium">{opt.text}</span>
                              {/* correct/wrong icon */}
                              {revealed && isSelected && !isCorrectOpt && (
                                <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                              )}
                              {revealed && isCorrectOpt && (
                                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Explanation (after answering, if available) */}
                      <AnimatePresence>
                        {revealed && currentQ.explanation && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3"
                          >
                            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">💡 Explanation</p>
                            <p className="text-xs text-zinc-300 leading-relaxed">{currentQ.explanation}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── nav buttons ── */}
                <div className="flex shrink-0 items-center justify-between border-t border-white/8 bg-[#0f0f12] px-6 py-3">
                  <button
                    onClick={prevQuestion}
                    disabled={qIndex === 0}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-400 border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>

                  {/* status */}
                  {!selectedForCurrent ? (
                    <p className="text-xs text-zinc-600 italic">Click an option to answer</p>
                  ) : (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border ${
                          currentQ.correctAnswer
                            ? selectedForCurrent === currentQ.correctAnswer
                              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                              : 'border-red-500/30 bg-red-500/10 text-red-400'
                            : 'border-violet-500/30 bg-violet-500/10 text-violet-400'
                        }`}
                      >
                        {currentQ.correctAnswer
                          ? selectedForCurrent === currentQ.correctAnswer
                            ? <><CheckCircle2 className="h-3.5 w-3.5" /> Correct!</>
                            : <><AlertCircle className="h-3.5 w-3.5" /> Incorrect</>
                          : <><CheckCircle2 className="h-3.5 w-3.5" /> Answered — Option {selectedForCurrent}</>
                        }
                      </motion.div>
                    </AnimatePresence>
                  )}

                  <button
                    onClick={nextQuestion}
                    disabled={!selectedForCurrent}
                    className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold bg-violet-500 hover:bg-violet-400 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/20"
                  >
                    {qIndex + 1 === totalQ ? 'Finish' : 'Next'} <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── controls (active) ── */}
          {phase === 'active' && (
            <div className="flex shrink-0 items-center justify-center gap-3 border-t border-white/8 bg-[#0a0a0c] py-2">
              <button onClick={toggleMic}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${micOn ? 'bg-white/10 text-white' : 'bg-red-500 text-white'}`}>
                {micOn ? <Mic className="h-3.5 w-3.5" /> : <MicOff className="h-3.5 w-3.5" />}
              </button>
              <button onClick={toggleCam}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${camOn ? 'bg-white/10 text-white' : 'bg-red-500 text-white'}`}>
                {camOn ? <Video className="h-3.5 w-3.5" /> : <VideoOff className="h-3.5 w-3.5" />}
              </button>
              <button onClick={hangUp}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-all">
                <Phone className="h-4 w-4 rotate-[135deg]" />
              </button>
            </div>
          )}

          {/* ══ RESULTS ════════════════════════════════════════════ */}
          {phase === 'results' && (
            <div className="flex flex-1 flex-col overflow-y-auto">
              <div className="flex flex-col items-center gap-6 px-6 py-8">
                {/* Score ring */}
                <div className="relative flex h-28 w-28 items-center justify-center">
                  <svg className="absolute inset-0" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="44" stroke="#ffffff08" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="44"
                      stroke={hasCorrectInfo
                        ? score / totalQ >= 0.7 ? '#10b981' : score / totalQ >= 0.4 ? '#f59e0b' : '#ef4444'
                        : '#a78bfa'}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${hasCorrectInfo ? (score / totalQ) * 276.5 : 276.5} 276.5`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="relative z-10 text-center">
                    {hasCorrectInfo ? (
                      <>
                        <p className="text-2xl font-black text-white">{score}/{totalQ}</p>
                        <p className="text-[10px] text-zinc-500">correct</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xl font-black text-violet-400">{totalQ}/{totalQ}</p>
                        <p className="text-[10px] text-zinc-500">answered</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">
                    {hasCorrectInfo
                      ? score / totalQ >= 0.7 ? '🎉 Excellent Work!' : score / totalQ >= 0.4 ? '📈 Good Effort!' : '📚 Keep Practising'
                      : '✅ MCQ Round Complete!'}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    {hasCorrectInfo
                      ? `You answered ${score} out of ${totalQ} questions correctly in ${fmt(dur)}.`
                      : `You completed all ${totalQ} questions in ${fmt(dur)}.`}
                  </p>
                </div>

                {/* Stats row */}
                {hasCorrectInfo && (
                  <div className="flex gap-4">
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/8 px-5 py-3 text-center">
                      <p className="text-2xl font-black text-emerald-400">{score}</p>
                      <p className="text-xs text-zinc-500">Correct</p>
                    </div>
                    <div className="rounded-xl border border-red-500/20 bg-red-500/8 px-5 py-3 text-center">
                      <p className="text-2xl font-black text-red-400">{totalQ - score}</p>
                      <p className="text-xs text-zinc-500">Incorrect</p>
                    </div>
                    <div className="rounded-xl border border-violet-500/20 bg-violet-500/8 px-5 py-3 text-center">
                      <p className="text-2xl font-black text-violet-400">{fmt(dur)}</p>
                      <p className="text-xs text-zinc-500">Time</p>
                    </div>
                  </div>
                )}

                {/* Review grid */}
                <div className="w-full max-w-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="h-4 w-4 text-zinc-500" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Answer Review</p>
                  </div>
                  <div className="space-y-2">
                    {questions.map((q, i) => {
                      const ans = answers[q.id];
                      const isCorrect = ans && q.correctAnswer && ans === q.correctAnswer;
                      const isWrong = ans && q.correctAnswer && ans !== q.correctAnswer;
                      return (
                        <div key={q.id} className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
                          isCorrect ? 'border-emerald-500/20 bg-emerald-500/5'
                            : isWrong ? 'border-red-500/20 bg-red-500/5'
                              : 'border-white/8 bg-white/[0.02]'
                        }`}>
                          <span className="text-xs font-bold text-zinc-600 shrink-0 mt-0.5">Q{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-zinc-300 line-clamp-1 mb-1">{q.question}</p>
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className={`font-bold ${isCorrect ? 'text-emerald-400' : isWrong ? 'text-red-400' : 'text-violet-400'}`}>
                                Your answer: {ans || '–'}
                                {ans && ` — ${q.options.find(o => o.label === ans)?.text ?? ''}`}
                              </span>
                            </div>
                            {isWrong && q.correctAnswer && (
                              <p className="text-[11px] text-emerald-400 mt-0.5">
                                ✓ Correct: {q.correctAnswer} — {q.options.find(o => o.label === q.correctAnswer)?.text}
                              </p>
                            )}
                          </div>
                          <div className="shrink-0">
                            {isCorrect
                              ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              : isWrong
                                ? <AlertCircle className="h-4 w-4 text-red-400" />
                                : <div className="h-4 w-4 rounded-full border border-violet-500/30 bg-violet-500/10" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button onClick={onClose} className="rounded-full px-10 bg-violet-500 hover:bg-violet-400 text-white font-bold">
                  Done
                </Button>
              </div>
            </div>
          )}

          {/* ══ ERROR ══════════════════════════════════════════════ */}
          {phase === 'error' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/12 ring-1 ring-red-500/25">
                <AlertCircle className="h-10 w-10 text-red-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Something went wrong</h4>
                <p className="mt-2 text-zinc-400 text-sm max-w-sm mx-auto">{errorMsg}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={startInterview} className="rounded-full px-8 bg-violet-500 hover:bg-violet-400 text-white font-bold">Retry</Button>
                <Button onClick={onClose} variant="outline" className="rounded-full px-8 border-white/12 text-zinc-400">Cancel</Button>
              </div>
            </div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
