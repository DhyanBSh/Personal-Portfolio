import { useEffect, useRef } from 'react';

export function Cinematic() {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const parallaxElems = () => Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));

    function onFrame() {
      const scrollY = window.scrollY;
      lastScroll = scrollY;

      const elems = parallaxElems();
      elems.forEach((el) => {
        const depthAttr = el.getAttribute('data-parallax-depth') || el.getAttribute('data-depth');
        const depth = depthAttr ? Number(depthAttr) : 0.08;
        const translate = Math.round(scrollY * depth * 100) / 100;
        el.style.transform = `translate3d(0, ${translate}px, 0) translateZ(0)`;
      });

      rafRef.current = requestAnimationFrame(onFrame);
    }

    rafRef.current = requestAnimationFrame(onFrame);

    // Intersection observer for cinematic reveal of sections
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add('cinematic-inview');
        } else {
          el.classList.remove('cinematic-inview');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('section, [data-cinematic-section]').forEach((el) => io.observe(el));

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
    };
  }, []);

  return <div aria-hidden className="cinematic-layer pointer-events-none" />;
}

export default Cinematic;
