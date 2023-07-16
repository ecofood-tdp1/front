import { Box } from '@chakra-ui/react'
import { PackCard } from './PackCard'
import { useState } from 'react'
import { Pack } from '../../model/Pack'
import { PackGrid } from './PackGrid'
import ShopHero from './ShopHero'
import { useContext } from "react";
import { UserDataContext } from "../../context/Context";

export const Shop = ({ shopData, shopId }) => {
  const { user } = useContext(UserDataContext);
  const [packs, setPacks] = useState<Pack[]>(shopData.packs)
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
        {packs.map((pack) => (
          <PackCard key={pack._id} pack={pack} isTheOwner={isTheOwner} setPacks={setPacks}/>
        ))}
      </PackGrid>
    </Box>
    </>
  );
}