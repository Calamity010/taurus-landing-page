import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import Vapi from '@vapi-ai/web';
import { Button } from '@/components/ui/button';
import {
  Mic, MicOff, Video, VideoOff,
  Phone, Sparkles, AlertCircle,
  Loader2, CheckCircle2, Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── env ─────────────────────────────────────────────────── */
const vapiKey =
  import.meta.env.VITE_VAPI_PUBLIC_KEY ||
  import.meta.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ||
  '';

const apiBaseUrl =
  import.meta.env.VITE_API_BACKEND_BASE_URL ||
  import.meta.env.NEXT_PUBLIC_API_BACKEND_BASE_URL ||
  '';

/* ─── singleton Vapi ───────────────────────────────────────── */
let vapiInstance: Vapi | null = null;
function getVapi() {
  if (!vapiInstance && vapiKey) vapiInstance = new Vapi(vapiKey);
  return vapiInstance;
}

/* ─── types ────────────────────────────────────────────────── */
export interface VideoInterviewerProps {
  isOpen: boolean;
  jobTitle: string;
  onClose: () => void;
}

type Phase =
  | 'lobby'      // camera preview before joining
  | 'fetching'   // calling backend for assistantId
  | 'connecting' // vapi.start()
  | 'active'     // live interview
  | 'ended'
  | 'error';

interface TranscriptEntry { role: 'ai' | 'user'; text: string }

/* ─── Waveform bar ─────────────────────────────────────────── */
const WaveBar = ({
  index,
  speaking,
}: {
  index: number;
  speaking: boolean;
}) => {
  const heights = [12, 20, 28, 36, 44, 36, 28, 20, 16, 24, 32, 40, 32, 24, 18, 26, 34, 26];
  const h = heights[index % heights.length];
  return (
    <motion.div
      className="w-1 rounded-full bg-white/80"
      animate={
        speaking
          ? {
              scaleY: [0.3, 1, 0.5, 0.9, 0.3],
              opacity: [0.5, 1, 0.7, 1, 0.5],
            }
          : { scaleY: 0.25, opacity: 0.25 }
      }
      style={{ height: h, originY: 1 }}
      transition={{
        repeat: Infinity,
        duration: 0.6 + (index % 5) * 0.12,
        delay: index * 0.04,
        ease: 'easeInOut',
      }}
    />
  );
};

/* ─── AI Avatar Panel ──────────────────────────────────────── */
const AIPanel = ({
  speaking,
  jobTitle,
}: {
  speaking: boolean;
  jobTitle: string;
}) => (
  <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-zinc-900">
    {/* animated background */}
    <motion.div
      className="absolute inset-0"
      animate={{
        background: speaking
          ? [
              'radial-gradient(circle at 40% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)',
              'radial-gradient(circle at 60% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)',
              'radial-gradient(circle at 40% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)',
            ]
          : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
      }}
      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
    />

    {/* dot-grid texture */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" />

    {/* outer ring */}
    <motion.div
      className="absolute rounded-full border border-white/10"
      animate={
        speaking
          ? { scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }
          : { scale: 1, opacity: 0.1 }
      }
      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      style={{ width: 200, height: 200 }}
    />
    <motion.div
      className="absolute rounded-full border border-white/8"
      animate={
        speaking
          ? { scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }
          : { scale: 1, opacity: 0.06 }
      }
      transition={{ repeat: Infinity, duration: 2.2, delay: 0.3, ease: 'easeInOut' }}
      style={{ width: 240, height: 240 }}
    />

    {/* avatar orb */}
    <motion.div
      animate={
        speaking
          ? {
              borderRadius: [
                '44% 56% 60% 40% / 55% 45% 55% 45%',
                '56% 44% 40% 60% / 45% 55% 45% 55%',
                '44% 56% 60% 40% / 55% 45% 55% 45%',
              ],
              scale: [1, 1.04, 1],
            }
          : {
              borderRadius: '50%',
              scale: 1,
            }
      }
      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      className="relative z-10 flex h-28 w-28 items-center justify-center bg-gradient-to-br from-white/20 via-white/10 to-transparent ring-2 ring-white/15 shadow-[0_0_60px_rgba(255,255,255,0.08)]"
    >
      {/* inner shimmer */}
      <motion.div
        animate={{ x: ['-120%', '120%'] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
        className="absolute inset-0 skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        style={{ borderRadius: 'inherit' }}
      />
      <span className="text-4xl select-none z-10">🤖</span>
    </motion.div>

    {/* waveform */}
    <div className="mt-6 flex items-end gap-[3px] h-10 z-10">
      {Array.from({ length: 18 }).map((_, i) => (
        <WaveBar key={i} index={i} speaking={speaking} />
      ))}
    </div>

    {/* label */}
    <div className="mt-4 z-10 text-center">
      <p className="text-sm font-semibold text-white">Taurus AI Interviewer</p>
      <p className="text-xs text-zinc-500 mt-0.5 capitalize">
        {speaking ? (
          <span className="text-zinc-300 flex items-center justify-center gap-1">
            <Volume2 className="w-3 h-3" /> Speaking…
          </span>
        ) : (
          `Interviewing for ${jobTitle}`
        )}
      </p>
    </div>
  </div>
);

/* ─── Main component ───────────────────────────────────────── */
export default function VideoInterviewer({
  isOpen,
  jobTitle,
  onClose,
}: VideoInterviewerProps) {
  const [phase, setPhase] = useState<Phase>('lobby');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [callDuration, setCallDuration] = useState(0);

  const userVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const assistantIdRef = useRef<string | null>(null);
  const callIdRef = useRef<string | null>(null);
  const transcriptRef = useRef<TranscriptEntry[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* sync transcriptRef */
  useEffect(() => { transcriptRef.current = transcript; }, [transcript]);

  /* ── camera helpers ── */
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false, // Vapi handles audio separately
      });
      streamRef.current = stream;
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('[VideoInterviewer] Camera access denied:', err);
      setIsCamOn(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const toggleCam = () => {
    if (!streamRef.current) return;
    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsCamOn(videoTrack.enabled);
    }
  };

  const toggleMic = () => {
    const vapi = getVapi();
    if (phase === 'active') {
      // toggle Vapi mic
      setIsMicOn((prev) => {
        const next = !prev;
        if (next) vapi?.setMuted(false);
        else vapi?.setMuted(true);
        return next;
      });
    } else {
      setIsMicOn((p) => !p);
    }
  };

  /* ── timer ── */
  const startTimer = () => {
    setCallDuration(0);
    timerRef.current = setInterval(() =>
      setCallDuration((d) => d + 1), 1000
    );
  };
  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  /* ── send transcript ── */
  const sendTranscript = useCallback(async () => {
    const t = transcriptRef.current;
    if (!t.length) return;
    try {
      const base = apiBaseUrl.replace(/\/$/, '');
      await fetch(`${base}/api/landing-page/conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistantId: assistantIdRef.current || 'interview',
          callId: callIdRef.current,
          transcript: t.map((e) =>
            e.role === 'ai' ? { ai: e.text } : { user: e.text }
          ),
          endedAt: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.warn('[VideoInterviewer] transcript send failed', e);
    }
  }, []);

  /* ── start interview (backend → vapi) ── */
  const startInterview = useCallback(async () => {
    if (!vapiKey) {
      setErrorMsg('Vapi API key is missing in .env');
      setPhase('error');
      return;
    }

    setPhase('fetching');
    setErrorMsg('');
    setTranscript([]);
    transcriptRef.current = [];

    try {
      const base = apiBaseUrl.replace(/\/$/, '');
      const res = await fetch(
        `${base}/api/landing-page/vapi-interview-assistant`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobTitle }),
        }
      );
      if (!res.ok)
        throw new Error(`Backend error: ${res.status} ${res.statusText}`);

      const data = await res.json();
      const assistantId =
        data.assistantId ||
        data.assistant_id ||
        data.id ||
        data.data?.assistantId;

      if (!assistantId) throw new Error('No assistantId in backend response');
      assistantIdRef.current = assistantId;

      const vapi = getVapi();
      if (!vapi) throw new Error('Vapi not initialized');

      vapi.removeAllListeners();

      vapi.on('call-start', () => {
        setPhase('active');
        startTimer();
      });

      vapi.on('call-end', () => {
        stopTimer();
        setPhase('ended');
        sendTranscript();
      });

      vapi.on('speech-start', () => setAiSpeaking(true));
      vapi.on('speech-end', () => setAiSpeaking(false));

      vapi.on('message', (msg: any) => {
        if (msg.type === 'transcript' && msg.transcriptType === 'final') {
          const entry: TranscriptEntry = {
            role: msg.role === 'assistant' ? 'ai' : 'user',
            text: msg.transcript,
          };
          setTranscript((prev) => [...prev, entry]);
          transcriptRef.current = [...transcriptRef.current, entry];
        }
        if (msg.type === 'call-update' && msg.call?.id) {
          callIdRef.current = msg.call.id;
        }
      });

      vapi.on('error', (e: any) => {
        setErrorMsg(e?.message || 'An error occurred');
        setPhase('error');
        stopTimer();
      });

      setPhase('connecting');
      await vapi.start(assistantId);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to start interview');
      setPhase('error');
    }
  }, [jobTitle, sendTranscript]);

  /* ── hang up ── */
  const hangUp = useCallback(() => {
    getVapi()?.stop();
    getVapi()?.removeAllListeners();
    stopTimer();
    stopCamera();
    onClose();
  }, [stopCamera, onClose]);

  /* ── open / close lifecycle ── */
  useEffect(() => {
    if (isOpen) {
      setPhase('lobby');
      setCallDuration(0);
      setTranscript([]);
      setAiSpeaking(false);
      setIsMicOn(true);
      setIsCamOn(true);
      startCamera();
    } else {
      getVapi()?.stop();
      getVapi()?.removeAllListeners();
      stopTimer();
      stopCamera();
      setPhase('lobby');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* attach stream to video element when lobby loads */
  useEffect(() => {
    if (
      userVideoRef.current &&
      streamRef.current &&
      !userVideoRef.current.srcObject
    ) {
      userVideoRef.current.srcObject = streamRef.current;
    }
  });

  if (!isOpen) return null;

  /* ────────────────────────────────────────────────────────── */
  return (
    <AnimatePresence>
      <motion.div
        key="vi-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      >
        <motion.div
          key="vi-card"
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 260 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-zinc-950 border border-white/8 shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
          style={{ maxHeight: '92vh' }}
        >

          {/* ── TOP BAR ── */}
          <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.025] px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <Video className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">
                  AI Video Interview
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5 capitalize">
                  {jobTitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {phase === 'active' && (
                <div className="flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1 ring-1 ring-red-500/25">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-[11px] font-semibold text-red-400 tabular-nums">
                    {formatTime(callDuration)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════ */}
          {/* LOBBY ─ camera preview before joining              */}
          {/* ═══════════════════════════════════════════════════ */}
          {phase === 'lobby' && (
            <div className="flex flex-col items-center gap-6 px-8 py-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Ready to join?
              </p>
              <h2 className="text-2xl font-bold text-white text-center">
                Check your camera & mic before starting
              </h2>

              {/* preview */}
              <div className="relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                <video
                  ref={userVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`h-full w-full object-cover scale-x-[-1] ${isCamOn ? 'block' : 'hidden'}`}
                />
                {!isCamOn && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center">
                      <VideoOff className="h-7 w-7 text-zinc-500" />
                    </div>
                    <p className="text-sm text-zinc-500">Camera off</p>
                  </div>
                )}
                {/* cam/mic pills */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  <button
                    onClick={toggleCam}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      isCamOn
                        ? 'bg-white/15 text-white hover:bg-white/25'
                        : 'bg-red-500/80 text-white hover:bg-red-500'
                    }`}
                  >
                    {isCamOn ? <Video className="h-3.5 w-3.5" /> : <VideoOff className="h-3.5 w-3.5" />}
                    {isCamOn ? 'Camera on' : 'Camera off'}
                  </button>
                  <button
                    onClick={toggleMic}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      isMicOn
                        ? 'bg-white/15 text-white hover:bg-white/25'
                        : 'bg-red-500/80 text-white hover:bg-red-500'
                    }`}
                  >
                    {isMicOn ? <Mic className="h-3.5 w-3.5" /> : <MicOff className="h-3.5 w-3.5" />}
                    {isMicOn ? 'Mic on' : 'Mic off'}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="rounded-full px-6 border-white/15 text-zinc-400 hover:bg-white/8 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  id="join-interview-btn"
                  onClick={startInterview}
                  className="rounded-full px-8 bg-white text-black hover:bg-zinc-100 font-bold"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Join Interview
                </Button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════ */}
          {/* FETCHING / CONNECTING                              */}
          {/* ═══════════════════════════════════════════════════ */}
          {(phase === 'fetching' || phase === 'connecting') && (
            <div className="flex flex-col items-center justify-center gap-6 py-20 px-8">
              {/* morphing orb */}
              <div className="relative flex h-32 w-32 items-center justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-white/20"
                    animate={{ scale: [1, 1.5 + i * 0.15, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      delay: i * 0.5,
                      ease: 'easeInOut',
                    }}
                    style={{ width: 72 + i * 22, height: 72 + i * 22 }}
                  />
                ))}
                <motion.div
                  animate={{
                    borderRadius: [
                      '44% 56% 60% 40% / 55% 45% 55% 45%',
                      '56% 44% 40% 60% / 45% 55% 45% 55%',
                      '44% 56% 60% 40% / 55% 45% 55% 45%',
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="relative z-10 flex h-20 w-20 items-center justify-center bg-gradient-to-br from-white/20 via-white/10 to-transparent ring-1 ring-white/20"
                >
                  <span className="text-3xl">🤖</span>
                </motion.div>
              </div>

              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-lg font-bold text-white"
              >
                {phase === 'fetching'
                  ? `Building your ${jobTitle} interview…`
                  : 'Connecting to Taurus AI…'}
              </motion.p>
              <p className="text-sm text-zinc-500">
                {phase === 'fetching'
                  ? 'Generating role-specific questions'
                  : 'Allow microphone access when prompted'}
              </p>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════ */}
          {/* ACTIVE ─ the real interview                        */}
          {/* ═══════════════════════════════════════════════════ */}
          {phase === 'active' && (
            <div className="flex flex-col">
              {/* video grid */}
              <div className="grid grid-cols-2 gap-2 p-3" style={{ height: '56vh', minHeight: 320 }}>
                {/* AI panel */}
                <div className="relative rounded-2xl overflow-hidden border border-white/8">
                  <AIPanel speaking={aiSpeaking} jobTitle={jobTitle} />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 backdrop-blur-sm">
                    <div className={`h-2 w-2 rounded-full ${aiSpeaking ? 'bg-green-400 animate-pulse' : 'bg-zinc-600'}`} />
                    <span className="text-[11px] font-medium text-zinc-300">Taurus AI</span>
                  </div>
                </div>

                {/* User camera panel */}
                <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-zinc-900">
                  <video
                    ref={userVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`h-full w-full object-cover scale-x-[-1] ${isCamOn ? 'opacity-100' : 'opacity-0'}`}
                  />
                  {!isCamOn && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <div className="h-20 w-20 rounded-full bg-zinc-800 flex items-center justify-center">
                        <span className="text-3xl">👤</span>
                      </div>
                      <p className="text-sm text-zinc-500">Camera off</p>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 backdrop-blur-sm">
                    <div className={`h-2 w-2 rounded-full ${isMicOn ? 'bg-green-400' : 'bg-red-500'}`} />
                    <span className="text-[11px] font-medium text-zinc-300">You</span>
                  </div>
                  {!isMicOn && (
                    <div className="absolute top-3 right-3 rounded-full bg-red-500/80 p-1.5">
                      <MicOff className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* live transcript ticker */}
              {transcript.length > 0 && (
                <div className="mx-3 mb-2 overflow-hidden rounded-xl bg-white/[0.04] border border-white/5 max-h-20 overflow-y-auto px-4 py-2.5">
                  {transcript.slice(-3).map((e, i) => (
                    <p key={i} className="text-xs leading-relaxed">
                      <span className={`font-bold mr-1.5 ${e.role === 'ai' ? 'text-white/50' : 'text-zinc-500'}`}>
                        {e.role === 'ai' ? 'AI:' : 'You:'}
                      </span>
                      <span className={e.role === 'ai' ? 'text-zinc-200' : 'text-zinc-400'}>
                        {e.text}
                      </span>
                    </p>
                  ))}
                </div>
              )}

              {/* controls bar */}
              <div className="flex items-center justify-center gap-4 py-4 border-t border-white/5 bg-white/[0.02]">
                {/* mic */}
                <button
                  onClick={toggleMic}
                  title={isMicOn ? 'Mute' : 'Unmute'}
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                    isMicOn
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </button>

                {/* camera */}
                <button
                  onClick={toggleCam}
                  title={isCamOn ? 'Turn off camera' : 'Turn on camera'}
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                    isCamOn
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {isCamOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </button>

                {/* hang up */}
                <button
                  onClick={hangUp}
                  title="End interview"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105"
                >
                  <Phone className="h-6 w-6 rotate-[135deg]" />
                </button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════ */}
          {/* ENDED                                              */}
          {/* ═══════════════════════════════════════════════════ */}
          {phase === 'ended' && (
            <div className="flex flex-col items-center gap-6 py-16 px-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">Interview Complete!</h4>
                <p className="mt-2 text-zinc-400 text-sm max-w-xs mx-auto">
                  Your responses have been recorded and saved. Our team will review them and get back to you soon.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  className="rounded-full px-8 bg-white text-black hover:bg-zinc-100 font-semibold"
                >
                  Done
                </Button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════ */}
          {/* ERROR                                              */}
          {/* ═══════════════════════════════════════════════════ */}
          {phase === 'error' && (
            <div className="flex flex-col items-center gap-6 py-16 px-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/12 ring-1 ring-red-500/25">
                <AlertCircle className="h-10 w-10 text-red-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Connection Failed</h4>
                <p className="mt-2 text-zinc-400 text-sm max-w-sm mx-auto">{errorMsg}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={startInterview}
                  className="rounded-full px-8 bg-white text-black hover:bg-zinc-100 font-semibold"
                >
                  <Loader2 className="mr-2 h-4 w-4" /> Retry
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="rounded-full px-8 border-white/15 text-zinc-400 hover:bg-white/8"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
