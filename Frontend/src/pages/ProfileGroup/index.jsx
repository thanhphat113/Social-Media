import React from 'react';
import styles from './ProfileGroup.module.scss'; 
import BackgroundImage from './components/BackgroundImageComponent';
import ProfileLeftMainTop from './components/ProfileLeftMain';
import ProfileLeftMainBottom from './components/ProfileLeftMainBottom';
import ProfileContainerLeftFirst_3_1 from './components/profileContainerLeftFirst_3_1';
import ProfileContainerLeftFirst_3_2 from './components/profileContainerLeftFirst_3_2';
import ProfileContainerRight_Container_1 from './components/ProfileContainerRight_Container_1';
import ProfileContainerRight_Container_2 from './components/ProfileContainerRight_Container_2';
import ProfileContainerRight_Container_3 from './components/ProfileContainerRight_Container_3';

function ProfileGroup() {
    return (
        <div className={styles.profileGroupWrapper}>
            <div className={styles.profileContainerLeft}>
                <div className={styles.profileContainerLeftFirst}>
                    <div className={styles.containerBackground}>
                        <BackgroundImage />
                        <button className={styles.buttonBackground} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Chỉnh sửa ảnh bìa nhóm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path><path d="M13.5 6.5l4 4"></path></svg>
                        </button>
                    </div>
                    <div className={styles.profileContainerLeftFirst_2}>
                        <ProfileLeftMainTop />
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

export default ProfileGroup;
