import { useEffect, useRef } from 'react';

interface HorizontalScrollConfig {
  sensitivity?: number;
  enabled?: boolean;
}

export const useHorizontalScroll = ({ 
  sensitivity = 1, 
  enabled = true 
}: HorizontalScrollConfig = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      if (!container) return;

      // Check if the element is a horizontal scrollable container
      const isHorizontalScroll = 
        container.scrollWidth > container.clientWidth &&
        container.scrollHeight <= container.clientHeight;

      if (isHorizontalScroll && Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * sensitivity;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [sensitivity, enabled]);

  return containerRef;
};
