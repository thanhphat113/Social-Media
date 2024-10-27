import React from 'react';
import styles from './ProfileContainerRight_Container_2.module.scss';

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
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>Bạn bè</div>
          <button type="button" className={styles.button}>
            Xem tất cả bạn bè
          </button>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.row}>
            {friendsData.map((friend, index) => (
              <div className={styles.col} key={index}>
                <img className={styles.image} src="https://i.pinimg.com/564x/1a/c3/44/1ac34432d05de58663dd21adaecff7fb.jpg" alt={`Friend ${index + 1}`} />
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
    </div>
  );
};

export default FriendsCard;

