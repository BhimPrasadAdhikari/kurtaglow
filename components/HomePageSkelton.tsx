import React from 'react';

// Basic Skeleton component for placeholders
const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${className}`} />
);

const CarouselSkeleton = () => (
  <div className="h-[400px] w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
);

const ProductSkeleton = () => (
  <div className="flex flex-col items-center p-4 border dark:border-gray-700 rounded-lg">
    <Skeleton className="h-40 w-full mb-4 rounded-md" /> {/* Image Placeholder */}
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

const HomePageSkeleton = () => {
  return (
    <div className="space-y-10 pb-10">
      {/* Carousel Skeleton */}
      <div className="flex items-center justify-center mx-20">
        <CarouselSkeleton />
      </div>

      {/* Product List Skeleton */}
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-4 animate-pulse">
          Featured Products
        </h2>
        <ProductsListSkeleton />
      </div>
    </div>
  );
};

export default HomePageSkeleton;
