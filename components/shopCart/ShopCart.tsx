import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Button,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { useState } from 'react'
import { CartItem } from './CartItem'
import { CartOrderSummary } from './CartOrderSummary'
import { GetPacksFromShoppingCart, RemovePackFromShoppingCart } from '../../repository/UserRepository'
import { v4 as uuidv4 } from 'uuid';
import { Pack } from '../../model/Pack'
import Modal from 'react-modal';
import { MdDirections } from 'react-icons/md';
interface Props {
  packs: Pack[]
}

export const ShopCart = (props: Props) => {
  const [packs, setPacks] = useState<Pack[]>(props.packs)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openModal = () => {
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  async function onClickDeleteCartItem(pack: Pack) {
    await RemovePackFromShoppingCart(pack._id)
    setPacks(await GetPacksFromShoppingCart())
  }


  return <Box
    maxW={{ base: '3xl', lg: '7xl' }}
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      align={{ lg: 'flex-start' }}
      spacing={{ base: '8', md: '16' }}
    >
      <Stack spacing={{ base: '8', md: '10' }} flex="2">
        <Heading fontSize="2xl" fontWeight="extrabold">
          Mi Carrito ({packs.length} items)
        </Heading>

        <Stack spacing="6">
          {packs.map((pack) => (
            <CartItem key={uuidv4()} pack={pack} onClickDelete={onClickDeleteCartItem} />
          ))}
        </Stack>
      </Stack>

      <Flex direction="column" align="center" flex="1">
      <Button leftIcon={<MdDirections />} onClick={openModal} colorScheme="teal" variant="link">
        Ver recorrido
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Route to shop"
      >
        <iframe
          width="100%"
          height="100%"
          style={{border:0}}
          // loading="lazy"
          src={'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDf4zkmP9y4UaqOtacaLX47ZLMaLA2z-rY&origin=-34.603722,-58.381592&destination=-34.9225,-57.9544'}>

        </iframe>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
      <CartOrderSummary
        subtotal={packs.length == 0 ? 0 : packs.map(p => p.original_price.amount).reduce((x, y) => x + y)}
        total={packs.length == 0 ? 0 : packs.map(p => p.price.amount).reduce((x, y) => x + y)}
      />
      <HStack mt="6" fontWeight="semibold">
        <p>o</p>
        <Link color={mode('blue.500', 'blue.200')} href={"/"}>Seguir buscando</Link>
      </HStack>
    </Flex>
    </Stack>
  </Box>
}



// import {
//   Box,
//   Flex,
//   Heading,
//   HStack,
//   Link,
//   Stack,
//   useColorModeValue as mode,
// } from '@chakra-ui/react'
// import { useState } from 'react'
// import { CartItem } from './CartItem'
// import { CartOrderSummary } from './CartOrderSummary'
// import { GetPacksFromShoppingCart, RemovePackFromShoppingCart } from '../../repository/UserRepository'
// import { v4 as uuidv4 } from 'uuid';
// import { Pack } from '../../model/Pack'

// interface Props {
//   packs: Pack[]
// }

// export const ShopCart = (props: Props) => {
//   const [packs, setPacks] = useState<Pack[]>(props.packs)

//   async function onClickDeleteCartItem(pack: Pack) {
//     await RemovePackFromShoppingCart(pack._id)
//     setPacks(await GetPacksFromShoppingCart())
//   }


//   return <Box
//     maxW={{ base: '3xl', lg: '7xl' }}
//     mx="auto"
//     px={{ base: '4', md: '8', lg: '12' }}
//     py={{ base: '6', md: '8', lg: '12' }}
//   >
//     <Stack
//       direction={{ base: 'column', lg: 'row' }}
//       align={{ lg: 'flex-start' }}
//       spacing={{ base: '8', md: '16' }}
//     >
//       <Stack spacing={{ base: '8', md: '10' }} flex="2">
//         <Heading fontSize="2xl" fontWeight="extrabold">
//           Mi Carrito ({packs.length} items)
//         </Heading>

//         <Stack spacing="6">
//           {packs.map((pack) => (
//             <CartItem key={uuidv4()} pack={pack} onClickDelete={onClickDeleteCartItem} />
//           ))}
//         </Stack>
//       </Stack>

//       <Flex direction="column" align="center" flex="1">
//         <CartOrderSummary
//           subtotal={packs.length == 0 ? 0 : packs.map(p => p.original_price.amount).reduce((x, y) => x + y)}
//           total={packs.length == 0 ? 0 : packs.map(p => p.price.amount).reduce((x, y) => x + y)} />
//         <HStack mt="6" fontWeight="semibold">
//           <p>o</p>
//           <Link color={mode('blue.500', 'blue.200')} href={"/"} >Seguir buscando</Link>
//         </HStack>
//       </Flex>
//     </Stack>
//   </Box>
// }
