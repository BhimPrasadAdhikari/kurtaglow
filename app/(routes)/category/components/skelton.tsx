import React from 'react';
import Container from '@/components/ui/container';

const Skeleton = () => {
  return (
    <div className="bg-white dark:bg-black">
      <Container>
        <div className="animate-pulse space-y-10 pb-10">
          {/* Billboard Skeleton */}
          <div className="h-56 bg-gray-300 dark:bg-gray-700 rounded-md"></div>

          {/* Filter Skeleton */}
          <div className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
              {/* Mobile Filter */}
              <div className="block lg:hidden space-y-6">
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              </div>

              {/* Sidebar Filters */}
              <div className="hidden lg:block space-y-6">
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              </div>

              {/* Products Skeleton */}
              <div className="mt-6 lg:col-span-4 lg:mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="bg-gray-300 dark:bg-gray-700 rounded-md h-64"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Skeleton;
