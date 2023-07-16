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
  
  
  const OrdersPage = () => {
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Mis pedidos</IonTitle>
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
  
  export default OrdersPage;
  