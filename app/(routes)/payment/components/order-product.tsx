import { Orderitem } from "@/types";
import OrderProductItem from "./orderProduct-item";

interface OrderProductProps {
    data: Orderitem[];
}

const OrderProduct: React.FC<OrderProductProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map((item) => (
                <div key={item.id} className="p-2 border rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                    <OrderProductItem data={item.productId} quantity={item.quantity} />
                </div>
            ))}
        </div>
    );
};

export default OrderProduct;
