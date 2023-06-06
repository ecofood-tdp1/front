import {
  Box,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { useState } from 'react'
import Image from 'next/image'

export type CartProductMetaProps = {
  name: string
  description: string
  image: string
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const CartProductMeta = (props: CartProductMetaProps) => {
  const { image, name, description } = props
  const [isLoading, setLoading] = useState(true)
  
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        width={80}
        height={80}
        src={image}
        alt={name}
        draggable="false"
        loading="lazy"
        className={cn(
          'object-cover duration-700 ease-in-out group-hover:opacity-75	',
          isLoading
            ? 'scale-110 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
        )}
        onLoadingComplete={() => setLoading(false)}
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{name}</Text>
        </Stack>
      </Box>
    </Stack>
  )
}
