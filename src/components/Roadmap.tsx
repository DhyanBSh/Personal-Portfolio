import React from 'react';
import { motion } from 'motion/react';

type Item = {
  title: string;
  date: string;
  period?: string;
  desc?: string;
};

export const Roadmap: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const items: Item[] = [
    {
      title: 'Internship - UI/UX Engineer - Irusri Group AB, Sweden',
      date: 'Aug 2025 — May 2026',
      period: '2025',
      desc:
        'Supported end-to-end UI/UX design across landing pages, complex systems and mobile apps — research, prototyping and iteration to improve usability and accessibility.'
    },
    {
      title: 'Freelance Graphic Designer, UI/UX Designer & Photographer',
      date: '2022 — Present',
      period: '2022',
      desc:
        'Delivered user-centered responsive designs, brand assets and photo work for clients; ran feedback loops and iterated to production-ready results.'
    },
    {
      title: 'Software Development Projects — Academic',
      date: '2022 — 2024',
      period: '2022',
      desc:
        'Collaborated on full-stack projects using modern frameworks, following agile processes and presenting technical solutions to supervisors and peers.'
    }
  ];

  const accent = isDark ? 'bg-white' : 'bg-black';
  const muted = isDark ? 'text-white/70' : 'text-white/70';

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative">
      <div className="relative pl-8">
        <div className={`absolute left-3 top-0 bottom-0 w-[2px] ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

        {items.map((it, idx) => (
          <div key={idx} className="mb-10 relative">
            <div className="absolute -left-6 top-0 w-3 h-3 rounded-full flex items-center justify-center">
              <span className={`block w-3 h-3 rounded-full ${accent}`} />
            </div>

            <div className="ml-2 md:ml-0">
              <div className="flex items-baseline gap-4">
                <div className="text-sm font-semibold">{it.title}</div>
                <div className={`text-xs ${muted}`}>{it.date}</div>
              </div>
              {it.desc && <p className={`mt-2 text-sm ${muted}`}>{it.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Roadmap;
