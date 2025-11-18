import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

type RatingStarsProps = {
  rating: number;
  maxRating?: number;
  className?: string;
};

export function RatingStars({ rating, maxRating = 5, className }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-0.5 text-amber-500', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-current" />
      ))}
      {halfStar && <StarHalf className="h-4 w-4 fill-current" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300 fill-current" />
      ))}
    </div>
  );
}
