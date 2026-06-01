import { useEffect, useRef, useState } from 'react';

interface TextRevealConfig {
  threshold?: number;
  duration?: number;
}

export const useTextReveal = ({ threshold = 0.1, duration = 0.05 }: TextRevealConfig = {}) => {
  const ref = useRef<HTMLElement>(null);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          const words = ref.current.querySelectorAll('[data-word-index]');
          words.forEach((word, index) => {
            setTimeout(() => {
              setRevealedIndices((prev) => new Set(prev).add(index));
            }, index * duration * 1000);
          });
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, duration]);

  return { ref, revealedIndices };
};
