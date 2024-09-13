"use client";

import axios from "axios";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/Button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import useShipingModel from "@/hooks/use-shiping-model"

const Summary = () => {
  const shipingModel= useShipingModel();
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('status')==='Completed') {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('status')==='User cancelled') {
      toast.error('Cancelled Payment');
    }

    if (searchParams.get('status')==='Expired') {
      toast.error('Transaction Expired');
    }
    if (searchParams.get('status')==='Refunded') {
      toast.error('Payment Refunded');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);
  const onCheckout =() => {
    shipingModel.onOpen()
  }

  return ( 
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      {
        !(items.length===0)? <Button onClick={onCheckout}  className="w-full mt-6">
        Checkout
      </Button>: <Button onClick={()=> window.location.href='/' }  className="w-full mt-6">
         Add Product
      </Button>
      }
      {/* <Button onClick={onCheckout} disabled={searchParams.get('status')==='Completed'?true:false} className="w-full mt-6">
        Checkout
      </Button> */}
    </div>
  );
}
 
export default Summary;
