import { useState, useEffect } from 'react';
import SphericalGallery from '../components/SphericalGallery';

export const Portfolio = () => {
  type PortfolioItem = {
    img: string;
    span: string;
    aspect: string;
    partner: string;
    category: string;
    services: string;
    description?: string;
    url?: string;
  };

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'UI / UX Designing',
    'Logo Designing',
    'Banner / Flyer Designing',
    'Video Editing',
    'Product Designing',
  ];

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then((data: PortfolioItem[]) => setPortfolioItems(data))
      .catch(err => console.error('Failed to load projects.json', err));
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] relative">
      <SphericalGallery items={filteredItems} />

      {/* Category Filter - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent px-4 pb-6 pt-16 md:p-8">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 md:gap-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                selectedCategory === category
                  ? 'text-white opacity-100'
                  : 'text-white/60 hover:opacity-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
