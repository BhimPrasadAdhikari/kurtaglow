import { Order } from "@/types";
import OrderProduct from "./order-product";

interface OrderItemProps {
  data: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ data }) => {
  return (
    <li className="flex flex-col sm:flex-row py-6 border-b dark:text-white relative">
      <div className="flex-1">
        <OrderProduct data={data.orderItems} />
      </div>
      {/* Optional: You can include additional information here, like order date, status, etc. */}
      <div className="mt-4 sm:mt-0 sm:ml-4">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Order ID: {data.id}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Date: {new Date(data.createdAt).toLocaleDateString()}</p>
        {/* Add other order details if necessary */}
      </div>
    </li>
  );
}

export default OrderItem;
