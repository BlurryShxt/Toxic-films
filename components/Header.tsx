
import React, { useState, useEffect } from 'react';
import GlitchText from './GlitchText';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onWishlistClick: () => void;
  onCartClick: () => void;
  onLogoClick: () => void;
  onShopClick: () => void;
  onScriptClick: () => void;
  activeView: string;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  wishlistCount, 
  onWishlistClick, 
  onCartClick,
  onLogoClick,
  onShopClick,
  onScriptClick,
  activeView
}) => {
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (cartCount === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(timer);
  }, [cartCount]);

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-md z-[100] border-b border-[#C0C0C0]/10">
      <div className="max-w-[1800px] mx-auto px-6 h-16 md:h-20 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={onLogoClick}
          className="font-bebas text-3xl md:text-4xl tracking-tighter cursor-pointer text-white hover:text-[#9EFD38] transition-colors"
        >
          <GlitchText text="TOXICFILMS">
            TOXIC<span className="text-[#C0C0C0]">FILMS</span>
          </GlitchText>
        </div>

        {/* Primary Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          <button 
            onClick={onShopClick}
            className={`font-bebas text-xl tracking-wide uppercase transition-all relative py-1 ${
              activeView === 'shop' || activeView === 'detail' ? 'text-white' : 'text-[#C0C0C0] hover:text-white'
            }`}
          >
            Shop
            {(activeView === 'shop' || activeView === 'detail') && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9EFD38] animate-pulse"></span>
            )}
          </button>
          <button className="font-bebas text-xl tracking-wide uppercase text-[#C0C0C0] hover:text-white transition-colors">
            Collections
          </button>
          <button className="font-bebas text-xl tracking-wide uppercase text-[#C0C0C0] hover:text-white transition-colors">
            Lookbook
          </button>
          <button 
            onClick={onScriptClick}
            className={`font-bebas text-xl tracking-wide uppercase transition-all relative py-1 ${
              activeView === 'script' ? 'text-white' : 'text-[#C0C0C0] hover:text-white'
            }`}
          >
            The Script
            {activeView === 'script' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9EFD38] animate-pulse"></span>
            )}
          </button>
        </nav>

        {/* Icons / Meta */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={onWishlistClick}
            className="group relative"
          >
            <span className="font-tech-mono text-[#C0C0C0] group-hover:text-[#9EFD38] transition-colors">
              WISHLIST <span className="text-white">({wishlistCount})</span>
            </span>
          </button>
          
          <button 
            onClick={onCartClick}
            className={`group relative flex items-center gap-2 bg-[#9EFD38] text-black px-4 py-1.5 rounded-full font-bold transition-all duration-300 ${bump ? 'scale-110' : 'hover:scale-105'}`}
          >
            <span className="font-bebas text-lg">CART</span>
            <span className="font-tech-mono text-sm">[{cartCount}]</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
