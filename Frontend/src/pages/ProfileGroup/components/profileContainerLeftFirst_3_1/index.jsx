import React from 'react';
import styles from './profileContainerLeftFirst_3_1.module.scss';

const ShareThoughts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
          <img
            className={styles.avatarImg}
            src="https://cdn.tuoitre.vn/zoom/700_525/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg"
            alt="avatar3"
          />
      </div>
      <form className={styles.form}>
        <textarea
          className={styles.textarea}
          rows="2"
          data-autoresize="true"
          placeholder="Bạn đang nghĩ gì?"
        ></textarea>
      </form>
    </div>
  );
};

export default ShareThoughts;
