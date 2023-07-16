import React from 'react';
import {
  Container,
  Image,
  Center,
  Heading,
  Text,
  VStack,
  Skeleton,
  Badge,
  Flex,
  Icon,
  chakra,
  Box
} from '@chakra-ui/react';
import { User } from '../../model/User';
import { MdEmail, MdVerifiedUser, MdLocationOn } from 'react-icons/md';
import { FaPhone, FaUser } from 'react-icons/fa';

interface Props {
  buyer: User
}

const UserProfile = (props: Props) => {
  return (
    // <Container mt={4}>
    //   <UserImage pic={"/messi.jpg"} name={props.buyer.display_name} />
    //   <Center>
    //     <VStack>
    //       <Heading>{props.buyer.display_name}</Heading>
    //       <Text color="gray">
    //         Buenos Aires, AR
    //       </Text>
    //       <Badge colorScheme='green'>Comprador</Badge>
    //       <Text >
    //         Tel: +54 11-412-14231
    //       </Text>
    //     </VStack>
    //   </Center>
    // </Container>
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
        >
          <Image
            w="full"
            h={56}
            fit="cover"
            objectPosition="center"
            src="/messi.jpg"
            alt="avatar"
          />

          <Flex alignItems="center" px={6} py={3} bg="gray.900">
            <Icon as={FaUser} h={6} w={6} color="white" />

            <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="md">
              Comprador
            </chakra.h1>
          </Flex>

          <Box py={4} px={6}>
            <chakra.h1
              fontSize="xl"
              fontWeight="bold"
              color="gray.800"
            >
              {props.buyer.display_name}
            </chakra.h1>

            <chakra.p
              py={2}
              color="gray.700"
            >
              Soy el mejor jugador del mundo. Y también me gusta comer rico, salvando el planeta
            </chakra.p>

            <Flex
              alignItems="center"
              mt={4}
              color="gray.700"
            >
              <Icon as={FaPhone} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                +54 11 412 1244
              </chakra.h1>
            </Flex>

            <Flex
              alignItems="center"
              mt={4}
              color="gray.700"
            >
              <Icon as={MdLocationOn} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                Palermo, Buenos Aires, AR
              </chakra.h1>
            </Flex>
            <Flex
              alignItems="center"
              mt={4}
              color="gray.700"
            >
              <Icon as={MdEmail} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                lmessi10@gmail.com
              </chakra.h1>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default UserProfile;