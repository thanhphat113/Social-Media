import React, { useState } from 'react';
import { FaBirthdayCake } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { BsThreeDots } from 'react-icons/bs';
import styles from 'Frontend/src/pages/Home/components/RightSideBar/RightSideBar.module.scss';

function RightSidebar() {
  const [showSettings, setShowSettings] = useState(false);

  const contacts = ['Nguyễn Văn C', 'Phạm Thị D'];

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <aside className={styles.rightbar}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Sinh nhật</h2>
        <div className={styles.birthdaySection}>
          <FaBirthdayCake className={styles.icon} />
          <span>Hôm nay là sinh nhật của Nguyễn Trí.</span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.contactsHeader}>
          <h2 className={styles.sectionTitle}>Người liên hệ</h2>
          <div className={styles.iconButton} onClick={toggleSettings}>
            {/* <IoIosSearch /> */}
            
          </div>

          {showSettings && (
            <div className={styles.settingsPopup}>
              {/* Nội dung ChatSettings */}
            </div>
          )}
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
