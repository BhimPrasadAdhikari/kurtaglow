import { Order } from "@/types";
import OrderProduct from "./order-product";

interface OrderItemProps {
  data: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ data }) => {
  return ( 
    <li className="flex flex-col py-6 border-b dark:text-white sm:flex-row">
      <div className="relative h-24 w-28 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <OrderProduct data={data.orderItems} />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-12 gap-3 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <p className="text-neutral-400">Id</p>
            <p>{data.id}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <div className="flex-1">
              <p className="text-neutral-400">Address</p>
              <p className="text-wrap">{data.address}</p>
            </div>
            <div className="flex-1">
              <p className="text-neutral-400">Status</p>
              <p>{data.isPaid ? 'Paid' : 'Not Paid'}</p>
            </div>
            <div className="flex-1">
              <p className="text-neutral-400">Date</p>
              <p>{data.createdAt.toString()}</p>
              </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OrderItem;
