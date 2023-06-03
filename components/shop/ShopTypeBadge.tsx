
import {
    Text,
    useColorModeValue,
    Badge,

} from '@chakra-ui/react'

const ShopTypeBadge = ({ shopType }) => {
    let typeToShow = '';

    switch (shopType) {
        case 'restaurant':
            typeToShow = 'Restaurante';
            break;
        case 'supermarket':
            typeToShow = 'Supermercado';
            break;
        case 'bakery':
            typeToShow = 'Panadería';
            break;
        case 'delicatessen':
            typeToShow = 'Delicatessen';
            break;
        case 'coffee':
            typeToShow = 'Café';
            break;
        case 'grocery':
            typeToShow = 'Verdulería';
            break;
        default:
            typeToShow = 'Otros';
            break;
    }

    return (
        <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
            <Badge colorScheme='green'>{typeToShow}</Badge>
        </Text>
    );
}

export default ShopTypeBadge;