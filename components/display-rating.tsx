import { Star, StarHalf } from "lucide-react"; // You can conditionally style the Star icon for half-filled behavior

const DisplayRating = ({ rating }: { rating: number }) => {
  const getStarElements = () => {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 >= 0.5; // Determine if there's a half-star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
      <>
        {/* Full Stars */}
        {Array.from({ length: fullStars }, (_, i) => (
          <Star key={i} className="text-yellow-500 h-4 w-4 fill-current" />
        ))}
        {/* Half Star (if applicable) */}
        {hasHalfStar && (
          <StarHalf className="text-yellow-500 h-4 w-4 fill-current" />
        )}
        {/* Empty Stars */}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Star key={i + fullStars} className="text-gray-300 h-4 w-4" />
        ))}
      </>
    );
  };

  return (
    <div className="flex items-center">
      {getStarElements()}
      <span className="ml-2 text-xs">{rating.toFixed(1)} / 5</span>
    </div>
  );
};

export default DisplayRating;
