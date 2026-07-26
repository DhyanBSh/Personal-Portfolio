import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useBackgroundTransition } from '../hooks/useBackgroundTransition';

const testimonials = [
  {
    message:
      'We truly appreciate the dedication, creativity, and effort you brought into this. We came away not just with a polished brand identity, but with a clear brand system, reusable guidelines, and a strategic point of view that will guide our work going forward, along with a partner who cared about outcomes as much as we did.',
    name: 'Sarindu Sihasara',
    designation: 'Founder, Ceyros',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
  },
  {
    message:
      'Amazing work and great communication throughout the project. He was very patient with all my changes and made sure every detail was perfect. The final designs were creative, professional, and delivered right on time.',
    name: 'Mayuri Chandraratne',
    designation: 'Product Lead, Irusri Group AB',
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop',
  },
  {
    message:
      'From start to finish, the process was seamless. He listened carefully to all my ideas, gave valuable suggestions, and created something even better than what I had in mind. His graphic designing and video editing skills are exceptional, delivering high-quality work on time. Professional, punctual, and extremely patient throughout every revision even though I wanted the designs and videos urgently. I highly recommend his work.',
    name: 'Tusari Gallage',
    designation: 'Secretary, RACKDU',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  },
];

const testimonialVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const AUTO_SCROLL_SPEED = 0.35; // pixels per frame-ish; slow and smooth
const RESUME_DELAY_MS = 900;

