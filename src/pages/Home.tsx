import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParallaxLayer } from '../components/ParallaxLayer';
import { TextReveal } from '../components/TextReveal';
import { useBackgroundTransition } from '../hooks/useBackgroundTransition';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.95 },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const Hero = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  return (
    <section className={`relative isolate h-screen w-full overflow-hidden pt-20 transition-colors duration-500 ${
      isDark ? 'bg-[#000000]' : 'bg-[#fcfcfc]'
    }`}>

      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <motion.img
          initial={{ scale: 1.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="/HeroBG1.png"
          alt="Hero Background"
          className={`
            w-full h-full
            object-cover
            object-[65%_center]
            md:object-center
            transition-opacity duration-500
            ${isDark ? 'opacity-40' : 'opacity-100'}
          `}
        />
      </div>

      {/* Parallax wrapper */}
      <ParallaxLayer strength={0.2}>
        <motion.div
          style={{ y: 0 }}
          className={`
  relative z-10
  h-full w-full
  flex flex-col
  justify-center

  px-6 md:px-12
`}
        >

          {/* HERO TEXT (PARALLAX + INVERT) */}
          <motion.h1
            initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}

            className={`
              text-[14vw] md:text-[4vw]
              leading-[0.9]
              tracking-tighter
              uppercase
              font-bold

              ${isDark ? 'text-white' : 'text-white mix-blend-difference'}

              relative
              translate-y-110 md:translate-y-70
            `}
          >
            <div className="opacity-70">
              Inspired by Nature.
            </div>

            <div>
              Designed with Purpose.
            </div>
          </motion.h1>

        </motion.div>
      </ParallaxLayer>
    </section>
  );
};

const CaseStudiesTable = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  return (
    <section className={`px-6 md:px-12 py-16 md:py-24 transition-colors duration-500 ${
      isDark 
        ? 'bg-[#000000] border-white/10' 
        : 'bg-[#fcfcfc] border-black/10'
    } border-b`}>
      
      <motion.h2 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}
        className={`text-[28px] md:text-[40px] lg:text-[48px] font-medium tracking-tight leading-[1.05] max-w-[1400px] mb-24 md:mb-32 transition-colors duration-500 ${
          isDark ? 'text-white' : 'text-[#111]'
        }`}
      >
        <motion.span variants={itemVariants}>I build the seamless, user-friendly digital products that turn complex vision into a simple reality. </motion.span>
        <motion.span variants={itemVariants}>Final-year Software Engineering undergraduate passionate about UI/UX and user-centered development. Skilled in React, JavaScript, Spring Boot, and full-stack development, </motion.span>
        <motion.span variants={itemVariants}>I create intuitive, scalable, and accessible digital experiences. Driven to bridge design and technology to deliver impactful solutions. </motion.span>
      </motion.h2>
      <h3 className={`text-[16px] uppercase font-bold tracking-widest mb-8 transition-colors duration-500 ${
        isDark ? 'text-white/40' : 'text-black/40'
      }`}>My Services</h3>

      <div className={`hidden md:flex justify-between items-center text-[12px] uppercase font-bold tracking-widest pb-4 mb-4 border-b transition-colors duration-500 ${
        isDark ? 'text-white/40 border-white/10' : 'text-black/40 border-black/10'
      }`}>
        <div className="w-1/4">Service</div>
        <div className="w-1/4">Details</div>
        <div className="w-1/4 text-right"> </div>
      </div>
      <ul className={`text-[10px] sm:text-[11px] uppercase font-bold tracking-widest flex flex-col gap-y-4 md:gap-y-0 transition-colors duration-500 ${
        isDark ? 'text-white' : 'text-[#111]'
      }`}>
        {[
          { partner: 'UI / UX Designing', platform: 'Modern, user-focused designs for web & mobile experiences.', services: '-->' },
          { partner: 'Logo Designing', platform: 'Crafted to build a recognizable brand identity that leaves a lasting impression.', services: '-->' },
          { partner: 'Banner / Flyer Designing', platform: 'Eye-catching visuals crafted for maximum impact.', services: '-->' },
          { partner: 'Video Editing', platform: 'Creative, polished videos with smooth storytelling.', services: '-->' },
          { partner: 'Product Designing', platform: 'Innovative 3D product concepts brought to life.', services: '-->' },
        ].map((item, i) => (
          <motion.li 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
            key={i} 
            className={`group flex flex-col md:flex-row justify-between md:items-center py-2 md:py-3 md:border-b hover:transition-colors cursor-pointer md:px-2 md:-mx-2 ${
              isDark 
                ? 'md:border-white/5 hover:bg-white hover:text-black' 
                : 'md:border-black/5 hover:bg-[#111] hover:text-white'
            }`}
          >
            <div className="w-full md:w-1/4 mb-1 md:mb-0 flex justify-between md:block">
              <span className={`md:hidden transition-colors duration-300 ${isDark ? 'text-white/40 group-hover:text-black/60' : 'text-black/40 group-hover:text-white/60'}`}>Partner</span>
              {item.partner}
            </div>
            <div className={`w-full md:w-1/4 mb-2 md:mb-0 flex justify-between md:block transition-colors duration-300 ${
              isDark 
                ? 'text-white/60 md:text-white group-hover:text-black' 
                : 'text-black/60 md:text-[#111] group-hover:text-black'
            }`}>
              <span className={`md:hidden transition-colors duration-300 ${isDark ? 'text-white/40 group-hover:text-black/60' : 'text-black/40 group-hover:text-white/60'}`}>Platform</span>
              {item.platform}
            </div>
            <div className={`hidden md:block w-1/4 text-center transition-colors duration-300 font-serif italic lowercase ${
              isDark ? 'text-white/40 group-hover:text-black/60' : 'text-black/40 group-hover:text-white/60'
            }`}>( {item.label} )</div>
            <div className="w-full md:w-1/4 md:text-right overflow-hidden whitespace-nowrap text-ellipsis flex justify-between md:block">
              <span className={`md:hidden transition-colors duration-300 ${isDark ? 'text-white/40 group-hover:text-black/60' : 'text-black/40 group-hover:text-white/60'}`}>Service</span>
              <span className="truncate ml-4 md:ml-0">{item.services}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};


const FadingText = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  return (
    <section className={`px-6 md:px-12 py-24 md:py-5 transition-colors duration-500 ${
      isDark ? 'bg-[#000000]' : 'bg-[#fcfcfc]'
    }`}>
      <motion.h2 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}
        className={`text-[40px] md:text-[6vw] leading-[1.1] font-bold tracking-tighter uppercase transition-colors duration-500`}
      >
        <motion.div variants={itemVariants} className={isDark ? 'text-white' : 'text-[#111]'}>INNOVATION IS CONNECTION.</motion.div>
        <motion.div variants={itemVariants} className={isDark ? 'text-white/40' : 'text-black/40'}>I BRING IDEAS & EXECUTION,</motion.div>
        <motion.div variants={itemVariants} className={isDark ? 'text-white/60' : 'text-black/60'}>TRANSFORMING VISION</motion.div>
        <motion.div variants={itemVariants} className={isDark ? 'text-white/80' : 'text-black/80'}>INTO SEAMLESS, IMPACTFUL</motion.div>
        <motion.div variants={itemVariants} className={isDark ? 'text-white' : 'text-[#111]'}>DIGITAL EXPERIENCES.</motion.div>
      </motion.h2>
    </section>
  );
};

