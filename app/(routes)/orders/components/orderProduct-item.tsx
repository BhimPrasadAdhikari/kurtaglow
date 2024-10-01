import getProduct from "@/actions/get-product";
import CarouselPluginOrder from "@/components/carousalPulginOrder";

interface OrderProductItemProps{
    data:string;
}

const OrderProductItem:React.FC<OrderProductItemProps>=async({data})=>{
    console.log(data)
    const product=await getProduct(data)
    return (
        <div>
                <CarouselPluginOrder data={product.images} />
        </div>
    )
}
export default OrderProductItem