import { Box } from '@chakra-ui/react'
import { PackCard } from './PackCard'
import { PackGrid } from './PackGrid'
import ShopHero from './ShopHero'
import { useContext } from "react";
import { UserDataContext } from "../../context/Context";

export const Shop = ({ shopData, shopId }) => {
  const { user } = useContext(UserDataContext);
  let isTheOwner = user._id == shopId

  return (
    <>
    <ShopHero shop={shopData.shop} isTheOwner={isTheOwner} />
    <Box
      maxW="7xl"
      mx="auto"
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
    >

      <PackGrid>
        {shopData.packs.map((pack) => (
          <PackCard key={pack._id} pack={pack} isTheOwner={isTheOwner}/>
        ))}
      </PackGrid>
    </Box>
    </>
  );
}