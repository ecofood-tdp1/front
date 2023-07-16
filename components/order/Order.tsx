import { Box, Divider } from '@chakra-ui/react'
import { OrderedPackCard } from './OrderedPackCard'
import { PackGrid } from '../shop/PackGrid'
import OrderHero from './OrderHero'

export const Order = ({ orderData }) => {
    return (
        <>
            <OrderHero order={orderData} />
            <Divider mt={2} />
            <Box
                maxW="7xl"
                mx="auto"
                px={{ base: '4', md: '8', lg: '12' }}
                py={{ base: '6', md: '8', lg: '12' }}
                mb={4}
            >

                <PackGrid>
                    {orderData.packs.map((pack) => (
                        <OrderedPackCard key={pack._id} pack={pack} />
                    ))}
                </PackGrid>
            </Box>
        </>
    );
}