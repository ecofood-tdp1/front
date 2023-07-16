import { GetPacksFromShoppingCart } from "../../repository/UserRepository";
import { useCallback, useEffect, useState } from 'react';
import {
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonLabel,
    IonItem,
    IonThumbnail,
} from '@ionic/react';


const OrderView = () => {
    const [loaded, setLoaded] = useState(false)
    const [orderData, setOrderData] = useState({});

    const fetchData = useCallback(async () => {
        setLoaded(false)
        await new Promise(r => setTimeout(r, 2000));
        const data = await GetPacksFromShoppingCart();
        setOrderData(data)
        setLoaded(true)
    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <>
            {loaded && (
                <h1>Hola</h1>
            )}
            {!loaded && (
                <IonList>
                    <IonListHeader>
                        <IonSkeletonText animated={true} style={{ width: '80px' }}></IonSkeletonText>
                    </IonListHeader>
                    <IonItem>
                        <IonThumbnail slot="start">
                            <IonSkeletonText animated={true}></IonSkeletonText>
                        </IonThumbnail>
                        <IonLabel>
                            <h3>
                                <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                            </h3>
                            <p>
                                <IonSkeletonText animated={true} style={{ width: '60%' }}></IonSkeletonText>
                            </p>
                            <p>
                                <IonSkeletonText animated={true} style={{ width: '30%' }}></IonSkeletonText>
                            </p>
                        </IonLabel>
                    </IonItem>
                </IonList>
            )}
        </>
    );
}

export default OrderView;