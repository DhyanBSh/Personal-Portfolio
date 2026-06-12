import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export const Navbar = () => {
  const initialY = typeof window !== 'undefined' ? window.scrollY : 0;
  const [atTop, setAtTop] = useState(initialY <= 6);
  const [rotation, setRotation] = useState(0); // degrees accumulated for icon
  const lastY = useRef<number>(initialY);
  const stopTimer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      const isTop = y <= 6;
      setAtTop(isTop);

      // only rotate the icon when we're not at top and the scroll delta is meaningful
      if (!isTop && Math.abs(delta) > 4) {
        const dir = Math.sign(delta);
        setRotation((prev) => prev + dir * 30);
      }

      // reset stop timer (used to re-evaluate atTop after scrolling stops)
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
      stopTimer.current = window.setTimeout(() => {
        // ensure atTop is kept accurate when scrolling stops
        setAtTop(window.scrollY <= 6);
      }, 220);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
    };
  }, []);

  // Show the icon image only when NOT at the top; keep Logo.png visible at top only
  const showIcon = !atTop;

  return (
    <div>
      <motion.nav 
        initial={{ y: -100, opacity: 0, filter: 'blur(10px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-black/20 bg-black/70 backdrop-blur-md transition-all"
      >
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="logo-wrap h-10 w-10 relative flex items-center justify-center">
              <img
  src="/Logo.png"
  alt="Logo"
  className={`
    absolute
    left-1/2
    top-1/2
    w-[140%]
    h-[140%]
    object-contain
    -translate-x-1/2
    -translate-y-1/2
    navbar-logo
    ${showIcon ? 'opacity-0' : 'opacity-100'}
    ${!showIcon ? 'logo-large' : ''}
  `}
/>
              <img src="/Logo Icon.png" alt="Logo Icon" className={`absolute inset-0 w-full h-full object-contain navbar-logo ${showIcon ? 'opacity-100' : 'opacity-0'}`} style={{ transform: `rotate(${rotation}deg)` }} />
            </div>
          </Link>

          <div className="hidden md:block w-px h-6 bg-white/20"></div>

          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-[#111] ml-8">
            <Link to="/about" className="hover:opacity-50 transition-opacity">DNA</Link>
            <Link to="/services" className="hover:opacity-50 transition-opacity">Services</Link>
            <Link to="/portfolio" className="hover:opacity-50 transition-opacity">Portfolio</Link>
          </div>
        </div>

        <div className="flex justify-end">
          <Link to="/contact" className="flex py-3 border border-[#111] group px-6 text-[10px] uppercase tracking-widest font-bold hover:bg-[#111] hover:text-white transition-colors text-[#111] items-center gap-2">
            Let's Talk
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.nav>

      {/* Secondary navbar for mobile */}
      <motion.nav 
        initial={{ y: -100, opacity: 0, filter: 'blur(10px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed top-[72px] left-0 right-0 z-40 md:hidden flex justify-start gap-8 px-6 py-4 border-b border-black/20 bg-black/70 backdrop-blur-md transition-all"
      >
        <Link to="/about" className="text-[11px] uppercase tracking-[0.2em] font-bold text-white hover:opacity-80 transition-opacity">DNA</Link>
        <Link to="/services" className="text-[11px] uppercase tracking-[0.2em] font-bold text-white hover:opacity-80 transition-opacity">Services</Link>
        <Link to="/portfolio" className="text-[11px] uppercase tracking-[0.2em] font-bold text-white hover:opacity-80 transition-opacity">Portfolio</Link>
      </motion.nav>
    </div>
  );
};
