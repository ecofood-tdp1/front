import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Icon,
    Box,
    Badge,
} from '@chakra-ui/react';
import { MdOutlineLocationOn, MdPhone, MdOutlineAccessTime } from 'react-icons/md';
import ShopTypeBadge from './ShopTypeBadge';
import { MdEdit, MdLibraryAdd } from 'react-icons/md';
import { Shop } from '../../model/Shop';

interface ShopProp {
    shop: Shop
    isTheOwner: boolean
}

const ShopHero: React.FC<ShopProp> = ({ shop, isTheOwner }) => {
    return (
        <Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({ base: '20%', md: '30%' }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                zIndex: -1,
                            }}>
                            {shop.name}
                        </Text>
                    </Heading>
                    <ShopTypeBadge shopType={shop.type} />
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        {shop.description}
                    </Text>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.700'}>
                        <Icon mr={3} as={MdOutlineLocationOn} color='green.500' boxSize={8} />
                        {shop.address} - {shop.neighborhood}
                    </Text>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.700'}>
                        <Icon mr={3} as={MdPhone} color='blue.500' boxSize={8} />
                        {shop.phone}
                    </Text>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.700'}>
                        <Icon mr={3} as={MdOutlineAccessTime} color='purple.500' boxSize={8} />
                        Retirá tu comida desde las{' '}
                        <Box as="span" fontWeight="bold">
                            {shop.pick_up_from}
                        </Box>{' '}
                        a las{' '}
                        <Box as="span" fontWeight="bold">
                            {shop.pick_up_to}
                        </Box>
                    </Text>
                    {isTheOwner &&
                        <Stack  direction={{ base: 'column', md: 'row' }}>
                            <Button leftIcon={<MdEdit />} width={36} colorScheme='green' size='md'>
                                Editar Perfil
                            </Button>
                            <Button leftIcon={<MdLibraryAdd />} width={36} colorScheme='green' size='md'>
                                Agregar Pack
                            </Button>
                        </Stack>
                    }
                </Stack>
            </Flex >
            <Flex flex={1}>
                <Image
                    alt={'Shop Image'}
                    objectFit={'cover'}
                    src={shop.imageURL}
                    maxWidth="500px"  // Set the maximum width of the image to 100% of its container
                    maxHeight="500px"
                />
            </Flex>
        </Stack >
    );
}

export default ShopHero;