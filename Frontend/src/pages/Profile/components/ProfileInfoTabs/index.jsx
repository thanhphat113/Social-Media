import React from 'react';
import styles from './ProfileInfoTabs.module.scss';

const CardFooter = () => {
  return (
    <div className={styles.cardFooter}>
      <ul className={styles.navBottomLine}>
        <li className={styles.navItem}>
          <a className={`${styles.navLink} ${styles.active}`} href="/social_r/profile/feed">
            Bài viết
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/social_r/profile/about">
            Giới thiệu
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/social_r/profile/connections">
            Bạn bè <span className={styles.badgeSuccess}>300</span>
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/social_r/profile/media">
            Ảnh/Video
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CardFooter;
