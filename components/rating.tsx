"use client";
import { Product } from "@/types";
import { useUser } from "@clerk/nextjs";
import { Star } from "lucide-react";
import { useState } from "react";
interface RatingComponentPropsType {
  product: Product;
}
const RatingComponent: React.FC<RatingComponentPropsType> = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { user } = useUser();
  const email = String(user?.primaryEmailAddress?.emailAddress);

  const handleRating = async (newRating: number) => {
    setRating(newRating);

    // Send rating to backend
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}rating`, {
        method: "POST",
        body: JSON.stringify({
          productId: product.id,
          rating: newRating,
          userEmail: email,
        }),
      });
    } catch (error) {
      console.error("RATING_POST_ERROR", error);
    }
    // Re-fetch product to get updated average rating
    // This assumes you'll have an API to fetch the updated product
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          onClick={() => handleRating(index + 1)}
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(0)}
          className={`cursor-pointer h-6 w-6 transition-all ${
            (hover || rating || product.averageRating) > index
              ? "text-yellow-500 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2">{product.averageRating.toFixed(1)} / 5</span>
    </div>
  );
};

export default RatingComponent;
