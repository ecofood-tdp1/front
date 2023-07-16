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
  
  
  const BuyerProfilePage = () => {
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Mi Perfil</IonTitle>
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
  
  export default BuyerProfilePage;
  