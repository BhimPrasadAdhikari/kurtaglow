"use client";
export const revalidate = 0;

import { useEffect, useState } from 'react';
import Container from '@/components/ui/container';
// import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import OrderList from './components/order-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import OrderPageSkeleton from './components/LoadingSkeleton';

const OrderPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoaded } = useUser(); // Add isLoaded for checking user state
  const email=String(user?.primaryEmailAddress);

  // const searchParams = useSearchParams();
  // if (isLoading) {
  //   return <OrderPageSkeleton />; // Render the loading skeleton or redirect if not signed in
  // }

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-6">Orders</h1>
          <div>
            <Tabs className="w-full" defaultValue='Pending'>
              <TabsList className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
                <TabsTrigger value="Completed" className="flex-1 text-center py-2">
                  Completed
                </TabsTrigger>
                <TabsTrigger value="Pending" className="flex-1 text-center py-2">
                  Pending
                </TabsTrigger>
                <TabsTrigger value="Abandoned" className="flex-1 text-center py-2">
                  Abandoned
                </TabsTrigger>
                <TabsTrigger value="Refunded" className="flex-1 text-center py-2">
                  Refunded
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Completed">
                {/* <OrderList email={email} paymentStatus="Completed" /> */}
              </TabsContent>
              <TabsContent value="Pending">
                <OrderList email={email} paymentStatus="Pending" />
              </TabsContent>
              <TabsContent value="Abandoned">
                {/* <OrderList email={email} paymentStatus="Abandoned" /> */}
              </TabsContent>
              <TabsContent value="Refunded">
                {/* <OrderList email={email} paymentStatus="Refunded" /> */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderPage;
