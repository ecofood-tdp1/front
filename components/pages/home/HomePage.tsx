import { useContext } from "react";
import { UserDataContext } from "../../../context/Context";

import BuyerHomePage from './BuyerHomePage';
import ShopHomePage from './ShopHomePage';

const HomePage = () => {
  const { user } = useContext(UserDataContext);

  return (
    <>
      {user.type == "buyer" ? <BuyerHomePage /> : <ShopHomePage />}
    </>
  );
};

export default HomePage;
