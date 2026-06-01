import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

type Phase = 'bouncing' | 'zooming' | 'main';

export const Splash: React.FC<{ onComplete?: () => void; quick?: boolean; bounceDuration?: number }> = ({ onComplete, quick = false, bounceDuration = 3000 }) => {
  const [phase, setPhase] = useState<Phase>(quick ? 'zooming' : 'bouncing');

  useEffect(() => {
    if (phase === 'bouncing') {
      const timer = setTimeout(() => setPhase('zooming'), bounceDuration);
      return () => clearTimeout(timer);
    } else if (phase === 'zooming') {
      const timer = setTimeout(() => setPhase('main'), 100);
      return () => clearTimeout(timer);
    } else if (phase === 'main') {
      onComplete && onComplete();
    }
  }, [phase, onComplete]);

  function HeroLogo({ size = 48 }: { size?: number }) {
    return (
      <div
        className="flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] text-white"
        style={{ width: size, height: size }}
      >
        <img src="/Logo Icon.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-white/30 overflow-x-hidden">
      <div className="fixed inset-0 bg-black pointer-events-none border-[1px] border-white/5" />

      {phase === 'bouncing' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
          <div className="relative">
            <motion.div
              layoutId="app-logo"
              animate={{ y: [0, -60, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: ['easeOut', 'easeIn'],
                times: [0, 0.5, 1],
              }}
              className="relative z-10"
            >
              <HeroLogo size={140} />
            </motion.div>

            <motion.div
              animate={{ y: [0, 60, 0], opacity: [0.3, 0.05, 0.3], scaleX: [1, 1.02, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: ['easeOut', 'easeIn'],
                times: [0, 0.5, 1],
              }}
              style={{
                transform: 'scaleY(-1)',
                filter: 'blur(2px)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
              }}
              className="absolute top-full left-0 right-0 origin-top z-0 flex justify-center mt-2 pointer-events-none"
            >
              <HeroLogo size={140} />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Splash;
