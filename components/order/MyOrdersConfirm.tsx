import {
    Box,
    Button,
} from '@chakra-ui/react'
import { CheckCircleIcon } from "@chakra-ui/icons";
import { UpdateOrderStatus } from '../../repository/OrderRepository';

const MyOrdersConfirm = ({ order }) => {

    const handleConfirmePickedUp = async () => {
        await UpdateOrderStatus(order._id, "delivered")
        window.location.reload(); // Refresh the page
    }

    return (
        <Box>
            {order.status == "marked_as_delivered" ?
                <Button size={"sm"} mb={2} onClick={handleConfirmePickedUp} leftIcon={<CheckCircleIcon />} colorScheme='green' variant='solid' mr={4}>
                    Confirmar retirado
                </Button>
                : ""}
        </Box>
    );
}

export default MyOrdersConfirm;