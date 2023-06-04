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
import axios from 'axios';
import MyOrdersListActions from '../../components/MyOrdersListActions';
import { GetOrdersOfUser } from '../../repository/OrderRepository';
import { GetShop } from '../../repository/ShopRepository';
import OrderStatusBadge from '../../components/OrderStatusBadge';

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
        <TableContainer mt={5}>
            <Table variant='simple' colorScheme={"blackAlpha"}>
                <TableCaption>Mis pedidos</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Negocio</Th>
                        <Th>Fecha</Th>
                        <Th>Horario de retiro</Th>
                        <Th>Ubicación</Th>
                        <Th>Estado</Th>
                        <Th isNumeric>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        orders.map((order: OrderWithShop) => {
                            return (
                                <Tr>
                                    <Td>
                                        <Flex align='center'>

                                            <span>{order.shop.name}</span>
                                        </Flex>
                                    </Td>
                                    <Td>{new Date(order.order.created_at).toLocaleDateString()}</Td>
                                    <Td>{order.shop.pick_up_from} a {order.shop.pick_up_to} hrs</Td>
                                    <Td>{order.shop.address} - {order.shop.neighborhood}</Td>
                                    <Td>
                                        <OrderStatusBadge orderStatus={order.order.status} />
                                    </Td>
                                    <Td isNumeric>
                                        <MyOrdersListActions orderid={order.order._id} />
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

export default MyOrdersList;