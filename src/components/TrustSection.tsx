import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useBackgroundTransition } from '../hooks/useBackgroundTransition';

const trustMetrics = [
  { value: 50, suffix: '+', label: 'Projects delivered' },
  { value: 4, suffix: '+', label: 'Years creating' },
  { value: 30, suffix: '+', label: 'Clients supported' },
];

const trustedLogos = [
  'Bake Fairy Logo.png',
  'Baraka Logo.png',
  'BigNutz Logo.png',
  'BCS Logo.png',
  'BOK BOK Logo.png',
  'Ceylon Nectar Logo.png',
  'PnS Logo.png',
  'Momentic Logo.png',
  'DUO Logo.png',
  'Hayleys Logo.png',
  'Rotafiesta Logo.png',
  'Rotaract Logo.png',
  'Nexafort Logo.png',
  'MAS Logo.png',
  'Ceyros Logo.png',
  'Jayasinghe Fashion Logo.png',
];

const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const start = performance.now();
        const duration = 1100;

        const animate = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          setCount(Math.round(progress * value));

          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      }}
    >
      {count}
      {suffix}
    </motion.span>
  );
};

export const TrustSection = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  return (
    <section
      className={`overflow-hidden px-6 py-20 font-sans transition-colors duration-500 md:px-12 md:py-28 ${
        isDark ? 'bg-black text-white' : 'bg-[#fcfcfc] text-[#111]'
      }`}
      aria-labelledby="trust-heading"
    >
      <div className="mb-12 flex items-end justify-between gap-6 border-b border-current/20 pb-5 md:mb-16">
        <h2
          id="trust-heading"
          className="text-4xl font-normal leading-none tracking-[-0.04em] md:text-6xl"
        >
          Built on trust
        </h2>
        <span className="hidden pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-50 sm:block">
          A growing body of work
        </span>
      </div>

      <div className="grid grid-cols-1 divide-y divide-current/15 border-y border-current/15 md:grid-cols-3 md:divide-x md:divide-y-0">
        {trustMetrics.map((metric) => (
          <div key={metric.label} className="py-7 md:px-8 md:py-2 first:md:pl-0 last:md:pr-0">
            <p className="text-6xl font-medium tracking-[-0.07em] md:text-8xl">
              <CountUp value={metric.value} suffix={metric.suffix} />
            </p>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-55">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-50">
          Trusted by teams and collaborators
        </p>

        <div className="relative overflow-hidden border-y border-current/15 py-7">
          <div className="mask-center-fade overflow-hidden">
            <div className="flex w-max animate-[trust-marquee_32s_linear_infinite] items-center gap-16 pr-16 sm:gap-20 sm:pr-20 md:gap-24 md:pr-24">
              {[...Array(2)].map((_, trackIndex) => (
                <div
                  key={trackIndex}
                  className="flex items-center gap-16 flex-nowrap sm:gap-20 md:gap-24"
                >
                  {trustedLogos.map((file) => (
                    <div
                      key={`${trackIndex}-${file}`}
                      className="flex h-20 w-40 flex-shrink-0 items-center justify-center sm:h-22 sm:w-45 md:h-25 md:w-50"
                    >
                      <img
                        src={`/Partners/${file}`}
                        alt={file.replace(/\.(png|webp)$/i, '')}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes trust-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};