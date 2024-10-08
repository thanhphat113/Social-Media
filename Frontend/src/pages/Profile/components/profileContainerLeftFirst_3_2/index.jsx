import React from 'react';
import styles from './profileContainerLeftFirst_3_2.module.scss';

const NavPills = () => {
  return (
    <ul className={styles.nav}>
      <li className={styles.navItem}>
        <a className={styles.navLink}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
          </svg>
          Photo
        </a>
      </li>
      <li className={styles.navItem}>
        <a className={styles.navLink}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
            <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6"></path>
            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path>
          </svg>
          Video
        </a>
      </li>
      <li className={styles.navItem}>
        <a className={styles.navLink}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5M11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
          </svg>
          Event
        </a>
      </li>
      <li className={styles.navItem}>
        <a className={styles.navLink}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"></path>
          </svg>
          Feeling / Activity
        </a>
      </li>
      <li className={`${styles.navItem} ${styles.dropstart}`}>
        <a className={`${styles.navLink} content-none dropdown-toggle`} id="feedActionShare" aria-expanded="false" data-bs-toggle="dropdown">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"></path>
          </svg>
        </a>
      </li>
    </ul>
  );
};

export default NavPills;

