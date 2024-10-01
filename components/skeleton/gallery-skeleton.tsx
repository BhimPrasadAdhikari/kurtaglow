import React from "react";

const GallerySkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Main Image */}
      <div className="w-[400px] h-[400px] bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>

      {/* Thumbnail Image List */}
      <div className="flex justify-center space-x-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-[40px] h-[40px] bg-gray-200 dark:bg-gray-700 rounded-md"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default GallerySkeleton;
