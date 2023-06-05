import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Avatar,
    Flex,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import MyShopOrdersListActions from '../../components/shopOrder/MyShopOrdersListActions';
import { GetOrdersOfShop } from '../../repository/OrderRepository';
import { GetUser } from '../../repository/UserRepository';
import OrderStatusBadge from '../../components/order/OrderStatusBadge';

const MyShopOrdersList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchMyShopOrders();
    }, []);

    const fetchMyShopOrders = async () => {
        try {
            const orders = await GetOrdersOfShop("e6d09849-c62f-4fbc-9c9a-4e4c8230aa4d"); // TODO: shop hardcoded

            const ordersWithUsers = await Promise.all(
                orders.map(async (vanilla_order) => {
                    const user_from_order = await GetUser(vanilla_order.user_id);
                    return { order: vanilla_order, user: user_from_order };
                })
            );

            setOrders(ordersWithUsers);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <TableContainer mt={5} fontSize={"17px"}>
            <Table variant='simple' colorScheme={"blackAlpha"}>
                <TableCaption>Mis órdenes</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Usuario</Th>
                        <Th>Fecha</Th>
                        <Th>Estado</Th>
                        <Th isNumeric>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        orders
                            .sort((a: OrderWithUser, b: OrderWithUser) => new Date(b.order.created_at).getTime() - new Date(a.order.created_at).getTime())
                            .map((order: OrderWithUser) => {
                                return (
                                    <Tr key={order.order._id}>
                                        <Td>
                                            <Flex align='center'>

                                                <span>{order.user.display_name}</span>
                                            </Flex>
                                        </Td>
                                        <Td>{new Date(order.order.created_at).toLocaleDateString()}</Td>
                                        <Td>
                                            <OrderStatusBadge orderStatus={order.order.status} />
                                        </Td>
                                        <Td isNumeric>
                                            <MyShopOrdersListActions order={order.order} />
                                        </Td>
                                    </Tr>

                                );
                            })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default MyShopOrdersList;