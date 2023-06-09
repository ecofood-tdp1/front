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
import MyOrdersListActions from '../../components/order/MyOrdersListActions';
import { GetOrdersOfUser } from '../../repository/OrderRepository';
import { GetShop } from '../../repository/ShopRepository';
import OrderStatusBadge from '../../components/order/OrderStatusBadge';
import { formatPrice } from '../../components/shop/PriceTag';
import { OrderWithShop } from '../../model/Order';

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
        <TableContainer mt={5} fontSize={"17px"}>
            <Table variant='simple' colorScheme={"blackAlpha"}>
                <TableCaption>Mis pedidos</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Negocio</Th>
                        <Th>Fecha</Th>
                        <Th>Horario de retiro</Th>
                        <Th>Ubicación</Th>
                        <Th>Precio</Th>
                        <Th>Estado</Th>
                        <Th isNumeric>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        orders
                            .sort((a: OrderWithShop, b: OrderWithShop) => new Date(b.order.created_at).getTime() - new Date(a.order.created_at).getTime())
                            .map((order: OrderWithShop) => {
                                return (
                                    <Tr key={order.order._id}>
                                        <Td>
                                            <Flex align='center'>

                                                <span>{order.shop.name}</span>
                                            </Flex>
                                        </Td>
                                        <Td>{new Date(order.order.created_at).toLocaleDateString('es-AR')}</Td>
                                        <Td>{order.shop.pick_up_from} a {order.shop.pick_up_to} hrs</Td>
                                        <Td>{order.shop.address} - {order.shop.neighborhood}</Td>
                                        <Td>
                                            <Flex align='left'>
                                                {formatPrice(order.order.total.amount)}
                                            </Flex>
                                        </Td>
                                        <Td>
                                            <OrderStatusBadge orderStatus={order.order.status} />
                                        </Td>
                                        <Td isNumeric>
                                            <MyOrdersListActions order={order.order} />
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