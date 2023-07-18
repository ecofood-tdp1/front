import React from "react";
import { Box, Flex, Image, chakra } from "@chakra-ui/react";
import { OrderWithUser } from '../../model/Order';
import { formatPrice } from "../shop/PriceTag";
import { formatDate } from "../../lib/helpers";
import OrderStatusBadge from "../order/OrderStatusBadge";
import MyShopOrdersViewDetail from "./MyShopOrdersViewDetail";
import MyShopOrdersConfirmedDelivered from "./MyShopOrdersConfirmDelivered";

interface Props {
    order: OrderWithUser
    fetchMyShopOrders: Function
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
                            src={"/messi.jpg"} 
                            // TODO: foto hardcodeada de usuario
                            alt="avatar"
                        />
                        <chakra.div
                            fontSize="2xl"
                            color="gray.700"
                            fontWeight="700"
                        >
                            {props.order.user.display_name}
                        </chakra.div>
                    </Flex>
                    <Flex alignItems="center" justifyContent="center" mt={2}>
                        <chakra.p color="gray.600" >
                            <OrderStatusBadge orderStatus={props.order.order.status} />
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
                    <MyShopOrdersViewDetail order={props.order.order} />
                </Flex>
                <chakra.div mt={4} ml={12}>
                    <MyShopOrdersConfirmedDelivered order={props.order.order} fetchMyShopOrders={props.fetchMyShopOrders}/>
                </chakra.div>
            </Box >
        </div>

    );
};