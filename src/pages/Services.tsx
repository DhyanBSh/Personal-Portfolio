import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Testimonials } from '../components/Testimonials';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.95 },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const numberedServices = [
  { title: "UI / UX Designing", img: "/Services/UI.webp" },
  { title: "Logo Designing", img: "/Services/Logo.webp" },
  { title: "Banner / Flyer Designing", img: "/Services/Flyer.webp" },
  { title: "Video Editing", img: "/Services/Video.webp" },
  { title: "Product Designing", img: "/Services/Product.webp" },
];

export const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="bg-[#fcfcfc] text-[#111] overflow-hidden">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="px-6 md:px-12 mb-24 md:mb-32 mt-40 md:mt-40"
      >
        <motion.h2
          variants={itemVariants}
          className="text-[48px] sm:text-[64px] md:text-[8vw] lg:text-[7vw] xl:text-[64px] leading-[0.9] tracking-tighter uppercase font-bold text-[#111]"
        >
          Let's build a trusted digital experience<br />
          <span className="text-white/40">
            through strategic design, thoughtful interactions, and creative solutions,
          </span>
          that move your brand forward.<br />
        </motion.h2>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="px-6 md:px-12 mb-32 md:mb-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-[12px] uppercase tracking-widest font-bold mb-8 text-white/50">
              ( * ) APPROACH
            </h3>
            <ul className="text-[11px] uppercase font-bold tracking-widest space-y-3 text-white/80">
              <li>- Reach Out</li>
              <li>- Share the Vision</li>
              <li>- I Design the Solution</li>
              <li>- Review and Launch</li>
              <li>- Or just say Hi..</li>
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 h-[50vh] lg:h-[70vh] bg-black/5 overflow-hidden group relative"
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                src={numberedServices[activeIndex].img}
                alt={numberedServices[activeIndex].title}
                className="w-full h-full object-cover absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-[1.5s]"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-5 lg:pl-16 pt-8 lg:pt-0">
            <ul className="space-y-4 md:space-y-5" onMouseLeave={() => setActiveIndex(0)}>
              {numberedServices.map((service, idx) => (
                <li
                  key={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`flex items-start text-lg sm:text-xl md:text-2xl font-medium tracking-tight hover:text-[#111] transition-colors cursor-pointer ${
                    activeIndex === idx ? 'text-[#111]' : 'text-black/30'
                  }`}
                >
                  <span
                    className={`text-[11px] font-bold mr-6 mt-[6px] sm:mt-2 shrink-0 transition-colors ${
                      activeIndex === idx ? 'text-black/60' : 'text-black/30'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  {service.title}
                </li>
              ))}
            </ul>
          </motion.div>
          
        </div>

      </motion.section>

      <Testimonials />
    </main>
  );
};