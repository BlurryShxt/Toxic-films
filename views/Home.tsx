
import React, { useState } from 'react';
import { products } from '../constants';
import { Product } from '../types';
import FilterBar from '../components/FilterBar';

interface HomeProps {
  onProductClick: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Hoodies & Sweatshirts', 'Tops & T-shirts', 'Shorts & Trousers', 'Shoes', 'Accessories'];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-black flex items-center justify-center">
        {/* Mock Video Loop Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070" 
            className="w-full h-full object-cover opacity-50 grayscale contrast-125"
            alt="Hero Cinematic"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-[#C0C0C0] font-tech-mono text-sm tracking-[0.5em] mb-4 uppercase">Now Showing: Act III</h2>
          <h1 className="text-white font-bebas text-7xl md:text-9xl leading-none mb-8 tracking-tighter">
            THE REBELLION <span className="text-[#D90429]">CUT</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="px-10 py-4 bg-[#9EFD38] text-black font-bebas text-2xl tracking-wide hover:scale-105 transition-transform shadow-[0_0_20px_rgba(158,253,56,0.3)]">
              Shop The Scene
            </button>
          </div>
        </div>
      </section>

      {/* Featured Reel */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group cursor-pointer overflow-hidden aspect-video md:aspect-auto h-[500px]">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-10 left-10">
              <span className="text-[#D90429] font-tech-mono font-bold uppercase tracking-widest bg-black px-2 mb-2 block w-max">Limited Release</span>
              <h3 className="text-white font-bebas text-5xl mb-4">STATIC_VOID SERIES</h3>
              <button className="text-white font-bebas text-xl border-b-2 border-[#9EFD38] pb-1">Explore</button>
            </div>
          </div>
          <div className="relative group cursor-pointer overflow-hidden aspect-video md:aspect-auto h-[500px]">
            <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=987" className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-10 left-10">
               <span className="text-[#C0C0C0] font-tech-mono font-bold uppercase tracking-widest bg-black px-2 mb-2 block w-max">New Season</span>
              <h3 className="text-white font-bebas text-5xl mb-4">DATA_VAULT ACCESS</h3>
              <button className="text-white font-bebas text-xl border-b-2 border-[#9EFD38] pb-1">Shop Collections</button>
            </div>
          </div>
        </div>
      </section>

      {/* Editor's Cut Grid */}
      <section className="py-20 bg-[#111] border-y border-white/5">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
               <h2 className="text-[#C0C0C0] font-tech-mono text-xs tracking-[0.3em] uppercase mb-2">Curated Selection</h2>
               <h3 className="text-white font-bebas text-6xl">EDITOR'S CUT</h3>
            </div>
            <FilterBar 
               categories={categories} 
               activeCategory={activeCategory} 
               onSelectCategory={setActiveCategory} 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                onClick={() => onProductClick(product)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-black mb-4 border border-transparent group-hover:border-[#C0C0C0]/30 transition-all">
                   <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" 
                   />
                   {product.id % 3 === 0 && (
                     <div className="absolute top-4 left-4 bg-[#D90429] text-white font-bebas text-sm px-3 py-1">Limited</div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <button className="w-full bg-white text-black font-bebas py-3 text-lg hover:bg-[#9EFD38] transition-colors">Quick View</button>
                   </div>
                </div>
                <h4 className="text-white font-bebas text-2xl tracking-wide group-hover:text-[#9EFD38] transition-colors">{product.name}</h4>
                <p className="text-[#C0C0C0] font-tech-mono text-sm">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
