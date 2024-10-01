import Image from "next/image";
// import { toast } from "react-hot-toast";
import { MinusIcon, PlusIcon, X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
interface CartItemProps {
  data: Product;
}
const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  const cart = useCart();
  const item = cart.items.find((item)=>item.id==data.id)
  const onRemove = () => {
    cart.removeItem(data.id);
  };
  return ( 
    <li className="flex py-6 border-b dark:text-white">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton className="dark:bg-black" onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black dark:text-white">
              {data.name}
            </p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{data.size.name}</p>
          </div>
          <Currency value={data.price} />
          
        </div>
        Quantity 
        <div className="flex">
        <IconButton className="dark:bg-black mr-4" onClick={()=>{cart.increaseItem(data.id,'DECREASE')}} icon={<MinusIcon/>}/>
           
            <Card className="w-10 h-10 flex content-center justify-center">
              <CardContent>
              {item ? item.quantity : 1}

              </CardContent>

            </Card>
            <IconButton onClick={()=>{cart.increaseItem(data.id,'INCREASE')}} className="dark:bg-black ml-4" icon={<PlusIcon/>}/>
            <p className="text-sm text-gray-500 mt-2 ml-4">
          {item?.quantity}/{data.stock} in stock
        </p>
          </div>
      </div>
    </li>
  );
}
 
export default CartItem;