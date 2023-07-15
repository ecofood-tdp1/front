import {
    Button,
} from '@chakra-ui/react'
import { ViewIcon } from "@chakra-ui/icons";
import Link from 'next/link';

const MyOrdersViewDetail = ({ order }) => {

    return (
        <Link href={"/orders/" + order._id} passHref>
            <Button size={"sm"} leftIcon={<ViewIcon />} colorScheme='blue' variant='solid'>
                Ver detalle
            </Button>
        </Link>
    );
}

export default MyOrdersViewDetail;