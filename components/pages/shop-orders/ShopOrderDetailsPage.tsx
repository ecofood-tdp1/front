import {
  IonPage,
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonToggle,
  IonLabel,
  IonSearchbar,
} from '@ionic/react';
import ShopOrderView from '../../shopOrder/ShopOrderView';

import { useParams } from 'react-router-dom';

type ShopDetailsParams = {
  orderId: string;
};


const ShopOrderDetailsPage = () => {
  const params = useParams<ShopDetailsParams>();
  const { orderId } = params;


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pedido Realizado</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ShopOrderView orderId={orderId} />
      </IonContent>
    </IonPage>
  );
};

export default ShopOrderDetailsPage;
