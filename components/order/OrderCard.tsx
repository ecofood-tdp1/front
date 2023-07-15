import React from "react";
import { Box, Flex, Image, chakra } from "@chakra-ui/react";
import { OrderWithShop } from '../../model/Order';
import { formatPrice } from "../shop/PriceTag";
import OrderStatusBadge from "./OrderStatusBadge";
import MyOrdersViewDetail from "./MyOrdersViewDetail";
import MyOrdersConfirm from "./MyOrdersConfirm";

interface Props {
    order: OrderWithShop
}

function formatDate(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const lastYear = new Date("31/12");
    lastYear.setFullYear(today.getFullYear());
    console.log(lastYear)

    if (date.toDateString() === today.toDateString()) {
        return "Hoy";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Ayer";
    } else if (date < yesterday && date >= lastYear) {
        return date.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" }).replace(/^\w/, (c) => c.toUpperCase());;
    } else {
        return date.toLocaleDateString("en-AR", { day: "numeric", month: "numeric", year: "2-digit" });
    }
}

export default function OrderCard(props: Props) {
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
                                <>
                                    {props.order.shop.address} - {props.order.shop.neighborhood}
                                </>
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
                    <MyOrdersConfirm order={props.order.order} />
                </chakra.div>
            </Box >
        </div>

    );
};