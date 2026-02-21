import {
  useState, useEffect, useCallback,
  useRef, type KeyboardEvent,
} from 'react';
import Vapi from '@vapi-ai/web';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Video, VideoOff, Phone,
  Sparkles, Loader2, AlertCircle, CheckCircle2,
  Volume2, Layers, Trash2, Minus, Square, Circle,
  ArrowRight, RotateCcw, Pencil, MousePointer2,
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
export interface SystemDesignInterviewerProps {
  isOpen: boolean;
  jobTitle: string;
  onClose: () => void;
}

type Phase = 'lobby' | 'fetching' | 'connecting' | 'active' | 'ended' | 'error';
interface TxEntry { role: 'ai' | 'user'; text: string }

type DrawTool = 'freehand' | 'rect' | 'circle' | 'arrow' | 'line' | 'select';

interface DrawShape {
  id: string;
  tool: DrawTool;
  x: number; y: number;
  w: number; h: number;
  label?: string;
  color: string;
  points?: { x: number; y: number }[]; // for freehand
}

/* ─── Canvas Colors ────────────────────────────────────────── */
const COLORS = ['#60a5fa', '#34d399', '#f472b6', '#fbbf24', '#a78bfa', '#fb7185', '#f4f4f5'];

/* ─── Waveform ─────────────────────────────────────────────── */
const WaveBar = ({ i, on }: { i: number; on: boolean }) => (
  <motion.div
    className="w-0.5 rounded-full bg-cyan-400"
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

/* ─── Static problem data ──────────────────────────────────── */
const PROBLEM = {
  title: 'Design a URL Shortener (like bit.ly)',
  difficulty: 'Hard',
  timeLimit: '45 min',
  description: `Design a URL shortening service that takes a long URL and returns a shorter alias. When users access the short URL they are redirected to the original URL.`,
  requirements: [
    'Generate a unique short alias for every long URL (e.g. bit.ly/abc123)',
    'Redirect users from short URL → original URL with low latency',
    'Handle 100M+ writes/day and 10B+ reads/day',
    'URLs should not expire (or have optional expiry)',
    'Avoid duplicate short codes for different long URLs',
    'Analytics: track click counts and geo-distribution',
  ],
  followUp: [
    'How would you scale this to support 1 billion users?',
    'How do you prevent abuse / spam URLs?',
    'How would you implement custom short codes?',
    'What trade-offs did you make in your design?',
  ],
};

/* ─── Main component ───────────────────────────────────────── */
export default function SystemDesignInterviewer({
  isOpen, jobTitle, onClose,
}: SystemDesignInterviewerProps) {
  const [phase, setPhase] = useState<Phase>('lobby');
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [transcript, setTranscript] = useState<TxEntry[]>([]);
  const [dur, setDur] = useState(0);

  // Canvas/whiteboard state
  const [tool, setTool] = useState<DrawTool>('freehand');
  const [color, setColor] = useState('#60a5fa');
  const [shapes, setShapes] = useState<DrawShape[]>([]);
  const [drawing, setDrawing] = useState<DrawShape | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState<string | null>(null);
  const [labelText, setLabelText] = useState('');

  const vidRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const txRef = useRef<TxEntry[]>([]);
  const aIdRef = useRef<string | null>(null);
  const cIdRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Canvas refs for drawing
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => { txRef.current = transcript; }, [transcript]);

  /* ── camera ── */
  const openCam = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
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

  /* ── transcript ── */
  const sendTx = useCallback(async () => {
    const t = txRef.current; if (!t.length) return;
    try {
      await fetch(`${apiBase.replace(/\/$/, '')}/api/landing-page/conversation`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistantId: aIdRef.current || 'system-design-interview',
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
    setPhase('fetching'); setErrorMsg(''); setTranscript([]); txRef.current = []; setShapes([]);
    try {
      const res = await fetch(`${apiBase.replace(/\/$/, '')}/api/landing-page/vapi-system-design`, {
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

  const hangUp = useCallback(() => {
    getVapi()?.stop(); getVapi()?.removeAllListeners();
    stopTimer(); closeCam(); onClose();
  }, [closeCam, onClose]);

  /* ── lifecycle ── */
  useEffect(() => {
    if (isOpen) {
      setPhase('lobby'); setDur(0); setTranscript([]); setAiSpeaking(false);
      setMicOn(true); setCamOn(true); setShapes([]);
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

  /* ─────────────────────────────────────────────────────────
     CANVAS DRAWING — uses an HTML5 <canvas> for freehand
     and overlay <div> shapes for rect/circle/arrow/line
  ───────────────────────────────────────────────────────── */

  // Redraw all shapes on canvas whenever shapes change
  useEffect(() => {
    redrawCanvas();
  // eslint-disable-next-line
  }, [shapes, drawing]);

  const getPos = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
    const rect = canvasRef.current!.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawShapeOnCanvas = (s: DrawShape) => {
      ctx.save();
      ctx.strokeStyle = s.color;
      ctx.fillStyle = s.color + '20';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (s.tool === 'freehand' && s.points && s.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (let i = 1; i < s.points.length; i++) {
          // smooth with quadratic curves
          const midX = (s.points[i - 1].x + s.points[i].x) / 2;
          const midY = (s.points[i - 1].y + s.points[i].y) / 2;
          ctx.quadraticCurveTo(s.points[i - 1].x, s.points[i - 1].y, midX, midY);
        }
        ctx.stroke();
      } else if (s.tool === 'rect') {
        ctx.beginPath();
        ctx.roundRect(s.x, s.y, s.w, s.h, 8);
        ctx.fill();
        ctx.stroke();
        if (s.id === selectedId) { ctx.strokeStyle = s.color; ctx.lineWidth = 3; ctx.stroke(); }
        if (s.label) {
          ctx.fillStyle = s.color;
          ctx.font = '12px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(s.label, s.x + s.w / 2, s.y + s.h / 2 + 4);
        }
      } else if (s.tool === 'circle') {
        const rx = Math.abs(s.w) / 2;
        const ry = Math.abs(s.h) / 2;
        ctx.beginPath();
        ctx.ellipse(s.x + rx, s.y + ry, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        if (s.label) {
          ctx.fillStyle = s.color;
          ctx.font = '12px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(s.label, s.x + rx, s.y + ry + 4);
        }
      } else if (s.tool === 'arrow' || s.tool === 'line') {
        const x2 = s.x + s.w;
        const y2 = s.y + s.h;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        if (s.tool === 'arrow') {
          const angle = Math.atan2(s.h, s.w);
          const len = 12;
          ctx.beginPath();
          ctx.moveTo(x2, y2);
          ctx.lineTo(x2 - len * Math.cos(angle - Math.PI / 6), y2 - len * Math.sin(angle - Math.PI / 6));
          ctx.moveTo(x2, y2);
          ctx.lineTo(x2 - len * Math.cos(angle + Math.PI / 6), y2 - len * Math.sin(angle + Math.PI / 6));
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    shapes.forEach(drawShapeOnCanvas);
    if (drawing) drawShapeOnCanvas(drawing);
  };

  /* ── canvas size sync ── */
  useEffect(() => {
    const sync = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      redrawCanvas();
    };
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  // eslint-disable-next-line
  }, [phase]);

  const onPointerDown = (e: React.MouseEvent) => {
    if (tool === 'select') return;
    const pos = getPos(e);
    isDrawingRef.current = true;
    startRef.current = pos;
    lastPointRef.current = pos;

    const newShape: DrawShape = {
      id: Math.random().toString(36).slice(2),
      tool, x: pos.x, y: pos.y, w: 0, h: 0, color,
      points: tool === 'freehand' ? [pos] : undefined,
    };
    setDrawing(newShape);
  };

  const onPointerMove = (e: React.MouseEvent) => {
    if (!isDrawingRef.current || !drawing || !startRef.current) return;
    const pos = getPos(e);

    if (tool === 'freehand') {
      // append point to freehand path
      setDrawing(prev => {
        if (!prev) return null;
        return { ...prev, points: [...(prev.points || []), pos] };
      });
    } else {
      const dx = pos.x - startRef.current.x;
      const dy = pos.y - startRef.current.y;
      setDrawing(prev => prev ? { ...prev, w: dx, h: dy } : null);
    }
  };

  const onPointerUp = () => {
    if (!drawing) return;
    isDrawingRef.current = false;

    const isSignificant =
      tool === 'freehand'
        ? (drawing.points?.length ?? 0) > 2
        : Math.abs(drawing.w) > 5 || Math.abs(drawing.h) > 5;

    if (isSignificant) {
      let normalized = drawing;
      if (tool !== 'freehand' && tool !== 'arrow' && tool !== 'line') {
        normalized = {
          ...drawing,
          x: drawing.w < 0 ? drawing.x + drawing.w : drawing.x,
          y: drawing.h < 0 ? drawing.y + drawing.h : drawing.y,
          w: Math.abs(drawing.w),
          h: Math.abs(drawing.h),
        };
      }
      setShapes(p => [...p, normalized]);
    }
    setDrawing(null);
    startRef.current = null;
  };

  const deleteSelected = () => {
    setShapes(p => p.filter(s => s.id !== selectedId));
    setSelectedId(null);
  };

  const startLabelEdit = (id: string, current?: string) => {
    setEditingLabel(id);
    setLabelText(current || '');
  };

  const finishLabel = () => {
    if (editingLabel) {
      setShapes(p => p.map(s => s.id === editingLabel ? { ...s, label: labelText } : s));
    }
    setEditingLabel(null); setLabelText('');
  };

  const clearCanvas = () => { setShapes([]); setSelectedId(null); };

  if (!isOpen) return null;

  const diffColor = PROBLEM.difficulty === 'Hard' ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20';

  return (
    <AnimatePresence>
      <motion.div
        key="sd-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-black/90 backdrop-blur-md"
      >
        <motion.div
          key="sd-card"
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 250 }}
          className="relative flex flex-col w-full overflow-hidden rounded-2xl border border-white/8 bg-[#0d0d0f] shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
          style={{ maxWidth: 1400, height: '96vh' }}
        >

          {/* ── TOP BAR ── */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/8 bg-[#111114] px-5 py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <button onClick={hangUp} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400" title="End" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="h-4 w-px bg-white/10" />
              <Layers className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white">System Design Interview</span>
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
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col items-center gap-6 px-6 py-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">System Design Lobby</p>
                <h2 className="text-2xl font-bold text-white text-center">Check your setup before the design session</h2>

                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                  <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 sm:w-64 shrink-0" style={{ aspectRatio: '4/3' }}>
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
                  <div className="flex flex-col justify-center gap-4 flex-1 min-w-0">
                    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 space-y-3">
                      <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">What to expect</p>
                      {[
                        { icon: Layers, label: 'Draw system architecture on the whiteboard canvas' },
                        { icon: Pencil, label: 'Use freehand, boxes, arrows & labeled components' },
                        { icon: Mic, label: 'Explain your design verbally to the AI interviewer' },
                        { icon: Video, label: 'Camera monitoring active throughout the session' },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-3 text-sm text-zinc-400">
                          <Icon className="h-4 w-4 text-cyan-400 shrink-0" />
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={onClose} variant="outline" className="rounded-full px-6 border-white/12 text-zinc-400 hover:bg-white/8">Cancel</Button>
                  <Button id="join-sd-btn" onClick={startInterview}
                    className="rounded-full px-8 bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-lg shadow-cyan-500/25">
                    <Sparkles className="mr-2 h-4 w-4" /> Start System Design
                  </Button>
                </div>
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
                    className="absolute rounded-full border border-cyan-400/25"
                    animate={{ scale: [1, 1.5 + i * 0.15, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.5, ease: 'easeInOut' }}
                    style={{ width: 70 + i * 22, height: 70 + i * 22 }}
                  />
                ))}
                <motion.div
                  animate={{ borderRadius: ['44% 56% 60% 40% / 55% 45% 55% 45%', '56% 44% 40% 60% / 45% 55% 45% 55%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="relative z-10 flex h-20 w-20 items-center justify-center bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent ring-1 ring-cyan-400/20"
                >
                  <Layers className="h-9 w-9 text-cyan-400" />
                </motion.div>
              </div>
              <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
                className="text-lg font-bold text-white">
                {phase === 'fetching' ? `Preparing ${jobTitle} system design…` : 'Connecting to AI interviewer…'}
              </motion.p>
              <p className="text-sm text-zinc-500">
                {phase === 'fetching' ? 'Generating architecture challenge' : 'Allow microphone access when prompted'}
              </p>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* ACTIVE — 3-column: problem | whiteboard | camera+chat  */}
          {/* ══════════════════════════════════════════════════════ */}
          {phase === 'active' && (
            <div className="flex flex-1 overflow-hidden">

              {/* ── COL 1: Problem Description ── */}
              <div className="flex w-72 shrink-0 flex-col border-r border-white/8 bg-[#0f0f12] overflow-y-auto">
                <div className="border-b border-white/8 px-4 py-3 sticky top-0 bg-[#0f0f12] z-10">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Problem</p>
                </div>
                <div className="px-4 py-4 space-y-4">
                  {/* title + badges */}
                  <div>
                    <h3 className="text-base font-bold text-white leading-snug mb-3">{PROBLEM.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${diffColor}`}>
                        {PROBLEM.difficulty}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-zinc-400">
                        ⏱ {PROBLEM.timeLimit}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{PROBLEM.description}</p>
                  </div>

                  {/* requirements */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-2">Requirements</p>
                    <ul className="space-y-2">
                      {PROBLEM.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
                          <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* follow-up questions */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-400 mb-2">Follow-up Questions</p>
                    <ul className="space-y-2">
                      {PROBLEM.followUp.map((q, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 leading-relaxed italic">
                          <span className="text-violet-500 shrink-0 font-bold not-italic">{i + 1}.</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* hint */}
                  <div className="rounded-xl border border-cyan-500/15 bg-cyan-500/5 p-3">
                    <p className="text-[10px] font-bold text-cyan-400 mb-1">💡 Hint</p>
                    <p className="text-[10px] text-zinc-500 leading-relaxed">
                      Think about: Base62 encoding for short codes, consistent hashing for servers, Redis for caching, and a NoSQL DB for URL mappings.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── COL 2: Whiteboard canvas ── */}
              <div className="flex flex-1 flex-col overflow-hidden">

                {/* toolbar */}
                <div className="flex shrink-0 items-center gap-2 border-b border-white/8 bg-[#111114] px-4 py-2 flex-wrap">
                  <span className="text-xs text-zinc-500 font-medium mr-1">Draw:</span>
                  {([
                    { id: 'freehand', icon: Pencil, label: 'Pen' },
                    { id: 'rect', icon: Square, label: 'Box' },
                    { id: 'circle', icon: Circle, label: 'Circle' },
                    { id: 'arrow', icon: ArrowRight, label: 'Arrow' },
                    { id: 'line', icon: Minus, label: 'Line' },
                    { id: 'select', icon: MousePointer2, label: 'Select' },
                  ] as { id: DrawTool; icon: any; label: string }[]).map(({ id, icon: Icon, label }) => (
                    <button key={id} onClick={() => setTool(id)}
                      title={label}
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs transition-colors ${tool === id ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/30' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}>
                      <Icon className="h-3.5 w-3.5" /> {label}
                    </button>
                  ))}

                  <div className="h-4 w-px bg-white/10 mx-1" />

                  {/* Color picker */}
                  <div className="flex items-center gap-1.5">
                    {COLORS.map(c => (
                      <button key={c} onClick={() => setColor(c)}
                        className="h-4 w-4 rounded-full transition-all hover:scale-125"
                        style={{
                          background: c,
                          boxShadow: color === c ? `0 0 0 2px #111114, 0 0 0 4px ${c}` : undefined,
                        }}
                      />
                    ))}
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    {selectedId && (
                      <button onClick={deleteSelected}
                        className="flex items-center gap-1 rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs text-red-400 hover:bg-red-500/20 transition-colors">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    )}
                    <button onClick={clearCanvas}
                      className="flex items-center gap-1 rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
                      <RotateCcw className="h-3 w-3" /> Clear
                    </button>
                  </div>
                </div>

                {/* canvas */}
                <div
                  ref={containerRef}
                  className="relative flex-1 overflow-hidden"
                  style={{
                    background: '#080809',
                    backgroundImage: 'radial-gradient(#ffffff08 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ cursor: tool === 'select' ? 'default' : 'crosshair' }}
                    onMouseDown={onPointerDown}
                    onMouseMove={onPointerMove}
                    onMouseUp={onPointerUp}
                    onMouseLeave={onPointerUp}
                  />

                  {/* empty hint */}
                  {shapes.length === 0 && !drawing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                      <Pencil className="h-10 w-10 text-zinc-800" />
                      <p className="text-sm text-zinc-700 text-center max-w-xs">
                        Draw your system architecture here<br />
                        <span className="text-xs text-zinc-800">Use freehand pen or shapes — double-click shapes to label them</span>
                      </p>
                    </div>
                  )}

                  {/* label input overlay for rect/circle shapes */}
                  {editingLabel && (() => {
                    const shape = shapes.find(s => s.id === editingLabel);
                    if (!shape || shape.tool === 'freehand') return null;
                    return (
                      <div style={{ position: 'absolute', left: shape.x + shape.w / 2 - 80, top: shape.y + shape.h / 2 - 14, zIndex: 10 }}>
                        <input
                          autoFocus
                          value={labelText}
                          onChange={e => setLabelText(e.target.value)}
                          onBlur={finishLabel}
                          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') finishLabel(); if (e.key === 'Escape') setEditingLabel(null); }}
                          placeholder="Label…"
                          className="w-40 rounded-lg border border-cyan-500/40 bg-zinc-900 px-3 py-1.5 text-xs text-white outline-none focus:ring-1 focus:ring-cyan-500/50"
                          style={{ color: shape.color }}
                        />
                      </div>
                    );
                  })()}

                  {/* click targets for select/double-click on shapes */}
                  {tool === 'select' && shapes.map(s => {
                    if (s.tool === 'freehand' || !s.w || !s.h) return null;
                    return (
                      <div key={s.id}
                        style={{ position: 'absolute', left: s.x, top: s.y, width: s.w, height: s.h, cursor: 'pointer' }}
                        onClick={() => setSelectedId(s.id === selectedId ? null : s.id)}
                        onDoubleClick={() => startLabelEdit(s.id, s.label)}
                      />
                    );
                  })}

                  {/* Component legend */}
                  <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 pointer-events-none">
                    {[
                      { label: 'Client', color: '#60a5fa' },
                      { label: 'Server', color: '#34d399' },
                      { label: 'Database', color: '#fbbf24' },
                      { label: 'Cache', color: '#f472b6' },
                      { label: 'Queue', color: '#a78bfa' },
                    ].map(({ label, color: c }) => (
                      <div key={label} className="flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-medium bg-black/70 backdrop-blur-sm"
                        style={{ border: `1px solid ${c}40`, color: c }}>
                        <div className="h-2 w-2 rounded-sm" style={{ background: c }} />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── COL 3: Camera + AI + transcript ── */}
              <div className="flex w-56 shrink-0 flex-col border-l border-white/8 bg-[#111114]">

                {/* camera */}
                <div className="relative overflow-hidden border-b border-white/8 bg-zinc-950" style={{ aspectRatio: '4/3' }}>
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
                </div>

                {/* AI card */}
                <div className="flex flex-col items-center gap-2 border-b border-white/8 bg-zinc-950 py-4 px-3">
                  <motion.div
                    animate={aiSpeaking ? {
                      borderRadius: ['44% 56% 60% 40% / 55% 45% 55% 45%', '56% 44% 40% 60% / 45% 55% 45% 55%', '44% 56% 60% 40% / 55% 45% 55% 45%'],
                      scale: [1, 1.05, 1],
                    } : { borderRadius: '50%', scale: 1 }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="flex h-14 w-14 items-center justify-center bg-gradient-to-br from-cyan-500/20 via-cyan-400/10 to-transparent ring-1 ring-cyan-400/20"
                  >
                    <span className="text-2xl">🤖</span>
                  </motion.div>
                  <div className="flex items-end gap-[2px] h-5">
                    {Array.from({ length: 14 }).map((_, i) => <WaveBar key={i} i={i} on={aiSpeaking} />)}
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    {aiSpeaking
                      ? <span className="text-cyan-400 flex items-center gap-1"><Volume2 className="h-3 w-3" /> Speaking…</span>
                      : 'Taurus AI Interviewer'}
                  </p>
                </div>

                {/* transcript */}
                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="border-b border-white/8 px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Conversation</p>
                  </div>
                  <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
                    {transcript.length === 0 && (
                      <p className="text-[11px] text-zinc-700 italic">Conversation will appear here…</p>
                    )}
                    {transcript.map((e, i) => (
                      <div key={i} className="text-[11px] leading-relaxed">
                        <span className={`font-bold mr-1 ${e.role === 'ai' ? 'text-cyan-400' : 'text-zinc-400'}`}>
                          {e.role === 'ai' ? 'AI:' : 'You:'}
                        </span>
                        <span className={e.role === 'ai' ? 'text-zinc-300' : 'text-zinc-500'}>{e.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ── Bottom Controls (only in active) ── */}
          {phase === 'active' && (
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
          )}

          {/* ENDED */}
          {phase === 'ended' && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/12 ring-1 ring-cyan-500/25">
                <CheckCircle2 className="h-10 w-10 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">System Design Complete!</h4>
                <p className="mt-2 text-zinc-400 text-sm max-w-xs mx-auto">
                  Your architecture and discussion have been recorded for review.
                </p>
              </div>
              <Button onClick={onClose} className="rounded-full px-8 bg-cyan-500 hover:bg-cyan-400 text-black font-bold">Done</Button>
            </div>
          )}

          {/* ERROR */}
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
                <Button onClick={startInterview} className="rounded-full px-8 bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
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
