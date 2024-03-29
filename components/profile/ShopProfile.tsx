import React from 'react';
import {
  Image,
  Heading,
  Text,
  Flex,
  Icon,
  chakra,
  Box,
  HStack,
  useColorModeValue,
  Divider,
  Button
} from '@chakra-ui/react';
import { MdEmail, MdLocationOn, MdTimelapse } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';
import { AiFillShop } from 'react-icons/ai';
import { Shop } from '../../model/Shop';
import ShopTypeBadge from '../shop/ShopTypeBadge';
import { getReviewCountFor, getReviewStarsFor } from '../../lib/helpers';
import { Rating } from '../Rating';

interface Props {
  shop: Shop
}

const ShopProfile = (props: Props) => {
  return (
    <>
      <Flex alignItems="center" justifyContent="center" mt={4}>
        <Heading as="h1" fontSize="3xl" fontWeight="bold" color="green.600">
          Mi perfil
        </Heading>
      </Flex>
      <Flex
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="sm"
          mx="auto"
          bg="white"
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          mt={-8}
        >
          <Image
            w="full"
            h={48}
            fit="cover"
            objectPosition="center"
            src={props.shop.imageURL}
            alt="avatar"
          />

          <Flex alignItems="center" px={6} py={3} bg="gray.900">
            <Icon as={AiFillShop} h={6} w={6} color="white" />

            <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="md">
              Negocio
            </chakra.h1>
          </Flex>

          <Box py={4} px={6}>
            <chakra.h1
              fontSize="xl"
              fontWeight="bold"
              color="gray.800"
            >
              {props.shop.name}
            </chakra.h1>

            <chakra.h1 fontSize="sm">
              <ShopTypeBadge shopType={props.shop.type} />
            </chakra.h1>

            <chakra.h1 fontSize="sm">
              <HStack mt={2}>
                <Rating defaultValue={getReviewStarsFor(props.shop._id)} size="sm" />
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                  {getReviewCountFor(props.shop._id)} Reviews
                </Text>
              </HStack>
            </chakra.h1>

            <chakra.p
              py={2}
              color="gray.700"
            >
              {props.shop.description}
            </chakra.p>

            <Flex
              alignItems="center"
              mt={1}
              color="gray.700"
            >
              <Icon as={FaPhone} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {props.shop.phone}
              </chakra.h1>
            </Flex>

            <Flex
              alignItems="center"
              mt={2}
              color="gray.700"
            >
              <Icon as={MdLocationOn} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {props.shop.address}, {props.shop.neighborhood}, CABA, AR
              </chakra.h1>
            </Flex>
            <Flex
              alignItems="center"
              mt={2}
              color="gray.700"
            >
              <Icon as={MdEmail} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                lacontinental23@hotmail.com
              </chakra.h1>
            </Flex>
            <Flex
              alignItems="center"
              mt={2}
              color="gray.700"
            >
              <Icon as={MdTimelapse} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                Retiro de {props.shop.pick_up_from} a {props.shop.pick_up_to}
              </chakra.h1>
            </Flex>
            <Divider mt={2} />
            <Flex
              alignItems="center"
              mt={2}
              color="gray.700"
              justifyContent={"center"}
            >
              <chakra.h1 fontWeight={"bold"} mr={2}>
                Método de cobro
              </chakra.h1>
              <Button backgroundColor={"green.100"} >
                Editar
              </Button>
            </Flex>
            <Flex
              alignItems="center"
              mt={2}
              color="gray.700"
            >
              <chakra.h1 w={12} mr={2} fontSize={"md"}>
                CBU
              </chakra.h1>
              <chakra.h1 px={2} fontSize="md">
                1676545084781341241249
              </chakra.h1>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ShopProfile;