import React from 'react';
import styles from './ProfileLeftMainBottom.module.scss';

const CardFooter = () => {
  return (
    <div className={styles.cardFooter}>
      <ul className={styles.navBottomLine}>
        <li className={styles.navItem}>
          <a className={`${styles.navLink} ${styles.active}`} href="/social_r/profile/feed">
            Feed
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/social_r/profile/about">
            About
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/social_r/profile/connections">
            Connections <span className={styles.badgeSuccess}>300</span>
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/social_r/profile/media">
            Media
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/social_r/profile/videos">
            Videos
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/social_r/profile/events">
            Events
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/social_r/profile/activity">
            Activity
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CardFooter;
