import React from 'react';
import styles from './ProfileRightFriend.module.scss';

const friendsData = [
  { name: 'Lý Thanh Phát', imgSrc: '/social_r/assets/01-Friend1.jpg' },
  { name: 'Võ Đức Toàn', imgSrc: '/social_r/assets/02-Friend2.jpg' },
  { name: 'Nguyễn Công Phượng', imgSrc: '/social_r/assets/03-Friend3.jpg' },
  { name: 'Hồ Văn Ý', imgSrc: '/social_r/assets/04-Friend4.jpg' },
  { name: 'Bầu Đức', imgSrc: '/social_r/assets/05-Friend5.jpg' },
  { name: 'Phúc Du', imgSrc: '/social_r/assets/06-Friend6.jpg' },
  { name: 'Bằng Kiểu', imgSrc: '/social_r/assets/07-Friend7.jpg' },
  { name: 'Hoàng Sơn Nguyễn', imgSrc: '/social_r/assets/08-Friend8.jpg' },
  { name: 'Nguyễn Trọng Hiếu', imgSrc: '/social_r/assets/09-Friend9.jpg' },
];

const FriendsCard = ({ user }) => {
  console.log(user);
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Bạn bè</h2>
        <button type="button" className={styles.button}>
          Xem tất cả bạn bè
        </button>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.row}>
        {user && user.length > 0 && user.map((friend, index) => (
          <div className={styles.col} key={friend.userId}>
            <img className={styles.image}
              src={friend.profilePicture || `/public/img/default/${friend.genderId!==2 ? "man" : "woman"}_default.png`}
              alt={`Ảnh của ${friend.lastName} ${friend.firstName}`}
             />
            <div className={styles.name}>{friend.lastName + " " + friend.firstName}</div>
            <div className={styles.friendOverlay}>
              <div className={styles.friendDetails}>
                <img src={friend.profilePicture || `/public/img/default/${friend.genderId!==2 ? "man" : "woman"}_default.png`} alt={`Ảnh của ${friend.lastName} ${friend.firstName}`} className={styles.friendAvatar} />
                <div className={styles.friendInfo}>
                  <h4 className={styles.friendInfoName}>{friend.lastName + " " + friend.firstName}</h4>
                  <div className={styles.friendInfoMutual}>
                    <i className="fa-solid fa-location-dot"></i>
                    <p className={styles.friendInfoMutualNum}>Sống tại {friend.location != null ? friend.location : "Không có"}</p>
                  </div>
                  {/* <div className={styles.friendInfoMutual}>
                    <i className="fa-solid fa-user-group"></i>
                    <p className={styles.friendInfoMutualNum}>145 bạn chung</p>
                  </div> */}
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

