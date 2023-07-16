import {
    IonPage,
    IonContent,
    IonButtons,
    IonBackButton,
    IonHeader,
    IonTitle,
    IonToolbar,
} from '@ionic/react';

import CartView from '../../shopCart/CartView';
import { useParams } from 'react-router-dom';

type CartCongratsPageParams = {
    shopId: string;
};


const CartCongratsPage = () => {
    const params = useParams<CartCongratsPageParams>();
    const { shopId } = params;
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'/shops'}></IonBackButton>
                    </IonButtons>
                    <IonTitle>Compra</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <CartView />
            </IonContent>
        </IonPage>
    );
};

export default CartCongratsPage;
