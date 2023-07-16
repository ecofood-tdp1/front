import {
    Button,
} from '@chakra-ui/react'
import { ViewIcon } from "@chakra-ui/icons";
import { Link } from 'react-router-dom';


const MyOrdersViewDetail = ({ order }) => {

    return (
        // removed passHref
        <Link to={"/orders/" + order._id}>
            <Button size={"sm"} leftIcon={<ViewIcon />} colorScheme='blue' variant='solid'>
                Ver detalle
            </Button>
        </Link>
    );
}

export default MyOrdersViewDetail;