import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';
import OrdersView from '../../order/OrdersView';


const OrdersPage = () => {

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Mis pedidos</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent class='ion-padding'>
        <OrdersView />
      </IonContent>
    </IonPage>
  );
};

export default OrdersPage;
