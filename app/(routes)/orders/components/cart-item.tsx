import Image from "next/image";
// import { X } from "lucide-react";

// import IconButton from "@/components/ui/icon-button";
// import Currency from "@/components/ui/currency";
// import useCart from "@/hooks/use-cart";
import {Order, Orderitem, Product } from "@/types";
import getProduct from "@/actions/get-product";
import getOrder from "@/actions/get-order";


interface OrderItemProps {
  // data: Product;
  data:Order;
}

const OrderItem: React.FC<OrderItemProps> =async({
  data
}) => {
  // const cart = useCart();

  // const onRemove = () => {
  //   cart.removeItem(data.id);
  // };
  console.log(data)
  return  <li className="flex py-6 border-b">
      <div className="relative h-4 w-4 rounded-md overflow-hidden sm:h-6 sm:w-6">
        {/* <Image
          fill
          src={product?.images[0].url}
          alt="product"
          className="object-cover object-center"
        /> */}
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {data.phone} {data.address}
            </p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">Payment</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{data?.isPaid?"Paid":"Not Paid"}</p>
          </div>
        </div>
      </div>
    </li>

    
}
export default OrderItem;