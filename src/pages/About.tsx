import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ParallaxLayer } from '../components/ParallaxLayer';
import { TextReveal } from '../components/TextReveal';
import { HorizontalScrollContainer } from '../components/HorizontalScrollContainer';
import ExperienceCards from '../components/ExperienceCards';
import { useBackgroundTransition } from '../hooks/useBackgroundTransition';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.95 },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const About = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  return (
    <main className={`pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 min-h-screen overflow-hidden relative transition-colors duration-500 ${
      isDark ? 'bg-[#000000] text-[#ffffff]' : 'bg-[#fcfcfc] text-[#111]'
    }`}>
      
      {/* Background Vertical Grid Lines */}
      <div className={`absolute inset-0 pointer-events-none flex justify-between px-6 md:px-12 max-w-7xl mx-auto ${
        isDark ? 'opacity-7' : 'opacity-4'
      }`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`w-[1px] h-full ${isDark ? 'bg-white' : 'bg-black'}`} />
        ))}
      </div>

      <motion.section 
        initial="hidden" animate="visible" variants={sectionVariants}
        className="max-w-7xl mx-auto relative z-10 mt-20 md:mt10"
      >
        {/* Main Heading with Text Reveal */}
        <ParallaxLayer strength={0.2}>
          <motion.div variants={itemVariants} className="mt-10 md:mt-10 mb-10 md:mb-10">
            <TextReveal
              text="I help businesses to design impactful brands, seamless interfaces, and engaging digital experiences. From user-centered products to creative visual identities, every project is approached with a focus on purpose and excellence."
              className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[56px] leading-[1.05] tracking-tight font-medium"
              threshold={0.15}
              duration={0.02}
              staggerDelay={0.01}
            />
          </motion.div>
        </ParallaxLayer>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          <motion.div variants={itemVariants} className="md:col-span-6 flex items-start md:justify-center">
            {/* Overview text removed as requested */}
          </motion.div>
          
          {/* Description Section with Parallax */}
          <ParallaxLayer strength={0.15} className="md:col-span-6">
            <motion.div variants={itemVariants} className={`flex flex-col gap-8 text-xl md:text-2xl font-medium tracking-tight leading-[1.4]`}>
              <TextReveal
                text="I am a Software Engineering graduate, Creative and UI/UX Designer with a passion for crafting premium digital experiences."
                as="p"
                threshold={0.15}
                duration={0.02}
              />
              <TextReveal
                text="I believe great design should do more than solve problems, it should create lasting impressions. By combining technical expertise with a refined design perspective, I help brands build meaningful experiences that stand out in an increasingly competitive world."
                as="p"
                threshold={0.15}
                duration={0.02}
              />
            </motion.div>
          </ParallaxLayer>
        </div>

        {/* Logo Section with Horizontal Scroll */}
        <ParallaxLayer strength={0.1}>
          <motion.div 
            variants={itemVariants} 
            className={`relative w-full py-40 mb-2 md:mb-5 flex items-center justify-center rounded-lg transition-colors duration-500 ${
              isDark ? 'bg-[#000]' : 'bg-white/0'
            }`}
          >
            <style>{`
              @keyframes marquee-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee-scroll 25s linear infinite;
              }
              .mask-center-fade {
                -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 100%);
                mask-image: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 65%, rgba(0,0,0,1) 100%);
              }

              /* Mobile: widen the transparent center to create a larger dark shadow/gap */
              @media (max-width: 768px) {
                .mask-center-fade {
                  -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 100%);
                  mask-image: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 100%);
                }
              }
            `}</style>

            <div className="w-full mask-center-fade overflow-hidden flex">
              <div className="flex w-max animate-marquee items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
                {[...Array(2)].map((_, trackIndex) => (
                  <div key={trackIndex} className="flex items-center gap-12 sm:gap-16 flex-nowrap">
                    {[
                      'affinity.png',
                      'after effects.png',
                      'balsamiq.png',
                      'blender.png',
                      'canva.png',
                      'davinci.png',
                      'figma.png',
                      'framer.png',
                      'github.png',
                      'illustrator.png',
                      'gemini.png',
                      'lightroom.png',
                      'chatgpt.png',
                      'photoshop.png',
                      'vscode.png',
                      'premier pro.png',
                      'nanobanana.png',
                      'claude.png',
                      'perplexity.png',
                    ].map((file) => (
                      <img
                        key={`${trackIndex}-${file}`}
                        src={`/icons/${file}`}
                        alt={file.replace(/%20/g, ' ').replace(/\.png$|\.webp$/i, '')}
                        className={`w-20 h-20 object-contain flex-shrink-0 transition-all duration-500 ${
                          isDark 
                            ? 'filter brightness-100 invert-0' 
                            : 'filter brightness-0 invert'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed Center Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <a
                href="/cv.pdf"
                download
                aria-label="Download CV"
                className={`flex py-4 group px-6 text-[10px] uppercase tracking-widest font-bold transition-all items-center gap-2 border ${
                  isDark
                    ? 'border-white text-white hover:bg-white hover:text-black'
                    : 'border-[#111] text-[#111] hover:bg-[#111] hover:text-white'
                }`}
              >
                Download CV
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </ParallaxLayer>

      </motion.section>
      
      {/* Additional profile sections */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: '-120px' }} 
        variants={sectionVariants} 
        className="max-w-7xl mx-auto mt-12 space-y-12 md:space-y-16 relative z-10"
      >
        {/* Education */}
        <ParallaxLayer strength={0.1}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={sectionVariants}>
            <h3 className={`text-[16px] uppercase tracking-widest font-bold mb-4 ${
              isDark ? 'text-white/40' : 'text-black/40'
            }`}>EDUCATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div>
                <motion.div variants={itemVariants} className="text-lg font-semibold">B. Sc(Hons) Software Engineering</motion.div>
                <motion.div variants={itemVariants} className={`text-sm ${isDark ? 'text-white/70' : 'text-white/70'}`}>General Sir John Kotelawala Defence University, Rathmalana, Sri Lanka</motion.div>
              </div>
              <div>
                <motion.div variants={itemVariants} className="text-lg font-semibold">GCE Advanced Level (Physical Science)</motion.div>
                <motion.div variants={itemVariants} className={`text-sm ${isDark ? 'text-white/70' : 'text-white/70'}`}>Rahula College, Matara</motion.div>
              </div>
            </div>
          </motion.div>
        </ParallaxLayer>

        {/* Professional Experience (Roadmap UI) */}
        <ParallaxLayer strength={0.1}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={sectionVariants}>
            <h3 className={`text-[16px] uppercase tracking-widest font-bold mb-12 text-left md:text-center ${
              isDark ? 'text-white/40' : 'text-white/40'
            }`}>PROFESSIONAL EXPERIENCE</h3>
            <ExperienceCards isDark={isDark} />
          </motion.div>
        </ParallaxLayer>

        {/* Editorial image gallery */}
        <ParallaxLayer strength={0.08}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={sectionVariants}
            className="pt-8 md:pt-16"
          >
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-current/20 pb-5 md:mb-10">
              <h3 className="text-4xl font-normal leading-none tracking-[-0.04em] md:text-6xl">
                Me behind the work
              </h3>
              <span className="hidden pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-50 sm:block">
                Selected moments / 2023-26
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
              {[
                {
                  image: "/DNA/dna1.webp",
                  alt: 'Creative team working in a bright studio',
                  layout: 'md:col-span-7 aspect-[1.25] md:aspect-[1.4]',
                },
                {
                  image: "/DNA/dna2.webp",
                  alt: 'Team collaborating around a table',
                  layout: 'md:col-span-5 aspect-[1.15] md:aspect-[0.9] md:mt-24',
                },
                {
                  image: "/DNA/dna3.webp",
                  alt: 'Minimal creative studio interior',
                  layout: 'md:col-span-5 aspect-square md:mt-6',
                },
                {
                  image: "/DNA/dna4.webp",
                  alt: 'People sharing ideas during a workshop',
                  layout: 'md:col-span-7 aspect-[1.25] md:aspect-[1.5]',
                },
                {
                  image: "/DNA/dna5.webp",
                  alt: 'Designer working on a digital interface',
                  layout: 'md:col-span-4 aspect-[0.9] md:mt-20',
                },
                {
                  image: "/DNA/dna6.webp",
                  alt: 'Creative team in a project discussion',
                  layout: 'md:col-span-8 aspect-[1.5]',
                },
              ].map((item) => (
                <motion.figure
                  key={item.image}
                  variants={itemVariants}
                  className={`group relative overflow-hidden rounded-[4px] border ${
                    isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                  } ${item.layout}`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                </motion.figure>
              ))}
            </div>
          </motion.div>
        </ParallaxLayer>
      </motion.section>
    </main>
  );
};
