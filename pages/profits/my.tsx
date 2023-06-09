import {
  Flex,
  Box,
  chakra,
  SimpleGrid,
  Stat,
  useColorModeValue,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { useState, useEffect, ReactNode } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { FiDollarSign } from 'react-icons/fi';
import { GetOrdersOfShop } from '../../repository/OrderRepository';
import { GetWalletOfShop } from '../../repository/ShopRepository';
import { formatPrice } from '../../components/shop/PriceTag';

const MyProfitsList = () => {
  const [numberOrders, setNumberOrders] = useState("");
  const [ordersIncome, setOrdersIncome] = useState("");

  useEffect(() => {
    fetchMyShopOrders();
  }, []);

  const fetchMyShopOrders = async () => {
    try {
      const orders = await GetOrdersOfShop("e6d09849-c62f-4fbc-9c9a-4e4c8230aa4d"); // TODO: shop hardcoded
      const wallet = await GetWalletOfShop("e6d09849-c62f-4fbc-9c9a-4e4c8230aa4d"); // TODO: shop hardcoded

      const ordersIds = await Promise.all(
        orders.map(async (order) => {
          return { order: order._id };
        })
      );

      const ordersIncome = wallet.balance.amount

      console.log(orders)
      console.log(wallet.balance.amount)
      setNumberOrders(ordersIds.length.toString());
      setOrdersIncome(ordersIncome.toString())
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
  }
  function StatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }


  return (
    <>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          Mis ganancias.
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Cantidad de ordenes'}
            stat={numberOrders}
            icon={<FiShoppingBag size={'3em'} />}
          />
          <StatsCard
            title={'Ingreso'}
            stat={formatPrice(parseInt(ordersIncome))}
            icon={<FiDollarSign size={'3em'} />}
          />
        </SimpleGrid>
      </Box></>
  );
}

export default MyProfitsList;