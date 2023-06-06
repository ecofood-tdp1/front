import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import {
    FcOvertime,
    FcAssistant,
    FcBullish,
    FcClock,
    FcShop
} from 'react-icons/fc';
import { useState, useEffect } from 'react';
import { GetUser } from '../../repository/UserRepository';
import { getEarliestExpiryDate, getEarnedMoney } from '../../lib/orders';

interface CardProps {
    heading: string;
    description: string;
    icon: ReactElement;
    href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
    return (
        <Box
            maxW={{ base: 'full', md: '225px' }}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}>
            <Stack align={'start'} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={useColorModeValue('gray.100', 'gray.700')}>
                    {icon}
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={5} fontSize={'sm'}>
                        {description}
                    </Text>
                </Box>
            </Stack>
        </Box>
    );
};

interface OrderProps {
    order: Order
}

export default function ShopOrderHero(order: OrderProps) {
    const [orderWithUser, setOrderWithUser] = useState<OrderWithUser>();

    useEffect(() => {
        fetchOrderWithShop();
    }, []);

    const fetchOrderWithShop = async () => {
        const user_from_order = await GetUser(order.order.user_id);
        setOrderWithUser({ order: order.order, user: user_from_order });
    };


    return (
        orderWithUser ?
            <Box p={4}>
                <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                    <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                        Órden hecha por {orderWithUser.user.display_name} el {new Date(orderWithUser.order.created_at).toLocaleDateString()}
                    </Heading>
                </Stack>

                <Container maxW={'5xl'} mt={12}>
                    <Flex flexWrap="wrap" gridGap={6} justify="center">
                        <Card
                            heading={"Ganaste $" + getEarnedMoney(order.order).toString()}
                            icon={<Icon as={FcBullish} w={10} h={10} />}
                            description={
                                'Seguí convirtiendo pérdidas en ganancias y contribuyendo a un mejor mundo!'
                            }
                            href={'#'}
                        />
                        <Card
                            heading={getEarliestExpiryDate(orderWithUser.order).toString()}
                            icon={<Icon as={FcOvertime} w={10} h={10} />}
                            description={
                                'Es la fecha del producto del pack más pronto a vencerse. Si el usuario no retira el pedido a tiempo, la orden se cancelará.'
                            }
                            href={'#'}
                        />
                        {/* <Card
                            heading={'ID: ' + order.order._id}
                            icon={<Icon as={FcAssistant} w={10} h={10} />}
                            description={
                                'Si tenés algún inconveniente con este pedido, comunicanos este código para poder solucionarte el problema'
                            }
                            href={'#'}
                        /> */}
                    </Flex>
                </Container>
            </Box>
            : null
    );
}