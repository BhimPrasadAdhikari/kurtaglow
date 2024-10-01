import getProduct from "@/actions/get-product";
import CarouselPluginOrder from "@/components/carousalPulginOrder";
import Currency from "@/components/ui/currency";

interface OrderProductItemProps{
    data:string;
    quantity: number;
}

const OrderProductItem:React.FC<OrderProductItemProps>=async({data,quantity})=>{
    console.log(data)
    const product=await getProduct(data)
    return (
        <div className="flex gap-10">
                <CarouselPluginOrder data={product.images} />
                {/* <CartItemInfo product={product}/> */}
        <div className="relative pl-12 gap-3 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div>
              <p className="text-neutral-400">Name</p>
              <p>{product.name}</p>
               <p className="text-wrap text-sm">{product.detail}</p>
            </div>
            <div className="flex gap-4">
            <div>
              <p className="text-neutral-400">Color</p>
              <p>{product.color.name}</p>

            </div>
            <div>
              <p className="text-neutral-400">Size</p>
              <p>{product.size.name}</p>

            </div>
            <div>
              <p className="text-neutral-400">Price</p>
              <Currency value={product.price}/>

            </div>
            <div>
              <p className="text-neutral-400">Quantity</p>
              <p>{quantity}</p>

            </div>
            </div>
        </div>
        </div>
    )
}
export default OrderProductItem