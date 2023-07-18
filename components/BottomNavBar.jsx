import React from "react";
import { Box, Flex, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FaSearch, FaShoppingCart, FaBoxes } from "react-icons/fa";
import { UserDataContext } from "../context/Context";
import { useContext } from "react";
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { MdMenuBook } from "react-icons/md";
import logoEcofood from '../public/ecofood_sin_fondo.png'
import Image from "next/image";
import { FaChartLine } from "react-icons/fa";

const BottomNavbar = () => {
  const { user, switchUser } = useContext(UserDataContext);
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/', current: router.pathname == '/' || router.pathname.includes('/shops'), visible_to: 'buyer', icon: <FaSearch /> },
    { name: 'Carrito', href: '/shopcart', current: ['/shopcart', '/payment'].includes(router.pathname), visible_to: 'buyer', icon: <FaShoppingCart /> },
    { name: 'Mis Pedidos', href: '/orders/my', current: router.pathname.includes('/orders'), visible_to: 'buyer', icon: <FaBoxes /> },
    { name: 'Mi menú', href: '/shops/' + user._id, current: router.pathname == '/shops/[id]', visible_to: 'shop', icon: <MdMenuBook /> },
    { name: 'Mis órdenes', href: '/shoporders/my', current: router.pathname.includes('/shoporders'), visible_to: 'shop', icon: <FaBoxes /> },
    { name: 'Mis ganancias', href: '/profits/my', current: router.pathname == '/profits/my', visible_to: 'shop', icon: <FaChartLine /> },
  ]

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      borderTopWidth="1px"
      borderTopColor="gray.200"
      bg="white"
      p={5}
      zIndex="10"
    >
      <Flex justifyContent="space-around" alignItems="center">
        <Image
          className="block h-10 w-auto"
          src={logoEcofood}
          alt="Ecofood"
        />
        {navigation.map((item) => (
          (user.type == item.visible_to || item.visible_to == "all") &&
          <NextLink href={item.href} key={item.name}>
            <IconButton
              icon={item.icon}
              aria-label={item.name}
              color={item.current ? "gray.900" : "gray.500"}
              variant="ghost"
              fontSize="24px"
              key={item.name}
            />
          </NextLink>
        ))}
        <Menu>
          <MenuButton as={IconButton} aria-label="User Profile" icon={
            <img
              className="h-14 w-14 rounded-full"
              src={user.type === 'buyer' ? "/messi.jpg" : "/la-continental.png"} // TODO: hardcoded images
              alt="User profile image"
            />
          } color="green.600" variant="ghost" fontSize="24px" />
          <MenuList
            mb={4}
            placement="top-start" // Set the menu to open upwards
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            shadow="lg"
          >
            <NextLink
              key="profiles10"
              href="/profiles/my"
            >
              <MenuItem fontSize={18} key="menuitem2">
                Mi perfil
              </MenuItem>
            </NextLink>
            <NextLink
              href={user.type == 'buyer' ? '/shops/e6d09849-c62f-4fbc-9c9a-4e4c8230aa4d' : '/'} // TODO: shop hardcoded
              onClick={switchUser}
            >
              <MenuItem fontSize={18} key="menuitem1">
                [dev] Cambiar a modo {user.type == 'buyer' ? 'Negocio' : 'Comprador'}
              </MenuItem>
            </NextLink>
          </MenuList>
        </Menu >
      </Flex>
    </Box >
  );
};

export default BottomNavbar;