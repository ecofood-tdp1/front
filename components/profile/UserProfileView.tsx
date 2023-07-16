import { useCallback, useEffect, useState } from 'react';
import {
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonLabel,
    IonItem,
    IonThumbnail,
} from '@ionic/react';
import { GetUser } from '../../repository/UserRepository';
import UserProfile from './UserProfile';
import { User } from '../../model/User';


const UserProfileView = ({ id }) => {
    const [loaded, setLoaded] = useState(false)
    const [profileData, setProfileData] = useState<User>(null);

    const fetchData = useCallback(async () => {
        setLoaded(false)
        console.log("UserProfileView fetching data", id);
        await new Promise(r => setTimeout(r, 1000));
        const data = await GetUser(id);
        setProfileData(data)
        setLoaded(true)
    }, [id]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <>
            {loaded && (
                <UserProfile buyer={profileData} />
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

export default UserProfileView;