import { useEffect, useRef, useState } from 'react'
import BuyerHome from '../components/home/BuyerHome'
import React from 'react'
import { GetShops } from '../repository/ShopRepository';
import { Flex, Select, Text, Textarea } from '@chakra-ui/react';
import { useContext } from "react";
import { UserDataContext } from "../context/Context";
import ShopHome from '../components/home/ShopHome';



export default function Home({ }) {
  const { user } = useContext(UserDataContext);
  return (
    <>
      {user.type == "buyer" ? <BuyerHome /> : <ShopHome />}
    </>);
}
