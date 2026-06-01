import React from 'react';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  sensitivity?: number;
}

export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
  children,
  className = '',
  sensitivity = 1,
}) => {
  const containerRef = useHorizontalScroll({ sensitivity, enabled: true });

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto overflow-y-hidden ${className}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {children}
    </div>
  );
};
