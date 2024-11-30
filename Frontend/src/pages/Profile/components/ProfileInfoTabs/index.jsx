import React, { useState, useEffect } from 'react';
import styles from './ProfileInfoTabs.module.scss';
import PostSystem from '../../../Home/components/MainContent';
import ConnectionsSection from '../ProfileInfoTabs_Friend'; 
import MediaSection from '../ProfileInfoTabs_Media'; 

const CardFooter = ({ user, resetTab, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || 'feed');

  useEffect(() => {
    if (resetTab || defaultTab) {
      setActiveTab(defaultTab || 'feed');
    }
  }, [resetTab, defaultTab]);

  const handleTabClick = (tab, event) => {
    event.preventDefault();
    console.log(tab);
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className={styles.cardFooter}>
      <ul className={styles.navBottomLine}>
        <li className={styles.navItem}>
          <a
            className={`${styles.navLink} ${activeTab === 'feed' ? styles.active : ''}`}
            href="#"
            onClick={(event) => handleTabClick('feed', event)}
          >
            Bài viết
          </a>
        </li>
        <li className={styles.navItem}>
          <a
            className={`${styles.navLink} ${activeTab === 'connections' ? styles.active : ''}`}
            href="#"
            onClick={(event) => handleTabClick('connections', event)}
          >
            Bạn bè <span className={styles.badgeSuccess}>{user.userInfor.numberFriend}</span>
          </a>
        </li>
        <li className={styles.navItem}>
          <a
            className={`${styles.navLink} ${activeTab === 'media' ? styles.active : ''}`}
            href="#"
            onClick={(event) => handleTabClick('media', event)}
          >
            Ảnh/Video
          </a>
        </li>
      </ul>

      {/* Hiển thị nội dung tương ứng với tab */}
      <div className={styles.tabContent}>
        {activeTab === 'feed' && <PostSystem />}
        {activeTab === 'connections' && <ConnectionsSection user={user} />}
        {activeTab === 'media' && <MediaSection user={user} />}
      </div>
    </div>
  );
};

export default CardFooter;
