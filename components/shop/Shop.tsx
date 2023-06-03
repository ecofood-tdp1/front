import { Box } from '@chakra-ui/react'
import { PackCard } from './PackCard'
import { products } from './_data'
import { PackGrid } from './PackGrid'

export const Shop = ({ shopData }) => {
  console.log(shopData)
  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
    >
      <PackGrid>
        {shopData.packs.map((pack) => (
          <PackCard key={pack._id} pack={pack} />
        ))}
      </PackGrid>
    </Box>
  );
}