import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Skeleton,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { GetOrdersOfUser } from '../../repository/OrderRepository';
import { GetShop, GetShops } from '../../repository/ShopRepository';
import { OrderWithShop } from '../../model/Order';
import OrderCard from '../../components/order/OrderCard';

const MyOrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const fetchMyOrders = async () => {
        try {
            let [orders, shops] = await Promise.all([
                GetOrdersOfUser("4016cb54-ff0e-46a6-ace5-69304d9720c7"), // TODO: user hardcoded
                GetShops(),
            ]);

            const ordersWithShops = orders.map(order => {
                return {'order': order, 'shop': shops.find(shop => order.shop_id === shop._id)}
            })

            setOrders(ordersWithShops);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box mb={24} mt={4} mx="auto" maxW="800px">
                <Flex alignItems="center" justifyContent="center" mb={4}>
                    <Heading as="h1" fontSize="3xl" fontWeight="bold" color="green.600">
                        Mis pedidos
                    </Heading>
                </Flex>
                {loading ? ( 
                    // Show Skeleton while loading
                    <SimpleGrid mt={4} mb={8} ml={4} mr={4} columns={1} spacingX='40px' spacingY='20px'>
                        <Skeleton height="150px" />
                        <Skeleton height="150px" />
                        <Skeleton height="150px" />
                        <Skeleton height="150px" />
                    </SimpleGrid>
                ) : (
                    // Show the actual data once loading is complete
                    <SimpleGrid mt={4} mb={8} ml={4} mr={4} columns={1} spacingX='40px' spacingY='20px'>
                        {orders
                            .sort((a: OrderWithShop, b: OrderWithShop) => new Date(b.order.created_at).getTime() - new Date(a.order.created_at).getTime())
                            .map((order: OrderWithShop) => {
                                return <OrderCard key={order.order._id} order={order} fetchMyOrders={fetchMyOrders}/>;
                            })}
                    </SimpleGrid>
                )}
            </Box>
        </>
    );
}

export default MyOrdersList;
