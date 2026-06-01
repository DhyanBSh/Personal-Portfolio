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
        className="max-w-7xl mx-auto relative z-10 mt-30 md:mt10"
      >
        {/* Main Heading with Text Reveal */}
        <ParallaxLayer strength={0.2}>
          <motion.div variants={itemVariants} className="mt-10 md:mt-10 mb-10 md:mb-10">
            <TextReveal
              text="My  approach  blends  creativity  and  problem-solving  to  build  experiences  that not  only  look  good,  but  feel right.  I  care  about  the details  that  make  digital  products  more  human,  more  enjoyable,  and  more  impactful."
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
                text="I am a Final Year Undergraduate, following B.Sc. Hons. in Software Engineering at General Sir John Kotelawala Defence University, Ratmalana, Sri Lanka."
                as="p"
                threshold={0.15}
                duration={0.02}
              />
              <TextReveal
                text="I am passionate in UI/UX Designing, Product Designing, Video Editing and Photography, with an eye for Visual Storytelling. I design attractive, simple, and clean UI interfaces, along with creative and detailed graphics such as Flyer Designs, Banner Designs, Event Screens & Logo Designs."
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


        {/* Collaborative and Leadership Experience */}
        <ParallaxLayer strength={0.1}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={sectionVariants}>
            <h3 className={`text-[16px] uppercase tracking-widest font-bold mb-4 ${
              isDark ? 'text-white/40' : 'text-white/40'
            }`}>COLLABORATIVE AND LEADERSHIP EXPERIENCE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <motion.div variants={itemVariants}>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-white'}`}>Executive Committee (Editor) - Rotaract Club of KDU (2023 - 2024)</div>
                <ul className={`list-disc ml-5 mt-2 ${isDark ? 'text-white/70' : 'text-white/70'}`}>
                  <li>Managed content creation and publication for 200+ member organization</li>
                  <li>Overlooked 5+ community service projects reaching 1000+ beneficiaries</li>
                  <li>Implemented social media strategy increasing online presence by 150%</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-white'}`}>Director of Digital Services - Rotaract Club of KDU (2022 - 2023)</div>
                <div className={`${isDark ? 'text-white/70' : 'text-white/70'}`}>Led digital transformation initiatives improving member engagement by 35%</div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-white'}`}>Director of Arts - British Computer Society of KDU (2023 - 2024)</div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-white'}`}>Organizing Committee (Design Team) - IEEE Student Branch of KDU (2023 – 2024)</div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-white'}`}>Director of Arts - Drama Club of KDU (2023 - 2024)</div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-white'}`}>Member - Leo Club, Media Club, SEDS, Music Club of KDU</div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-white'}`}>Selected Achievements</div>
                <ul className={`list-disc ml-5 mt-2 ${isDark ? 'text-white/70' : 'text-white/70'}`}>
                  <li>Master Designer 2026 Inter-University Designathon - 1 RunnerUp</li>
                  <li>Mora UX - Top 10 Teams</li>
                  <li>IX 24 Inter-University Designathon - Participant</li>
                  <li>All Island Inter-School Classical Music Competition (2011, 2012, 2013, 2014, 2016)</li>
                  <li>Completed Bhatkhande Sangit Vidyapith Examination of Visharad - Violin</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </ParallaxLayer>
      </motion.section>
    </main>
  );
};
