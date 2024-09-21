"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Button from "@/components/Button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import useUser from "@/hooks/use-user";
import { createHmac } from "crypto";


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
      removeAllitem();
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
  }, [searchParams, removeAll,removeAllitem]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);
  const hmac = createHmac('sha256', '8gBm/:&EnhH.1/q');
  const total_amount="110"
  const transaction_uuid="072e7ca6-5a7e-42ed-ad46-f95d830a51c4"
  const product_code="EPAYTEST"
const msg=`total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`
  const data = hmac.update(msg);
  const signature= data.digest('base64');

  const onKhaltiCheckout = async() => {
    try
    {
       setLoading(true);
      const Khalti_response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/',
      JSON.stringify({
          "return_url": "http://localhost:3001/cart/",

          "website_url": "http://localhost:3001",

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
          "merchant_extra": "bhimprasadaadhikari98@gmail.com"
        }),
        {
          "headers":{
            Authorization:' Key a7ece28fa52348fbb36781362509e92a',
            "Content-Type":"application/json"
          }
        }
      )
    console.log(Khalti_response);
    ;}catch (error){
     toast.error("something went wrong");
     console.log("error with payment",error);
    }finally{
          setLoading(false)
    }
  }
  const onEsewaCheckout = async() => {
    try
    {
       setLoading(true);
      const Khalti_response = await axios.post('https://rc-epay.esewa.com.np/api/epay/main/v2/form',
       JSON.stringify( {
          "amount": "100",
          "tax_amount": "10",
          "total_amount": `${total_amount}`,
          "transaction_uuid": `${transaction_uuid}`,
          "product_code": `${product_code}`,
          "product_delivery_charge": "0",
          "product_service_charge": "0",
          "signed_field_names": "total_amount,transaction_uuid,product_code",
          "success_url": "https://esewa.com.np",
          "failure_url": "https://google.com",

          "signature": `${signature}`,

          } ),
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
        Summary
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
      <Button onClick={onKhaltiCheckout} className="w-full mt-6 bg-purple-600">
       Pay With khalti
      </Button>
      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
 <div hidden><input type="text" id="amount" name="amount" defaultValue="100" required />
 <input type="text" id="tax_amount" name="tax_amount" defaultValue ="10" required />
 <input type="text" id="total_amount" name="total_amount" defaultValue={total_amount} required/>
 <input type="text" id="transaction_uuid" name="transaction_uuid" required defaultValue={transaction_uuid}/>
 <input type="text" id="product_code" name="product_code" defaultValue ={product_code} required/>
 <input type="text" id="product_service_charge" name="product_service_charge" defaultValue="0" required/>
 <input type="text" id="product_delivery_charge" name="product_delivery_charge" defaultValue="0" required/>
 <input type="text" id="success_url" name="success_url" defaultValue="http://localhost:3001/orders" required/>
 <input type="text" id="failure_url" name="failure_url" defaultValue="http://localhost:3001" required/>
 <input type="text" id="signed_field_names" name="signed_field_names" defaultValue="total_amount,transaction_uuid,product_code" required/>
 <input type="text" id="signature" name="signature"  required defaultValue={signature}/>
 </div>
 <Button className="w-full mt-6 bg-green-400"  onClick={onEsewaCheckout}>
 Pay With ESewa
      </Button>
 </form>
    </div>
  );
}
 
export default Summary;
