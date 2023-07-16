import {
    AspectRatio,
    Box,
    HStack,
    Image,
    Skeleton,
    Stack,
    StackProps,
    Text,
    useColorModeValue,
    Badge,
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react'
import { Rating } from '../Rating'
import { PriceTag } from '../shop/PriceTag'
import { getReviewCountFor, getReviewStarsFor } from '../../lib/helpers';
import { MdCheckCircle } from 'react-icons/md';
import { useState } from 'react'
import { Pack, Product } from '../../model/Pack';

interface Props {
    pack: Pack
    rootProps?: StackProps
}

export const OrderedPackCard = (props: Props) => {
    const { pack, rootProps } = props
    const [isLoading, setLoading] = useState(false)

    return (

        <Stack spacing={{ base: '2', md: '3' }} >
            <Box position="relative" maxW="400px">
                <AspectRatio ratio={4 / 3}>
                    <Image
                        src={pack.imageURL}
                        alt={"image"}
                        draggable="false"
                        fallback={<Skeleton />}
                        borderRadius={{ base: 'md', md: 'xl' }}
                    />
                </AspectRatio>
            </Box>
            <Stack>
                <Stack spacing="1">
                    <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
                        {pack.name}
                    </Text>
                    <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
                        {pack.type == "specific" ? (
                            <Badge colorScheme='green'>Específico</Badge>
                        ) : (
                            <Badge colorScheme='purple'>Sorpresa</Badge>
                        )}
                    </Text>
                    <PriceTag price={pack.original_price.amount} salePrice={pack.price.amount} currency="ARS" />
                </Stack>
                <HStack>
                    <Rating defaultValue={getReviewStarsFor(pack._id)} size="sm" />
                    <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                        {getReviewCountFor(pack._id)} Reviews
                    </Text>
                </HStack>
                <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
                    {pack.type == "specific" ? "Contiene:" : "Puede contener:"}
                </Text>
                <List spacing={1}>
                    {pack.products.map((prod: Product) => (
                        <ListItem key={prod.name + prod.best_before}>
                            <ListIcon as={MdCheckCircle} color='green.500' fontSize="sm" />
                            {prod.name + " "}
                            {pack.type == "specific" ? `(x${prod.quantity})` : ""}
                        </ListItem>
                    ))}
                </List>
                <Text fontWeight="medium" color={useColorModeValue('gray.400', 'gray.400')}>
                    Para consumir antes del {pack.best_before}
                </Text>
            </Stack>
        </Stack>
    )
}