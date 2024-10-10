import { Order } from "@/types";
import OrderProduct from "./order-product";
import Currency from "@/components/ui/currency";

interface OrderItemProps {
  data: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ data }) => {
  return ( 
    <li className="flex w-full flex-col gap-14  py-6 border-b dark:text-white ">
      <div className="relative h-24 w-28 rounded-md sm:h-48 sm:w-48 flex mx-5 flex-wrap">
        <OrderProduct data={data.orderItems} />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6 border-t-gray-400">
        <div className="relative ">
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
              <p className="text-neutral-400">Payment Status</p>
              <p>{data.isPaid ? 'Paid' : 'Not Paid'}</p>
            </div>
            <div className="flex-1">
              <p className="text-neutral-400">Order Status</p>
              <p>{data.orderStatus==='Delivered' ? 'Delivered' : 'On the way'}</p>
            </div>
            <div className="flex-1">
              <p className="text-neutral-400">Amount</p>
              <p className="text-wrap"><Currency value={data.orderTotal}/></p>
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
