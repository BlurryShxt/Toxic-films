

import React from 'react';
import { CartItem } from '../types';
import GlitchText from './GlitchText';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveFromCart: (productId: number) => void;
  onIncreaseQuantity: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveFromCart, 
  onIncreaseQuantity, 
  onDecreaseQuantity 
}) => {
  if (!isOpen) return null;

  const totalCost = cartItems.reduce((sum, item) => {
    const priceValue = parseFloat(item.price.replace(' USD', ''));
    return sum + priceValue * item.quantity;
  }, 0);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center backdrop-blur-sm p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      <div 
        className="w-full max-w-3xl border-2 border-[#6a00ff] bg-[#0a0a0a] p-4 relative animate-fade-in" 
        style={{ boxShadow: '0 0 15px rgba(106, 0, 255, 0.5), 0 0 25px rgba(106, 0, 255, 0.3)' }}
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#6a00ff] pb-2 mb-4">
          <h2 id="cart-modal-title" className="font-tech-mono text-2xl text-[#00ff41]"><GlitchText>>_ CART_CONTENTS.DAT</GlitchText></h2>
          <button 
            onClick={onClose} 
            className="text-2xl text-[#ff003c] hover:text-white font-tech-mono transition-colors duration-200"
            aria-label="Close cart"
          >
            [X]
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {cartItems.length === 0 ? (
            <p className="text-center py-8 text-gray-500">// CART EMPTY</p>
          ) : (
            <ul className="space-y-4" role="list">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center justify-between p-2 border border-transparent hover:border-[rgba(0,255,65,0.2)] hover:bg-[rgba(0,255,65,0.05)] transition-all duration-200" role="listitem">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border border-[rgba(255,255,255,0.2)]" />
                    <div>
                      <h3 className="font-tech-mono text-lg text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-[rgba(0,255,65,0.2)]">
                      <button 
                        onClick={() => onDecreaseQuantity(item.id)} 
                        className="px-2 py-1 text-white hover:bg-[rgba(0,255,65,0.1)] transition-colors duration-200"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className="px-3 text-white font-tech-mono" aria-live="polite">{item.quantity}</span>
                      <button 
                        onClick={() => onIncreaseQuantity(item.id)} 
                        className="px-2 py-1 text-white hover:bg-[rgba(0,255,65,0.1)] transition-colors duration-200"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemoveFromCart(item.id)} 
                      className="font-tech-mono text-xs uppercase px-2 py-1 border border-[#ff003c] text-[#ff003c] hover:bg-[#ff003c] hover:text-black transition-colors duration-200"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      [ REMOVE ]
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with Total */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#6a00ff] pt-4 mt-4 flex justify-between items-center">
            <h3 className="font-tech-mono text-xl text-[#00ff41]"><GlitchText>>_ TOTAL:</GlitchText></h3>
            <span className="font-tech-mono text-xl text-white">{totalCost.toFixed(2)} USD</span>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button 
            onClick={onClose} 
            className="font-tech-mono text-lg uppercase px-4 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors duration-200"
          >
            [ CONTINUE SHOPPING ]
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;