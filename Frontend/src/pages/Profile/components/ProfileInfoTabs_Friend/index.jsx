import React , { useState } from 'react';
import styles from './ProfileInfoTabsFriend.module.scss';
import { useNavigate } from 'react-router-dom';


const ConnectionsSection = ({ user }) => {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('friends');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFriendCardClick = (friendId) => {
    navigate(`/${friendId}`);
  };

  return (
    <div className={styles.connectionsSection}>
      <div className={styles.tabs}>
        <div 
          className={`${styles.tab} ${activeTab === 'friends' ? styles.activeTab : ''}`} 
          onClick={() => handleTabClick('friends')}
        >
          Bạn bè
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'followers' ? styles.activeTab : ''}`} 
          onClick={() => handleTabClick('followers')}
        >
          Người theo dõi
        </div>
      </div>
      
      <div className={styles.friendsGrid}>
        {(activeTab === 'friends' ? user.userFriends : user.userFollower).map(item => (
          <div className={styles.friendItem} key={item.userId}
          >
            <div className={styles.friendImageContainer}>
              <img
              src={
                item.srcProfilePicture
                  ? `/img/Picture/${item.srcProfilePicture}` 
                  : `/img/default/${item.genderId !== 2 ? "man" : "woman"}_default.png`
              }
               alt={item.name} className={styles.friendImage}
               onClick={() => handleFriendCardClick(item.userId)} 
              />
            </div>
            <p className={styles.friendName}
            onClick={() => handleFriendCardClick(item.userId)}>{item.name}</p>
            <div className={styles.friendOverlay}>
                <div className={styles.friendDetails}>
                  <img 
                  src={
                    item.srcProfilePicture
                      ? `/img/Picture/${item.srcProfilePicture}` 
                      : `/img/default/${item.genderId !== 2 ? "man" : "woman"}_default.png`
                  }
                  alt={`Ảnh của ${item.name}`} className={styles.friendAvatar} 
                  onClick={() => handleFriendCardClick(item.userId)} />
                  <div className={styles.friendInfo}>
                    <h4 className={styles.friendInfoName}>{item.name}</h4>
                    <div className={styles.friendInfoMutual}>
                    {item.location && (
                      <i className="fa-solid fa-location-dot"></i>
                    )}
                    {item.location && (
                      <p className={styles.friendInfoMutualNum}>Sống tại {item.location}</p>
                    )}
                    </div>
                    <div className={styles.friendButtonFlex}>
                      <button className={styles.friendButton}>Bạn bè</button>
                      <button className={styles.friendButton}>Nhắn tin</button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionsSection;

