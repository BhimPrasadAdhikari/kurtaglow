import React from 'react';

const InfoSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Product Name */}
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>

      {/* Product Description */}
      <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-md mb-6"></div>

      {/* Price and Discount */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        <div className="relative">
          <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>

      <hr className="my-4" />

      {/* Size */}
      <div className="flex items-center gap-x-4 mb-4">
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Color */}
      <div className="flex items-center gap-x-4 mb-4">
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full border border-gray-600"></div>
      </div>

      <hr className="my-4" />

      {/* Specifications */}
      <div className="mb-4">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
        <div className="flex gap-x-6">
          <div className="flex flex-col gap-y-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-10">
        <div className="h-12 w-36 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>
    </div>
  );
};

export default InfoSkeleton;
