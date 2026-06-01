import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { motion } from 'motion/react';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export const Footer = () => (
  <motion.footer 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "100px 0px -50px 0px" }}
    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/10 border-t border-black/10 bg-[#fcfcfc] text-[#111] overflow-hidden"
  >
    
    <motion.div variants={itemVariants} className="p-10 md:p-16 lg:p-24 flex flex-col justify-between min-h-[400px]">
      <div>
        <img src="/Logo.png" alt="Logo" className="h-12 w-auto mb-8" />
      </div>
      <div className="mt-16 text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">
        © 2026 Dhyan
      </div>
    </motion.div>

    <motion.div variants={itemVariants} className="p-10 md:p-16 lg:p-24 flex flex-col justify-between">
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-10 border-b border-black/10 pb-6">Contact</h4>
        <ul className="space-y-6 text-sm font-light text-[#111]">
          <li className="group">
            <a href="mailto:build.with.duo@gmail.com" className="flex items-center hover:opacity-50 transition-opacity">
              
              <span>dhyan.bhashitha.jayasinghe@gmail.com</span>
            </a>
          </li>
          <li className="group">
            <div className="space-y-1">
              <p>+94 76 3932 043</p>
              <p>+94 72 733 2649</p>
            </div>
          </li>
          <li className="group">
            <p>Matara, Sri Lanka</p>
          </li>
        </ul>
      </div>
    </motion.div>
    
    <motion.div variants={itemVariants} className="p-10 md:p-16 lg:p-24">
      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-10 border-b border-black/10 pb-6">Quick Links</h4>
      <ul className="space-y-6 text-xs font-semibold uppercase tracking-wider text-[#111]">
        <li><Link to="/" className="hover:opacity-50 transition-opacity hover:translate-x-1 inline-block transform duration-300">Home</Link></li>
        <li><Link to="/about" className="hover:opacity-50 transition-opacity hover:translate-x-1 inline-block transform duration-300">DNA</Link></li>
        <li><Link to="/services" className="hover:opacity-50 transition-opacity hover:translate-x-1 inline-block transform duration-300">Services</Link></li>
        <li><Link to="/portfolio" className="hover:opacity-50 transition-opacity hover:translate-x-1 inline-block transform duration-300">Portfolio</Link></li>
        <li><Link to="/contact" className="hover:opacity-50 transition-opacity hover:translate-x-1 inline-block transform duration-300">Contact Me</Link></li>
      </ul>
    </motion.div>

    <motion.div variants={itemVariants} className="p-10 md:p-16 lg:p-24">
      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-10 border-b border-black/10 pb-6">Services</h4>
      <ul className="space-y-6 text-xs font-semibold uppercase tracking-wider text-[#111]">
        <li className="hover:opacity-50 transition-opacity cursor-pointer">Web Development</li>
        <li className="hover:opacity-50 transition-opacity cursor-pointer">UI/UX Design</li>
        <li className="hover:opacity-50 transition-opacity cursor-pointer">Logo Design</li>
        <li className="hover:opacity-50 transition-opacity cursor-pointer">Poster Design</li>
        <li className="hover:opacity-50 transition-opacity cursor-pointer">Visiting Card</li>
        <li className="hover:opacity-50 transition-opacity cursor-pointer">Graphic Design</li>
      </ul>
    </motion.div>

    
  </motion.footer>
);
