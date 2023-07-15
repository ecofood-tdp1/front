import {
    Button,
} from '@chakra-ui/react'
import { ViewIcon } from "@chakra-ui/icons";
import NextLink from 'next/link'

const MyShopOrdersViewDetails = ({ order }) => {
    return (
        <NextLink href={"/shoporders/" + order._id}>
            <Button size={"sm"} leftIcon={<ViewIcon />} colorScheme='blue' variant='solid'>
                Ver detalle
            </Button>
        </NextLink>
    );
}

export default MyShopOrdersViewDetails;