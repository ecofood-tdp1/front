import {
    Button,
} from '@chakra-ui/react'
import { ViewIcon } from "@chakra-ui/icons";
import { Link } from 'react-router-dom';

const MyShopOrdersViewDetails = ({ order }) => {
    return (
        <Link to={"/shoporders/" + order._id}>
            <Button size={"sm"} leftIcon={<ViewIcon />} colorScheme='blue' variant='solid'>
                Ver detalle
            </Button>
        </Link>
    );
}

export default MyShopOrdersViewDetails;