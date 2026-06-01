import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { createPortal } from 'react-dom';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.95 },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export const Portfolio = () => {
  type PortfolioItem = {
    img: string;
    span: string;
    aspect: string;
    partner: string;
    services: string;
    description?: string;
    url?: string;
  };

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    setVisibleCount(5);
  }, [selectedFilter]);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then((data: PortfolioItem[]) => setPortfolioItems(data))
      .catch(err => console.error('Failed to load projects.json', err));
  }, []);

  // Use fixed categories (per user request) and map them to service keywords for matching
  const categories = ['All', 'UI/UX Designing', 'Logo Designing', 'Banner/Flyer Designing', 'Video Editing', 'Product Designing'];

  const categoryKeywords: Record<string, string[]> = {
    'UI/UX Designing': ['design ux / ui', 'design ux', 'design', 'ux', 'ui'],
    'Logo Designing': ['logo', 'brand'],
    'Banner/Flyer Designing': ['banner', 'flyer'],
    'Video Editing': ['video', 'motion', 'animation', 'edit'],
    'Product Designing': ['product', 'custom app', 'tech architecture']
  };

  const allServices = categories;

  const filteredItems = selectedFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => {
        const s = (item.services || '').toLowerCase();
        const keywords = categoryKeywords[selectedFilter] || [selectedFilter.toLowerCase()];
        return keywords.some(k => s.includes(k));
      });
  const visibleItems = filteredItems.slice(0, visibleCount);

  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 bg-[#fcfcfc] min-h-screen text-[#111] overflow-hidden">
      {/* Header Section mimicking PDF layout */}
      <motion.section 
        initial="hidden" animate="visible" variants={sectionVariants}
        className="mb-24 md:mb-32 max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 md:gap-6 font-bold text-lg md:text-xl lg:text-2xl tracking-tight">
          {allServices.map(service => (
            <button 
              key={service}
              onClick={() => setSelectedFilter(service)}
              className={`transition-colors text-left ${selectedFilter === service ? 'text-[#111]' : 'text-black/30 hover:text-black/60'}`}
            >
              [{service}]
            </button>
          ))}
        </motion.div>
      </motion.section>

      {/* Portfolio Masonry Grid */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "100px" }} 
        variants={sectionVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-16 lg:gap-x-12 lg:gap-y-24">
          <AnimatePresence>
            {visibleItems.map((item, i) => (
              <motion.div 
                key={item.partner} 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col group ${item.span}`}
              >
                <div 
                  className={`w-full overflow-hidden mb-6 bg-black/5 ${item.aspect} cursor-pointer`}
                  onClick={() => setSelectedItem(item)}
                >
                  <motion.img 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ duration: 25 + i * 2, repeat: Infinity, ease: "linear", delay: i }}
                    src={item.img} 
                    alt={item.partner} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Metadata Table Format from PDF */}
                <div className="flex flex-col gap-y-3 text-[10px] sm:text-[11px] leading-tight">
                  <div className="flex items-start">
                    <div className="w-24 uppercase font-semibold text-black/40 tracking-widest shrink-0">Project</div>
                    <div className="font-bold uppercase tracking-widest text-[#111]">{item.partner}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="font-medium text-white/70 pr-4">{item.services}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredItems.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-20 md:mt-32"
          >
            <button 
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="group flex flex-col items-center gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-black/40 hover:text-[#111] transition-colors"
            >
              <span className="w-[1px] h-16 bg-black/20 group-hover:bg-[#111] group-hover:h-20 transition-all duration-300"></span>
              Load More Projects
            </button>
          </motion.div>
        )}
      </motion.section>

      {/* Lightbox Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedItem && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 z-[100] bg-[#000]/90 backdrop-blur-sm flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative max-w-6xl max-h-[90vh] w-full flex flex-col items-center justify-center cursor-default bg-transparent overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white text-black shadow-lg hover:scale-105 transform transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-full h-full max-h-[75vh] md:max-h-[85vh] relative flex justify-center">
                  <img 
                    src={selectedItem.img} 
                    alt={selectedItem.partner} 
                    className="max-w-full max-h-full object-contain shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative md:absolute md:bottom-8 md:left-8 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-6 py-6 border border-white/5 text-white w-full md:max-w-md shadow-2xl flex flex-col items-start gap-3 rounded-lg mt-4 md:mt-0">
                  <div className="text-[10px] uppercase font-bold tracking-widest mb-1 text-white/40">Project</div>
                  <div className="text-xl md:text-2xl font-semibold tracking-tight mb-1">{selectedItem.partner}</div>
                  <div className="text-xs font-medium leading-snug text-white/80 mb-2">{selectedItem.services}</div>
                  {selectedItem.description && (
                    <div className="text-sm font-light leading-relaxed text-white/75 mb-2">{selectedItem.description}</div>
                  )}
                  <div className="w-full flex items-center justify-start gap-3">
                    {selectedItem.url ? (
                      <a
                        href={selectedItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-3 bg-white text-black text-[10px] uppercase font-bold tracking-widest px-6 py-3 hover:bg-black hover:text-white border border-transparent hover:border-white transition-colors duration-300 group rounded"
                      >
                        Visit Project
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </main>
  );
};
