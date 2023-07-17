import { Button, Text, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Flex, chakra, Divider, NumberInput, NumberInputField, NumberIncrementStepper, NumberInputStepper, NumberDecrementStepper, FormHelperText } from "@chakra-ui/react"
import React, { useState } from "react"
import { Wallet } from "../model/Wallet"
import { MakeWithdraw } from "../repository/WalletRepository"

interface Props {
    wallet: Wallet
    fetchWallet: Function
}

const WithdrawFunds = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [amount, setAmount] = useState<number>(0);

    const handleSubmit = event => {
        event.preventDefault();

        MakeWithdraw(props.wallet._id, amount).then(() => {
            props.fetchWallet() // Esto lo hago para refreshear toda la data (sobre todo el balance)
            alert(`Se retiró exitosamente el monto de $${amount}`)
            onClose()
        }
        )
    };

    const handleChangeAmount = (value: string) => {
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
            setAmount(parsedValue);
        }
    };

    return (
        <>
            <Button backgroundColor={"green.100"} onClick={onOpen}>
                Retirar fondos
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent ml={8} mr={8} top="15%" left="0%" >

                    <ModalHeader>Retirar fondos</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody pb={6}>
                            <Text mb={4}>
                                Retirá fondos que tengas en tu billetera virtual
                            </Text>
                            <Divider />
                            <Flex
                                alignItems="center"
                                mt={2}
                                color="gray.700"
                                justifyContent={"center"}
                            >
                                <chakra.h1 fontWeight={"bold"} mr={2}>
                                    Método de cobro
                                </chakra.h1>
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
                            <Divider mb={8} mt={4} />
                            <FormControl isRequired={true} >
                                <FormLabel>Monto a retirar</FormLabel>
                                <NumberInput
                                    max={props.wallet ? props.wallet.balance.amount : 1}
                                    min={0}
                                    value={String(amount)} // Set the value of NumberInputField to the state value
                                    onChange={handleChangeAmount} // Handle input change to update the state
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormHelperText>Disponible: {props.wallet ? props.wallet.balance.amount : "?"}</FormHelperText>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='green' mr={3} type="submit">
                                Retirar
                            </Button>
                            <Button onClick={onClose}>Cancelar</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >
        </>
    )
}

export default WithdrawFunds;