import React from 'react';
import styles from './BackgroundImageComponent.module.scss';

const BackgroundImageComponent = ({user}) => {
  return (
    <div className={styles.imageWrapper}>
      <img
        className={styles.image}
        src={
          user.srcCoverPhoto?.src
            ? `/img/Picture/${user.srcCoverPhoto?.src}` : `/img/default/${user.genderId !== 2 ? "man" : "woman"}_default.png`
        }
        alt="Cover Photo"
      />
    </div>
  );
};

export default BackgroundImageComponent;
