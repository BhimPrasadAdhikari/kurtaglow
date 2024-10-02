

import Container from '@/components/ui/container';
import getOrders from '@/actions/get-orders';
import OrderItem from './order-item';
import Summary from './summary';
interface OrderListProps{
    email:string;
    paymentStatus:string;
}
const OrderList:React.FC<OrderListProps> = async ({
    email,
    paymentStatus

}) => {
  const orders= await  getOrders({email:email});
  console.log(orders)
  const filteredOrders= orders.filter((order)=>order.paymentStatus===paymentStatus)
  return (
   <><div className="bg-white dark:bg-black p-5">
      <Container>
              {filteredOrders.length === 0 && <p className="text-neutral-500">No orders</p>}
                 {filteredOrders.map((item) => (
                   <OrderItem key={item.id} data={item} />
                ))}
      </Container>
    </div>
<Summary orders={orders}/>
    </> 
  )
};

export default OrderList;