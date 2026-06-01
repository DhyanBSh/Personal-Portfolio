import React from 'react';
import { motion } from 'motion/react';
import { useMotionBlur } from '../hooks/useMotionBlur';

interface MotionBlurContainerProps {
  children: React.ReactNode;
  className?: string;
  maxBlur?: number;
  threshold?: number;
}

export const MotionBlurContainer: React.FC<MotionBlurContainerProps> = ({
  children,
  className = '',
  maxBlur = 20,
  threshold = 0.5,
}) => {
  const { ref, blur } = useMotionBlur({ maxBlur, threshold });

  return (
    <motion.div
      ref={ref}
      animate={{ filter: `blur(${blur}px)` }}
      transition={{ duration: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
