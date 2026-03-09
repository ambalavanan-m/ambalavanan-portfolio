import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    setRating?: (rating: number) => void;
    interactive?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, interactive = false }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => interactive && setRating && setRating(star)}
                    className={`${interactive ? 'cursor-pointer transform hover:scale-110' : 'cursor-default'
                        } transition-all duration-200`}
                >
                    <Star
                        size={24}
                        className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
};

export default StarRating;
