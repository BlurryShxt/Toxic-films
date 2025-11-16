import React, { useState } from 'react';
import { Product, Review } from '../types';
import GlitchText from './GlitchText';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void; 
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  onProductClick: (product: Product) => void; 
  reviews: Review[]; // New prop for reviews
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleWishlist, isInWishlist, onProductClick, reviews }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity); 
  };

  const handleToggleWishlistClick = () => {
    onToggleWishlist(product);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating();
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStarRating = () => (
    <div className="flex items-center text-sm" role="img" aria-label={`Average rating ${averageRating.toFixed(1)} out of 5 stars, from ${reviews.length} reviews`}>
      <span className="text-[#00ff41]">
        {'★'.repeat(fullStars)}
        {hasHalfStar && <span className="relative inline-block overflow-hidden w-[0.5em]">★</span>} {/* Half star representation */}
        {'☆'.repeat(emptyStars)}
      </span>
      {reviews.length > 0 && (
        <span className="text-gray-500 ml-2">({reviews.length} reviews)</span>
      )}
    </div>
  );

  return (
    <div className="border border-[rgba(0,255,65,0.3)] p-4 bg-black bg-opacity-20 group flex flex-col">
      <div className="relative overflow-hidden">
        <button 
          onClick={() => onProductClick(product)}
          className="block w-full text-left"
          aria-label={`View details for ${product.name}`}
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>
        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUl5Uw==')] pointer-events-none opacity-5 group-hover:opacity-15 transition-opacity duration-300"></div>
      </div>
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="font-tech-mono text-xl text-white uppercase mb-1"><GlitchText>{product.name}</GlitchText></h3>
        <p className="font-tech-mono text-lg text-[#00ff41] mb-2">{product.price}</p>
        {renderStarRating()}
        <div className="flex items-center space-x-2 mt-4">
          <button 
            onClick={() => handleQuantityChange(-1)} 
            className="px-2 py-1 text-white bg-[rgba(0,255,65,0.1)] border border-[rgba(0,255,65,0.2)] hover:bg-[rgba(0,255,65,0.2)] transition-colors duration-200"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input 
            type="number"
            value={quantity} 
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-10 text-center bg-transparent border border-[rgba(0,255,65,0.2)] text-white font-tech-mono text-base"
            min="1"
            aria-live="polite"
            aria-label={`Quantity for ${product.name}`}
          />
          <button 
            onClick={() => handleQuantityChange(1)} 
            className="px-2 py-1 text-white bg-[rgba(0,255,65,0.1)] border border-[rgba(0,255,65,0.2)] hover:bg-[rgba(0,255,65,0.2)] transition-colors duration-200"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button 
          onClick={handleAddToCartClick} 
          className="mt-4 w-full font-tech-mono text-base uppercase px-4 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors duration-200"
          aria-label={`Add ${quantity} of ${product.name} to cart`}
        >
          [ ADD TO CART ]
        </button>
        <button 
          onClick={handleToggleWishlistClick} 
          className={`mt-2 w-full font-tech-mono text-base uppercase px-4 py-2 border ${
            isInWishlist 
              ? 'border-[#ff003c] text-[#ff003c] hover:bg-[#ff003c]' 
              : 'border-[#6a00ff] text-[#6a00ff] hover:bg-[#6a00ff]'
          } hover:text-black transition-colors duration-200`}
          aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          {isInWishlist ? '[ REMOVE FROM WISHLIST ]' : '[ ADD TO WISHLIST ]'}
        </button>
      </div>
    </div>
  );
};