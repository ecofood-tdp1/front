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
import { GetShop } from '../../repository/ShopRepository';
import { getEarliestExpiryDate, getSavedMoney } from '../../lib/orders';
import { Order, OrderWithShop } from '../../model/Order';

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

export default function OrderHero(order: OrderProps) {
    const [orderWithShop, setOrderWithShop] = useState<OrderWithShop>();

    useEffect(() => {
        fetchOrderWithShop();
    }, []);

    const fetchOrderWithShop = async () => {
        const shop_from_order = await GetShop(order.order.shop_id);
        setOrderWithShop({ order: order.order, shop: shop_from_order });
    };


    return (
        orderWithShop ?
            <Box p={4}>
                <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                    <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                        Mi pedido a {orderWithShop.shop.name} el {new Date(orderWithShop.order.created_at).toLocaleDateString('es-AR')}
                    </Heading>
                </Stack>

                <Container maxW={'5xl'} mt={12}>
                    <Flex flexWrap="wrap" gridGap={6} justify="center">
                        <Card
                            heading={"Ahorraste $" + getSavedMoney(order.order).toString()}
                            icon={<Icon as={FcBullish} w={10} h={10} />}
                            description={
                                'Seguí ahorrando, comiendo rico y salvando al planeta así!'
                            }
                            href={'#'}
                        />
                        <Card
                            heading={orderWithShop.shop.pick_up_from + " a " + orderWithShop.shop.pick_up_to + " hrs."}
                            icon={<Icon as={FcClock} w={10} h={10} />}
                            description={
                                'Es tu horario para retirar el producto en el local'
                            }
                            href={'#'}
                        />
                        <Card
                            heading={orderWithShop.shop.address + ' - ' + orderWithShop.shop.neighborhood}
                            icon={<Icon as={FcShop} w={10} h={10} />}
                            description={
                                'Es la ubicación del local donde debés retirar tu pedido'
                            }
                            href={'#'}
                        />
                        <Card
                            heading={getEarliestExpiryDate(orderWithShop.order).toString()}
                            icon={<Icon as={FcOvertime} w={10} h={10} />}
                            description={
                                'Es la fecha del producto del pack más pronto a vencerse. Asegurate de buscar el pedido antes de que esto ocurra!'
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