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
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react'
import { Rating } from './Rating'
import { FavouriteButton } from './FavoutireButton'
import { PriceTag } from './PriceTag'
import seedrandom from 'seedrandom';
import { MdCheckCircle } from 'react-icons/md';


interface Props {
    pack: Pack
    rootProps?: StackProps
}

const getReviewStarsFor = (packName: string) => {
    const seed = packName;
    const rng = new seedrandom(seed);
    const randomNum = rng() * (5 - 3) + 3;
    return Math.round(randomNum)
}

const getReviewCountFor = (packName: string) => {
    const seed = packName;
    const rng = new seedrandom(seed);
    const randomNum = rng() * (20 - 2) + 2;
    return Math.round(randomNum)
}

export const PackCard = (props: Props) => {
    const { pack, rootProps } = props
    return (

        <Stack spacing={{ base: '4', md: '5' }} {...rootProps}>
            <Box position="relative">
                <AspectRatio ratio={4 / 3}>
                    <Image
                        src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Veg_Chow_mein.jpg/640px-Veg_Chow_mein.jpg"}
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
                    <Rating defaultValue={getReviewStarsFor(pack.name)} size="sm" />
                    <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                        {getReviewCountFor(pack.name)} Reviews
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
            <Text fontWeight="medium" color={useColorModeValue('gray.400', 'gray.400')}>
                Para consumir antes del {pack.best_before}
            </Text>
            <Stack align="center">
                <Button colorScheme="blue" width="full">
                    Add to cart
                </Button>
            </Stack>
        </Stack >
    )
}