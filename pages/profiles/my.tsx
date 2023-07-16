import React, { useEffect, useState, useContext } from 'react';
import { UserDataContext } from "../../context/Context";
import { GetUser } from '../../repository/UserRepository';
import UserProfile from '../../components/profile/UserProfile';
import ShopProfile from '../../components/profile/ShopProfile';
import { GetShop } from '../../repository/ShopRepository';
import { Skeleton } from '@chakra-ui/react';

export default function ProfilesPage() {
  const { user } = useContext(UserDataContext);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user.type === 'buyer') {
        try {
          const buyer = await GetUser(user._id);
          setProfileData(buyer);
        } catch (error) {
          console.error('Error fetching buyer data:', error);
        }
      } else {
        try {
          const shop = await GetShop(user._id);
          setProfileData(shop);
        } catch (error) {
          console.error('Error fetching shop data:', error);
        }
      }

      setLoading(false);
    };

    fetchProfileData();
  }, [user]);

  if (isLoading) {
    return <Skeleton/>; 
  }

  if (user.type === 'buyer') {
    return <UserProfile buyer={profileData} />;
  } else {
    return <ShopProfile shop={profileData} />;
  }
}

