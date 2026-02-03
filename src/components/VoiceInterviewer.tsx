
import { useState, useEffect, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import { Button } from '@/components/ui/button';
import { Mic, X, Loader2, Volume2, StopCircle } from 'lucide-react';
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

  useEffect(() => {
    if (!isOpen) {
      vapi.stop();
      setStatus('idle');
      return;
    }

    // Configure event listeners
    vapi.on('call-start', () => {
      setStatus('active');
    });

    vapi.on('call-end', () => {
      setStatus('idle');
      onClose(); // Auto close on end? optional
    });

    vapi.on('speech-start', () => {
      setIsSpeaking(true);
    });

    vapi.on('speech-end', () => {
      setIsSpeaking(false);
    });

    vapi.on('volume-level', () => {
      // setVolumeLevel(level);
    });

    vapi.on('error', (e) => {
      console.error(e);
      setStatus('error');
    });

    return () => {
      vapi.stop();
    };
  }, [isOpen, onClose]);

  const startCall = useCallback(async () => {
    if (!vapiKey) {
      console.error("Cannot start call: Vapi API Key is missing");
      setStatus('error');
      return;
    }

    setStatus('connecting');
    try {
      // Define a simple interviewer assistant
      const assistant = {
        name: "Taurus Reviewer",
        firstMessage: "Hello! I'm your AI Interviewer from Taurus. I'd love to chat about your background. Shall we begin?",
        transcriber: {
          provider: "deepgram" as const,
          model: "nova-2",
          language: "en-US" as const,
        },
        voice: {
          provider: "11labs" as const,
          voiceId: "burt",
        },
        model: {
          provider: "openai" as const,
          model: "gpt-3.5-turbo" as const,
          messages: [
            {
              role: "system" as const,
              content: "You are a professional and friendly AI interviewer for Taurus Hire. Your goal is to conduct a preliminary screening interview. Ask about the candidate's background, experience, and what they are looking for in a new role. Be concise and conversational. Keep responses under 2-3 sentences."
            }
          ]
        },
        recordingEnabled: false,
      };

      await vapi.start(assistant);
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
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-zinc-300">Establishing connection...</p>
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
