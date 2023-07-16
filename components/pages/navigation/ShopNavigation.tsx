import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, reader, storefront } from 'ionicons/icons';

import HomePage from '../home/HomePage';
import ShopProfilePage from '../profile/ShopProfilePage';
import ShopOrdersPage from '../shop-orders/ShopOrdersPage';
import ShopOrderDetailsPage from '../shop-orders/ShopOrderDetailsPage';

const ShopNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('shops');
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/:tab(home)" component={HomePage} exact={true} />
        <Route path="/:tab(shoporders)" component={ShopOrdersPage} exact={true} />
        <Route path="/:tab(shoporders)/:orderId" component={ShopOrderDetailsPage} exact={true} />
        <Route path="/:tab(shopprofile)" component={ShopProfilePage} exact={true} />
        <Redirect exact from="/" to="/home" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home" onClick={() => setSelectedTab('home')}>
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="shoporders" href="/shoporders" onClick={() => setSelectedTab('shoporders')}>
          <IonIcon icon={reader} />
          <IonLabel>Mis Pedidos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="shopprofile" href="/shopprofile" onClick={() => setSelectedTab('shopprofile')}>
          <IonIcon icon={storefront} />
          <IonLabel>Mi Local</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default ShopNavigation;
