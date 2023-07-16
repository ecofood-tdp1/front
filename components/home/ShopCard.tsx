import NextLink from 'next/link';
import { AspectRatio, Box, Button, CardBody, CardFooter, Heading, Image } from '@chakra-ui/react';
import { useState } from 'react';
import React from 'react';
import { getReviewCountFor, getReviewStarsFor } from '../../lib/helpers';
import {
  HStack,
  Stack,
  Text,
  useColorModeValue,
  Badge,
  Card,
} from '@chakra-ui/react';
import { Rating } from '../Rating';
import ShopTypeBadge from '../shop/ShopTypeBadge';
import { Shop } from '../../model/Shop';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface ShopCardProps {
  shop: Shop;
}

export const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <NextLink href={"/shops/" + shop._id} className="group">
      <Card
        direction={{ base: 'row', sm: 'row' }} // Change 'column' to 'row'
        overflow='hidden'
        variant='outline'
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mr={1}
          ml={4}
          flexShrink={0} // Prevent the image from shrinking
          borderRadius="md" // Rounded corners
          overflow="hidden"
        >
          <Image
            objectFit='cover'
            borderRadius="md"
            src={shop.imageURL}
            alt='Shop'
            boxSize={32}
          />
        </Box>

        <Stack >
          <CardBody>
            {shop._id == "e6d09849-c62f-4fbc-9c9a-4e4c8230aa4d" && <Badge colorScheme="green">PROMOCIONADO</Badge>} {/* TODO: Negocios promocionados hardcodeados */}
            {shop._id == "c09b73dc-9ca5-4559-8605-f22ee1742a17" && <Badge colorScheme="green">PROMOCIONADO</Badge>}
            <Text fontSize="20px" fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
              {shop.name}
            </Text>
            <Text fontWeight="medium" color={useColorModeValue('gray.500', 'gray.400')}>
              {shop.neighborhood}
            </Text>
            <ShopTypeBadge shopType={shop.type} />
            <Stack >
              <HStack mt={2}>
                <Rating defaultValue={getReviewStarsFor(shop._id)} size="sm" />
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                  {getReviewCountFor(shop._id)} Reviews
                </Text>
              </HStack>
            </Stack>
              <Text mt={2} fontSize="15px" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
                Retirá de {shop.pick_up_from} a {shop.pick_up_to}
              </Text>
          </CardBody >
        </Stack >
      </Card>
    </NextLink >
  );
};
