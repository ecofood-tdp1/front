import { Box, Image, VStack } from '@chakra-ui/react';
import React from 'react';
import {
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

interface ShopCardProps {
    type: string
    selected: boolean
    onClick: (event: any) => void
}

function getText(type: string) {
    switch (type) {
        case "restaurant":
            return "Restaurant"
        case "supermarket":
            return "Mercado"
        case "coffee":
            return "Café"
        case "grocery":
            return "Verdulería"
        case "delicatessen":
            return "Rotisería"
        case "bakery":
            return "Panadería"
        case "others":
            return "Otros"
    }
}

function getImage(type: string) {
    switch (type) {
        case "restaurant":
            return "https://cdn-icons-png.flaticon.com/512/6978/6978255.png"
        case "supermarket":
            return "https://cdn-icons-png.flaticon.com/512/384/384999.png"
        case "coffee":
            return "https://cdn-icons-png.flaticon.com/512/924/924514.png"
        case "grocery":
            return "https://cdn-icons-png.flaticon.com/512/5016/5016804.png"
        case "delicatessen":
            return "https://cdn-icons-png.flaticon.com/512/3361/3361357.png"
        case "bakery":
            return "https://cdn2.iconfinder.com/data/icons/food-drink-60/50/1F950-croissant-512.png"
        case "others":
            // return "https://cdn-icons-png.flaticon.com/512/152/152529.png"
            return "https://cdn-icons-png.flaticon.com/512/8344/8344718.png"
    }
}

export const CategoryCard: React.FC<ShopCardProps> = ({ type, selected, onClick }) => {

    return (
        <VStack>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mr={1}
                ml={1}
                flexShrink={0} // Prevent the image from shrinking
                borderRadius="md" // Rounded corners
                overflow="hidden"
                borderWidth='1px'
                backgroundColor={selected ? useColorModeValue('gray.300', 'gray.900') : 'transparent'} // useColorModeValue('gray.100', 'gray.700')
                shadow={useColorModeValue('base', 'dark-lg')}
                key={type}
                onClick={() => onClick(type)}
            >
                <Image
                    objectFit='cover'
                    borderRadius="md"
                    src={getImage(type)}
                    alt={getText(type)}
                    boxSize={16}
                />
            </Box>
            <Text fontSize="12px" fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
                {getText(type)}
            </Text>
        </VStack>

    );
};
