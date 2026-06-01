import React from 'react';
import { motion } from 'motion/react';

type Experience = {
  title: string;
  company?: string;
  date: string;
  desc?: string;
  bullets?: string[];
};

export const ExperienceCards: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const items: Experience[] = [
    {
      title: 'UI/UX Engineer (Intern)',
      company: 'Irusri Group AB, Sweden',
      date: 'Aug 2025 — May 2026',
      desc:
        'Contributed to end-to-end product UI and UX work across responsive web and mobile surfaces. Focused on accessibility, prototyping and design handoff.',
      bullets: [
        'Designed responsive interfaces for marketing and product flows',
        'Built interactive prototypes and documented component behavior',
        'Collaborated with engineers to ensure accurate implementation'
      ]
    },
    {
      title: 'Freelance Designer & Photographer',
      company: 'Self-employed',
      date: '2022 — Present',
      desc: 'Delivered brand systems, UI assets and photographic work for small businesses and events.',
      bullets: ['Branding and visual identity', 'UI mockups and deliverables', 'Client-facing project management']
    },
    {
      title: 'Academic Software Projects',
      company: 'University Projects',
      date: '2022 — 2024',
      desc: 'Built full-stack projects as part of coursework and group assignments.',
      bullets: ['Frontend interfaces with modern frameworks', 'Backend service prototypes', 'Agile teamwork and technical presentations']
    }
  ];

  // Use black card background with visible white borders and light text for contrast
  const cardBg = 'bg-black border-white/40';
  const textMuted = 'text-white/70';

  return (
    <div className="relative">
      {/* Center vertical line (hidden on small screens) - animation explicitly disabled */}
      <div
        aria-hidden="true"
        className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] ${isDark ? 'bg-white/10' : 'bg-black/10'} animate-none transition-none`}
        style={{ animation: 'none' }}
      />

      <div className="space-y-12">
        {items.map((it, idx) => {
          const isLeft = idx % 2 === 0;
          const leftAlignContent = it.title === 'UI/UX Engineer (Intern)' || it.title === 'Academic Software Projects';
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative md:flex md:items-start md:justify-between"
            >
              {/* Left column (card appears here for even items) */}
              <div className={`md:w-1/2 md:px-6 ${isLeft ? `md:pr-12 ${leftAlignContent ? 'md:text-left' : 'md:text-right'}` : 'md:pl-12 md:text-left'}`}>
                {isLeft && (
                  <div className={`border rounded-lg p-6 shadow-sm inline-block ${cardBg} transition-colors duration-300 max-w-[520px]`}> 
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold">{it.title}</div>
                        {it.company && <div className={`text-sm mt-1 ${textMuted}`}>{it.company}</div>}
                      </div>
                      <div className={`text-xs font-mono ${textMuted}`}>{it.date}</div>
                    </div>
                    {it.desc && <p className={`mt-4 text-sm ${textMuted}`}>{it.desc}</p>}
                    {it.bullets && (
                      <ul className={`mt-4 list-disc ml-5 text-sm ${textMuted}`}>
                        {it.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Center marker */}
              <div className="hidden md:flex md:items-center md:justify-center md:w-">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`} />
                </div>
              </div>

              {/* Right column (card appears here for odd items) */}
              <div className={`md:w-1/2 md:px-6 ${!isLeft ? 'md:pl-12 md:text-left' : ''}`}>
                {!isLeft && (
                  <div className={`border rounded-lg p-6 shadow-sm inline-block ${cardBg} transition-colors duration-300 max-w-[520px]`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold">{it.title}</div>
                        {it.company && <div className={`text-sm mt-1 ${textMuted}`}>{it.company}</div>}
                      </div>
                      <div className={`text-xs font-mono ${textMuted}`}>{it.date}</div>
                    </div>
                    {it.desc && <p className={`mt-4 text-sm ${textMuted}`}>{it.desc}</p>}
                    {it.bullets && (
                      <ul className={`mt-4 list-disc ml-5 text-sm ${textMuted}`}>
                        {it.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceCards;
