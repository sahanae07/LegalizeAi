import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { VoiceAssistant } from './VoiceAssistant';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-brand-slate flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        <VoiceAssistant />
      </main>
    </div>
  );
};
