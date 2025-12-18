
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  relatedProducts: Product[];
  onProductClick: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onBack, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist,
  relatedProducts,
  onProductClick
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState(false);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const sceneImages = [
    product.image,
    `https://picsum.photos/seed/${product.id}_alt1/800/1000`,
    `https://picsum.photos/seed/${product.id}_alt2/800/1000`,
    `https://picsum.photos/seed/${product.id}_alt3/800/1000`
  ];

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  // Parse price: "78.00 USD" -> 78.0
  const numericPrice = parseFloat(product.price.replace(/[^\d.]/g, '')) || 0;
  const currency = product.price.replace(/[\d.\s]/g, '') || 'USD';
  const totalPrice = (numericPrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(quantity);
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-[#0a0a0a] animate-fade-in">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Image Gallery (Vertical Scroll) */}
        <div className="lg:col-span-8 flex flex-col gap-4 pb-20">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#C0C0C0] hover:text-white transition-colors font-tech-mono text-sm mb-4"
          >
            <span>[ BACK_TO_SHOP ]</span>
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sceneImages.map((img, idx) => (
              <div key={idx} className="relative group overflow-hidden bg-black">
                <img 
                  src={img} 
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt={`Scene ${idx + 1}`} 
                />
                <div className="absolute top-4 left-4 bg-black/60 border border-white/20 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                  ANGLE_{idx.toString().padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info (Sticky) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-max pb-20">
          <div className="flex flex-col gap-6">
            <header>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#9EFD38] font-tech-mono text-sm uppercase tracking-widest">{product.category}</span>
                <span className="text-[#D90429] border border-[#D90429] px-2 py-0.5 text-[10px] font-bold uppercase animate-pulse">Limited Stock</span>
              </div>
              <h1 className="text-white font-bebas text-5xl md:text-6xl mb-2 leading-none">{product.name}</h1>
              <p className="text-2xl text-[#C0C0C0] font-bebas tracking-wide transition-all duration-300">
                {quantity > 1 ? (
                   <>
                    <span className="line-through text-sm opacity-50 mr-2">{product.price}</span>
                    <span className="text-[#9EFD38]">{totalPrice} {currency}</span>
                   </>
                ) : (
                  product.price
                )}
              </p>
            </header>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-bebas text-xl text-white uppercase">Select Size</span>
                <button className="text-[#C0C0C0] hover:text-white text-xs underline uppercase">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border-2 transition-all font-bebas text-xl ${
                      selectedSize === size 
                      ? 'bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                      : 'border-[#333] text-white hover:border-[#C0C0C0]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 items-center">
               <div className="flex border-2 border-[#333] h-14 bg-black overflow-hidden group/qty">
                <button 
                  onClick={decrementQuantity} 
                  className="w-12 text-white hover:bg-white/10 transition-colors font-bold text-xl"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <div className="w-12 flex items-center justify-center text-white font-tech-mono text-lg border-x border-[#333]">
                  {quantity.toString().padStart(2, '0')}
                </div>
                <button 
                  onClick={incrementQuantity} 
                  className="w-12 text-white hover:bg-white/10 transition-colors font-bold text-xl"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 h-14 font-bebas text-2xl tracking-wide transition-all active:scale-95 flex items-center justify-center ${
                  isAdding 
                  ? 'bg-white text-black' 
                  : 'bg-[#9EFD38] text-black hover:scale-[1.02] shadow-[0_0_25px_rgba(158,253,56,0.2)]'
                }`}
              >
                {isAdding ? `ADDED +${quantity.toString().padStart(2, '0')}` : 'ADD TO SCENE'}
              </button>
            </div>

            <button 
              onClick={() => onToggleWishlist(product)}
              className={`w-full py-4 border-2 transition-all font-bebas text-xl flex items-center justify-center gap-2 ${
                isInWishlist ? 'border-[#D90429] text-[#D90429]' : 'border-white text-white hover:bg-white hover:text-black'
              }`}
            >
              {isInWishlist ? '♥ SAVED TO ARCHIVE' : '♡ ADD TO WISHLIST'}
            </button>

            <div className="mt-8 space-y-4">
              <details className="group border-b border-white/10 pb-4" open>
                <summary className="flex cursor-pointer items-center justify-between font-bebas text-xl text-white list-none uppercase tracking-wide">
                  Scene Notes
                  <span className="group-open:rotate-180 transition-transform text-[#C0C0C0]">↓</span>
                </summary>
                <p className="mt-4 text-[#C0C0C0] text-sm leading-relaxed font-inter">
                  {product.description}
                </p>
              </details>

              <details className="group border-b border-white/10 pb-4">
                <summary className="flex cursor-pointer items-center justify-between font-bebas text-xl text-white list-none uppercase tracking-wide">
                  Spec Sheet
                  <span className="group-open:rotate-180 transition-transform text-[#C0C0C0]">↓</span>
                </summary>
                <div className="mt-4 grid grid-cols-2 gap-4 font-tech-mono text-xs text-[#C0C0C0]">
                  <div>FABRIC: 100% ORGANIC COTTON</div>
                  <div>WEIGHT: 380 GSM HEAVYWEIGHT</div>
                  <div>FIT: OVERSIZED / BOX CUT</div>
                  <div>ORIGIN: PRODUCED IN PORTUGAL</div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Cast */}
      <section className="bg-[#111] py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-[1800px] mx-auto">
          <h3 className="text-white font-bebas text-4xl mb-10 uppercase tracking-tight">YOU MIGHT ALSO NEED</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(related => (
              <div 
                key={related.id} 
                onClick={() => onProductClick(related)}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden bg-black mb-4 border border-transparent group-hover:border-[#C0C0C0]/30 transition-all">
                  <img src={related.image} className="w-full h-full object-cover grayscale transition-transform group-hover:scale-105" />
                </div>
                <h4 className="text-white font-bebas text-xl uppercase">{related.name}</h4>
                <p className="text-[#C0C0C0] font-tech-mono text-xs">{related.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
