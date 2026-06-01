import { useEffect, useState } from 'react';

interface BackgroundTransitionConfig {
  sections?: Array<{ threshold: number; color: 'black' | 'white' }>;
  transitionDuration?: number;
}

export const useBackgroundTransition = ({
  sections = [
    { threshold: 0, color: 'white' },
    { threshold: 0.5, color: 'black' },
  ],
  transitionDuration = 0.3,
}: BackgroundTransitionConfig = {}) => {
  const [backgroundColor, setBackgroundColor] = useState<'black' | 'white'>('white');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

      let currentColor: 'black' | 'white' = 'white';
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollProgress >= sections[i].threshold) {
          currentColor = sections[i].color;
          break;
        }
      }

      setIsTransitioning(true);
      setBackgroundColor(currentColor);

      const timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration * 1000);

      return () => clearTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, transitionDuration]);

  const bgClass = backgroundColor === 'black' 
    ? 'bg-[#000000]' 
    : 'bg-[#ffffff]';
  
  const textClass = backgroundColor === 'black' 
    ? 'text-[#ffffff]' 
    : 'text-[#000000]';

  return {
    backgroundColor,
    bgClass,
    textClass,
    isTransitioning,
  };
};
