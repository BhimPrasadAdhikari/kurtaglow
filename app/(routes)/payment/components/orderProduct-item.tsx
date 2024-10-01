import getProduct from "@/actions/get-product";
import CarouselPluginOrder from "@/components/carousalPulginOrder";
import Currency from "@/components/ui/currency";

interface OrderProductItemProps {
    data: string;
    quantity: number;
}

const OrderProductItem: React.FC<OrderProductItemProps> = async ({ data, quantity }) => {
    const product = await getProduct(data);
    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg shadow-sm">
            <CarouselPluginOrder data={product.images} />
            <div className="flex-1">
                <div className="mb-2">
                    <p className="text-neutral-400">Name</p>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-wrap text-sm text-gray-600">{product.detail}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-6">
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
                        <Currency value={product.price} />
                    </div>
                    <div>
                        <p className="text-neutral-400">Quantity</p>
                        <p>{quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderProductItem;
