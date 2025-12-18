
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleWishlist, isInWishlist, onClick }) => {

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart();
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div 
      className="border border-[rgba(0,255,65,0.3)] p-4 bg-black bg-opacity-20 group flex flex-col cursor-pointer transition-all hover:border-[#00ff41]"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWYmJitbW1oaGhra2uBgYGJiYl8fHygoKCEhITBwcGtra2np6eHh4fR0dFWVlZ/f39nZ2caKjM4AAAAjklEQVR42p3OxQ0DUBBD0RNQZAIwA3T/b7undv4LHBq4vy3GR5bSbb69c0NAqZ6K7S6s/wXOt41w8uTsnAswtu3Gz5u2N2gCG8M+w62wP0M50AB0AmkLmb4u7GseZkRd18pQy220v48w9w8G23D5An8A3MAn0AmsM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM3sM...')] opacity-20 pointer-events-none"></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-tech-mono text-xl uppercase text-[#00ff41] mb-2">{product.name}</h2>
        <p className="text-base mb-4 flex-grow text-[rgba(255,255,255,0.7)]">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="font-tech-mono text-lg">{product.price}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleWishlistClick}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              className={`font-tech-mono text-2xl transition-colors duration-200 ${isInWishlist ? 'text-[#ff003c]' : 'text-[#00ff41] hover:text-white'}`}
            >
              {isInWishlist ? '[♥]' : '[♡]'}
            </button>
            <button 
              onClick={handleAddToCartClick}
              className="font-tech-mono text-sm uppercase px-4 py-2 border-2 border-[#00ff41] bg-transparent text-[#00ff41] hover:bg-[#00ff41] hover:text-[#0a0a0a] active:bg-transparent active:text-[#00ff41] transition-colors duration-200"
              style={{
                  boxShadow: '2px 2px 0px #00ff41',
              }}
            >
              [ Add to Cart ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
