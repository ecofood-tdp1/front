import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Skeleton,
} from '@chakra-ui/react'
import { useState, useEffect, useCallback } from 'react';
import { GetOrdersOfShop } from '../../repository/OrderRepository';
import { GetUser } from '../../repository/UserRepository';
import { OrderWithUser } from '../../model/Order';
import ShopOrderCard from './ShopOrderCard';

const ShopOrdersView = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            // const orders = await GetOrdersOfShop("e6d09849-c62f-4fbc-9c9a-4e4c8230aa4d"); // TODO: shop hardcoded
            let [orders, user] = await Promise.all([
                GetOrdersOfShop("e6d09849-c62f-4fbc-9c9a-4e4c8230aa4d"), // TODO: shop hardcoded
                GetUser("4016cb54-ff0e-46a6-ace5-69304d9720c7"), // TODO: user hardcoded
            ]);

            // const ordersWithUsers = await Promise.all(
            //     orders.map(async (vanilla_order) => {
            //         const user_from_order = await GetUser(vanilla_order.user_id);
            //         return { order: vanilla_order, user: user_from_order };
            //     })
            // );

            const ordersWithUsers = orders.map(order => {
                return {
                    'order': order,
                    'user': user,
                }
            });

            setOrders(ordersWithUsers);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <Box mt={4} mx="auto" maxW="800px">
                <Flex alignItems="center" justifyContent="center" mb={4}>
                    <Heading as="h1" fontSize="3xl" fontWeight="bold" color="green.600">
                        Mis órdenes
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
                        {
                            orders
                                .sort((a: OrderWithUser, b: OrderWithUser) => new Date(b.order.created_at).getTime() - new Date(a.order.created_at).getTime())
                                .map((order: OrderWithUser) => {
                                    return (
                                        <ShopOrderCard key={order.order._id} order={order} />
                                    );
                                })
                        }
                    </SimpleGrid>
                )}
            </Box>
        </>
    );
}

export default ShopOrdersView;