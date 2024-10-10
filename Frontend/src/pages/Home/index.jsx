import React from 'react';
import Sidebar from './components/SideBar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSideBar';
import styles from 'Frontend/src/pages/Home/Home.module.scss';


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
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default Home;
