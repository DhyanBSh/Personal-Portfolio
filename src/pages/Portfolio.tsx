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

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then((data: PortfolioItem[]) => setPortfolioItems(data))
      .catch(err => console.error('Failed to load projects.json', err));
  }, []);

  return <SphericalGallery items={portfolioItems} />;
};
