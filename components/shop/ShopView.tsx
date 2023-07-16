import { Shop } from './Shop';
import { getShopData } from '../../lib/shops';
import { useCallback, useEffect, useState } from 'react';
import {
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonLabel,
    IonItem,
    IonThumbnail,
} from '@ionic/react';


const ShopView = ({ shopId }) => {
    const [loaded, setLoaded] = useState(false)
    const [shopData, setShopData] = useState({});

    const fetchData = useCallback(async () => {
        setLoaded(false)
        console.log("ShopView fetching data", shopId);
        await new Promise(r => setTimeout(r, 2000));
        const data = await getShopData(shopId);
        setShopData(data)
        setLoaded(true)
    }, [shopId]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <>
            {loaded && (
                <Shop shopData={shopData} shopId={shopId} />
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

export default ShopView;