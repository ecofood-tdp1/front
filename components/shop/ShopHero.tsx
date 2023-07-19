import React, { useState } from "react";
import Modal from "react-modal";
import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Icon,
    Box,
    Badge,
} from '@chakra-ui/react';
import { MdOutlineLocationOn, MdPhone, MdOutlineAccessTime, MdMap, MdDirections} from 'react-icons/md';
import ShopTypeBadge from './ShopTypeBadge';
import { MdEdit, MdLibraryAdd } from 'react-icons/md';
import { Shop } from '../../model/Shop';
import { useRouter } from 'next/router';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '70%',
      height                : '70%'
    }
  };

interface ShopProp {
    shop: Shop
    isTheOwner: boolean
}

const ShopHero: React.FC<ShopProp> = ({ shop, isTheOwner }) => {
    const router = useRouter();
    const [locationModalIsOpen, setLocationModalIsOpen] = useState(false);
    const [routeModalIsOpen, setRouteModalIsOpen] = useState(false);

    const openLocationModal = () => {
        setLocationModalIsOpen(true);
    }

    const closeLocationModal = () => {
        setLocationModalIsOpen(false);
    }

    const openRouteModal = () => {
        setRouteModalIsOpen(true);
    }

    const closeRouteModal = () => {
        setRouteModalIsOpen(false);
    }

    return (
        <Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({ base: '20%', md: '30%' }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                zIndex: -1,
                            }}>
                            {shop.name}
                        </Text>
                    </Heading>
                    <ShopTypeBadge shopType={shop.type} />
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        {shop.description}
                    </Text>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.700'}>
                        <Icon mr={3} as={MdOutlineLocationOn} color='green.500' boxSize={8} />
                        {shop.address} - {shop.neighborhood}
                    </Text>
                    
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.700'}>
                        <Icon mr={3} as={MdPhone} color='blue.500' boxSize={8} />
                        {shop.phone}
                    </Text>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.700'}>
                        <Icon mr={3} as={MdOutlineAccessTime} color='purple.500' boxSize={8} />
                        Retirá tu comida desde las{' '}
                        <Box as="span" fontWeight="bold">
                            {shop.pick_up_from}
                        </Box>{' '}
                        a las{' '}
                        <Box as="span" fontWeight="bold">
                            {shop.pick_up_to}
                        </Box>
                    </Text>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.700'}>
                        <Icon mr={3} as={MdMap} color='teal.500' boxSize={8} />
                        <Button onClick={openLocationModal} colorScheme="teal" variant="link">Ver ubicacion</Button>
                    </Text>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.700'}>
                        <Icon mr={3} as={MdDirections} color='teal.500' boxSize={8} />
                        <Button onClick={openRouteModal} colorScheme="teal" variant="link">Ver recorrido</Button>
                    </Text>
                    {isTheOwner &&
                        <Stack  direction={{ base: 'column', md: 'row' }}>
                            <Button leftIcon={<MdEdit />} width={36} colorScheme='green' size='md'>
                                Editar Perfil
                            </Button>
                            <Button leftIcon={<MdLibraryAdd />} onClick={() => router.push('/shops/createmenu')} width={36} colorScheme='green' size='md'>
                                Agregar Pack
                            </Button>
                        </Stack>
                    }
                </Stack>
            </Flex >
            { <Flex flex={1}>
                {/* <Image
                    alt={'Shop Image'}
                    objectFit={'cover'}
                    src={shop.imageURL}
                    maxWidth="500px"
                    maxHeight="500px"
                /> */}
            </Flex> }
            <Modal
                isOpen={locationModalIsOpen}
                onRequestClose={closeLocationModal}
                style={customStyles}
                contentLabel="Shop Location"
            >
                <iframe
                    width="100%"
                    height="100%"
                    style={{border:0}}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDf4zkmP9y4UaqOtacaLX47ZLMaLA2z-rY&q=${
                        shop.phone === '5500-1058' ? '-34.60374519344541, -58.38348000284974' 
                        : shop.phone === '4444-3333' ? '-34.549011695774794, -58.46838599120574' 
                        : 'default_latitude,default_longitude'
                    }`}>
                </iframe>

                <button onClick={closeLocationModal}>Cerrar</button>
            </Modal>

            <Modal
                isOpen={routeModalIsOpen}
                onRequestClose={closeRouteModal}
                style={customStyles}
                contentLabel="Route to shop"
            >
                <iframe
    width="100%"
    height="100%"
    style={{border:0}}
    src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyDf4zkmP9y4UaqOtacaLX47ZLMaLA2z-rY&origin=-34.617626802666706, -58.368444762770395&destination=${
        shop.phone === '5500-1058' 
            ? '-34.60374519344541, -58.38348000284974'   // Si el número de teléfono es '5500-1058', usa esta ubicación
            : shop.phone === '4444-3333' 
                ? '-34.549011695774794, -58.46838599120574' // Si el número de teléfono es '4444-3333', usa esta ubicación
                : 'default_latitude,default_longitude'     // Si no se cumple ninguna de las condiciones anteriores, usa la ubicación predeterminada
    }`}>
</iframe>

                <button onClick={closeRouteModal}>Cerrar</button>
            </Modal>

        </Stack >
    );
}

export default ShopHero;