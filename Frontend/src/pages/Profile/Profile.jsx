import React from 'react';
import styles from './Profile.module.scss'; 
import BackgroundImage from './components/BackgroundImageComponent';
import ProfileLeftMainTop from './components/ProfileLeftMain';
import ProfileLeftMainTop_2 from './components/ProfileLeftMain_2';
import ProfileLeftMainBottom from './components/ProfileLeftMainBottom';
import ProfileContainerLeftFirst_3_1 from './components/profileContainerLeftFirst_3_1';
import ProfileContainerLeftFirst_3_2 from './components/profileContainerLeftFirst_3_2';
import ProfileContainerRight_Container_1 from './components/ProfileContainerRight_Container_1';
import ProfileContainerRight_Container_2 from './components/ProfileContainerRight_Container_2';
import ProfileContainerRight_Container_3 from './components/ProfileContainerRight_Container_3';

function Profile() {
    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profileContainerLeft}>
                <div className={styles.profileContainerLeftFirst}>
                    <BackgroundImage />
                    <div className={styles.profileContainerLeftFirst_2}>
                        <ProfileLeftMainTop />
                        <ProfileLeftMainTop_2 />
                        <ProfileLeftMainBottom />
                    </div>
                </div>
                <div className={styles.profileContainerLeftFirst}>
                    <div className={styles.profileContainerLeftFirst_3}>
                        <ProfileContainerLeftFirst_3_1 />
                        <ProfileContainerLeftFirst_3_2 />
                    </div>
                </div>
            </div>

            <div className={styles.profileContainerRight}>
                <div className={styles.profileContainerRight_Container}>
                    <ProfileContainerRight_Container_1 />
                    <ProfileContainerRight_Container_2 />
                    <ProfileContainerRight_Container_3 />

                </div>
            </div>

        </div>
    );
}

export default Profile;
