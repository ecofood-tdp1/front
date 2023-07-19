import React, { useState } from "react";
import { Box, Button, Flex, HStack, Icon, Image, chakra } from "@chakra-ui/react";
import { OrderWithShop } from '../../model/Order';
import { formatPrice } from "../shop/PriceTag";
import OrderStatusBadge from "./OrderStatusBadge";
import MyOrdersViewDetail from "./MyOrdersViewDetail";
import MyOrdersConfirm from "./MyOrdersConfirm";
import { formatDate } from "../../lib/helpers";
import { MdDirections } from "react-icons/md";
import { Text } from "@chakra-ui/react";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '70%'
    }
};

interface Props {
    order: OrderWithShop,
    fetchMyOrders: Function
}

export default function OrderCard(props: Props) {
    const [routeModalIsOpen, setRouteModalIsOpen] = useState(false);

    const openRouteModal = () => {
        setRouteModalIsOpen(true);
    }

    const closeRouteModal = () => {
        setRouteModalIsOpen(false);
    }

    return (
        <div style={{ width: "350px" }}>
            <Box
                mx="auto"
                px={8}
                py={4}
                rounded="lg"
                shadow="lg"
                bg="gray.50"
                h="100%"
            >
                <chakra.span
                    fontSize="md"
                    color="gray.700"
                >
                    {formatDate(new Date(props.order.order.created_at))}
                </chakra.span>


                <Box mt={4}>
                    <Flex alignItems="center">
                        <Image
                            mx={4}
                            w={12}
                            h={12}
                            rounded="full"
                            fit="cover"
                            src={props.order.shop.imageURL}
                            alt="avatar"
                        />
                        <chakra.div
                            fontSize="2xl"
                            color="gray.700"
                            fontWeight="700"
                        >
                            {props.order.shop.name}
                        </chakra.div>
                    </Flex>
                    <Flex alignItems="center" justifyContent="center" mt={2}>
                        <chakra.p color="gray.600" _dark={{ color: "gray.300" }}>
                            <OrderStatusBadge orderStatus={props.order.order.status} />
                        </chakra.p>
                    </Flex>

                    <Flex alignItems="center" justifyContent="center" mt={2}>
                        <chakra.p color="gray.600" _dark={{ color: "gray.300" }}>
                            {props.order.order.status === "paid" ? (
                                <>
                                    Retirar de {props.order.shop.pick_up_from} a{" "}
                                    {props.order.shop.pick_up_to} hrs

                                </>
                            ) : (
                                ""
                            )}
                        </chakra.p>
                    </Flex>
                    <Flex alignItems="center" justifyContent="center" mt={2}>
                        <chakra.p color="gray.600" _dark={{ color: "gray.300" }}>
                            {props.order.order.status === "paid" ? (
                                <Flex flexDirection={"column"} alignItems="center" justifyContent="center" mt={2}>
                                    {props.order.shop.address} - {props.order.shop.neighborhood}
                                    <Text mt={2} fontSize={{ base: 'md', lg: 'lg' }} color={'gray.700'}>
                                        <Icon mr={0} as={MdDirections} color='teal.500' boxSize={8} />
                                        <Button onClick={openRouteModal} colorScheme="teal" variant="link">Ver recorrido</Button>
                                    </Text>
                                </Flex>
                            ) : (
                                ""
                            )}
                        </chakra.p>
                    </Flex>


                </Box>


                <Flex justifyContent="space-between" alignItems="center" mt={4}>
                    <Box
                        fontWeight={800}
                        fontSize={20}
                    >
                        {formatPrice(props.order.order.total.amount)}
                    </Box>
                    <MyOrdersViewDetail order={props.order.order} />
                </Flex>
                <chakra.div mt={4} ml={12}>
                    <MyOrdersConfirm order={props.order.order} fetchMyOrders={props.fetchMyOrders} />
                </chakra.div>

            </Box >

            <Modal
                isOpen={routeModalIsOpen}
                onRequestClose={closeRouteModal}
                style={customStyles}
                contentLabel="Route to shop"
            >
                <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyDf4zkmP9y4UaqOtacaLX47ZLMaLA2z-rY&origin=-34.617626802666706, -58.368444762770395&destination=${props.order.shop.phone === '5500-1058'
                        ? '-34.60374519344541, -58.38348000284974'   // Si el número de teléfono es '5500-1058', usa esta ubicación
                        : props.order.shop.phone === '4444-3333'
                            ? '-34.549011695774794, -58.46838599120574' // Si el número de teléfono es '4444-3333', usa esta ubicación
                            : 'default_latitude,default_longitude'     // Si no se cumple ninguna de las condiciones anteriores, usa la ubicación predeterminada
                        }`}>
                </iframe>

                <button onClick={closeRouteModal}>Cerrar</button>
            </Modal>
        </div>

    );
};