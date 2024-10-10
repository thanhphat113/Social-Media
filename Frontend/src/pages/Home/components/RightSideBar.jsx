import React, { useState } from 'react';
import { FaBirthdayCake } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { BsThreeDots } from 'react-icons/bs';
import ChatSettings from './ChatSettings';
import styles from 'Frontend/src/pages/Home/Home.module.scss';

function RightSidebar() {
  const [showSettings, setShowSettings] = useState(false); // State để quản lý việc hiển thị khung cài đặt
  const contacts = ['Nguyễn Văn C', 'Phạm Thị D'];

  const toggleSettings = () => {
    setShowSettings(!showSettings); // Toggle hiển thị khung cài đặt khi nhấn vào BsThreeDots
  };

  return (
    <aside className={styles.rightbar}>
      <div className={styles.birthdaySection}>
        <h2 className={styles.sectionTitle}>Sinh nhật</h2>
        <div className={styles.birthdayInfo}>
          <FaBirthdayCake className={styles.birthdayIcon} />
          <span>Hôm nay là sinh nhật của Nguyễn Trí.</span>
        </div>
      </div>

      <div className={styles.contactsSection}>
        <div className={styles.contactsHeader}>
          <h2 className={styles.sectionTitle}>Người liên hệ</h2>
          <div className={styles.searchSettings}>
            <IoIosSearch className={styles.cursorPointer} />
            <BsThreeDots className={styles.cursorPointer} onClick={toggleSettings} />
            {showSettings && (
              <div className={styles.settingsDropdown}>
                <ChatSettings /> {/* Component khung cài đặt */}
              </div>
            )}
          </div>
        </div>
        {contacts.map((contact, index) => (
          <div key={index} className={styles.contactItem}>
            <img src="contact.jpg" alt="Contact" className={styles.contactImage} />
            <span>{contact}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default RightSidebar;
