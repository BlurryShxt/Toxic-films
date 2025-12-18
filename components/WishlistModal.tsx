
import React from 'react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const WishlistModal: React.FC<WishlistModalProps> = ({ isOpen, onClose, wishlistItems, onRemoveFromWishlist, onAddToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-[#0a0a0a] border border-[#C0C0C0]/20 flex flex-col animate-fade-in max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="font-bebas text-4xl text-white">THE ARCHIVE (WISHLIST)</h2>
          <button onClick={onClose} className="text-[#C0C0C0] hover:text-[#D90429] font-tech-mono transition-colors">[CLOSE]</button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {wishlistItems.length === 0 ? (
            <div className="py-12 text-center text-[#C0C0C0] font-tech-mono opacity-50">
              <p>// ARCHIVE IS EMPTY</p>
            </div>
          ) : (
            wishlistItems.map(item => (
              <div key={item.id} className="flex gap-4 border-b border-white/5 pb-4">
                <div className="w-20 aspect-[3/4] bg-black overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover grayscale" alt={item.name} />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bebas text-2xl text-white">{item.name}</h3>
                    <p className="text-[#9EFD38] font-bebas text-lg">{item.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onAddToCart(item)}
                      className="bg-[#9EFD38] text-black font-bebas px-4 py-1 text-sm hover:scale-105 transition-transform"
                    >
                      ADD TO SCENE
                    </button>
                    <button 
                      onClick={() => onRemoveFromWishlist(item)}
                      className="border border-[#D90429] text-[#D90429] font-bebas px-4 py-1 text-sm hover:bg-[#D90429] hover:text-white transition-colors"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
