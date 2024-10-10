import Image from "next/image";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/Button";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const item = cart.items.find((item) => item.id == data.id);
  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex flex-col sm:flex-row py-6 border-b dark:text-white">
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
          <IconButton
            className="dark:bg-black"
            onClick={onRemove}
            icon={<X size={15} />}
          />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black dark:text-white">
              {data.name}
            </p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size.name}
            </p>
          </div>
          <Currency value={data.price} />
        </div>
        <div className="flex gap-14 flex-wrap w-full">
          <div className=" flex flex-col">
            <div>
              <span className="text-sm text-gray-500">Choose Size</span>
              <div className="flex items-start flex-wrap">
               {data.sizes.map((e, i) => {
                  return (
                    <Button
                      key={i}
                      className="dark:bg-black mr-2 bg-white text-black border  dark:text-white text-sm p-1"
                      onClick={() => {
                        cart.changeSize(data.id, e.name, e.value);
                      }}
                    >
                      {e.value}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="mt-4">
              <div className=" mt-2 sm:mt-0">
                <div className="w-10 h-10 flex ">
                  <div className="text-sm text-gray-500 mx-2">Quantity</div>
                  <IconButton
                    className="dark:bg-black mr-2 w-6 h-6 p-0"
                    onClick={() => {
                      cart.increaseItem(data.id, "DECREASE");
                    }}
                    icon={<MinusIcon />}
                  />
                  <span>{item ? item.quantity : 1}</span>
                  <IconButton
                    onClick={() => {
                      cart.increaseItem(data.id, "INCREASE");
                    }}
                    className="dark:bg-black ml-2 mr-2 w-6 h-6 p-0"
                    icon={<PlusIcon />}
                  />
                </div>
                <p className="text-sm text-orange-500  sm:mt-0 sm:ml-4">
                  {item?.quantity}/{data.stock} in stock
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-yellow-400">
              <span className="text-sm text-gray-500">Total Price :</span> <Currency value={data.price*data.quantity-(data.price*data.discount/100)*data.quantity} 
              />
              <span className="line-through text-yellow-900"> <Currency value={data.price*data.quantity} /></span>
              </div>
            <span className="text-sm text-pink-500 animate-pulse"> wow! save upto <Currency value={data.price*(data.discount/100)*data.quantity} /></span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
