import React from "react";

// Basic Skeleton component for placeholders
const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${className}`} />
);

const ProductSkeleton = () => (
  <div className="flex flex-col items-center p-4 border dark:border-gray-700 rounded-lg">
    <Skeleton className="h-40 w-full mb-4 rounded-md" />{" "}
    {/* Image Placeholder */}
    <Skeleton className="h-4 w-3/4 mb-2" /> {/* Title Placeholder */}
    <Skeleton className="h-4 w-1/2" /> {/* Price Placeholder */}
  </div>
);

const ProductsListSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
    <ProductSkeleton />
  </div>
);

export default ProductsListSkeleton;
