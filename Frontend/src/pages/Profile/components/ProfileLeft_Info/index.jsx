import React from 'react';
import styles from './ProfileLeftInfo.module.scss';
import BackgroundImage from '../BackgroundImageComponent';
import ProfileInfoGeneral from '../ProfileInfoGeneral';
import ProfileInfoGeneral_2 from '../ProfileInfoGeneral_2';
import ProfileInfoTabs from '../ProfileInfoTabs';

const ProfileGeneral = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerBackground}>
          <BackgroundImage />
          <button className={styles.buttonChangeBackground} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Chỉnh sửa ảnh bìa">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path><path d="M13.5 6.5l4 4"></path></svg>
          </button>
      </div>
      <ProfileInfoGeneral />
      <ProfileInfoGeneral_2 />
      <ProfileInfoTabs />
  </div>
  );
};

export default ProfileGeneral;

