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
  
  
  const ShopOrderDetailsPage = () => {
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Pedido Realizado</IonTitle>
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
  
  export default ShopOrderDetailsPage;
  