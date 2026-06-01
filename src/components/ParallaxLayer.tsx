import React from 'react';
import { motion } from 'motion/react';
import { useParallax } from '../hooks/useParallax';

interface ParallaxLayerProps {
  children: React.ReactNode;
  strength?: number;
  offset?: number;
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  strength = 0.5,
  offset = 0,
  className = '',
}) => {
  const { ref, parallaxY } = useParallax({ strength, offset });

  return (
    <motion.div
      ref={ref}
      animate={{ y: parallaxY }}
      transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
