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

const FriendsCard = () => {
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
          {friendsData.map((friend, index) => (
            <div className={styles.col} key={index}>
              <img className={styles.image} src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/464009558_1044266480820237_6408720638635029284_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGarLeQ99Z1b5HHb505AspIFunfJZ04vtgW6d8lnTi-2NwFU3lubQyc8R4ukowxY1TnIuHdkiz5QDB-Z4KAnTK_&_nc_ohc=yB18pvcw5bcQ7kNvgHrHNL9&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=AR_m81YeeAkUzDW1Qg4txRZ&oh=00_AYBQ5I2gcEcuA30EMinpSC5a7n8cmla7H1GNGU6gy0PCJA&oe=672E7F56" alt={`Friend ${index + 1}`} />
              <div className={styles.name}>{friend.name}</div>
              {/* Thẻ overlay sẽ hiện khi hover */}
              <div className={styles.friendOverlay}>
                <div className={styles.friendDetails}>
                  <img src="https://ub.com.vn/attachments/ocb-1-jpg.30417/" alt={`Friend ${index + 1}`} className={styles.friendAvatar} />
                  <div className={styles.friendInfo}>
                    <h4 className={styles.friendInfoName}>{friend.name}</h4>
                    <div className={styles.friendInfoMutual}>
                    <i class="fa-solid fa-location-dot"></i>
                    <p className={styles.friendInfoMutualNum}>Sống tại Quận 9</p>
                  </div>
                  <div className={styles.friendInfoMutual}>
                    <i class="fa-solid fa-user-group"></i>
                    <p className={styles.friendInfoMutualNum}>145 bạn chung</p>
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

