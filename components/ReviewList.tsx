import React from 'react';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating();
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return (
      <span className="text-[#00ff41]">
        {'★'.repeat(full)}
        {'☆'.repeat(empty)}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {reviews.length > 0 ? (
        <>
          <div className="flex items-center space-x-2 text-white">
            <span className="font-tech-mono text-lg">AVERAGE RATING:</span>
            <div className="flex items-center">
              <span className="text-[#00ff41] text-xl">
                {'★'.repeat(fullStars)}
                {hasHalfStar && <span className="relative inline-block overflow-hidden w-[0.5em]">★</span>}
                {'☆'.repeat(emptyStars)}
              </span>
              <span className="font-tech-mono text-base ml-2">({averageRating.toFixed(1)} / 5)</span>
            </div>
          </div>
          <ul className="space-y-4" aria-label="Product reviews">
            {reviews.map((review) => (
              <li key={review.id} className="p-3 border border-[rgba(0,255,65,0.1)] bg-[rgba(0,0,0,0.1)]">
                <div className="flex items-center mb-2">
                  <span className="font-tech-mono text-lg text-white mr-2">Anonymous User</span>
                  {renderStars(review.rating)}
                </div>
                {/* Corrected font-family */}
                <p className="text-sm text-gray-400 font-vt323 leading-relaxed">{review.comment}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(review.timestamp).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center py-4 text-gray-500">// NO REVIEWS YET</p>
      )}
    </div>
  );
};

export default ReviewList;