import React from 'react';
import { FaRss, FaUserFriends, FaNewspaper, FaCalendarAlt, FaUsers, FaBell } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './SideBar.module.scss'

function Sidebar() {
  const navigate = useNavigate(); // Hook để điều hướng

  const handleNavigation = (path) => {
    navigate(path); // Chuyển hướng tới trang mới
  };

  return (
    <aside className={styles.sidebar}>
      {/* Thông tin người dùng */}
      <div className={styles.userInfo}>
        <div className="relative">
          <img
            src="https://via.placeholder.com/300x100"
            alt="Background"
            className={styles.backgroundImage}
          />
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className={styles.profileImage}
          />
        </div>
        <div className={styles.userDetails}>
          <h2 className="text-xl font-bold">Sam Lanson</h2>
          <p className="text-gray-500">Web Developer at Webestica</p>
          <p className="mt-2 text-sm text-gray-600">
            I'd love to change the world, but they won’t give me the source code.
          </p>
        </div>
        <div className={styles.userStats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>256</span>
            <p className={styles.statLabel}>Post</p>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>2.5K</span>
            <p className={styles.statLabel}>Friends</p>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>365</span>
            <p className={styles.statLabel}>Followers</p>
          </div>
        </div>
        <div className={styles.userDetailsContainer}>
  <div className={styles.detailItem}>
    <div className={styles.iconContainer}>
      <FaUserFriends style={{ color: 'purple' }} />
    </div>
    <div className={styles.detailContent}>
      <span className={styles.detailLabel}>Giới tính:</span>
      <span className={styles.detailValue}>Nam</span>
    </div>
  </div>

  <div className={styles.detailItem}>
    <div className={styles.iconContainer}>
      <FaCalendarAlt style={{ color: 'red' }} />
    </div>
    <div className={styles.detailContent}>
      <span className={styles.detailLabel}>Sinh nhật:</span>
      <span className={styles.detailValue}>1/1/1990</span>
    </div>
  </div>

  <div className={styles.detailItem}>
    <div className={styles.iconContainer}>
      <FaLocationDot style={{ color: 'red' }} />
    </div>
    <div className={styles.detailContent}>
      <span className={styles.detailLabel}>Địa chỉ:</span>
      <span className={styles.detailValue}>Tân Bình - Thành phố Hồ Chí Minh</span>
    </div>
  </div>
</div>


      </div>
    </aside>
  );
}

export default Sidebar;
