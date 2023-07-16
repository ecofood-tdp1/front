import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';
import UserProfileView from '../../profile/UserProfileView';
import { useContext } from 'react';
import { UserDataContext } from '../../../context/Context';


const BuyerProfilePage = () => {
  const { user } = useContext(UserDataContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <UserProfileView id={user._id} />
      </IonContent>
    </IonPage>
  );
};

export default BuyerProfilePage;
