// LoadingSkeleton.tsx

const Skeleton = ({ className }: { className: string }) => (
    <div className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${className}`} />
  );
  
  const OrderSkeleton = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-6 gap-4">
          {/* Simulating Products Column */}
          <Skeleton className="h-6 w-full col-span-2" />
          
          {/* Simulating Address Column */}
          <Skeleton className="h-6 w-full col-span-2" />
          
          {/* Simulating Contact Column */}
          <Skeleton className="h-6 w-full col-span-1" />
          
          {/* Simulating Total Price Column */}
          <Skeleton className="h-6 w-full col-span-1" />
        </div>
  
        <div className="grid grid-cols-6 gap-4">
          <Skeleton className="h-6 w-full col-span-2" />
          <Skeleton className="h-6 w-full col-span-2" />
          <Skeleton className="h-6 w-full col-span-1" />
          <Skeleton className="h-6 w-full col-span-1" />
        </div>
  
        <div className="grid grid-cols-6 gap-4">
          <Skeleton className="h-6 w-full col-span-2" />
          <Skeleton className="h-6 w-full col-span-2" />
          <Skeleton className="h-6 w-full col-span-1" />
          <Skeleton className="h-6 w-full col-span-1" />
        </div>
  
        {/* Simulating the date and isPaid actions */}
        <div className="grid grid-cols-6 gap-4 mt-6">
          <Skeleton className="h-6 w-full col-span-4" />
          <Skeleton className="h-6 w-full col-span-2" />
        </div>
      </div>
    );
  };
  
  const TabsSkeleton = () => (
    <div className="flex space-x-4 mb-4">
      {/* Simulating tab buttons */}
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-24" />
    </div>
  );
  
  const OrderPageSkeleton = () => {
    return (
      <div className="bg-white dark:bg-black">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-8">Orders</h1>
          {/* Tabs Skeleton */}
          <TabsSkeleton />
          {/* Order List Skeleton */}
          <OrderSkeleton />
        </div>
      </div>
    );
  };
  
  export default OrderPageSkeleton;
  