const Showreel = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  return (
    <ParallaxLayer strength={0.1}>
      <section className={`px-6 md:px-12 pb-24 md:pb-32 transition-colors duration-500 ${
        isDark ? 'bg-[#000000]' : 'bg-[#fcfcfc]'
      }`}>
        <Link to="/portfolio" className="block w-full">
          <div className={`w-full relative aspect-[3/4] md:aspect-video overflow-hidden group cursor-pointer border rounded-lg transition-colors duration-500 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
          }`}>
          <div className="absolute top-6 right-6 z-10 text-[10px] font-bold uppercase tracking-widest text-white mix-blend-difference opacity-70 text-right">
          </div>
          
            <div className="absolute inset-0">
            <div data-parallax data-parallax-depth="0.03" className="absolute inset-0">
              <motion.img
                animate={{ scale: [1, 1.03, 1], filter: ['grayscale(100%)', 'grayscale(400%)', 'grayscale(100%)'] }}
                transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
                src="/Home BG.png"
                className={`w-full h-full object-cover object-center group-hover:grayscale-0 transition-all duration-1000 will-change-transform ${
                  isDark ? 'grayscale-0 opacity-100' : 'grayscale'
                }`}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className={`absolute bottom-6 left-6 flex-col md:flex-row flex md:items-center gap-4 md:gap-8 z-10 w-full pr-12 transition-colors duration-500 ${
            isDark ? 'text-black' : 'text-black'
          }`}>
            <div className="text-[10px] font-bold uppercase tracking-widest mix-blend-difference flex items-center gap-2 group-hover:opacity-50 transition-opacity">
              Visit My Portfolio <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="md:absolute right-12 text-[10px] font-bold uppercase tracking-widest mix-blend-difference opacity-70">
              Dhyan Bhashitha Jayasinghe
            </div>
          </div>
          </div>
        </Link>
      </section>
    </ParallaxLayer>
  );
};

export const Home = () => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  return (
    <main className={`transition-colors duration-500 ${
      isDark ? 'bg-[#000000] text-white' : 'bg-[#fcfcfc] text-[#111]'
    }`}>
      <Hero />
      <CaseStudiesTable />
      <FadingText />
      <Showreel />
    </main>
  );
};
