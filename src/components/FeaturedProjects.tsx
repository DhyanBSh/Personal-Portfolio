import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useBackgroundTransition } from '../hooks/useBackgroundTransition';

const featuredProjects = [
  {
    title: 'Envira',
    category: 'Brand identity / Digital experience',
    description: 'A clear, confident digital home for a Danish climate intelligence firm.',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=2200&auto=format&fit=crop',
    year: '2024',
  },
  {
    title: 'ClubNative',
    category: 'Brand identity / Campaign system',
    description: 'A playful visual world built to make shift scheduling feel approachable and human.',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2200&auto=format&fit=crop',
    year: '2024',
  },
  {
    title: 'Mason\'s',
    category: 'Product design / Commerce',
    description: 'A tactile commerce experience that turns a considered product range into an easy choice.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2200&auto=format&fit=crop',
    year: '2023',
  },
  {
    title: '8pm',
    category: 'UI / UX design / Strategy',
    description: 'A flexible digital system for a high-throughput storefront with a sharper point of view.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2200&auto=format&fit=crop',
    year: '2023',
  },
];

const projectVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const FeaturedProjects = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  return (
    <section
      className={`px-6 py-20 transition-colors duration-500 md:px-12 md:py-2 ${
        isDark ? 'bg-black text-white' : 'bg-[#fcfcfc] text-[#111]'
      }`}
      aria-labelledby="featured-projects-heading"
    >
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-current/20 pb-5 md:mb-12">
        <h2
          id="featured-projects-heading"
          className="font-sans text-4xl leading-none tracking-[-0.04em] md:text-6xl"
        >
          Recent Projects
        </h2>
        <span className="hidden pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] opacity-50 sm:block">
          Selected work / 2023-24
        </span>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
        className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 md:gap-y-20"
      >
        {featuredProjects.map((project, index) => (
          <motion.article
            key={project.title}
            variants={projectVariants}
            className={index % 3 === 1 ? 'md:translate-y-16' : ''}
          >
            <a href="#contact" className="group block">
              <div className="relative aspect-[1.42] overflow-hidden rounded-[4px] bg-black/10">
                <motion.img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                  whileInView={{ scale: [1.02, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
                <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-0 transition duration-500 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-5 border-b border-current/20 py-5">
                <div>
                  <h3 className="text-2xl font-medium tracking-[-0.04em] md:text-3xl">{project.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed opacity-60">{project.description}</p>
                </div>
                <div className="text-right text-[10px] font-semibold uppercase tracking-[0.15em] opacity-50">
                  <p>{project.year}</p>
                  <p className="mt-2 max-w-[130px] leading-relaxed">{project.category}</p>
                </div>
              </div>
            </a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};