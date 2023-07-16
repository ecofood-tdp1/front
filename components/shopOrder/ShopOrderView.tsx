import { ShopOrder } from './ShopOrder';
import { GetOrder } from '../../repository/OrderRepository';
import { useCallback, useEffect, useState } from 'react';
import {
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonLabel,
    IonItem,
    IonThumbnail,
} from '@ionic/react';


const ShopOrderView = ({ orderId }) => {
    const [loaded, setLoaded] = useState(false)
    const [orderData, setOrderData] = useState({});

    const fetchData = useCallback(async () => {
        setLoaded(false)
        console.log("ShopOrderView fetching data", orderId);
        await new Promise(r => setTimeout(r, 1000));
        const data = await GetOrder(orderId);
        setOrderData(data)
        setLoaded(true)
    }, [orderId]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <>
            {loaded && (
                <ShopOrder orderData={orderData} />
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

export default ShopOrderView;
