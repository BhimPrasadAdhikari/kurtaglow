"use client";
export const revalidate = 0;

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import OrderList from "./components/order-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderPageSkeleton from "./components/LoadingSkeleton";
import getOrders from "@/actions/get-orders";
import { Order } from "@/types";

const OrderPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  const { user, isLoaded } = useUser(); // Add isLoaded for checking user state

  const [paymentStatus, setPaymentStatus] = useState("Completed");
  const searchParams = useSearchParams();
 console.log(orders)
  useEffect(() => {
    const fetchData = async () => {
      if (isLoaded && user) {
        setEmail(String(user.primaryEmailAddress?.emailAddress));
        try {
          const orders = await getOrders({
            email: email,
          });
          setOrders(orders);
        } catch (error) {
          console.error("ORDER_PAGE_ORDER_FETCH", error);
        }
      }
    };
    fetchData();
    setTimeout(() => setIsLoading(false), 1500); // Simulating a delay for demo purposes
  }, [user, isLoaded,email]);

  const handleTabChange = (value: string) => {
    setPaymentStatus(value);
  };

  if (isLoading || !isLoaded || !user) {
    return <OrderPageSkeleton />; // Render the loading skeleton or redirect if not signed in
  }

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
            Orders
          </h1>
          <div>
            <Tabs
              value={paymentStatus}
              onValueChange={handleTabChange}
              className=""
            >
              <TabsList className="flex gap-2 flex-wrap border-b border-gray-200 dark:border-gray-700">
                <TabsTrigger
                  value="Completed"
                  className="flex-1 text-center py-2"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="Pending"
                  className="flex-1 text-center py-2"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="Abandoned"
                  className="flex-1 text-center py-2"
                >
                  Abandoned
                </TabsTrigger>
                <TabsTrigger
                  value="Refunded"
                  className="flex-1 text-center py-2"
                >
                  Refunded
                </TabsTrigger>
                <TabsTrigger
                  value="Delivered"
                  className="flex-1 text-center py-2"
                >
                  Delivered
                </TabsTrigger>
                <TabsTrigger
                  value="OnTheWay"
                  className="flex-1 text-center py-2"
                >
                  On The Way
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Completed">
                <OrderList orders={orders} paymentStatus="Completed" />
              </TabsContent>
              <TabsContent value="Pending">
                <OrderList orders={orders} paymentStatus="Pending" />
              </TabsContent>
              <TabsContent value="Abandoned">
                <OrderList orders={orders} paymentStatus="Abandoned" />
              </TabsContent>
              <TabsContent value="Refunded">
                <OrderList orders={orders} paymentStatus="Refunded" />
              </TabsContent>
              <TabsContent value="Delivered">
                <OrderList orders={orders} paymentStatus="" orderStatus="Delivered" />
              </TabsContent>
              <TabsContent value="OnTheWay">
                <OrderList orders={orders} paymentStatus="" orderStatus="Not Delivered" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderPage;
