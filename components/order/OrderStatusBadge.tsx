
import {
    Text,
    useColorModeValue,
    Badge,

} from '@chakra-ui/react'

const OrderStatusBadge = ({ orderStatus }) => {
    let statusToShow = '';
    let color = '';

    switch (orderStatus) {
        case 'paid':
            statusToShow = 'Ya pagado';
            color = 'orange'
            break;
        case 'marked_as_delivered':
            statusToShow = 'Marcado como entregado';
            color = 'yellow'
            break;
        case 'delivered':
            statusToShow = 'Confirmado retirado';
            color = 'green'
            break;
    }

    return (
        <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
            <Badge colorScheme={color}>{statusToShow}</Badge>
        </Text>
    );
}

export default OrderStatusBadge;