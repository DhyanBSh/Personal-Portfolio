import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useTextReveal } from '../hooks/useTextReveal';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  threshold?: number;
  duration?: number;
  staggerDelay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  as: Component = 'p',
  threshold = 0.1,
  duration = 0.05,
  staggerDelay = 0.02,
}) => {
  const { ref, revealedIndices } = useTextReveal({ threshold, duration });
  const words = text.split(' ');

  const variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  return (
    <Component ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          data-word-index={index}
          initial="hidden"
          animate={revealedIndices.has(index) ? 'visible' : 'hidden'}
          variants={variants}
          transition={{
            duration: 0.4,
            delay: index * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};
