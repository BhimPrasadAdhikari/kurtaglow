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
    <div className="flex flex-col gap-5 md:flex-row md:gap-10">
      {/* Carousel for Images */}
      <div className="flex-shrink-0 w-full md:w-1/3">
        <CarouselPluginOrder data={product.images} />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between w-full md:w-2/3">
        <div className="relative pl-0 md:pl-12 gap-3 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <p className="text-neutral-400">Name</p>
            <p>{product.name}</p>
            <p className="text-wrap text-sm">{product.detail}</p>
          </div>
          <div className="flex flex-col gap-4">
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
    </div>
  );
};

export default OrderProductItem;
