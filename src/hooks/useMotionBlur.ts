import { useEffect, useRef, useState } from 'react';

interface MotionBlurConfig {
  maxBlur?: number;
  threshold?: number;
}

export const useMotionBlur = ({ maxBlur = 20, threshold = 0.5 }: MotionBlurConfig = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [blur, setBlur] = useState(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const deltaX = e.clientX - lastPosRef.current.x;
      const deltaY = e.clientY - lastPosRef.current.y;

      velocityRef.current = { x: deltaX, y: deltaY };
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const calculatedBlur = Math.min(speed * threshold, maxBlur);

      setBlur(calculatedBlur);

      // Gradually decrease blur when motion stops
      const timeout = setTimeout(() => {
        setBlur((prev) => Math.max(prev - 0.5, 0));
      }, 16);

      return () => clearTimeout(timeout);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxBlur, threshold]);

  return { ref, blur };
};
