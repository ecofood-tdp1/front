import { Box, Flex, Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import NextLink from 'next/link';

const Navbar = () => {
  return (
    <Box bg="gray.900" color="white">
      <Flex maxW="7xl" mx="auto" px={4} py={2} justify="space-between" align="center">
        <Box>
          <Flex>
            <NextLink href="/" passHref legacyBehavior>
              <Box as="a" mr={4} fontWeight="bold" fontSize="lg">
                Home
              </Box>
            </NextLink>
            <NextLink href="/about" passHref legacyBehavior>
              <Box as="a" mr={4} fontWeight="bold" fontSize="lg">
                About
              </Box>
            </NextLink>
            <NextLink href="/contact" passHref legacyBehavior>
              <Box as="a" fontWeight="bold" fontSize="lg">
                Contact
              </Box>
            </NextLink>
          </Flex>
        </Box>
        <Box>
          <Menu>
            <MenuButton as={Avatar} size="sm" src="/messi.jpg" />
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
