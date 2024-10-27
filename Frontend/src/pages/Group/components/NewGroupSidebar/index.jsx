import React, { useState } from 'react';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './NewGroupSidebar.module.scss'; // Import CSS module

const NewGroupSidebar = ({ setGroupName, setPrivacy, privacy }) => {
  const [showPrivacyOptions, setShowPrivacyOptions] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/group');
  };

  const handleCreateGroup = () => {
    console.log(`Tạo nhóm với quyền riêng tư: ${privacy}`);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.backRow} onClick={handleBack}>
        <FiX className={styles.icon} />
      </div>
      <h2 className={styles.title}>Tạo nhóm</h2>
      <div className={styles.adminInfo}>
        <img src="https://via.placeholder.com/40" alt="User avatar" className={styles.avatar} />
        <div>
          <span className={styles.adminName}>Nguyễn Tiến</span>
          <p className={styles.adminRole}>Quản trị viên</p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Tên nhóm"
        className={styles.input}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <div className={styles.privacyRow} onClick={() => setShowPrivacyOptions(!showPrivacyOptions)}>
        <span>{privacy || 'Chọn quyền riêng tư'}</span>
        {showPrivacyOptions ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {showPrivacyOptions && (
        <div className={styles.privacyOptions}>
          <div
            className={styles.privacyOption}
            onClick={() => {
              setPrivacy('Công khai');
              setShowPrivacyOptions(false);
            }}
          >
            Công khai
          </div>
          <div
            className={styles.privacyOption}
            onClick={() => {
              setPrivacy('Riêng tư');
              setShowPrivacyOptions(false);
            }}
          >
            Riêng tư
          </div>
        </div>
      )}
      <button onClick={handleCreateGroup} className={styles.createButton}>
        Tạo
      </button>
    </div>
  );
};

export default NewGroupSidebar;
