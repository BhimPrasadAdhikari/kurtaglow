"use client";

import { useEffect, useState } from 'react';
import Container from '@/components/ui/container';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import OrderList from './components/order-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderPageSkeleton from './components/LoadingSkeleton';

export const revalidate = 0;

const OrderPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const email = String(useUser().user?.primaryEmailAddress);
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const searchParams = useSearchParams();

  // Set the initial payment status based on URL query parameters
  useEffect(() => {
    const status = searchParams?.get('status');
    if (status) {
      if (status === 'completed') {
        toast.success('Payment completed.');
        setPaymentStatus("Completed");
      } else if (status === 'User cancelled') {
        toast.error('Cancelled Payment');
        setPaymentStatus("Abandoned");
      } else if (status === 'Expired') {
        toast.error('Transaction Expired');
      } else if (status === 'Refunded') {
        toast.error('Payment Refunded');
        setPaymentStatus("Refunded");
      }
    }
    setTimeout(() => setIsLoading(false), 1500); // Simulating a delay for demo purposes

  }, [searchParams]);

  // Track tab change with useState
  const handleTabChange = (value: string) => {
    setPaymentStatus(value);
  };

  if (isLoading) {
    return <OrderPageSkeleton />; // Render the loading skeleton
  }

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-6">Orders</h1>
          <div>
            <Tabs value={paymentStatus} onValueChange={handleTabChange} className="w-full">
              <TabsList className="flex flex-wrap">
                <TabsTrigger value="Completed" className="flex-1 text-center">
                  Completed
                </TabsTrigger>
                <TabsTrigger value="Pending" className="flex-1 text-center">
                  Pending
                </TabsTrigger>
                <TabsTrigger value="Abandoned" className="flex-1 text-center">
                  Abandoned
                </TabsTrigger>
                <TabsTrigger value="Refunded" className="flex-1 text-center">
                  Refunded
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Completed">
                <OrderList email={email} paymentStatus="Completed" />
              </TabsContent>
              <TabsContent value="Pending">
                <OrderList email={email} paymentStatus="Pending" />
              </TabsContent>
              <TabsContent value="Abandoned">
                <OrderList email={email} paymentStatus="Abandoned" />
              </TabsContent>
              <TabsContent value="Refunded">
                <OrderList email={email} paymentStatus="Refunded" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderPage;
