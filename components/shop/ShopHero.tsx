import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Icon,
    Box
} from '@chakra-ui/react';
import { MdOutlineLocationOn, MdPhone, MdOutlineAccessTime } from 'react-icons/md';

interface ShopProp {
    shop: Shop
}

const ShopHero: React.FC<ShopProp> = ({ shop }) => {
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
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        {shop.description}
                    </Text>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.700'}>
                        <Icon mr={3} as={MdOutlineLocationOn} color='green.500' boxSize={8} />
                        {shop.address}
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
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://media-cdn.tripadvisor.com/media/photo-s/12/0d/5f/80/entrada-de-la-continental.jpg'
                    }
                />
            </Flex>
        </Stack>
    );
}

export default ShopHero;