import NextLink from 'next/link';
import { Box, CardBody, Image, Skeleton, SkeletonText } from '@chakra-ui/react';
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

const ShopCardSkeleton = () => {
    return (
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
                <Skeleton borderRadius="md" boxSize={32} />
            </Box>

            <Stack >
                <CardBody>
                    <Skeleton width="150px" height="30px"/>
                    <Skeleton />
                    <Skeleton />
                    <SkeletonText mt="4" noOfLines={1} spacing="4" />
                </CardBody >
            </Stack >
        </Card>
    );
};

export default ShopCardSkeleton;
