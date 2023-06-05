import {
    Box,
    Button,
} from '@chakra-ui/react'
import { ViewIcon, CheckCircleIcon } from "@chakra-ui/icons";
import Link from 'next/link';

const MyShopOrdersListActions = ({ order }) => {
    return (
        <Box>
            {order.status == "marked_as_delivered" ?
                <Link href={"#" + order._id} passHref>
                    <Button leftIcon={<CheckCircleIcon />} colorScheme='green' variant='solid' mr={4}>
                        Confirmar como retirado
                    </Button>
                </Link>
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