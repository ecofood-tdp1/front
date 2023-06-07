import NextLink from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import React from 'react'
import { getReviewCountFor, getReviewStarsFor } from '../../lib/helpers'
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Link,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
  Badge,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { Rating } from '../Rating'
import ShopTypeBadge from '../shop/ShopTypeBadge'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface ShopCardProps {
  shop: Shop,
}

export const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const [isLoading, setLoading] = useState(true)

  return (
    <NextLink href={"/shops/" + shop._id} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt="Shop image"
          src={shop.imageURL}
          fill
          className={cn(
            'object-cover duration-700 ease-in-out group-hover:opacity-75	',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <Stack>
        <Stack spacing="1">
          <Text mt={3} fontSize={"20px"} fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
            {shop.name}
          </Text>
          <Text fontWeight="medium" color={useColorModeValue('gray.500', 'gray.400')}>
            {shop.neighborhood}
          </Text>
          <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
            <ShopTypeBadge shopType={shop.type} />
          </Text>
        </Stack>
        <HStack>
          <Rating defaultValue={getReviewStarsFor(shop._id)} size="sm" />
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            {getReviewCountFor(shop._id)} Reviews
          </Text>
        </HStack>
      </Stack>
      <Text mt={2} fontSize={"15px"} fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
        Retirá desde las {shop.pick_up_from} hasta las {shop.pick_up_to}
      </Text>
    </NextLink >
  )
}