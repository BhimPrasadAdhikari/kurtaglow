

import Container from '@/components/ui/container';
import OrderItem from './order-item';
import { Order } from '@/types';
export const revalidate = 0;
interface OrderListProps{
    paymentStatus:string;
    orders:Order[];
    orderStatus?:string;
}
const OrderList:React.FC<OrderListProps> =  ({
    paymentStatus,
    orders,
    orderStatus,
}) => {
  const filteredOrders= orders.filter((order)=>order.paymentStatus===paymentStatus || order.orderStatus===orderStatus)
  return (
    <div className="bg-white dark:bg-black">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="">
            <div className="">
              {orders.length === 0 && <p className="text-neutral-500">No orders</p>}
              <ul>
                 {filteredOrders.map((item) => (
                   <OrderItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </Container>
    </div>
  )
};

export default OrderList;