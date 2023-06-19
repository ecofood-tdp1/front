import {
    Box,
    Button,
} from '@chakra-ui/react'
import { ViewIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { UpdateOrderStatus } from '../../repository/OrderRepository';
import NextLink from 'next/link'

const MyShopOrdersListActions = ({ order }) => {

    const handleMarkAsDelivered = async () => {
        await UpdateOrderStatus(order._id, "marked_as_delivered")
        window.location.reload(); // TODO: esto hace que en mobile se cambie de usuario solo, a Messi
    }

    return (
        <Box>
            {order.status == "paid" ?
                <Button onClick={handleMarkAsDelivered} leftIcon={<CheckCircleIcon />} colorScheme='green' variant='solid' mr={4}>
                    Marcar como entregado
                </Button>
                : ""}
            <NextLink href={"/shoporders/" + order._id}>
                <Button leftIcon={<ViewIcon />} colorScheme='blue' variant='solid'>
                    Ver detalle
                </Button>
            </NextLink>
        </Box>
    );
}

export default MyShopOrdersListActions;