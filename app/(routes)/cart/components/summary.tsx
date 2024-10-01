"use client";


import Button from "@/components/Button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import useShipingModel from "@/hooks/use-shiping-model"

const Summary = () => {
  const shipingModel= useShipingModel();

  const items = useCart((state) => state.items);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price*item.quantity)
  }, 0);
  const onCheckout =() => {
    shipingModel.onOpen()
  }

  return ( 
    <div
      className="mt-16 rounded-lg bg-gray-50 dark:bg-black px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-white">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      {
        !(items.length===0)? <Button onClick={onCheckout}  className="w-full mt-6 dark:border ">
        Checkout
      </Button>: <Button onClick={()=> window.location.href='/' }  className="w-full mt-6">
         Add Product
      </Button>
      }
   
    </div>
  );
}
 
export default Summary;
