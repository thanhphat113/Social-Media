import React from 'react';
import styles from './ProfileContainerRight_Container_2.module.scss';

const friendsData = [
  { name: 'Friend 1', imgSrc: '/social_r/assets/01-Friend1.jpg' },
  { name: 'Friend 2', imgSrc: '/social_r/assets/02-Friend2.jpg' },
  { name: 'Friend 3', imgSrc: '/social_r/assets/03-Friend3.jpg' },
  { name: 'Friend 4', imgSrc: '/social_r/assets/04-Friend4.jpg' },
  { name: 'Friend 5', imgSrc: '/social_r/assets/05-Friend5.jpg' },
  { name: 'Friend 6', imgSrc: '/social_r/assets/06-Friend6.jpg' },
  { name: 'Friend 7', imgSrc: '/social_r/assets/07-Friend7.jpg' },
  { name: 'Friend 8', imgSrc: '/social_r/assets/08-Friend8.jpg' },
  { name: 'Friend 9', imgSrc: '/social_r/assets/09-Friend9.jpg' },
];

const FriendsCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>Friends</div>
          <button type="button" className={styles.button}>
            See all friends
          </button>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.row}>
            {friendsData.map((friend, index) => (
              <div className={styles.col} key={index}>
                <img className={styles.image} src="https://i.pinimg.com/564x/1a/c3/44/1ac34432d05de58663dd21adaecff7fb.jpg" alt={`Friend ${index + 1}`} />
                <div className={styles.name}>{friend.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;

