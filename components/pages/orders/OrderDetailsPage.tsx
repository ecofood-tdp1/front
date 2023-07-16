import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import OrderView from '../../order/OrderView';
import { useParams } from 'react-router-dom';


type OrderDetailsParams = {
  orderId: string;
};


const OrderDetailsPage = () => {
  const params = useParams<OrderDetailsParams>();
  const { orderId } = params;


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/orders" />
          </IonButtons>
          <IonTitle>Mi Pedido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <OrderView orderId={orderId} />
      </IonContent>
    </IonPage>
  );
};

export default OrderDetailsPage;
