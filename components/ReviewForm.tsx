
import React, { useState } from 'react';
import GlitchText from './GlitchText';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      onSubmit(rating, comment);
      setRating(0);
      setComment('');
    } else {
      alert('Please provide a rating and a comment.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="rating" className="block text-sm font-tech-mono text-gray-300 mb-2">
          Rating (1-5 Stars):
        </label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <button
              key={starValue}
              type="button"
              onClick={() => setRating(starValue)}
              className={`text-3xl transition-colors duration-200 ${
                starValue <= rating ? 'text-[#00ff41]' : 'text-gray-600 hover:text-gray-400'
              }`}
              aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-tech-mono text-gray-300 mb-2">
          Your Comment:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full p-2 bg-transparent border border-[rgba(0,255,65,0.3)] focus:border-[#00ff41] outline-none text-white font-vt323 text-base resize-none"
          placeholder="// ENTER YOUR THOUGHTS HERE..."
          aria-required="true"
        ></textarea>
      </div>
      <button
        type="submit"
        className="font-tech-mono text-base uppercase px-4 py-2 border border-[#6a00ff] text-[#6a00ff] hover:bg-[#6a00ff] hover:text-black transition-colors duration-200"
        aria-label="Submit review"
      >
        [ SUBMIT REVIEW ]
      </button>
    </form>
  );
};

export default ReviewForm;
