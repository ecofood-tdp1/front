import {
    Box,
    IconButton
} from '@chakra-ui/react'
import { ViewIcon, DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import Link from 'next/link';

const MyOrdersListActions = ({ orderid }) => {
    console.log(orderid)
    return (
        <Box>
            <Link href={"/orders/" + orderid} passHref>
                <IconButton icon={<DeleteIcon />} ml={2} aria-label={''} />
            </Link>
            <Link href={"/orders/" + orderid} passHref>
                <IconButton icon={<EditIcon />} ml={2} aria-label={''} />
            </Link>
            <Link href={"/orders/" + orderid} passHref>
                <IconButton icon={<ViewIcon />} ml={2} aria-label={''} />
            </Link>
        </Box>
    );
}

export default MyOrdersListActions;