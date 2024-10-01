import Container from '@/components/ui/container';
import getOrders from '@/actions/get-orders';
import OrderItem from './order-item';
import Summary from './summary';

export const revalidate = 0;

interface OrderListProps {
    email: string;
    paymentStatus: string;
}

const OrderList: React.FC<OrderListProps> = async ({
    email,
    paymentStatus,
}) => {
    // Fetch orders based on the email
    const orders = await getOrders({ email });

    // Filter orders based on payment status
    const filteredOrders = orders.filter((order) => order.paymentStatus === paymentStatus);

    return (
        <>
            <div className="bg-white dark:bg-black p-5">
                <Container>
                    {/* Show message if no orders are present */}
                    {filteredOrders.length === 0 ? (
                        <p className="text-neutral-500">No orders</p>
                    ) : (
                        filteredOrders.map((item) => (
                            <OrderItem key={item.id} data={item} />
                        ))
                    )}
                </Container>
            </div>
            <Summary orders={filteredOrders} />
        </>
    );
};

export default OrderList;
