import {
    SimpleGrid,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { GetOrdersOfUser } from '../../repository/OrderRepository';
import { GetShop } from '../../repository/ShopRepository';
import { OrderWithShop } from '../../model/Order';
import OrderCard from '../../components/order/OrderCard';

const MyOrdersList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const fetchMyOrders = async () => {
        try {
            const orders = await GetOrdersOfUser("4016cb54-ff0e-46a6-ace5-69304d9720c7"); // TODO: user hardcoded

            const ordersWithShops = await Promise.all(
                orders.map(async (vanilla_order) => {
                    const shop_from_order = await GetShop(vanilla_order.shop_id);
                    return { order: vanilla_order, shop: shop_from_order };
                })
            );

            setOrders(ordersWithShops);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <SimpleGrid mt={4} mb={8} ml={4} mr={4} columns={1} spacingX='40px' spacingY='20px'>
            {
                orders
                    .sort((a: OrderWithShop, b: OrderWithShop) => new Date(b.order.created_at).getTime() - new Date(a.order.created_at).getTime())
                    .map((order: OrderWithShop) => {
                        return (
                            <OrderCard key={order.order._id} order={order} />
                        );
                    })
            }
        </SimpleGrid>
    );
}

export default MyOrdersList;
