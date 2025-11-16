import React, { useState } from 'react';
import { Product, Review } from '../types';
import GlitchText from './GlitchText';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  reviews: Review[];
  onAddReview: (productId: number, review: Omit<Review, 'id' | 'timestamp'>) => void;
  onAddToCart: (product: Product, quantity: number) => void; // Updated to accept quantity
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  reviews,
  onAddReview,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}) => {
  const [quantity, setQuantity] = useState<number>(1); // New state for quantity

  if (!isOpen) return null;

  const handleReviewSubmit = (rating: number, comment: string) => {
    onAddReview(product.id, { rating, comment });
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity); // Pass quantity to onAddToCart
  };

  const handleToggleWishlistClick = () => {
    onToggleWishlist(product);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-modal-title"
    >
      <div
        className="w-full max-w-4xl border-2 border-[#00ff41] bg-[#0a0a0a] p-6 relative animate-fade-in flex flex-col md:flex-row gap-6"
        style={{ boxShadow: '0 0 15px rgba(0, 255, 65, 0.5), 0 0 25px rgba(0, 255, 65, 0.3)' }}
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-[#ff003c] hover:text-white font-tech-mono transition-colors duration-200"
          aria-label="Close product details"
        >
          [X]
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover border border-[rgba(255,255,255,0.2)]"
          />
        </div>

        {/* Product Details and Reviews */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 id="product-detail-modal-title" className="font-tech-mono text-3xl text-[#00ff41] uppercase mb-2">
              <GlitchText>{product.name}</GlitchText>
            </h2>
            <p className="font-tech-mono text-xl text-white mb-4">{product.price}</p>
            {/* Corrected font-family */}
            <p className="text-sm text-gray-400 font-vt323 leading-relaxed mb-6">{product.description}</p>
          </div>

          <div className="flex flex-col space-y-2 mb-6">
            {/* Quantity Selector */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <label htmlFor="product-quantity" className="sr-only">Quantity</label>
              <button 
                onClick={() => handleQuantityChange(-1)} 
                className="px-3 py-1 text-white bg-[rgba(0,255,65,0.1)] border border-[rgba(0,255,65,0.2)] hover:bg-[rgba(0,255,65,0.2)] transition-colors duration-200"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input 
                type="number"
                id="product-quantity"
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center bg-transparent border border-[rgba(0,255,65,0.2)] text-white font-tech-mono text-lg"
                min="1"
                aria-live="polite"
              />
              <button 
                onClick={() => handleQuantityChange(1)} 
                className="px-3 py-1 text-white bg-[rgba(0,255,65,0.1)] border border-[rgba(0,255,65,0.2)] hover:bg-[rgba(0,255,65,0.2)] transition-colors duration-200"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            
            <button
              onClick={handleAddToCartClick}
              className="w-full font-tech-mono text-base uppercase px-4 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors duration-200"
              aria-label={`Add ${quantity} of ${product.name} to cart`}
            >
              [ ADD TO CART ]
            </button>
            <button
              onClick={handleToggleWishlistClick}
              className={`w-full font-tech-mono text-base uppercase px-4 py-2 border ${
                isInWishlist
                  ? 'border-[#ff003c] text-[#ff003c] hover:bg-[#ff003c]'
                  : 'border-[#6a00ff] text-[#6a00ff] hover:bg-[#6a00ff]'
              } hover:text-black transition-colors duration-200`}
              aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            >
              {isInWishlist ? '[ REMOVE FROM WISHLIST ]' : '[ ADD TO WISHLIST ]'}
            </button>
          </div>

          {/* Reviews Section */}
          <div className="mt-8 border-t border-[rgba(0,255,65,0.2)] pt-6">
            {/* Added heading for reviews section */}
            <h3 className="font-tech-mono text-2xl text-[#00ff41] mb-4">
              <GlitchText>>_ REVIEWS.DAT</GlitchText>
            </h3>
            <ReviewList reviews={reviews} />
            <div className="mt-6 border-t border-[rgba(0,255,65,0.2)] pt-6">
              <h4 className="font-tech-mono text-xl text-white mb-4">
                <GlitchText>>_ SUBMIT REVIEW</GlitchText>
              </h4>
              <ReviewForm onSubmit={handleReviewSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;