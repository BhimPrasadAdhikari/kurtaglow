"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Button from "@/components/Button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import useUser from "@/hooks/use-user";

interface productDetailsProps{
  identity: string,
  name:string,
  total_price: number,
  quantity:1,
  unit_price: number,
}

const Summary =  () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const items = useCart((state) => state.items);
  const removeAllitem = useCart((state) => state.removeAll);
  const {firstName, lastName,phone,address} = useUser((state) => state.info);
  const removeAll = useUser((state) => state.removeAll);
  const productDetails:productDetailsProps[]=[];
  items.forEach((item:any)=>{
      productDetails.push({
          identity: item.id,
        name:item.name,
        total_price: item.price*100,
        quantity:1,
        unit_price: item.price*100

      })
  });

  useEffect(() => {
    if (searchParams?.get('status')==='completed') {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams?.get('status')==='User cancelled') {
      toast.error('Cancelled Payment');
    }

    if (searchParams?.get('status')==='Expired') {
      toast.error('Transaction Expired');
    }
    if (searchParams?.get('status')==='Refunded') {
      toast.error('Payment Refunded');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);
  const onCheckout = async() => {
    try
    {
       setLoading(true);
      const Khalti_response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/',
      JSON.stringify({
          "return_url": "https://kurtaglow-y7cc.vercel.app/cart/",
          "website_url": "https://kurtaglow-y7cc.vercel.app/",
          "amount": totalPrice+totalPrice*0.13,
          "purchase_order_id": "test12",
          "purchase_order_name": "test",
          "customer_info": {
              "name": `${firstName} ${lastName}`,
              "email": "example@gmail.com",
              "phone": phone
          },
          "amount_breakdown": [
              {
                  "label": "Mark Price",
                  "amount": totalPrice
              },
              {
                  "label": "VAT",
                  "amount": totalPrice*0.13
              }
          ],
          "product_details": productDetails,
          "merchant_username": "Test Testt ",
          "merchant_extra": "merchant_extra"
        }),
       { headers:{
          "Authorization":"Key 924a9e824c924bdf97cea0af00843858",
          "Content-Type":"application/json",

        }     
}
    );}catch (error){
     toast.error("something went wrong");
     console.log("error with payment",error);
    }finally{
          setLoading(false)
    }
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
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Name</div>
          <p>{firstName+' '+lastName}</p>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Address</div>
          <p>{address}</p>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Phone</div>
          <p>{phone}</p>
        </div>
      </div>
      <Button onClick={onCheckout} className="w-full mt-6">
       Pay With khalti
      </Button>
    </div>
  );
}
 
export default Summary;
