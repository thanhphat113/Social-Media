import React from 'react';
import styles from './ProfileContainerRight_Container_3.module.scss';

const PhotosCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>Ảnh</div>
          <button type="button" className={styles.button}>
            Xem tất cả ảnh
          </button>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.row}>
            <div className={styles.col}>
              <a href="/social_r/assets/01-BMm0elYk.jpg" data-gallery="image-popup" className={styles.imageLink}>
                <img className={styles.image} src="https://i.pinimg.com/564x/1a/c3/44/1ac34432d05de58663dd21adaecff7fb.jpg" alt="album-image" />
              </a>
            </div>
            <div className={styles.col}>
              <a href="/social_r/assets/02-R8aJwnbE.jpg" data-gallery="image-popup" className={styles.imageLink}>
                <img className={styles.image} src="https://i.pinimg.com/564x/1a/c3/44/1ac34432d05de58663dd21adaecff7fb.jpg" alt="album-image" />
              </a>
            </div>
            <div className={styles.col}>
              <a href="/social_r/assets/03-D6rv73OI.jpg" data-gallery="image-popup" className={styles.imageLink}>
                <img className={styles.image} src="https://i.pinimg.com/564x/1a/c3/44/1ac34432d05de58663dd21adaecff7fb.jpg" alt="album-image" />
              </a>
            </div>
            <div className={styles.col}>
              <a href="/social_r/assets/04-BOvEXeUh.jpg" data-gallery="image-popup" className={styles.imageLink}>
                <img className={styles.image} src="https://i.pinimg.com/564x/1a/c3/44/1ac34432d05de58663dd21adaecff7fb.jpg" alt="album-image" />
              </a>
            </div>
            <div className={styles.col}>
              <a href="/social_r/assets/05-B6qRKeDi.jpg" data-gallery="image-popup" className={styles.imageLink}>
                <img className={styles.image} src="https://i.pinimg.com/564x/1a/c3/44/1ac34432d05de58663dd21adaecff7fb.jpg" alt="album-image" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosCard;

