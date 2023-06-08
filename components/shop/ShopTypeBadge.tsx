
import {
    Text,
    useColorModeValue,
    Badge,

} from '@chakra-ui/react'

const ShopTypeBadge = ({ shopType }) => {
    let typeToShow = '';
    let color = '';

    switch (shopType) {
        case 'restaurant':
            typeToShow = 'Restaurante';
            color = 'purple'
            break;
        case 'supermarket':
            typeToShow = 'Supermercado';
            color = 'blue'
            break;
        case 'bakery':
            typeToShow = 'Panadería';
            color = 'yellow'
            break;
        case 'delicatessen':
            typeToShow = 'Rotisería';
            color = 'orange'
            break;
        case 'coffee':
            typeToShow = 'Café';
            color = 'brown'
            break;
        case 'grocery':
            typeToShow = 'Verdulería';
            color = 'green'
            break;
        default:
            typeToShow = 'Otros';
            color = 'gray'
            break;
    }

    return (
        <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
            <Badge colorScheme={color}>{typeToShow}</Badge>
        </Text>
    );
}

export default ShopTypeBadge;