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
import ShopProfileView from '../../profile/ShopProfileView';
import { useContext } from 'react';
import { UserDataContext } from '../../../context/Context';


const ShopProfilePage = () => {
  const { user } = useContext(UserDataContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ShopProfileView id={user._id} />
      </IonContent>
    </IonPage>
  );
};

export default ShopProfilePage;
