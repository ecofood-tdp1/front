import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';
import ShopOrdersView from '../../shopOrder/ShopOrdersView';


const ShopOrdersPage = () => {

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Pedidos Realizados</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent class='ion-padding' fullscreen>
        <ShopOrdersView />
      </IonContent>
    </IonPage>
  );
};

export default ShopOrdersPage;
