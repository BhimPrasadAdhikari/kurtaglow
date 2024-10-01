"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {Button} from "@/components/ui/Button";
import Currency from "@/components/ui/currency";
import { toast } from "react-hot-toast";
import useUser from "@/hooks/use-user";
import { createHmac } from "crypto";
import {v4 as uuidv4} from 'uuid';
import Image from "next/image";
import { EditIcon } from "lucide-react";
import useShipingModel from "@/hooks/use-shiping-model";
import { Order, Orderitem } from "@/types";
interface productDetailsProps{
  identity: string,
  name:string,
  total_price: number,
  quantity:number,
  unit_price: number,
}
interface SummaryProps{
  orders:Order[];
}
const Summary:React.FC<SummaryProps>=  ({orders}) => {
  console.log("Summmary Order",orders)
  const totalPrice = orders.reduce((total, order) => {
    // Calculate total for current order
    const itemTotal = order.orderItems.reduce((t, item) => {
        const iTotal = item.product ? Number(item.product.price) * Number(item.quantity) : 0;
        return t + iTotal;
    }, 0);
    
    // Add current order total to the overall total
    return total + itemTotal;
}, 0);

  
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const shipingModel= useShipingModel();

  const {firstName, lastName,phone,address} = useUser((state) => state.info);
  const productDetails:productDetailsProps[]=[];
  orders.forEach((order:Order)=>{
    order.orderItems.forEach((orderItem:Orderitem)=>{
      productDetails.push({
        identity: orderItem.product?.id,
      name:orderItem.product?.name,
      total_price: orderItem.product?.price*100*orderItem.quantity,
      quantity:orderItem.quantity,
      unit_price: orderItem.product?.price*100
    })
    })
   
  })
  useEffect(() => {
    if (searchParams?.get('status')==='completed') {
      toast.success('Payment completed.');
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
  }, [searchParams]);
  const hmac = createHmac('sha256', '8gBm/:&EnhH.1/q');
  const total_amount="110"
  const transaction_uuid=uuidv4();
  const product_code="EPAYTEST"
const msg=`total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`
  const data = hmac.update(msg);
  const signature= data.digest('base64');

  const onKhaltiCheckout = async() => {
    try
    {
       setLoading(true);
      const Khalti_response = await axios.post('https://khalti.com/api/v2/epayment/initiate/',
      JSON.stringify({
          "return_url": "https://kurtaglow-y7cc.vercel.app/cart/",

          "website_url": "https://kurtaglow-y7cc.vercel.app",

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
      const Khalti_response = await axios.post('https://epay.esewa.com.np/api/epay/main/v2/form',
       JSON.stringify( {
          "amount": "100",
          "tax_amount": "10",
          "total_amount": `${total_amount}`,
          "transaction_uuid": `${transaction_uuid}`,
          "product_code": `${product_code}`,
          "product_delivery_charge": "0",
          "product_service_charge": "0",
          "signed_field_names": "total_amount,transaction_uuid,product_code",
          "success_url": "https://kurtaglow-y7cc.vercel.app/cart/",
          "failure_url": "https://kurtaglow-y7cc.vercel.app/cart/",

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
      className="mt-16 rounded-lg relative bg-gray-50 dark:bg-black px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        Summary
      </h2>
      <Button onClick={()=>{shipingModel.onOpen()}} className="absolute right-0 top-0" size='default' variant='ghost'>
        <EditIcon color="blue"/>
      </Button>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-white">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-white">Name</div>
          <p>{firstName+' '+lastName}</p>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-white">Address</div>
          <p>{address}</p>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-white">Phone</div>
          <p>{phone}</p>
        </div>
      </div>
      <Button onClick={onKhaltiCheckout} className="w-full mt-6 bg-purple-300 flex justify-center items-center h-12">
      
       <svg id="Logo" xmlns="http://www.w3.org/2000/svg" width="118" height="44.95" viewBox="0 0 118 44.95">
  <g id="khalti-logo-01" transform="translate(0)">
    <g id="XMLID_486_" transform="translate(7.963)">
      <g id="XMLID_487_" transform="translate(0)">
        <path id="XMLID_488_" d="M45.7,1A2.383,2.383,0,0,0,43.863.2H2.542A2.324,2.324,0,0,0,.707,1,2.186,2.186,0,0,0,.149,2.912L3.1,31.27A7.1,7.1,0,0,0,6.052,35.9l14.6,8.615a5.306,5.306,0,0,0,2.593.638,5.2,5.2,0,0,0,2.593-.638l14.6-8.615a6.913,6.913,0,0,0,2.951-4.627L46.336,2.912A2.785,2.785,0,0,0,45.7,1ZM33.732,32.427a2.6,2.6,0,0,1-3.59-.678L22.684,20.781l-4.507,4.507v4.986a2.593,2.593,0,1,1-5.185,0V8.656a2.593,2.593,0,0,1,5.185,0v9.293L29.3,6.821a2.595,2.595,0,1,1,3.669,3.669l-6.581,6.541c0,.04.04.04.04.08L34.41,28.8A2.66,2.66,0,0,1,33.732,32.427Z" transform="translate(-0.115 -0.2)" fill="#5d2e8e"/>
      </g>
    </g>
    <g id="XMLID_483_" transform="translate(53.306 5.783)">
      <g id="XMLID_484_" transform="translate(0 0)">
        <path id="XMLID_485_" d="M65.493,5.207V23.275A4.443,4.443,0,0,1,61.066,27.7H.8l.16-1.914H61.066a2.554,2.554,0,0,0,2.513-2.513V5.127a2.554,2.554,0,0,0-2.513-2.513H3.393L3.552.7H61.066A4.46,4.46,0,0,1,65.493,5.207Z" transform="translate(-0.8 -0.7)" fill="#5d2e8e"/>
      </g>
    </g>
    <g id="XMLID_479_" transform="translate(59.728 12.364)">
      <g id="XMLID_482_-link" transform="translate(0 0)">
        <path id="XMLID_482_" d="M2.1,2.234a.358.358,0,0,0-.4-.4H.9V.2H2.735c.877,0,1.276.239,1.276,1.157V7.778h.877a1.412,1.412,0,0,0,1.037-.4L8.239,4.188h2.154L7.72,7.818a5.018,5.018,0,0,1-.758.758v.04s.359.12.638.758l1.436,2.672c.16.279.359.4.877.4h.558v1.6h-1.4a1.477,1.477,0,0,1-1.635-.917L5.646,9.812a1.088,1.088,0,0,0-1-.4H3.891V14.08H1.977Z" transform="translate(-0.9 -0.2)" fill="#5d2e8e"/>
      </g>
    </g>
    <g id="XMLID_476_" transform="translate(70.058 12.404)">
      <g id="XMLID_477_" transform="translate(0 0)">
        <path id="XMLID_478_" d="M2,2.334a.358.358,0,0,0-.4-.4H.8V.3H2.635c.877,0,1.276.359,1.276,1.2V5.365a7.111,7.111,0,0,1-.04.8h.04a3.864,3.864,0,0,1,3.63-2.194c2.313,0,3.35,1.276,3.35,3.829v4.268a.358.358,0,0,0,.4.4h.8v1.6H10.253c-.877,0-1.276-.359-1.276-1.276V8.237c0-1.4-.279-2.473-1.835-2.473A3.244,3.244,0,0,0,4.031,8.2a4.763,4.763,0,0,0-.16,1.316V14.14H1.957Z" transform="translate(-0.8 -0.3)" fill="#5d2e8e"/>
      </g>
    </g>
    <g id="XMLID_470_" transform="translate(82.622 16.114)">
      <g id="XMLID_473_-link" transform="translate(0 0)">
        <path id="XMLID_473_" d="M4.169,9.415C5.8,9.415,6.841,7.739,6.841,6.3V5.945H6.363c-1.436,0-3.988.04-3.988,1.914C2.294,8.7,2.932,9.415,4.169,9.415ZM6.363,4.588h.4v-.12c0-1.715-.638-2.353-2.194-2.353-.479,0-1.635.12-1.635.758v.558H1.138v-1C1.138.8,3.61.6,4.528.6,7.719.6,8.556,2.275,8.556,4.469V8.7a.389.389,0,0,0,.4.439h.8v1.6H7.958c-.877,0-1.2-.4-1.2-1.157a3.152,3.152,0,0,1,.04-.558h-.04A3.383,3.383,0,0,1,3.65,10.97,3.1,3.1,0,0,1,.3,7.979C.38,4.828,4.727,4.588,6.363,4.588Z" transform="translate(-0.3 -0.6)" fill="#5d2e8e"/>
      </g>
    </g>
    <g id="XMLID_466_" transform="translate(92.872 12.484)">
      <g id="XMLID_469_-link" transform="translate(0 0)">
        <path id="XMLID_469_" d="M.877,2.135H0V.5H1.835c.877,0,1.276.359,1.276,1.276v10.45a.358.358,0,0,0,.4.4h.8v1.6H2.473c-.877,0-1.276-.359-1.276-1.276V2.534A.3.3,0,0,0,.877,2.135Z" transform="translate(0 -0.5)" fill="#5d2e8e"/>
      </g>
    </g>
    <g id="XMLID_463_" transform="translate(98.057 13.601)">
      <g id="XMLID_464_" transform="translate(0 0)">
        <path id="XMLID_465_" d="M1.276,4.568H0V3.052H1.316V.3H3.151V3.052H5.5V4.568H3.191V9.075a1.986,1.986,0,0,0,2.034,2.273H5.7V12.9a4.291,4.291,0,0,1-.638.04c-1.276,0-3.749-.4-3.749-3.709V4.568Z" transform="translate(0 -0.3)" fill="#5d2e8e"/>
      </g>
    </g>
    <g id="XMLID_460_" transform="translate(106.593 12.444)">
      <g id="XMLID_461_" transform="translate(0 0)">
        <path id="XMLID_462_" d="M.639.4h1.2a.257.257,0,0,1,.239.239V2.115a.257.257,0,0,1-.239.239H.639A.257.257,0,0,1,.4,2.115V.639A.212.212,0,0,1,.639.4Z" transform="translate(-0.4 -0.4)" fill="#5d2e8e"/>
      </g>
    </g>
    <g id="XMLID_457_" transform="translate(105.316 16.353)">
      <g id="XMLID_458_" transform="translate(0 0)">
        <path id="XMLID_459_" d="M1.4,2.234a.358.358,0,0,0-.4-.4H.2V.2H2.035c.877,0,1.276.359,1.276,1.276V8.057a.358.358,0,0,0,.4.4h.8v1.6H2.673C1.8,10.052,1.4,9.693,1.4,8.775Z" transform="translate(-0.2 -0.2)" fill="#5d2e8e"/>
      </g>
    </g>
    <g id="XMLID_432_" transform="translate(0 7.85) rotate(-6)">
      <g id="XMLID_453_-link" transform="translate(0.04 0.08)">
        <path id="XMLID_453_" d="M4.906,0,0,.6,1.835,15.156l4.587-.519Z" transform="translate(0 0)" fill="#f9a61c"/>
      </g>
      <g id="XMLID_454_" transform="translate(0 0)">
        <g id="XMLID_455_">
          <rect id="XMLID_456_" width="6.581" height="15.316" fill="#f9a61c"/>
        </g>
      </g>
    </g>
  </g>
</svg>

      </Button>
      <form action="https://epay.esewa.com.np/api/epay/main/v2/form" method="POST">
 <div hidden><input type="text" id="amount" name="amount" defaultValue={totalPrice} required />
 <input type="text" id="tax_amount" name="tax_amount" defaultValue ="10" required />
 <input type="text" id="total_amount" name="total_amount" defaultValue={total_amount} required/>
 <input type="text" id="transaction_uuid" name="transaction_uuid" required defaultValue={transaction_uuid}/>
 <input type="text" id="product_code" name="product_code" defaultValue ={product_code} required/>
 <input type="text" id="product_service_charge" name="product_service_charge" defaultValue="0" required/>
 <input type="text" id="product_delivery_charge" name="product_delivery_charge" defaultValue="0" required/>
 <input type="text" id="success_url" name="success_url" defaultValue="https://kurtaglow-y7cc.vercel.app/cart/" required/>
 <input type="text" id="failure_url" name="failure_url" defaultValue="https://kurtaglow-y7cc.vercel.app/payment/" required/>
 <input type="text" id="signed_field_names" name="signed_field_names" defaultValue="total_amount,transaction_uuid,product_code" required/>
 <input type="text" id="signature" name="signature"  required defaultValue={signature}/>
 </div>
 <Button className="w-full mt-6 bg-green-200 flex items-center justify-center h-12" type="submit">
 <Image src='https://rc-epay.esewa.com.np/assets/img/logo.svg' width={120} height={31} alt="esewa logo"/>
      </Button>
 </form>
    </div>
  );
}
 
export default Summary;
