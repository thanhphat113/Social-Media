import React from 'react';
import styles from './Profile.module.scss'; 
import ProfileLeftInfo from './components/ProfileLeft_Info';
import PostSystem from '../Home/components/MainContent';
import ProfileRightInfo from './components/ProfileRightInfo';
import ProfileRightFriend from './components/ProfileRightFriend';
import ProfileRightMedia from './components/ProfileRightMedia';

function Profile() {
    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profileWrapper_Left}>
                <ProfileLeftInfo />
                <PostSystem />
            </div>
            <div className={styles.profileWrapper_Right}>
                <ProfileRightInfo />
                <ProfileRightFriend />
                <ProfileRightMedia />  
            </div>
        </div>
    );
}

export default Profile;
