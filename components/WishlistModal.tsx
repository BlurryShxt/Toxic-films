import React from 'react';
import { Product } from '../types';
import GlitchText from './GlitchText';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: () => void;
}

const WishlistModal: React.FC<WishlistModalProps> = ({ isOpen, onClose, wishlistItems, onRemoveFromWishlist, onAddToCart }) => {
  if (!isOpen) return null;

  const handleItemAddToCart = (item: Product) => {
    onAddToCart();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className="w-full max-w-3xl border-2 border-[#6a00ff] bg-[#0a0a0a] p-4 relative animate-fade-in" 
        style={{ boxShadow: '0 0 15px rgba(106, 0, 255, 0.5), 0 0 25px rgba(106, 0, 255, 0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#6a00ff] pb-2 mb-4">
          <h2 className="font-tech-mono text-2xl text-[#00ff41]"><GlitchText>>_ SAVED_ITEMS.DAT</GlitchText></h2>
          <button onClick={onClose} className="text-2xl text-[#ff003c] hover:text-white font-tech-mono transition-colors duration-200">[X]</button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {wishlistItems.length === 0 ? (
            <p className="text-center py-8 text-gray-500">// NO DATA CACHED</p>
          ) : (
            <ul className="space-y-2">
              {wishlistItems.map(item => (
                <li key={item.id} className="flex items-center justify-between p-2 border border-transparent hover:border-[rgba(0,255,65,0.2)] hover:bg-[rgba(0,255,65,0.05)] transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border border-[rgba(255,255,255,0.2)]" />
                    <div>
                      <h3 className="font-tech-mono text-lg text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">{item.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-end md:items-center space-y-2 md:space-y-0 md:space-x-2">
                    <button onClick={() => onRemoveFromWishlist(item)} className="font-tech-mono text-xs uppercase px-2 py-1 border border-[#ff003c] text-[#ff003c] hover:bg-[#ff003c] hover:text-black transition-colors duration-200">
                      [ REMOVE ]
                    </button>
                    <button onClick={() => handleItemAddToCart(item)} className="font-tech-mono text-xs uppercase px-2 py-1 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors duration-200">
                      [ ADD TO CART ]
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
