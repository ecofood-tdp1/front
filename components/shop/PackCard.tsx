import {
    AspectRatio,
    Box,
    Button,
    HStack,
    Image,
    Link,
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
import { PriceTag } from './PriceTag'
import { getReviewCountFor, getReviewStarsFor } from '../../lib/helpers';
import { MdCheckCircle } from 'react-icons/md';
import { useState } from 'react'
import { AddPackToShoppingCart } from '../../repository/UserRepository';

interface Props {
    pack: Pack
    rootProps?: StackProps
}

export const PackCard = (props: Props) => {
    const { pack, rootProps } = props
    const [isLoading, setLoading] = useState(false)

    async function AddToCart(packId: string) {
        setLoading(true)
        await AddPackToShoppingCart(packId)
        setLoading(false)
    }

    return (

        <Stack spacing={{ base: '2', md: '3' }} {...rootProps}>
            <Box position="relative">
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
                        {pack.type == "specific" ?
                            <Badge colorScheme='green'>Escpecífico</Badge>
                            : <Badge colorScheme='purple'>Sorpresa</Badge>
                        }
                    </Text>
                    <PriceTag price={pack.original_price.amount} salePrice={pack.price.amount} currency="ARS" />
                </Stack>
                <HStack>
                    <Rating defaultValue={getReviewStarsFor(pack._id)} size="sm" />
                    <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                        {getReviewCountFor(pack._id)} Reviews
                    </Text>
                </HStack>
            </Stack>
            <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
                {pack.type == "specific" ?
                    "Contiene:"
                    : "Puede contener:"
                }
                <List spacing={1}>
                    {pack.products.map((prod: Product) => (
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' fontSize="sm" />
                            {prod.name + " "}
                            {pack.type == "specific" ?
                                "(x" + prod.quantity + ")"
                                : ""
                            }
                        </ListItem>
                    )
                    )}
                </List>
            </Text>
            <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
                Cantidad disponible: {pack.stock}
            </Text>
            <Text fontWeight="medium" color={useColorModeValue('gray.400', 'gray.400')}>
                Para consumir antes del {pack.best_before}
            </Text>
            <Stack align="center">
                <Button onClick={() => AddToCart(pack._id)} 
                    isLoading={isLoading}
                    colorScheme="blue" 
                    width="full">
                    Agregar al carrito
                </Button>
            </Stack>
        </Stack >
    )
}