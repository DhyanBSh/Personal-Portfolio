import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, MessageSquare } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.95 },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Contact = () => (
  <main className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 bg-[#fcfcfc] min-h-screen text-[#111] overflow-hidden">
    <motion.section 
      initial="hidden" animate="visible" variants={sectionVariants}
      className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
    >
      <div className="lg:col-span-6 flex flex-col">
        <motion.span variants={itemVariants} className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 block mb-6">Hello...</motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 60, filter: 'blur(20px)', scale: 0.95 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[100px] leading-[0.85] tracking-tighter uppercase font-bold mb-16 md:mb-24 cinematic-reveal"
        >
          Let's Talk
        </motion.h1>

        {/* Quick action icons: Call and WhatsApp */}
        <div className="flex items-center gap-4 mb-12">
          <a href="tel:+94763932043" className="flex items-center justify-center w-12 h-12 rounded-full border border-[#111] text-[#111] hover:bg-[#111] hover:text-white transition-colors" aria-label="Call">
            <Phone className="w-5 h-5" />
          </a>

          <a href="https://wa.me/94763932043" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-[#111] text-[#111] hover:bg-[#111] hover:text-white transition-colors" aria-label="WhatsApp">
            <MessageSquare className="w-5 h-5" />
          </a>

          <a href="https://github.com/DhyanBSh" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-[#111] text-[#111] hover:bg-[#111] hover:text-white transition-colors" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.29 3.438 9.76 8.205 11.34.6.11.82-.26.82-.58 0-.29-.01-1.07-.02-2.1-3.338.73-4.042-1.61-4.042-1.61-.546-1.39-1.333-1.76-1.333-1.76-1.09-.75.083-.74.083-.74 1.205.085 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.665-.3-5.466-1.33-5.466-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.99-.4 3.01-.4s2.05.14 3.01.4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.61-5.47 5.91.43.37.81 1.1.81 2.22 0 1.6-.01 2.88-.01 3.27 0 .32.22.7.83.58C20.565 22.26 24 17.79 24 12.5 24 5.87 18.63.5 12 .5z" />
            </svg>
          </a>

          <a href="https://www.behance.net/dhyanbhashitha" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center w-12 h-12 rounded-full border border-[#111] text-[#111] hover:bg-white hover:text-[#111] transition-colors" aria-label="Behance">
            <img src="/icons/behance.svg" alt="Behance" className="w-5 h-5 object-contain filter invert group-hover:invert-0 transition-all duration-200" loading="lazy" />
          </a>


          <a href="https://www.linkedin.com/in/dhyan-jayasinghe-697324228/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-[#111] text-[#111] hover:bg-[#111] hover:text-white transition-colors" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8.5 8h3.8v2.16h.05c.53-.99 1.83-2.04 3.77-2.04 4.03 0 4.78 2.65 4.78 6.09V24h-4v-7.31c0-1.74-.03-3.99-2.43-3.99-2.43 0-2.8 1.9-2.8 3.86V24h-4z" />
            </svg>
          </a>
        </div>


        <motion.div variants={sectionVariants} className="space-y-12">
          <motion.div variants={itemVariants}>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-4">Email</h3>
            <a href="mailto:build.with.duo@gmail.com" className="text-lg md:text-xl font-medium tracking-tight hover:opacity-50 transition-opacity flex items-center gap-3"> dhyan.bhashitha.jayasinghe@gmail.com</a>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-4">Phone</h3>
            <div className="flex flex-col gap-2">
              <a href="tel:+94763932043" className="text-lg md:text-xl font-medium tracking-tight hover:opacity-50 transition-opacity flex items-center gap-3"> +94 76 393 2043</a>
              <a href="tel:+94776208398" className="text-lg md:text-xl font-medium tracking-tight hover:opacity-50 transition-opacity flex items-center gap-3"> +94 72 733 2649</a>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-4">Location</h3>
            <p className="text-lg md:text-xl font-medium tracking-tight flex items-center gap-3"> Matara, Sri Lanka</p>
          </motion.div>
        </motion.div>
      </div>

      

      <div className="lg:col-span-6 flex flex-col justify-start">
        <form className="w-full" onSubmit={(e) => e.preventDefault()}>
          <motion.div 
            initial="hidden" animate="visible" variants={sectionVariants}
            className="space-y-10"
          >
            <motion.div variants={itemVariants} className="group border-b border-white/20 pb-4 focus-within:border-white transition-colors">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 block mb-2 origin-left transform transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:scale-110 group-focus-within:text-[#111]">Your Name</label>
              <input type="text" className="w-full bg-transparent text-lg md:text-xl font-medium focus:outline-none placeholder:text-white/20" placeholder="BabyBob" />
            </motion.div>
            <motion.div variants={itemVariants} className="group border-b border-white/20 pb-4 focus-within:border-white transition-colors">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 block mb-2 origin-left transform transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:scale-110 group-focus-within:text-[#111]">Email Address</label>
              <input type="email" className="w-full bg-transparent text-lg md:text-xl font-medium focus:outline-none placeholder:text-white/20" placeholder="babybob@example.com" />
            </motion.div>
            <motion.div variants={itemVariants} className="group border-b border-white/20 pb-4 focus-within:border-white transition-colors">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 block mb-2 origin-left transform transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:scale-110 group-focus-within:text-[#111]">Project Details</label>
              <textarea rows={4} className="w-full bg-transparent text-lg md:text-xl font-medium focus:outline-none placeholder:text-white/20 resize-none" placeholder="Tell me about your objectives..."></textarea>
            </motion.div>
            <motion.button variants={itemVariants} className="w-full py-6 border border-[#111] text-[#111] group flex justify-between items-center px-8 text-xs uppercase tracking-widest font-bold hover:bg-[#111] hover:text-white transition-colors mt-12 bg-transparent">
              Share your Idea
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.section>
  </main>
);
