import { useEffect, useRef, useState } from 'react';

interface ParallaxConfig {
  strength?: number;
  offset?: number;
}

export const useParallax = ({ strength = 0.5, offset = 0 }: ParallaxConfig = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerY = window.innerHeight / 2;
      const elementCenterY = rect.top + rect.height / 2;
      const distance = (elementCenterY - centerY) * strength;
      
      setParallaxY(distance + offset);
    };

    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerY = window.innerHeight / 2;
      const elementCenterY = rect.top + rect.height / 2;
      const distance = (elementCenterY - centerY) * strength;
      
      setParallaxY(distance + offset);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [strength, offset]);

  return { ref, parallaxY };
};