export const Testimonials = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);

  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);

  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const isDraggingRef = useRef(false);

  const isAutoScrollPausedRef = useRef(false);
  const resumeAutoScrollTimerRef = useRef<number | null>(null);

  const getCycleWidth = () => firstSetRef.current?.offsetWidth ?? 0;

  const normalizeScroll = () => {
    const track = trackRef.current;
    const cycleWidth = getCycleWidth();
    if (!track || !cycleWidth) return;

    // Keep the scroll position in the second copy range for seamless looping.
    if (track.scrollLeft >= cycleWidth * 2) {
      track.scrollLeft -= cycleWidth;
    } else if (track.scrollLeft <= 0) {
      track.scrollLeft += cycleWidth;
    }
  };

  const pauseAutoScroll = (delay = RESUME_DELAY_MS) => {
    isAutoScrollPausedRef.current = true;

    if (resumeAutoScrollTimerRef.current !== null) {
      window.clearTimeout(resumeAutoScrollTimerRef.current);
    }

    resumeAutoScrollTimerRef.current = window.setTimeout(() => {
      isAutoScrollPausedRef.current = false;
    }, delay);
  };

  const slideCards = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    pauseAutoScroll(750);

    track.scrollBy({
      left: direction === 'right' ? track.clientWidth * 0.82 : -track.clientWidth * 0.82,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    const firstSet = firstSetRef.current;
    if (!track || !firstSet) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setInitialPosition = () => {
      const cycleWidth = getCycleWidth();
      if (cycleWidth > 0) {
        track.scrollLeft = cycleWidth;
      }
    };

    const ro = new ResizeObserver(() => {
      setInitialPosition();
    });

    ro.observe(firstSet);

    // Set initial scroll after layout.
    const initId = window.requestAnimationFrame(setInitialPosition);

    const tick = (time: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = time;
      }

      const elapsed = Math.min(time - lastFrameTimeRef.current, 50);
      lastFrameTimeRef.current = time;

      if (!prefersReducedMotion && !isDraggingRef.current && !isAutoScrollPausedRef.current) {
        track.scrollLeft += (elapsed / 16.67) * AUTO_SCROLL_SPEED;
        normalizeScroll();
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      ro.disconnect();

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (resumeAutoScrollTimerRef.current !== null) {
        window.clearTimeout(resumeAutoScrollTimerRef.current);
      }

      window.cancelAnimationFrame(initId);
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || event.button !== 0) return;

    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = track.scrollLeft;
    pauseAutoScroll(1000);

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !isDraggingRef.current) return;

    track.scrollLeft = dragStartScrollRef.current - (event.clientX - dragStartXRef.current);
    normalizeScroll();
  };

  const endMouseDrag = () => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  };

  const handleTouchStart = () => {
    pauseAutoScroll(1200);
  };

  const handleScroll = () => {
    normalizeScroll();
  };

  return (
    <section
      className={`px-6 py-20 font-sans transition-colors duration-500 md:px-12 md:py-32 ${
        isDark ? 'bg-black text-white' : 'bg-[#fcfcfc] text-[#111]'
      }`}
      aria-labelledby="testimonials-heading"
    >
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-current/20 pb-5 md:mb-12">
        <h2
          id="testimonials-heading"
          className="text-4xl font-normal leading-none tracking-[-0.04em] md:text-6xl"
        >
          Client Stories
        </h2>
        <span className="hidden pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] opacity-50 sm:block">
          Drag or swipe to explore
        </span>
      </div>

      <motion.div
        ref={trackRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endMouseDrag}
        onMouseLeave={endMouseDrag}
        onTouchStart={handleTouchStart}
        className="flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [touch-action:pan-x] select-none [&::-webkit-scrollbar]:hidden active:cursor-grabbing"
      >
        <div ref={firstSetRef} className="flex gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.name}-a-${index}`}
              variants={testimonialVariants}
              className={`flex min-h-[440px] w-[88vw] shrink-0 snap-start flex-col justify-between rounded-[4px] border p-7 md:min-h-[520px] md:w-[58vw] md:p-10 lg:w-[58vw] ${
                isDark ? 'border-white/15 bg-white/[0.04]' : 'border-black/15 bg-black/[0.03]'
              }`}
            >
              <p className="w-full text-2xl font-medium leading-[1.08] tracking-[-0.04em] md:text-3xl">
                “{testimonial.message}”
              </p>

              <div className="mt-12 flex items-center gap-4 border-t border-current/15 pt-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover grayscale transition duration-500 hover:grayscale-0"
                />
                <div>
                  <h3 className="text-sm font-semibold">{testimonial.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] opacity-55">
                    {testimonial.designation}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div aria-hidden="true" className="flex gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.name}-b-${index}`}
              variants={testimonialVariants}
              className={`flex min-h-[440px] w-[88vw] shrink-0 snap-start flex-col justify-between rounded-[4px] border p-7 md:min-h-[520px] md:w-[58vw] md:p-10 lg:w-[58vw] ${
                isDark ? 'border-white/15 bg-white/[0.04]' : 'border-black/15 bg-black/[0.03]'
              }`}
            >
              <p className="w-full text-2xl font-medium leading-[1.08] tracking-[-0.04em] md:text-3xl">
                “{testimonial.message}”
              </p>

              <div className="mt-12 flex items-center gap-4 border-t border-current/15 pt-6">
                <img
                  src={testimonial.image}
                  alt=""
                  loading="lazy"
                  aria-hidden="true"
                  className="h-14 w-14 rounded-full object-cover grayscale transition duration-500 hover:grayscale-0"
                />
                <div>
                  <h3 className="text-sm font-semibold">{testimonial.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] opacity-55">
                    {testimonial.designation}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 flex items-center justify-between border-t border-current/15 pt-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-50">
          Scroll to explore
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            title="Previous testimonial"
            onClick={() => slideCards('left')}
            className={`flex h-11 w-11 items-center justify-center rounded-none border transition-colors ${
              isDark
                ? 'border-white/25 hover:bg-white hover:text-black'
                : 'border-black/20 hover:bg-black hover:text-white'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Next testimonial"
            title="Next testimonial"
            onClick={() => slideCards('right')}
            className={`flex h-11 w-11 items-center justify-center rounded-none border transition-colors ${
              isDark
                ? 'border-white/25 hover:bg-white hover:text-black'
                : 'border-black/20 hover:bg-black hover:text-white'
            }`}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};