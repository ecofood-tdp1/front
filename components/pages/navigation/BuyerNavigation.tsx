import { Redirect, Route } from 'react-router-dom';
import { useState } from 'react';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { bag, basket, person, list, reader } from 'ionicons/icons';

import CartPage from '../cart/CartPage';
import HomePage from '../home/HomePage';
import OrderDetailsPage from '../orders/OrderDetailsPage';
import OrdersPage from '../orders/OrdersPage';
import BuyerProfilePage from '../profile/BuyerProfilePage';
import ShopDetailPage from '../shop-detail/ShopDetailPage';

const BuyerNavigation: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('shops');
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/:tab(shops)" component={HomePage} exact={true} />
        <Route path="/:tab(shops)/:shopId" component={ShopDetailPage} exact={true} />
        <Route path="/:tab(shops)/:shopId/cart" component={CartPage} exact={true} />
        {/* <Route path="/:tab(shops)/:shopId/cart/congrats" component={ShopDetailsPage} exact={true} /> */}
        <Route path="/:tab(orders)" component={OrdersPage} exact={true} />
        <Route path="/:tab(orders)/:orderId" component={OrderDetailsPage} exact={true} />
        <Route path="/:tab(profile)" component={BuyerProfilePage} exact={true} />
        <Redirect exact from="/" to="/shops" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="shops" href="/shops" onClick={() => setSelectedTab('shops')}>
          <IonIcon icon={bag} />
          <IonLabel>Locales</IonLabel>
        </IonTabButton>
        <IonTabButton tab="orders" href="/orders" onClick={() => setSelectedTab('orders')}>
          <IonIcon icon={reader} />
          <IonLabel>Mis Pedidos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile" onClick={() => setSelectedTab('profile')}>
          <IonIcon icon={person} />
          <IonLabel>Mi Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default BuyerNavigation;
