import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Filter } from 'lucide-react';

import { useBackgroundTransition } from '../hooks/useBackgroundTransition';

interface PortfolioItem {
  img: string;
  span: string;
  aspect: string;
  partner: string;
  category: string;
  services: string;
  description?: string;
  url?: string;
}

interface SphericalGalleryProps {
  items: PortfolioItem[];
}

const projectVariants = {
  hidden: {
    opacity: 0,
    y: 48,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const SphericalGallery: React.FC<SphericalGalleryProps> = ({ items }) => {
  const { backgroundColor } = useBackgroundTransition();
  const isDark = backgroundColor === 'black';

  const [selectedItem, setSelectedItem] =
    useState<PortfolioItem | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<string>('All');

  const [isCategoryPanelOpen, setIsCategoryPanelOpen] =
    useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(items.map((item) => item.category))
    );

    return ['All', ...uniqueCategories];
  }, [items]);

  // Filter projects
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return items;
    }

    return items.filter(
      (item) => item.category === selectedCategory
    );
  }, [items, selectedCategory]);

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryPanelOpen(false);
  };

  // Open modal
  const openModal = (project: PortfolioItem) => {
    setSelectedItem(project);
  };

  // Close modal
  const closeModal = () => {
    setSelectedItem(null);
  };

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (!selectedItem) {
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedItem]);

  // Close modal with Escape key
  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  return (
    <section
      className={`min-h-screen px-6 py-20 transition-colors duration-500 md:px-12 md:py-32 ${
        isDark
          ? 'bg-black text-white'
          : 'bg-[#fcfcfc] text-[#111]'
      }`}
    >
      {/* Category Filter - Desktop */}
      <div className="mb-12 hidden md:block">
        <div className="flex flex-wrap gap-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm font-medium tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter - Mobile Toggle Button */}
      <div className="mt-16 mb-6 md:hidden">
        <button
          onClick={() => setIsCategoryPanelOpen(!isCategoryPanelOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-gray-500 bg-transparent px-5 py-3 text-sm font-medium text-white transition-colors hover:border-gray-400"
        >
          <span>Category: {selectedCategory}</span>
          <Filter className="h-4 w-4" />
        </button>

        <AnimatePresence>
          {isCategoryPanelOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 flex flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`rounded-lg border px-5 py-3 text-left text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'border-white bg-white text-black'
                        : 'border-gray-500 bg-transparent text-gray-500 hover:border-gray-400 hover:text-gray-400'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --------------------------------------------- */}
      {/* PROJECTS GRID */}
      {/* --------------------------------------------- */}

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 md:gap-y-20"
        >
          {filteredItems.map((project, index) => (
            <motion.article
              key={`${selectedCategory}-${project.partner}-${index}`}
              variants={projectVariants}
              className={
                index % 3 === 1
                  ? 'md:translate-y-16'
                  : ''
              }
            >
              <button
                type="button"
                onClick={() => openModal(project)}
                className="group block w-full text-left"
                aria-label={`View ${project.partner} project details`}
              >
                {/* Project Image */}
                <div className="relative aspect-[1.42] overflow-hidden rounded-[4px] bg-black/10">
                  <img
                    src={project.img}
                    alt={`${project.partner} project preview`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
                </div>

                {/* Project Information */}
                <div className="grid grid-cols-[1fr_auto] gap-5 border-b border-current/20 py-5">
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.04em] md:text-3xl">
                      {project.partner}
                    </h3>

                    {project.description && (
                      <p className="mt-2 max-w-xl text-sm leading-relaxed opacity-60">
                        {project.description}
                      </p>
                    )}
                  </div>

                  <div className="text-right text-[10px] font-semibold uppercase tracking-[0.15em] opacity-50">
                    <p className="max-w-[130px] leading-relaxed">
                      {project.category}
                    </p>
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* --------------------------------------------- */}
      {/* NO RESULTS */}
      {/* --------------------------------------------- */}

      {filteredItems.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg opacity-50">
            No projects found in this category.
          </p>
        </div>
      )}

      {/* --------------------------------------------- */}
      {/* DETAIL MODAL */}
      {/* --------------------------------------------- */}

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                key="project-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[1] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm md:p-6"
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) {
                    closeModal();
                  }
                }}
                role="dialog"
                aria-modal="true"
                aria-label={`${selectedItem.partner} project details`}
              >
                <motion.div
                  key="project-modal-content"
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: 10,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseDown={(event) =>
                    event.stopPropagation()
                  }
                  className="relative flex max-h-[calc(100vh-1rem)] mt-16 w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-black/70 backdrop-blur-sm shadow-2xl md:max-h-[calc(100vh-3rem)]"
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    aria-label="Close project details"
                    onClick={closeModal}
                    className="absolute right-2 top-2 z-20 rounded-full bg-white/10 p-2 text-white shadow-sm transition hover:bg-white/30 md:right-4 md:top-4"
                  >
                    <X
                      size={20}
                      strokeWidth={2}
                      className="md:h-6 md:w-6"
                    />
                  </button>

                  {/* Scrollable Content */}
                  <div className="overflow-y-auto">
                    <div className="grid grid-cols-1 gap-6 p-4 pb-6 md:grid-cols-2 md:gap-12 md:p-12">
                      {/* -------------------------------- */}
                      {/* LEFT COLUMN */}
                      {/* -------------------------------- */}

                      <div className="flex flex-col justify-center space-y-4 text-white md:space-y-6">
                        {/* Title */}
                        <div>
                          <h2 className="pr-8 text-2xl font-bold tracking-tight md:pr-12 md:text-5xl">
                            {selectedItem.partner}
                          </h2>
                        </div>

                        {/* Description */}
                        {selectedItem.description && (
                          <div>
                            <p className="text-sm font-light leading-relaxed text-white/80 md:text-base">
                              {selectedItem.description}
                            </p>
                          </div>
                        )}

                        {/* Services */}
                        {selectedItem.services && (
                          <div className="space-y-2 md:space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white">
                              Services
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {selectedItem.services
                                .split(',')
                                .map(
                                  (
                                    service: string,
                                    idx: number
                                  ) => (
                                    <span
                                      key={`${service.trim()}-${idx}`}
                                      className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-light text-white transition hover:border-white/40"
                                    >
                                      {service.trim()}
                                    </span>
                                  )
                                )}
                            </div>
                          </div>
                        )}

                        {/* Category */}
                        {selectedItem.category && (
                          <div className="space-y-2 md:space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white">
                              Category
                            </p>

                            <p className="text-sm font-light text-white/80">
                              {selectedItem.category}
                            </p>
                          </div>
                        )}

                        {/* CTA */}
                        {selectedItem.url && (
                          <div className="pt-2 md:pt-4">
                            <a
                              href={selectedItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(event) =>
                                event.stopPropagation()
                              }
                              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-70"
                            >
                              View Project

                              <span className="text-lg transition-transform group-hover:translate-x-1">
                                →
                              </span>
                            </a>
                          </div>
                        )}
                      </div>

                      {/* -------------------------------- */}
                      {/* RIGHT COLUMN */}
                      {/* -------------------------------- */}

                      <div className="relative mt-8 aspect-[4/3] min-h-[200px] overflow-hidden rounded-lg bg-gray-100 md:aspect-auto md:min-h-[320px] md:h-96">
                        <img
                          src={selectedItem.img}
                          alt={`${selectedItem.partner} project`}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default SphericalGallery;