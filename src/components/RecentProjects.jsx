import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const projects = [
  {
    title: 'Beyond The Canvas',
    hotspots: [
      { top: '46%', left: '17%', label: 'Reading Nook' },
      { top: '46%', left: '84%', label: 'Display Console' },
    ],
    images: [
      '/projects/studioflow-1.png',
      '/projects/studioflow-2.png',
      '/projects/studioflow-3.png',
      '/projects/studioflow-4.png',
    ],
  },
];

const ProjectViewer = ({ project }) => {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-black">

      {/* Main image, crossfades on thumbnail change */}
      <AnimatePresence>
        <motion.img
          key={active}
          src={project.images[active]}
          alt=""
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Subtle scrim for text legibility */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Hotspot markers */}
      {project.hotspots?.map((spot, i) => (
        <div
          key={i}
          style={{ top: spot.top, left: spot.left }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
        >
          <motion.span
            className="flex items-center justify-center w-7 h-7 rounded-full border border-white/40 bg-white/5 backdrop-blur-sm text-white/80"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          </motion.span>
          {spot.label && (
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap text-white/70 text-xs font-['Inter'] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {spot.label}
            </span>
          )}
        </div>
      ))}

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
        <h3 className="text-white text-2xl md:text-4xl font-light tracking-tight font-['Inter']">
          {project.title}
        </h3>
      </div>

      {/* Counter + thumbnail filmstrip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between gap-4 p-4 md:p-6">
        <span className="text-white/70 text-sm font-light tracking-widest font-['Inter'] shrink-0">
          {active + 1} — {project.images.length}
        </span>

        <div className="flex gap-1.5 overflow-x-auto max-w-[65%] md:max-w-none [&::-webkit-scrollbar]:hidden">
          {project.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${project.images.length}`}
              className={`shrink-0 w-12 h-9 md:w-16 md:h-11 rounded-md overflow-hidden border transition-all duration-300 ${
                i === active
                  ? 'border-white opacity-100'
                  : 'border-white/20 opacity-50 hover:opacity-80'
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RecentProjects = () => (
  <section className="relative bg-black overflow-hidden py-32">

    {/* Glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />

    {/* Heading */}
    <div className="relative z-10 text-center mb-16 px-6 font-['Inter']">
      <h2 className="mt-1 text-white text-3xl md:text-5xl font-medium tracking-tight">Recent Projects</h2>
      <p className="mt-6 text-white/40 max-w-xl mx-auto text-sm">
        A collection of software products, digital experiences, and creative explorations.
      </p>
    </div>

    {/* Project viewers */}
    <div className="relative z-10 flex flex-col gap-32 px-6 max-w-6xl mx-auto">
      {projects.map((project, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectViewer project={project} />
        </motion.div>
      ))}
    </div>
  </section>
);