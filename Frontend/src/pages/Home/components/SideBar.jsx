import React from 'react';
import { FaRss, FaUserFriends, FaNewspaper, FaCalendarAlt, FaUsers, FaBell } from 'react-icons/fa';
import styles from 'Frontend/src/pages/Home/Home.module.scss';

function Sidebar() {
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
            <p className={styles.statLabel}>Followers</p>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>365</span>
            <p className={styles.statLabel}>Following</p>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <div className={styles.menuItem}>
            <FaRss className={styles.icon} style={{ color: 'blue' }} />
            <span>Feed</span>
          </div>
          <div className={styles.menuItem}>
            <FaUserFriends className={styles.icon} style={{ color: 'purple' }} />
            <span>Connections</span>
          </div>
          <div className={styles.menuItem}>
            <FaNewspaper className={styles.icon} style={{ color: 'green' }} />
            <span>Latest News</span>
          </div>
          <div className={styles.menuItem}>
            <FaCalendarAlt className={styles.icon} style={{ color: 'red' }} />
            <span>Events</span>
          </div>
          <div className={styles.menuItem}>
            <FaUsers className={styles.icon} style={{ color: 'pink' }} />
            <span>Groups</span>
          </div>
          <div className={styles.menuItem}>
            <FaBell className={styles.icon} style={{ color: 'yellow' }} />
            <span>Notifications</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
