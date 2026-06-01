import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.95 },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const numberedServices = [
  { title: "UI / UX Designing", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" },
  { title: "Logo Designing", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" },
  { title: "Banner / Flyer Designing", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop" },
  { title: "Video Editing", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" },
  { title: "Product Designing", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" },
];

export const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="bg-[#fcfcfc] text-[#111] overflow-hidden">

      {/* Page 1 Bottom / Page 2 Top: Massive Typography Ecosystem block */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}
        className="px-6 md:px-12 mb-24 md:mb-32 mt-40 md:mt-40"
      >
        <motion.h2 
          variants={itemVariants} 
          className="text-[48px] sm:text-[64px] md:text-[8vw] lg:text-[7vw] xl:text-[100px] leading-[0.9] tracking-tighter uppercase font-bold text-[#111]"
        >
          Crafting intuitive digital experiences<br/>
          impactful visuals, and creative solutions<br/>
          <span className="text-black/30">tailored for modern brands.</span>
        </motion.h2>
      </motion.section>

      {/* Page 2 Middle: 3-column services breakdown WITH INTERACTIVE HOVER  */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}
        className="px-6 md:px-12 mb-32 md:mb-48"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Sub-column 1: Small meta list */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-widest font-bold mb-8 text-black/50">( a. ) APPROACH</h3>
            <ul className="text-[9px] uppercase font-bold tracking-widest space-y-3 text-black/80">
              <li>- DIGITAL BUSINESS MODEL</li>
              <li>- GROWTH ROADMAP DEFINITION</li>
              <li>- BRAND POSITIONING IN MARKETS</li>
              <li>- OMNICHANNEL COMMERCE STRATEGY</li>
            </ul>
          </motion.div>
          
          {/* Sub-column 2: Interactive Vertical UI/Image */}
          <motion.div variants={itemVariants} className="lg:col-span-4 h-[50vh] lg:h-[70vh] bg-black/5 overflow-hidden group relative">
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
          
          {/* Sub-column 3: Numbered Services List */}
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
                  <span className={`text-[11px] font-bold mr-6 mt-[6px] sm:mt-2 shrink-0 transition-colors ${
                    activeIndex === idx ? 'text-black/60' : 'text-black/30'
                  }`}>
                    {String(idx + 1).padStart(2, '0')}.
                  </span> 
                  {service.title}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

    </main>
  );
};
