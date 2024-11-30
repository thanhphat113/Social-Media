import React, { useState } from 'react';
import styles from './ProfileInfoTabsMedia.module.scss';
import { useNavigate } from 'react-router-dom';

const MediaSection = ({ user }) => {
  return (
    <div className={styles.mediaContainer}>
        {user.userMedias && user.userMedias.length > 0 ? (
          <div className={styles.mediaGrid}>
            {user.userMedias.map((item, index) => (
              <div key={index} className={styles.mediaItem}>
                <img 
                  src={`/img/Picture/${item.src}`} 
                  alt={`media-${index}`} 
                  className={styles.mediaImage} 
                />
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.mediaTitleList}>Không có ảnh/video nào để hiển thị.</p>
        )}
    </div>
  );
};

export default MediaSection;
