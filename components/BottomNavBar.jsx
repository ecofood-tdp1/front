import React from "react";
import { Box, Flex, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FaHome, FaSearch, FaUser, FaShoppingCart, FaBoxes } from "react-icons/fa";
import { UserDataContext } from "../context/Context";
import { useContext } from "react";
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { MdMenuBook } from "react-icons/md";
import { FcBullish } from "react-icons/fc";

const BottomNavbar = () => {
  const { user, switchUser } = useContext(UserDataContext);
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/', current: router.pathname == '/', visible_to: 'all', icon: <FaSearch /> },
    { name: 'Carrito', href: '/shopcart', current: router.pathname == '/shopcart', visible_to: 'buyer', icon: <FaShoppingCart /> },
    { name: 'Mis Pedidos', href: '/orders/my', current: router.pathname == '/orders/my', visible_to: 'buyer', icon: <FaBoxes /> },
    { name: 'Mi menú', href: '/shops/' + user._id, current: router.pathname == '/shops/[id]', visible_to: 'shop', icon: <MdMenuBook /> },
    { name: 'Mis órdenes', href: '/shoporders/my', current: router.pathname == '/shoporders/my', visible_to: 'shop', icon: <FaBoxes /> },
    { name: 'Mis ganancias', href: '/profits/my', current: router.pathname == '/profits/my', visible_to: 'shop', icon: <FcBullish /> },
    {
      name: 'Mi perfil', href: '#', current: router.pathname == '#', visible_to: 'all', icon:
        <Menu>
          <MenuButton as={IconButton} aria-label="User Profile" icon={
            <img
              className="h-14 w-14 rounded-full"
              src={user.type === 'buyer' ? "/messi.jpg" : "/la-continental.png"} // TODO: hardcoded images
              alt=""
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
            <MenuItem fontSize={18} key="menuitem1">
              <NextLink
                href="/"
                onClick={switchUser}
              >
                [dev] Cambiar a modo {user.type == 'buyer' ? 'Negocio' : 'Comprador'}
              </NextLink>
            </MenuItem>
            <MenuItem fontSize={18} key="menuitem2">
              <NextLink
                href="#"
              >
                Mi perfil
              </NextLink>
            </MenuItem>
          </MenuList>
        </Menu >
    },
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
        {navigation.map((item) => (
          (user.type == item.visible_to || item.visible_to == "all") &&
          <NextLink href={item.href} key={item.name}>
            <IconButton
              icon={item.icon}
              aria-label={item.name}
              color="green.600"
              variant="ghost"
              fontSize="24px"
              key={item.name}
            />
          </NextLink>
        ))}
      </Flex>
    </Box>
  );
};

export default BottomNavbar;