
import { useState, useEffect, useCallback, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Button } from '@/components/ui/button';
import { Mic, X, Volume2, StopCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const vapiKey = 
  import.meta.env.VITE_VAPI_PUBLIC_KEY || 
  import.meta.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || 
  '';
const vapi = new Vapi(vapiKey);

interface VoiceInterviewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceInterviewer({ isOpen, onClose }: VoiceInterviewerProps) {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Record<string, string>[]>([]);
  const assistantIdRef = useRef<string | null>(null);
  
  // Debug logging
  useEffect(() => {
    if (isOpen) {
      console.log('VoiceInterviewer opened');
      console.log('Vapi Key detected:', vapiKey ? `${vapiKey.slice(0, 5)}...${vapiKey.slice(-5)}` : 'NONE');
      if (!vapiKey) {
        console.error('Vapi API Key is missing! Please set VAPI_PRIVATE_KEY or VITE_VAPI_PUBLIC_KEY in .env');
      }
    }
  }, [isOpen]);

  const sendTranscriptToBackend = useCallback(async (finalTranscript: typeof transcript, assistantId: string | null) => {
    if (finalTranscript.length === 0) return;

    try {
      const apiBaseUrl = import.meta.env.NEXT_PUBLIC_API_BACKEND_BASE_URL || '';
      await fetch(`${apiBaseUrl.replace(/\/$/, '')}/api/landing-page/conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantId: "freja",
          callId: assistantId,
          transcript: finalTranscript,
          endedAt: new Date().toISOString(),
        }),
      });
      console.log('Transcript saved to backend successfully');
    } catch (err) {
      console.error('Failed to save transcript:', err);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      vapi.stop();
      setStatus('idle');
      return;
    }

    // Clear any existing listeners to prevent duplicates
    vapi.removeAllListeners();

    // Configure event listeners
    vapi.on('call-start', () => {
      setStatus('active');
      setTranscript([]); // Reset transcript for new session
    });

    vapi.on('call-end', () => {
      setStatus('idle');
      // Use functional state to get the most updated transcript for sending
      setTranscript(prev => {
        sendTranscriptToBackend(prev, assistantIdRef.current);
        return prev;
      });
      onClose();
    });

    vapi.on('message', (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const key = message.role === 'assistant' ? 'ai' : 'user';
        setTranscript(prev => [
          ...prev,
          { [key]: message.transcript }
        ]);
      }
    });

    vapi.on('speech-start', () => {
      setIsSpeaking(true);
    });

    vapi.on('speech-end', () => {
      setIsSpeaking(false);
    });

    vapi.on('error', (e) => {
      console.error(e);
      setStatus('error');
    });

    return () => {
      vapi.stop();
      vapi.removeAllListeners();
    };
  }, [isOpen, onClose, sendTranscriptToBackend]);

  const startCall = useCallback(async () => {
    if (!vapiKey) {
      console.error("Cannot start call: Vapi API Key is missing");
      setStatus('error');
      return;
    }

    setStatus('connecting');
    try {
      const apiBaseUrl = import.meta.env.NEXT_PUBLIC_API_BACKEND_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl.replace(/\/$/, '')}/api/landing-page/vapi-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantId = data.assistantId || data.assistant_id || data.id || data.data?.assistantId;

      if (!assistantId) {
        throw new Error("Assistant ID not found in API response");
      }

      console.log('Starting Vapi with assistant ID:', assistantId);
      assistantIdRef.current = assistantId;
      await vapi.start(assistantId);
    } catch (err) {
      console.error("Failed to start call:", err);
      setStatus('error');
    }
  }, []);

  const stopCall = () => {
    vapi.stop();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Mic className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Interviewer</h3>
                <p className="text-xs text-zinc-400">
                  {status === 'active' ? 'Live Session' : status === 'connecting' ? 'Connecting...' : 'Ready'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-zinc-800">
              <X className="w-5 h-5 text-zinc-400" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
            {status === 'error' && (
              <div className="text-red-400 mb-4">
                <p>Failed to connect to the interviewer.</p>
                <p className="text-sm text-zinc-500 mt-2">Please check your microphone permissions and try again.</p>
                <Button onClick={startCall} variant="outline" className="mt-4">Retry</Button>
              </div>
            )}

            {status === 'idle' && (
              <>
                <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                  <Mic className="w-10 h-10 text-zinc-400" />
                </div>
                <h4 className="text-xl font-medium text-white mb-2">Ready to Start?</h4>
                <p className="text-zinc-400 mb-8 max-w-[250px]">
                  Click the button below to begin your AI interview session.
                </p>
                <Button 
                  onClick={startCall} 
                  size="lg" 
                  className="rounded-full px-8 py-6 text-lg bg-primary text-black hover:bg-primary/90"
                >
                  <Volume2 className="w-5 h-5 mr-2" />
                  Start Interview
                </Button>
              </>
            )}

            {status === 'connecting' && (
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
                  {/* Aurora Background Glows */}
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 10,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-purple-500/20 to-blue-400/30 blur-3xl rounded-full"
                  />
                  <motion.div
                    animate={{
                      rotate: -360,
                      scale: [1.1, 1, 1.1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 12,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-bl from-blue-400/20 via-transparent to-primary/30 blur-3xl rounded-full"
                  />
                  
                  {/* Morphing AI Magic Sphere */}
                  <motion.div
                    animate={{
                      borderRadius: [
                        "40% 60% 70% 30% / 40% 50% 60% 50%",
                        "60% 40% 30% 70% / 50% 60% 50% 40%",
                        "50% 50% 50% 50% / 50% 50% 50% 50%",
                        "40% 60% 70% 30% / 40% 50% 60% 50%",
                      ],
                      scale: [1, 1.05, 0.95, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "easeInOut"
                    }}
                    className="relative z-10 w-32 h-32 bg-gradient-to-br from-primary via-blue-500 to-purple-600 shadow-[0_0_50px_rgba(59,130,246,0.5)] flex items-center justify-center overflow-hidden"
                  >
                    {/* Inner Shimmer */}
                    <motion.div
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />
                    <Mic className="w-12 h-12 text-black/80 relative z-20" />
                  </motion.div>

                  {/* Orbiting Energy Particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3 + i,
                        ease: "linear"
                      }}
                      className="absolute inset-0"
                    >
                      <motion.div 
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          delay: i * 0.5,
                        }}
                        className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#3b82f6] absolute top-[-5px] left-1/2" 
                      />
                    </motion.div>
                  ))}
                </div>
                
                <div className="space-y-3 relative z-20">
                  <motion.h4 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white tracking-tight"
                  >
                    Summoning Taurus AI
                  </motion.h4>
                  <p className="text-zinc-400 font-medium">Synchronizing neural pathways...</p>
                </div>
              </div>
            )}

            {status === 'active' && (
              <div className="flex flex-col items-center w-full">
                {/* Visualizer Circle */}
                <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: isSpeaking ? [1, 1.2, 1] : 1,
                      opacity: isSpeaking ? 0.8 : 0.3,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-full bg-primary blur-xl"
                  />
                  <div className="relative z-10 w-28 h-28 rounded-full bg-zinc-800 flex items-center justify-center border-4 border-zinc-700">
                    <Mic className={`w-10 h-10 ${isSpeaking ? 'text-primary' : 'text-zinc-500'}`} />
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <p className="text-lg font-medium text-white">
                    {isSpeaking ? "Interviewer is speaking..." : "Listening to you..."}
                  </p>
                  <p className="text-sm text-zinc-500">
                    Speak clearly into your microphone
                  </p>
                </div>

                <Button 
                  onClick={stopCall} 
                  variant="destructive" 
                  size="lg"
                  className="rounded-full px-8"
                >
                  <StopCircle className="w-5 h-5 mr-2" />
                  End Interview
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
