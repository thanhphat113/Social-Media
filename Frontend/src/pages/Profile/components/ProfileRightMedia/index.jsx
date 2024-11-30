import React from 'react';
import styles from './ProfileRightMedia.module.scss';

const PhotosCard = ({ user, onViewAllFriendsClick }) => {
  const displayedImages = user?.slice(0, 9);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Ảnh/Video</h2>
        <div type="button" className={styles.button} onClick={onViewAllFriendsClick}>
          Xem tất cả ảnh
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.row}>
          {displayedImages.map((image, index) => (
            <div key={index} className={styles.col}>
              <a href={image.src} data-gallery="image-popup" className={styles.imageLink}>
                <img className={styles.image} 
                     src={`/img/Picture/${image.src}`} 
                     alt={`album-image-${index}`} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotosCard;
