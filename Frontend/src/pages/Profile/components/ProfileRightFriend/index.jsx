import React from 'react';
import styles from './ProfileRightFriend.module.scss';

import { useNavigate } from 'react-router-dom';

const FriendsCard = ({ user, onViewAllFriendsClick }) => {
  const navigate = useNavigate();

  const handleFriendCardClick = (friendId) => {
    navigate(`/${friendId}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Bạn bè</h2>
        <button type="button" className={styles.button} onClick={onViewAllFriendsClick}>
          Xem tất cả bạn bè
        </button>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.row}>
          {user && user.length > 0 && user.map((friend, index) => (
            <div 
              className={styles.col} 
              key={friend.userId} 
            >
              <img className={styles.image}
                src={
                  friend.srcProfilePicture 
                    ? `/img/Picture/${friend.srcProfilePicture}` 
                    : `/img/default/${friend.genderId !== 2 ? "man" : "woman"}_default.png`
                }
                alt={`Ảnh của ${friend.name}`}
                onClick={() => handleFriendCardClick(friend.userId)} 
              />
              <div className={styles.name} onClick={() => handleFriendCardClick(friend.userId)} >{friend.name}</div>
              <div className={styles.friendOverlay}>
                <div className={styles.friendDetails}>
                  <img src={
                    friend.srcProfilePicture 
                    ? `/img/Picture/${friend.srcProfilePicture}` 
                    : `/img/default/${friend.genderId !== 2 ? "man" : "woman"}_default.png`
                  } alt={`Ảnh của ${friend.name}`} className={styles.friendAvatar} 
                  onClick={() => handleFriendCardClick(friend.userId)} 
                  />
                  <div className={styles.friendInfo}>
                    <h4 className={styles.friendInfoName}>{friend.name}</h4>
                    <div className={styles.friendInfoMutual}>
                    {friend.location && (
                      <i className="fa-solid fa-location-dot"></i>
                    )}
                    {friend.location && (
                      <p className={styles.friendInfoMutualNum}>Sống tại {friend.location}</p>
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
    </div>
  );
};


export default FriendsCard;

