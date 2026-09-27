import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 5, totalStars = 5, size = 16, interactive = false, onRate = () => {}, className = '' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {[...Array(totalStars)].map((_, i) => {
        const starNumber = i + 1;
        const filled = starNumber <= displayRating;
        const half = !filled && starNumber - 0.5 <= displayRating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate(starNumber)}
            onMouseEnter={() => interactive && setHoverRating(starNumber)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? 'cursor-pointer transform hover:scale-110 transition-transform' : 'cursor-default'} focus:outline-none`}
            aria-label={`${starNumber} Stars`}
          >
            <Star
              size={size}
              className={`${
                filled
                  ? 'text-amber-400 fill-amber-400'
                  : half
                  ? 'text-amber-400 fill-amber-200'
                  : 'text-slate-300'
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};
