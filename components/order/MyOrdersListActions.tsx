import {
    Box,
    Button,
} from '@chakra-ui/react'
import { ViewIcon, CheckCircleIcon } from "@chakra-ui/icons";
import Link from 'next/link';
import { UpdateOrderStatus } from '../../repository/OrderRepository';

const MyOrdersListActions = ({ order }) => {

    const handleConfirmePickedUp = async () => {
        await UpdateOrderStatus(order._id, "delivered")
        window.location.reload(); // Refresh the page
    }

    return (
        <Box>
            {order.status == "marked_as_delivered" ?
                <Button onClick={handleConfirmePickedUp} leftIcon={<CheckCircleIcon />} colorScheme='green' variant='solid' mr={4}>
                    Confirmar retirado
                </Button>
                : ""}
            <Link href={"/orders/" + order._id} passHref>
                <Button leftIcon={<ViewIcon />} colorScheme='blue' variant='solid'>
                    Ver detalle
                </Button>
            </Link>
        </Box>
    );
}

export default MyOrdersListActions;