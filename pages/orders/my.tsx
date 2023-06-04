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

const MyOrdersList = () => {
    const userOrdersURL = "http://localhost:2000/orders?user_id=4016cb54-ff0e-46a6-ace5-69304d9720c7" // TODO: user hardcodeado
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOwnersOffers();
    }, []);

    const fetchOwnersOffers = async () => {
        try {
            const response = await axios.get(userOrdersURL);

            console.log(response.data)
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };


    return (
        <TableContainer>
            <Table variant='simple' colorScheme={"blackAlpha"}>
                <TableCaption>Mis pedidos</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Negocio</Th>
                        <Th>Fecha</Th>
                        <Th>Status</Th>
                        <Th isNumeric>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        orders.map((order: Order) => {
                            return (
                                <Tr>
                                    <Td>
                                        <Flex align='center'>

                                            <span>{order.shop_id}</span>
                                        </Flex>
                                    </Td>
                                    <Td>{order.created_at}</Td>
                                    <Td>{order.status}</Td>
                                    <Td isNumeric>
                                        <MyOrdersListActions orderid={order._id} />
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