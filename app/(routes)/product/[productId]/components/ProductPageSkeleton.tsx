"use client"
import React from 'react';


const ProductPageSkeleton = () => {
  return (
    <div className="bg-white dark:bg-black">
      <div className="px-4 py-0 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Gallery Skeleton */}
          <div className="w-96 h-96 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>

          {/* Info Skeleton */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-4">
            <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-1/2 h-6 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-1/3 h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-full h-8 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10" />

        {/* Related Products Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-64 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
