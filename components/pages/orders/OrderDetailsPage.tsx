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
  
  
  const OrderDetailsPage = () => {
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Mi Pedido</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>Enable Notifications</IonLabel>
              <IonToggle
              />
            </IonItem>
          </IonList>
          <IonSearchbar placeholder="Busca" />
        </IonContent>
      </IonPage>
    );
  };
  
  export default OrderDetailsPage;
  