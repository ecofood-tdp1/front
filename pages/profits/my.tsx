import {
  Flex,
  Box,
  SimpleGrid,
  Stat,
  useColorModeValue,
  StatLabel,
  StatNumber,
  Heading,
  Stack,
} from '@chakra-ui/react'
import { useState, useEffect, ReactNode } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { FiDollarSign } from 'react-icons/fi';
import { GetOrdersOfShop } from '../../repository/OrderRepository';
import { GetWalletOfShop } from '../../repository/ShopRepository';
import { formatPrice } from '../../components/shop/PriceTag';
import WithdrawFunds from '../../components/WithdrawFunds';
import { Wallet } from '../../model/Wallet';
import { ChakraProvider } from "@chakra-ui/react";
import ProfitGraph from "../../components/profit/ProfitGraph";

const MyProfitsList = () => {
  const [numberOrders, setNumberOrders] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [shopIncome, setShopIncome] = useState("");
  const [wallet, setWallet] = useState<Wallet>(null);

  const profitsMonthBefore = 37850

  useEffect(() => {
    fetchWallet();
  }, []);

  useEffect(() => {
    fetchMyShopOrders();
  }, [wallet]);

  const fetchWallet = async () => {
    const wallet = await GetWalletOfShop("e6d09849-c62f-4fbc-9c9a-4e4c8230aa4d"); // TODO: shop hardcoded
    setWallet(wallet)
  }

  const fetchMyShopOrders = async () => {
    try {
      const orders = await GetOrdersOfShop("e6d09849-c62f-4fbc-9c9a-4e4c8230aa4d"); // TODO: shop hardcoded

      const ordersIds = await Promise.all(
        orders.map(async (order) => {
          return { order: order._id };
        })
      );

      const walletBalance = wallet.balance.amount
      const shopTransactions = wallet.transactions.filter(transaction => transaction.operation === "deposit");
      const shopIncome = shopTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

      setNumberOrders(ordersIds.length.toString());
      setWalletBalance(walletBalance.toString());
      setShopIncome(shopIncome.toString());
    } catch (error) {
      console.error('Error fetching:', error);
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

  interface GraphCardProps {
    title: string;
    shopIncome: number;
  }
  function GraphCard(props: GraphCardProps) {
    const { title, shopIncome } = props;
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
            <ChakraProvider>
              <ProfitGraph shopIncome={shopIncome} profitsMonthBefore={profitsMonthBefore}/>
            </ChakraProvider>
          </Box>
        </Flex>
      </Stat>
      );
  }

  return (
    <>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} mb={28}>
        <Flex alignItems="center" justifyContent="center" mb={4}>
          <Stack>
            <Heading as="h1" fontSize="3xl" fontWeight="bold" color="green.600">
              Mis ganancias
            </Heading>
            <WithdrawFunds wallet={wallet} fetchWallet={fetchWallet}/>
          </Stack>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 4, lg: 8 }}>
          <StatsCard
            title={'Saldo'}
            stat={formatPrice(parseInt(walletBalance))}
            icon={<FiDollarSign size={'3em'} />}
          />
          <StatsCard
            title={'Cantidad de ordenes'}
            stat={numberOrders}
            icon={<FiShoppingBag size={'3em'} />}
          />
          <StatsCard
            title={'Ganancias mensuales'}
            stat={formatPrice(parseInt(shopIncome) - profitsMonthBefore)}
            icon={<FiDollarSign size={'3em'} />}
          />
          <GraphCard title={'Ganancias acumuladas'} shopIncome={parseInt(shopIncome)} />
        </SimpleGrid>
      </Box>
    </>
  );
}

export default MyProfitsList;