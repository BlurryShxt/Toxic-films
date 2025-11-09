import React from 'react';
import GlitchText from './GlitchText';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onWishlistClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, wishlistCount, onWishlistClick }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#0a0a0a] bg-opacity-80 backdrop-blur-sm p-4 z-50 border-b border-[rgba(0,255,65,0.2)]">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-tech-mono text-[#00ff41] uppercase glitch-text" data-text="toxicfilms">
          toxicfilms
        </h1>
        <nav className="flex items-center space-x-4 md:space-x-8 text-lg">
          <a href="#" className="uppercase">
            <GlitchText>Apparel</GlitchText>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); onWishlistClick(); }} className="uppercase">
            <GlitchText>Wishlist [{wishlistCount}]</GlitchText>
          </a>
          <a href="#" className="uppercase">
            <GlitchText>Cart [{cartCount}]</GlitchText>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;