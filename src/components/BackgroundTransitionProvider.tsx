import React, { useEffect } from 'react';
import { useBackgroundTransition } from '../hooks/useBackgroundTransition';

interface BackgroundTransitionProviderProps {
  children: React.ReactNode;
  sections?: Array<{ threshold: number; color: 'black' | 'white' }>;
  transitionDuration?: number;
}

export const BackgroundTransitionProvider: React.FC<BackgroundTransitionProviderProps> = ({
  children,
  sections,
  transitionDuration = 0.3,
}) => {
  const { bgClass, textClass, isTransitioning } = useBackgroundTransition({
    sections,
    transitionDuration,
  });

  useEffect(() => {
    // Apply background and text color to body
    document.documentElement.style.transition = isTransitioning 
      ? `background-color ${transitionDuration}s ease-in-out, color ${transitionDuration}s ease-in-out`
      : 'none';
    
    const bgColorValue = bgClass === 'bg-[#000000]' ? '#000000' : '#ffffff';
    const textColorValue = textClass === 'text-[#ffffff]' ? '#ffffff' : '#000000';
    
    document.documentElement.style.backgroundColor = bgColorValue;
    document.documentElement.style.color = textColorValue;

    return () => {
      document.documentElement.style.transition = 'none';
    };
  }, [bgClass, textClass, isTransitioning, transitionDuration]);

  return (
    <div className={`${bgClass} transition-colors duration-300 min-h-screen`}>
      {children}
    </div>
  );
};
