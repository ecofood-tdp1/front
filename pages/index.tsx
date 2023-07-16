import BuyerHome from '../components/home/BuyerHome'
import React from 'react'
import { useContext } from "react";
import { UserDataContext } from "../context/Context";
import ShopHome from '../components/home/ShopHome';

export default function Home({ }) {
  const { user } = useContext(UserDataContext);
  return (
    <>
      {console.log(user)}
      {user.type == "buyer" ? <BuyerHome /> : <ShopHome />}
    </>);
}
