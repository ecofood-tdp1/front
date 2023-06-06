import {
    Box,
    Button,
} from '@chakra-ui/react'
import { ViewIcon, CheckCircleIcon } from "@chakra-ui/icons";
import Link from 'next/link';
import { UpdateOrderStatus } from '../../repository/OrderRepository';

const MyShopOrdersListActions = ({ order }) => {

    const handleMarkAsDelivered = async () => {
        await UpdateOrderStatus(order._id, "marked_as_delivered")
        window.location.reload(); // Refresh the page
    }

    return (
        <Box>
            {order.status == "paid" ?
                <Button onClick={handleMarkAsDelivered} leftIcon={<CheckCircleIcon />} colorScheme='green' variant='solid' mr={4}>
                    Marcar como entregado
                </Button>
                : ""}
            <Link href={"/shoporders/" + order._id} passHref>
                <Button leftIcon={<ViewIcon />} colorScheme='blue' variant='solid'>
                    Ver detalle
                </Button>
            </Link>
        </Box>
    );
}

export default MyShopOrdersListActions;