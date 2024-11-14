import React from 'react';
import styles from './Profile.module.scss'; 
import ProfileLeftInfo from './components/ProfileLeft_Info';
import PostSystem from '../Home/components/MainContent';
import ProfileRightInfo from './components/ProfileRightInfo';
import ProfileRightFriend from './components/ProfileRightFriend';
import ProfileRightMedia from './components/ProfileRightMedia';
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../components/Redux/Actions/UserAction";   


function Profile() {
    const user = useSelector((state) => state.user)
    console.log(user);

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profileWrapper_Left}>
                <ProfileLeftInfo user={user}/>
                <PostSystem />
            </div>
            <div className={styles.profileWrapper_Right}>
                <ProfileRightInfo user={user.information}/>
                {/* <ProfileRightFriend user={user.friends}/> */}
                <ProfileRightMedia />  
            </div>
        </div>
    );
}

export default Profile;
