

import Container from '@/components/ui/container';
import getOrders from '@/actions/get-orders';
import OrderItem from './order-item';
export const revalidate = 0;
interface OrderListProps{
    email:string;
    paymentStatus:string;
}
const OrderList:React.FC<OrderListProps> = async ({
    email,
    paymentStatus
}) => {
  const orders= await  getOrders({email:email});
  const filteredOrders= orders.filter((order)=>order.paymentStatus===paymentStatus)
  return (
    <div className="bg-white dark:bg-black">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
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