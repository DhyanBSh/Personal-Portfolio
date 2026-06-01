import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Cinematic from './components/Cinematic';
import Cursor from './components/Cursor';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { AnimatePresence, motion } from 'motion/react';
import Splash from './components/Splash';
import { BackgroundTransitionProvider } from './components/BackgroundTransitionProvider';

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="flex-1 flex flex-col w-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const [navSplash, setNavSplash] = React.useState(false);
  const prevPathRef = React.useRef(location.pathname);

  React.useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      // navigation happened
      prevPathRef.current = location.pathname;
      setNavSplash(true);
      const t = window.setTimeout(() => setNavSplash(false), 650);
      return () => window.clearTimeout(t);
    }
  }, [location.pathname]);
  return (
    <React.Fragment>
      {navSplash && <Splash quick onComplete={() => setNavSplash(false)} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <BackgroundTransitionProvider
        sections={[
          { threshold: 0, color: 'white' },
          { threshold: 0.33, color: 'black' },
          { threshold: 0.66, color: 'white' },
        ]}
        transitionDuration={0.5}
      >
        <ScrollToTop />
        <div className="min-h-screen font-sans flex flex-col">
          <Cinematic />
          <Cursor />
          <Navbar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AnimatedRoutes />
          </div>
          <Footer />
          <ScrollToTopButton />
        </div>
      </BackgroundTransitionProvider>
    </BrowserRouter>
  );
}
