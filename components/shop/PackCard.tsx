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
import { MdCheckCircle, MdDelete, MdEdit } from 'react-icons/md';
import { useState } from 'react'
import { AddPackToShoppingCart } from '../../repository/UserRepository';
import { useToast } from '@chakra-ui/react'

interface Props {
    pack: Pack
    rootProps?: StackProps,
    isTheOwner?: boolean
}

export const PackCard = (props: Props) => {
    const { pack, rootProps, isTheOwner } = props
    const [isLoading, setLoading] = useState(false)
    const toast = useToast()

    async function AddToCart(packId: string) {
        setLoading(true)
        try {
            await AddPackToShoppingCart(packId)
            toast({
                title: `El pack fue agregado al carrito`,
                status: 'success',
                isClosable: true,
                duration: 3000,
            })
        } catch (error) {
            toast({
                title: `Ocurrió un error al agregar el pack al carrito`,
                status: 'error',
                isClosable: true,
                duration: 3000,
            })
        } finally {
            setLoading(false)
        }

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
                            <Badge colorScheme='green'>Específico</Badge>
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
            <Text mb="10px" fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
                {pack.type == "specific" ?
                    "Contiene:"
                    : "Puede contener:"
                }
            </Text>
            <List spacing={1} fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
                {pack.products.map((prod: Product, index: number) => (
                    <ListItem key={index}>
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
            
            <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
                Cantidad disponible: {pack.stock}
            </Text>
            <Text fontWeight="medium" color={useColorModeValue('gray.400', 'gray.400')}>
                Para consumir antes del {pack.best_before}
            </Text>
            <Stack align="center">
                {isTheOwner ?
                    <Stack direction={{ base: 'column', md: 'row' }}>
                        <Button leftIcon={<MdEdit />} width={24} colorScheme='gray' size='md'>
                            Editar
                        </Button>
                        <Button leftIcon={<MdDelete />} width={24} colorScheme='gray' size='md'>
                            Eliminar
                        </Button>
                    </Stack>

                    :
                    <Button onClick={() => AddToCart(pack._id)}
                        isLoading={isLoading}
                        colorScheme="blue"
                        width="full">
                        Agregar al carrito
                    </Button>
                }
            </Stack>
        </Stack >
    )
}