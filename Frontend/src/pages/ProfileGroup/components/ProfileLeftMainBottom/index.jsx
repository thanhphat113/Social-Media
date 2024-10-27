import React from 'react';
import styles from './ProfileLeftMainBottom.module.scss';

const CardFooter = () => {
  return (
    <div className={styles.cardFooter}>
      <ul className={styles.navBottomLine}>
        <li className={styles.navItem}>
          <a className={`${styles.navLink} ${styles.active}`} href="/social_r/profile/feed">
            Thảo luận
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/social_r/profile/about">
            Hình ảnh
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/social_r/profile/connections">
            Thành viên <span className={styles.badgeSuccess}>300</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CardFooter;
