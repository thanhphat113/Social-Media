import React, { useState } from 'react';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './NewGroupSidebar.module.scss'; // Import CSS module

const NewGroupSidebar = ({ setGroupName, setPrivacy, privacy }) => {
  const [groupName, setGroupNameState] = useState('');
  const [bio, setBio] = useState('');
  const [showPrivacyOptions, setShowPrivacyOptions] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.information);

  const handleBack = () => {
    navigate('/group');
  };

  const handleCreateGroup = async () => {
    if (!groupName || !privacy) {
      setError('Vui lòng nhập tên nhóm và chọn quyền riêng tư!');
      return;
    }

    const requestBody = {
      groupName: groupName,
      bio: bio,
      createdByUserId: user.userId,
      privacyId: privacy,
    };

    try {
      const response = await axios.post(
        'http://localhost:5164/api/UserGroup/create_group',
        requestBody
      );
      console.log('Nhóm được tạo thành công:', response.data);
      navigate(`/group/${response.data.groupId}`); // Điều hướng đến nhóm vừa tạo
    } catch (error) {
      console.error('Lỗi khi tạo nhóm:', error);
      setError('Không thể tạo nhóm. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.backRow} onClick={handleBack}>
        <FiX className={styles.icon} />
      </div>
      <h2 className={styles.title}>Tạo nhóm</h2>
      <div className={styles.adminInfo}>
        <img
          src={
            user.profilePicture
              ? `${user.profilePicture.src}`
              : `/public/img/default/${
                  user.genderId !== 2 ? 'man' : 'woman'
                }_default.png`
          }
          alt="User avatar"
          className={styles.avatar}
        />
        <div>
          <span className={styles.adminName}>
            {user.firstName} {user.lastName}
          </span>
          <p className={styles.adminRole}>Quản trị viên</p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Tên nhóm"
        className={styles.input}
        value={groupName}
        onChange={(e) => {
          setGroupNameState(e.target.value);
          setError('');
        }}
      />
      <textarea
        placeholder="Mô tả nhóm"
        className={styles.input}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>
      <div
        className={styles.privacyRow}
        onClick={() => setShowPrivacyOptions(!showPrivacyOptions)}
      >
        <span>{privacy ? (privacy === 1 ? 'Công khai' : 'Riêng tư') : 'Chọn quyền riêng tư'}</span>
        {showPrivacyOptions ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {showPrivacyOptions && (
        <div className={styles.privacyOptions}>
          <div
            className={styles.privacyOption}
            onClick={() => {
              setPrivacy(1);
              setShowPrivacyOptions(false);
            }}
          >
            Công khai
          </div>
          <div
            className={styles.privacyOption}
            onClick={() => {
              setPrivacy(3);
              setShowPrivacyOptions(false);
            }}
          >
            Riêng tư
          </div>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={handleCreateGroup} className={styles.createButton}>
        Tạo
      </button>
    </div>
  );
};

export default NewGroupSidebar;
