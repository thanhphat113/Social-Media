import React from 'react';
import styles from './ProfileLeftMain.module.scss';

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
        </div>
      </div>
      <div className={styles.userInfo}>
        <h1 className={styles.profileName}>
          Sam Lanson{' '}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            className="text-success small"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"></path>
          </svg>
        </h1>
        <p className={styles.connectionInfo}>250 connections</p>
      </div>
      <div className={styles.actionButtons}>
        <button type="button" className={styles.editProfileButton}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            className="pe-1"
            height="19"
            width="19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"></path>
          </svg>
          Edit profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
