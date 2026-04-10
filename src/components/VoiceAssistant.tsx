import { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { cn } from '../lib/utils';

export const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    isListening, 
    isSpeaking, 
    transcript, 
    response, 
    startListening, 
    stopListening, 
    stopSpeaking 
  } = useVoiceAssistant();

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 glass-card p-0 overflow-hidden flex flex-col shadow-2xl border-brand-blue/30"
          >
            <div className="bg-brand-blue p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-white" />
                <span className="font-semibold text-white">LegalizeAI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-4 flex flex-col">
              {transcript && (
                <div className="self-end bg-brand-blue/20 p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm">
                  {transcript}
                </div>
              )}
              {response && (
                <div className="self-start bg-white/10 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
                  {response}
                </div>
              )}
              {!transcript && !response && (
                <div className="text-center text-slate-400 text-sm mt-10">
                  How can I help you today? Click the mic to start speaking.
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 flex items-center gap-3">
              <button
                onClick={isListening ? stopListening : startListening}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                  isListening ? "bg-red-500 animate-pulse" : "bg-brand-blue hover:bg-brand-blue/90"
                )}
              >
                {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
              </button>
              
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
                >
                  <VolumeX className="w-5 h-5 text-white" />
                </button>
              )}
              
              <div className="flex-1 text-xs text-slate-400 italic">
                {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Ready"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90",
          isOpen ? "bg-slate-800 rotate-90" : "bg-brand-blue hover:scale-110"
        )}
      >
        {isOpen ? <X className="w-8 h-8 text-white" /> : <MessageSquare className="w-8 h-8 text-white" />}
        {!isOpen && isSpeaking && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-emerald rounded-full animate-ping" />
        )}
      </button>
    </div>
  );
};
