import React, { useEffect, useState, useCallback } from 'react';
import styles from './Profile.module.scss'; 
import ProfileLeftInfo from './components/ProfileLeft_Info';
import ProfileRightInfo from './components/ProfileRightInfo';
import ProfileRightFriend from './components/ProfileRightFriend';
import ProfileRightMedia from './components/ProfileRightMedia';
import { useDispatch, useSelector } from "react-redux";
import { GetUserInfo } from "../../components/Redux/Actions/UserAction";   
import { useParams } from 'react-router-dom';

function Profile() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [resetTab, setResetTab] = useState(false);
    const [activeTab, setActiveTab] = useState('feed');

    const handleViewAllMediaClick = useCallback(() => {
        if (activeTab !== 'media') {
            setActiveTab('media');
        }
    }, [activeTab]);

    const handleViewAllFriendsClick = useCallback(() => {
        if (activeTab !== 'connections') {
            setActiveTab('connections');
        }
    }, [activeTab]);

    const handleUserInfoUpdate = (updatedUser) => {
        dispatch(GetUserInfo(id));
    };

    useEffect(() => {
        setActiveTab('feed'); 
        dispatch(GetUserInfo(id));
        setResetTab((prev) => !prev); 
    }, [dispatch, id]);

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profileWrapper_Left}>
                {user.dataInfo ? (
                    <ProfileLeftInfo 
                        user={user.dataInfo} 
                        resetTab={resetTab} 
                        onUserInfoUpdate={handleUserInfoUpdate} 
                        activeTab={activeTab} 
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className={styles.profileWrapper_Right}>
                {user.dataInfo ? (
                    <>
                        <ProfileRightInfo user={user.dataInfo} />
                        <ProfileRightFriend 
                            user={user.dataInfo.userFriends} 
                            onViewAllFriendsClick={handleViewAllFriendsClick}
                        />
                        <ProfileRightMedia 
                            user={user.dataInfo.userMedias} 
                            onViewAllFriendsClick={handleViewAllMediaClick}
                        />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
