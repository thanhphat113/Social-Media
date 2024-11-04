import React from 'react';
import styles from './ProfileInfoGeneral.module.scss';

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <div>
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatarImg}
            src="https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-default-avatar-image_2237213.jpg"
            alt="avatar"
          />
          <button className={styles.avatarButton} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Chỉnh sửa ảnh đại diện">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path><path d="M13.5 6.5l4 4"></path></svg>
          </button>
        </div>
      </div>
      <div className={styles.userInfo}>
        <h1 className={styles.profileName}>
          Ngô Hoàng Minh Trí{' '}
        </h1>
        <p className={styles.connectionInfo}>250 người bạn</p>
      </div>
      <div className={styles.actionButtons}>
        <button type="button" className={styles.editProfileButton}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
          Chỉnh sửa trang cá nhân
        </button>
      </div>
    </div>
  );
};

export default Profile;
