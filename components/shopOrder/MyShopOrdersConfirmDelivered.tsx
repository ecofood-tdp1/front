import {
    Box,
    Button,
} from '@chakra-ui/react'
import { CheckCircleIcon } from "@chakra-ui/icons";
import { UpdateOrderStatus } from '../../repository/OrderRepository';

const MyShopOrdersConfirmedDelivered = ({ order, fetchMyShopOrders }) => {

    const handleMarkAsDelivered = async () => {
        await UpdateOrderStatus(order._id, "marked_as_delivered")
        fetchMyShopOrders()
        //window.location.reload(); // TODO: esto hace que en mobile se cambie de usuario solo, a Messi
    }

    return (
        <Box>
            {order.status == "paid" ?
                <Button size={"sm"} mb={2} onClick={handleMarkAsDelivered} leftIcon={<CheckCircleIcon />} colorScheme='green' variant='solid' mr={4}>
                    Marcar como entregado
                </Button>
                : ""}
        </Box>
    );
}

export default MyShopOrdersConfirmedDelivered;