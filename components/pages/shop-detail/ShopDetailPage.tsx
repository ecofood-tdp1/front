import {
    IonButtons,
    IonBackButton,
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonSearchbar,
    IonToggle,
    IonHeader,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';

import ShopView from '../../shop/ShopView';

type ShopDetailsParams = {
    shopId: string;
};


const ShopDetail = () => {
    const params = useParams<ShopDetailsParams>();
    const { shopId } = params;

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/shops" />
                    </IonButtons>
                    <IonTitle>Shop</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {/* <IonList>
                    <IonItem>
                        <IonLabel>Enable Notifications</IonLabel>
                        <IonToggle
                        />
                    </IonItem>
                </IonList>
                <IonSearchbar placeholder="Busca" /> */}
                <ShopView shopId={shopId} />
            </IonContent>
        </IonPage>
    );
};

export default ShopDetail;
