import getProduct from "@/actions/get-product";
import CarouselPluginOrder from "@/components/carousalPulginOrder";

interface OrderProductItemProps {
  data: string;
}

const OrderProductItem: React.FC<OrderProductItemProps> = async ({ data }) => {
  try {
    const product = await getProduct(data);
    return (
      <div>
        <CarouselPluginOrder data={product.images} />
      </div>
    );
  } catch (error) {
    console.error("ORDER_PRODUCT_ITEM_FETCH", error);
  }
};
export default OrderProductItem;
