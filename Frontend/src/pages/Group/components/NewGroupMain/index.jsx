import React from 'react';
import { FiUser } from 'react-icons/fi';
import styles from './NewGroupMain.module.scss'; // Nhập file SCSS

const NewGroupMain = ({ groupName, privacy }) => {
  return (
    <div className={styles.container}>
      {/* Dòng đầu: Xem trước trang */}
      <h2 className={styles.previewTitle}>Xem trước trang</h2>

      {/* Ảnh bìa nhóm */}
      <img
        src="https://marketplace.canva.com/EAE8yuYZRpo/1/0/1600w/canva-cam-v%C3%A0-xanh-l%C3%A1-khu-r%E1%BB%ABng-%E1%BA%A3nh-b%C3%ACa-facebook-m%C3%B9a-thu-hGIvF_HcwGE.jpg" // Ảnh mẫu từ Internet
        alt="Group Cover"
        className={styles.coverImage}
      />

      {/* Tên nhóm */}
      <h3 className={styles.groupName}>{groupName || "Tên nhóm"}</h3>

      {/* Quyền riêng tư */}
      <p className={styles.privacyText}>
        {privacy ? `Nhóm ${privacy}` : "Quyền riêng tư của nhóm"}
        <span className={styles.memberCount}> - 1 thành viên</span>
      </p>

      {/* Thanh gạch ngang */}
      <hr className={styles.separator} />

      {/* Tab: Giới thiệu, Bài viết, Thành viên, Sự kiện */}
      <div className={styles.tabs}>
        <span className={styles.tab}>Giới thiệu</span>
        <span className={styles.tab}>Bài viết</span>
        <span className={styles.tab}>Thành viên</span>
        <span className={styles.tab}>Sự kiện</span>
      </div>

      {/* Layout 2 cột */}
      <div className={styles.columns}>
        {/* Cột bên trái */}
        <div className={styles.leftColumn}>
          <div className={styles.userInput}>
            <FiUser className={styles.userIcon} />
            <input
              type="text"
              placeholder="Bạn đang nghĩ gì?"
              className={styles.textInput}
            />
          </div>
          <p className={styles.mediaPrompt}>Ảnh/Video</p>
        </div>

        {/* Cột bên phải */}
        <div className={styles.rightColumn}>
          <h3> Giới thiệu</h3>
          {/* Thêm nội dung giới thiệu tại đây */}
        </div>
      </div>
    </div>
  );
};

export default NewGroupMain;
