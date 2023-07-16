import { useContext } from "react";
import { UserDataContext } from "../../../context/Context";

import BuyerNavigation from './BuyerNavigation';
import ShopNavigation from './ShopNavigation';

const Navigation = () => {
  const { user } = useContext(UserDataContext);

  return (
    <>
      {user.type == "buyer" ? <BuyerNavigation /> : <ShopNavigation />}
    </>
  );
};

export default Navigation;
