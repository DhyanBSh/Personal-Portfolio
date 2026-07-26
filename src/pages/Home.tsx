import { useRef, useState, type MouseEvent } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParallaxLayer } from '../components/ParallaxLayer';
import { useBackgroundTransition } from '../hooks/useBackgroundTransition';
import { RecentProjects } from '../components/RecentProjects';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { Testimonials } from '../components/Testimonials';
import { TrustSection } from '../components/TrustSection';
import HeroNew from '../components/HeroNew';

// Softer curve + slightly less blur than before: blur is expensive to paint and a lighter
// touch reads as smoother, especially when several items stagger in at once.
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)', scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const CaseStudiesTable = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  return (
    <section className={`px-6 md:px-12 py-16 md:py-20 transition-colors duration-500 ${
      isDark 
        ? 'bg-[#000000] border-white/10' 
        : 'bg-[#fcfcfc] border-black/10'
    } border-b`}>
      
      <motion.h2
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={sectionVariants}
  className={`w-full max-w-[4000px] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-medium tracking-tight leading-[1.15] mb-16 md:mb-16 transition-colors duration-500 ${
    isDark ? "text-white" : "text-[#111]"
  }`}
>
  <motion.span variants={itemVariants}>
    I am an <span className="bg-white text-black px-2 py-1">AI-assisted UI/UX Engineer and a Creative Designer,</span>{" "} specializing in
      User-Centered Creative Design,
    
    crafting intuitive, scalable, and impactful digital experiences.
  </motion.span>
</motion.h2>


<motion.h2
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={sectionVariants}
  className={`w-full max-w-[4000px] text-[24px] sm:text-[30px] md:text-[36px] font-medium tracking-tight leading-[1.25] mb-16 md:mb-1 transition-colors duration-500 ${
    isDark ? "text-white" : "text-white/80"
  }`}
>
</motion.h2>
    </section>
  );
};


const Showreel = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  return (
    <ParallaxLayer strength={0.1}>
      <section className={`px-6 md:px-12 pb-24 md:pb-2 transition-colors duration-500 ${
        isDark ? 'bg-[#000000]' : 'bg-[#fcfcfc]'
      }`}>
        <Link to="/portfolio" className="block w-full">
          <div className={`w-full relative aspect-[3/4] md:aspect-video overflow-hidden group cursor-pointer border rounded-lg transition-colors duration-500 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
          }`}>
          <div className="absolute top-6 right-6 z-10 text-[10px] font-bold uppercase tracking-widest text-white mix-blend-difference opacity-70 text-right">
          </div>
          
            <div className="absolute inset-0">
            <div data-parallax data-parallax-depth="0.03" className="absolute inset-0">
              {/* Only the scale breathes now — that's a cheap transform. The grayscale
                  toggle was fighting the hover:grayscale-0 transition below, which caused
                  a visible stutter whenever a hover landed mid-cycle. Hover now owns color. */}
              <motion.img
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
                src="/Home BG.png"
                className={`w-full h-full object-cover object-center grayscale transition-all duration-1000 will-change-transform group-hover:grayscale-0 ${
                  isDark ? 'grayscale-0 opacity-100' : ''
                }`}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className={`absolute bottom-6 left-6 flex-col md:flex-row flex md:items-center gap-4 md:gap-8 z-10 w-full pr-12 transition-colors duration-500 ${
            isDark ? 'text-black' : 'text-black'
          }`}>
            <div className="text-[10px] font-bold uppercase tracking-widest mix-blend-difference flex items-center gap-2 group-hover:opacity-50 transition-opacity">
              More Projects <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="md:absolute right-12 text-[10px] font-bold uppercase tracking-widest mix-blend-difference opacity-70">
              Dhyan Bhashitha Jayasinghe
            </div>
          </div>
          </div>
        </Link>
      </section>
    </ParallaxLayer>
  );
};

export const Home = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  return (
    <main className={`transition-colors duration-500 ${
      isDark ? 'bg-[#000000] text-white' : 'bg-[#fcfcfc] text-[#111]'
    }`}>
      <HeroNew />
      <CaseStudiesTable />
      <TrustSection />
      <FeaturedProjects />
      <Showreel />
      <Testimonials />
    </main>
  );
};