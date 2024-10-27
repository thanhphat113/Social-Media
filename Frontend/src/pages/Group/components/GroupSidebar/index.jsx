import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSettings, FiSearch, FiList, FiCompass, FiUsers, FiPlus } from 'react-icons/fi';
import styles from './GroupSidebar.module.scss'; // Nhập file SCSS

const GroupSidebar = () => {
  const navigate = useNavigate();

  // Hàm để điều hướng tới trang NewGroup
  const handleCreateGroupClick = () => {
    navigate('/new-group');
  };

  return (
    <div className={styles.sidebar}>
      {/* Dòng đầu tiên: Nhóm và icon Settings */}
      <div className={styles.header}>
        <span>Nhóm</span>
        <FiSettings className={styles.icon} />
      </div>

      {/* Dòng thứ hai: Icon Search và ô nhập tìm kiếm */}
      <div className={styles.searchRow}>
        <FiSearch className={styles.icon} />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className={styles.searchInput}
        />
      </div>

      {/* Dòng thứ ba: Bảng feed của bạn */}
      <div className={styles.row}>
        <FiList className={styles.icon} />
        <span className={styles.text}>Bảng feed của bạn</span>
      </div>

      {/* Dòng thứ tư: Khám phá */}
      <div className={styles.row}>
        <FiCompass className={styles.icon} />
        <span className={styles.text}>Khám phá</span>
      </div>

      {/* Dòng thứ năm: Nhóm của bạn */}
      <div className={styles.row}>
        <FiUsers className={styles.icon} />
        <span className={styles.text}>Nhóm của bạn</span>
      </div>

      {/* Dòng cuối: Tạo nhóm mới */}
      <div
        className={`${styles.row} ${styles.createGroupRow}`}
        onClick={handleCreateGroupClick} // Thêm sự kiện click để chuyển hướng
      >
        <FiPlus className={styles.icon} />
        <span className={styles.text}>Tạo nhóm mới</span>
      </div>
    </div>
  );
};

export default GroupSidebar;
