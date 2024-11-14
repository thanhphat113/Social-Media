import React from 'react';
import Sidebar from './components/SideBar/SideBar';
import MainContent from './components/MainContent';
import FriendListChat from './components/FriendListChat';
import styles from 'Frontend/src/pages/Home/Home.module.scss';
import Validate from '../../components/Validate';

function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Flex container */}
      <div className={styles.flexGrow}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className={styles.mainContent}>
          <MainContent />
        </div>

        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          <FriendListChat />
        </div>
      </div>
    </div>
  );
}

export default Home;
