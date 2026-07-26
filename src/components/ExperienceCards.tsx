import React from 'react';
import { motion } from 'motion/react';

type Experience = {
title: string;
company?: string;
date: string;
desc?: string;
bullets?: string[];
};

const ExperienceCard: React.FC<{ item: Experience }> = ({ item }) => {
const textMuted = 'text-white/70';

return ( <div className="inline-block max-w-[520px] rounded-lg border border-white/40 bg-black p-6 shadow-sm transition-colors duration-300"> <div className="flex items-start justify-between gap-4 text-left"> <div className="text-left"> <div className="text-lg font-semibold text-white">{item.title}</div>
{item.company && <div className={`mt-1 text-sm ${textMuted}`}>{item.company}</div>} </div>
<div className={`text-xs font-mono text-right ${textMuted}`}>{item.date}</div> </div>


  {item.desc && <p className={`mt-4 text-left text-sm ${textMuted}`}>{item.desc}</p>}

  {item.bullets && (
    <ul className={`mt-4 list-disc space-y-1 pl-5 text-left text-sm ${textMuted}`}>
      {item.bullets.map((bullet, i) => (
        <li key={i}>{bullet}</li>
      ))}
    </ul>
  )}
</div>


);
};

export const ExperienceCards: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
const items: Experience[] = [
{
title: 'UI/UX Engineer (Intern)',
company: 'Irusri Group AB, Sweden',
date: 'Aug 2025 — July 2026',
desc:
'Contributed to end-to-end product and UI/UX work across responsive web and mobile surfaces. Focused on accessibility, prototyping and design handoff.',
bullets: [
'Designed responsive interfaces for marketing and product flows',
'Built interactive prototypes and documented component behavior',
'Collaborated with engineers to ensure accurate implementation'
]
},
{
title: 'Creative Designer & Photographer',
company: 'BaByBoB Designs',
date: '2022 — Present',
desc: 'Delivered brand systems, UI assets and photographic work for businesses and events.',
bullets: ['Branding and visual identity', 'UI mockups and deliverables', 'Client-facing project management']
},
{
title: 'Creative Director',
company: 'Ceyros',
date: 'June 2026 — Present',
desc: 'Driving creative direction of the brand to create impactful brand experiences.',
bullets: ['Concept development', 'Creative strategies', 'Product photography']
}
];

return ( <div className="relative"> <div className="space-y-12">
{items.map((item, idx) => {
const isLeft = idx % 2 === 0;


      return (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative md:grid md:grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)] md:items-stretch"
        >
          {/* Left column */}
          <div className={`md:px-6 ${isLeft ? 'md:pr-12' : ''}`}>
            {isLeft && <ExperienceCard item={item} />}
          </div>

          {/* Center marker */}
          <div className="relative z-10 hidden w-6 items-start justify-center pt-2 md:flex md:self-stretch">
            {idx < items.length - 1 && (
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[14px] h-[calc(100%+62px)] w-[2px] -translate-x-1/2 bg-white/80"
              />
            )}
            <div className="flex flex-col items-center">
              <div className="relative z-10 h-3 w-3 rounded-full border-2 border-black bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.25)]" />
            </div>
          </div>

          {/* Right column */}
          <div className={`md:px-6 ${!isLeft ? 'md:pl-12' : ''}`}>
            {!isLeft && <ExperienceCard item={item} />}
          </div>
        </motion.div>
      );
    })}
  </div>
</div>
);
};

export default ExperienceCards;
