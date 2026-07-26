import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ParallaxLayer } from '../components/ParallaxLayer';
import { useBackgroundTransition } from '../hooks/useBackgroundTransition';

const revealEase = [0.16, 1, 0.3, 1] as const;

const HeroNew = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  const sectionRef = useRef<HTMLElement>(null);
  const [isCursorActive, setIsCursorActive] = useState(false);

  // Track reduced-motion preference live, not just on mount, and also
  // detect whether the primary input is a mouse. On touch devices the
  // pointer-driven parallax/spotlight should never engage.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [hasFinePointer, setHasFinePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const onMotionChange = () => setPrefersReducedMotion(motionQuery.matches);
    const onPointerChange = () => setHasFinePointer(pointerQuery.matches);
    motionQuery.addEventListener('change', onMotionChange);
    pointerQuery.addEventListener('change', onPointerChange);
    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
      pointerQuery.removeEventListener('change', onPointerChange);
    };
  }, []);

  const enableParallax = hasFinePointer && !prefersReducedMotion;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 20, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 20, mass: 0.7 });

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSmoothX = useSpring(cursorX, { stiffness: 260, damping: 26, mass: 0.4 });
  const cursorSmoothY = useSpring(cursorY, { stiffness: 260, damping: 26, mass: 0.4 });

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    // Ignore touch/pen input entirely so scrolling on mobile never
    // triggers the hover-parallax transforms.
    if (!enableParallax || e.pointerType !== 'mouse') return;

    const { innerWidth, innerHeight } = window;
    mouseX.set(e.clientX / innerWidth - 0.5);
    mouseY.set(e.clientY / innerHeight - 0.5);

    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    }
  };

  const bgX = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);
  const imgX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const imgY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);
  const textX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  const textColor = isDark ? 'text-white' : 'text-white mix-blend-difference';
  const mutedText = isDark ? 'text-white/70' : 'text-white/80 mix-blend-difference';

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => enableParallax && setIsCursorActive(true)}
      onPointerLeave={() => setIsCursorActive(false)}
      className={`relative isolate h-[100svh] min-h-[100svh] w-full overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#000000]' : 'bg-[#fcfcfc]'
      }`}
    >
      {/* Background layer */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
        <motion.img
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 2, ease: revealEase }}
          style={{ x: enableParallax ? bgX : 0, y: enableParallax ? bgY : 0 }}
          src="/HeroBG.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className={`h-full w-full object-cover object-center transition-opacity duration-500 will-change-transform ${
            isDark ? 'opacity-90' : 'opacity-25'
          }`}
        />
        <div className="hero-grain" aria-hidden="true" />
      </div>

      {/* Portrait layer — scaled down on short/narrow screens so it doesn't
          crowd out the headline or run into the bottom content block. */}
      <motion.div
        aria-hidden="true"
        className="
    pointer-events-none
    absolute
    inset-0
    z-0
    hidden
    md:flex
    items-end
    justify-center
    pr-0
    sm:justify-end
    sm:pr-2
    md:pr-10
  "
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: revealEase, delay: 0.08 }}
        style={{ x: enableParallax ? imgX : 0, y: enableParallax ? imgY : 0 }}
      >
        <img
          src="/HeroImage.jpg"
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-[42svh] w-auto max-w-none object-cover object-bottom opacity-60 grayscale sm:h-[65svh] sm:translate-x-2 sm:opacity-80 md:h-[85svh] md:translate-x-0 md:opacity-90 lg:h-[100svh] lg:opacity-100"
        />
      </motion.div>

      {/* Cursor spotlight — desktop/mouse only */}
      {enableParallax && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-40 hidden md:block"
          style={{
            x: cursorSmoothX,
            y: cursorSmoothY,
            translateX: '-50%',
            translateY: '-50%',
            mixBlendMode: 'difference'
          }}
          animate={{ opacity: isCursorActive ? 1 : 0, scale: isCursorActive ? 1 : 0.4 }}
          transition={{ duration: 0.3, ease: revealEase }}
        >
          <div className="h-4 w-4 rounded-full bg-white" />
        </motion.div>
      )}

      <ParallaxLayer strength={enableParallax ? 0.15 : 0}>

        {/* Mobile Portrait */}
<motion.div
  aria-hidden="true"
  className="
    md:hidden
    flex
    justify-center
    pt-28
    -mb-10
    overflow-hidden
  "
  initial={{ opacity: 0, y: -20, scale: 1.05 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{
    duration: prefersReducedMotion ? 0 : 1.2,
    ease: revealEase,
    delay: 0.1
  }}
>
  <motion.img
    src="/HeroImage.jpg"
    alt=""
    loading="eager"
    fetchPriority="high"
    decoding="async"
    initial={{ scale: 1 }}
    animate={{ scale: 1.15 }}
    transition={{
      duration: prefersReducedMotion ? 0 : 1.5,
      ease: revealEase
    }}
    className="
      h-[48svh]
      w-auto
      max-w-none
      object-cover
      object-bottom
      grayscale
      contrast-110
      opacity-80
    "
  />
</motion.div>

        <div className="relative z-30 flex min-h-[80svh] flex-col justify-content gap-6 px-5 py-6 sm:px-8 sm:py-8 md:px-16    mt-8
    md:mt-30
    sm:px-8
    sm:py-8

    md:px-16
    lg:px-24">

          {/* Main Hero — clamp values step up per breakpoint so headline
              text never outgrows the overflow-hidden reveal wrappers. */}
          <div className="max-w-[1400px]">
            <h1
  className={`
    font-medium
    leading-[1.05]
    sm:leading-[1]
    md:leading-[0.95]
    tracking-[-0.03em]
    sm:tracking-[-0.045em]
    md:tracking-[-0.06em]

    text-[clamp(2.75rem,9vw,4rem)]
    sm:text-[clamp(3rem,7vw,4.5rem)]
    md:text-[clamp(3.5rem,5vw,5.5rem)]
    lg:text-[clamp(4rem,7vw,8rem)]

    ${textColor}
  `}
>
              <motion.div style={{ x: enableParallax ? textX : 0 }} className="overflow-hidden pb-2 sm:pb-3">
                <motion.span
                  initial={{ y: prefersReducedMotion ? 0 : '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 1 }}
                  className="block text-white/50"
                >
                  Designing
                </motion.span>
              </motion.div>

              <motion.div
  style={{ x: enableParallax ? textX : 0 }}
  className="overflow-hidden pb-2 sm:pb-3"
>
  <motion.span
    initial={{ y: prefersReducedMotion ? 0 : "110%" }}
    animate={{ y: 0 }}
    transition={{
      duration: prefersReducedMotion ? 0 : 1,
      delay: prefersReducedMotion ? 0 : 0.1,
    }}
    className="block"
  >
    Human-Centered
  </motion.span>
</motion.div>

              <motion.div style={{ x: enableParallax ? textX : 0 }} className="overflow-hidden pb-2 sm:pb-3">
                <motion.span
                  initial={{ y: prefersReducedMotion ? 0 : '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.2 }}
                  className="block text-white/50"
                >
                  Experiences
                </motion.span>
              </motion.div>

            </h1>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1 }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <p className={`max-w-full text-base leading-relaxed sm:max-w-[420px] sm:text-lg lg:max-w-[480px] ${mutedText}`}>
              I help businesses to create intuitive,
              scalable, and visually compelling digital products
              by combining UI/UX, strategy, and AI-assisted
              workflows.
            </p>

          </motion.div>
        </div>
      </ParallaxLayer>
    </section>
  );
};

export default HeroNew;