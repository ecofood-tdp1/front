import {
    IonPage,
    IonContent,
    IonItem,
    IonButtons,
    IonBackButton,
    IonLabel,
    IonList,
    IonSearchbar,
    IonToggle,
    IonHeader,
    IonTitle,
    IonToolbar,
} from '@ionic/react';

import CartView from '../../shopCart/CartView';
import { useParams } from 'react-router-dom';

type CartPageParams = {
    shopId: string;
};


const CartPage = () => {
    const params = useParams<CartPageParams>();
    const { shopId } = params;
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'/shops/' + shopId}></IonBackButton>
                    </IonButtons>
                    <IonTitle>Cart</IonTitle>
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
                <CartView />
            </IonContent>
        </IonPage>
    );
};

export default CartPage;
