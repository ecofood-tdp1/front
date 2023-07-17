import { Box, Divider } from '@chakra-ui/react'
import { OrderedPackCard } from '../order/OrderedPackCard'
import { PackGrid } from '../shop/PackGrid'
import ShopOrderHero from './ShopOrderHero'

export const ShopOrder = ({ orderData }) => {
    return (
        <>
            <ShopOrderHero order={orderData} />
            <Divider mt={2} />
            <Box
                maxW="7xl"
                mx="auto"
                px={{ base: '4', md: '8', lg: '12' }}
                py={{ base: '6', md: '8', lg: '12' }}
                mb={24}
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