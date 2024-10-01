"use client";

import { useEffect, useState } from 'react';
import Container from '@/components/ui/container';
import OrderList from './components/order-list';
import { useUser } from '@clerk/nextjs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const revalidate = 0;
const PaymentPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const email=String(useUser().user?.primaryEmailAddress)

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-black">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">Payment</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
            <Tabs defaultValue="Pending" className="w-full">
               <TabsList>
                      <TabsTrigger value="Pending" >Pending</TabsTrigger>
                      <TabsTrigger value="Abandoned">Abandoned</TabsTrigger>
                </TabsList>
                <TabsContent value="Pending"><OrderList email={email} paymentStatus='Pending'/></TabsContent>
                <TabsContent value="Abandoned"><OrderList email={email} paymentStatus='Abandoned'/></TabsContent>
            </Tabs>
            </div>
            
          </div>
        </div>
      </Container>
    </div>
  )
};

export default PaymentPage;