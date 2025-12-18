
import React from 'react';
import { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity }) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
    return acc + (price * item.quantity);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex justify-end" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-[#0a0a0a] h-full border-l border-[#C0C0C0]/20 flex flex-col animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="font-bebas text-4xl text-white">THE REEL (CART)</h2>
          <button onClick={onClose} className="text-[#C0C0C0] hover:text-[#D90429] font-tech-mono transition-colors">[CLOSE]</button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[#C0C0C0] font-tech-mono opacity-50">
              <p>// YOUR SCENE IS EMPTY</p>
              <button onClick={onClose} className="mt-4 border border-[#C0C0C0] px-4 py-2 hover:bg-white hover:text-black transition-all">
                START CASTING
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 border-b border-white/5 pb-6">
                <div className="w-24 aspect-[3/4] bg-black overflow-hidden border border-white/10">
                  <img src={item.image} className="w-full h-full object-cover grayscale" alt={item.name} />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bebas text-2xl text-white leading-none">{item.name}</h3>
                      <button onClick={() => onRemove(item.id)} className="text-[#D90429] font-tech-mono text-xs hover:underline">
                        [ REMOVE ]
                      </button>
                    </div>
                    <p className="text-[#C0C0C0] font-tech-mono text-xs mt-1 uppercase">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex border border-[#333] h-8 items-center">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 text-white hover:bg-white/10"
                      >-</button>
                      <span className="w-10 text-center font-tech-mono text-sm text-white border-x border-[#333]">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 text-white hover:bg-white/10"
                      >+</button>
                    </div>
                    <span className="font-bebas text-xl text-[#9EFD38]">{item.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#111]">
            <div className="flex justify-between mb-4 font-bebas text-2xl">
              <span className="text-[#C0C0C0]">SUBTOTAL</span>
              <span className="text-white">${subtotal.toFixed(2)} USD</span>
            </div>
            <p className="text-[10px] text-[#C0C0C0] font-tech-mono mb-6 uppercase tracking-widest opacity-60">
              // SHIPPING AND PRODUCTION FEES CALCULATED AT UPLINK.
            </p>
            <button className="w-full bg-[#9EFD38] text-black font-bebas text-2xl py-4 tracking-wide hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(158,253,56,0.3)]">
              INITIALIZE CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
