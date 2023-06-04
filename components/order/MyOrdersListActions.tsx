import {
    Box,
    Button,
} from '@chakra-ui/react'
import { ViewIcon, CheckCircleIcon } from "@chakra-ui/icons";
import Link from 'next/link';

const MyOrdersListActions = ({ order }) => {
    return (
        <Box>
            {order.status == "paid" ?
                <Link href={"#" + order._id} passHref>
                    <Button leftIcon={<CheckCircleIcon />} colorScheme='green' variant='solid' mr={4}>
                        Marcar como retirado
                    </Button>
                </Link>
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