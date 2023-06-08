// src/components/Product.tsx
//import { Flex, Box, Button, useToast, Input, Text,VStack } from "@chakra-ui/react";
import { Flex, Box, Button, useToast, Input, Text, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure } from "@chakra-ui/react";
//import { useEffect, useState } from "react";
import { useEffect, useState, useRef } from "react";
import { IProduct } from "../../pages/auctions/my";
import Image from 'next/image'; // Asegúrate de importar el componente Image

interface ProductProps {
    product: IProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {
    const [currentBid, setCurrentBid] = useState(0);
    const [highestBid, setHighestBid] = useState(product.price);
    const [timeLeft, setTimeLeft] = useState("");
    const toast = useToast();
    const [lastBidder, setLastBidder] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    // Calcula cuánto tiempo queda hasta el final del mes
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const diff = endOfMonth.getTime() - now.getTime();

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleBid = () => {
        if (currentBid > highestBid) {
            onOpen();
        } else {
            // Informa al usuario que su oferta es demasiado baja
            toast({
                title: "Oferta demasiado baja",
                description: `Tu oferta de $${currentBid} debe ser mayor que la oferta más alta actual de $${highestBid}.`,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const confirmBid = () => {
        toast({
            title: "Oferta procesada",
            description: `Tu oferta de $${currentBid} ha sido procesada.`,
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        setHighestBid(currentBid);
        setLastBidder(lastBidder); // Aquí puedes usar el nombre del usuario real
        onClose();
    }

    return (
        <>
        <Flex 
            borderWidth="1px" 
            borderRadius="lg" 
            p="6" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="space-between" 
            height="100%"
            gap="4">
            <Image src={product.imageURL} alt={product.name} width={200} height={200} objectFit="cover" />
            <Text>{product.name}</Text>
            <Text>Oferta Actual: ${highestBid}</Text>
            <Text>Última oferta realizada por: {lastBidder}</Text>
            <Input type="number" value={currentBid} onChange={(e) => setCurrentBid(parseInt(e.target.value))} />
            <Text>Tiempo restante para la subasta: {timeLeft}</Text>
            <Button onClick={handleBid}>Hacer oferta</Button>
        </Flex>

        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            >
            <AlertDialogOverlay>
                <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Confirmar Oferta
                </AlertDialogHeader>

                <AlertDialogBody>
                    ¿Estás seguro de que deseas ofertar ${currentBid}?
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button ref={cancelRef.current} onClick={onClose}>
                    Cancelar
                    </Button>
                    <Button colorScheme="green" onClick={confirmBid} ml={3}>
                    Ofertar
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default Product;
    