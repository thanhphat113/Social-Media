import React, { useState } from 'react';

import Sidebar from './SideBar';
import MainContent from './MainContent';
import RightSidebar from './RightSideBar';

function Home() {
 
  return (

    <div className="flex h-screen" style={{ backgroundColor: '#F0F2F5', color: 'black' }}>
     
      <div className="flex flex-grow">
      {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <MainContent />

        {/* Right Sidebar */}
        <RightSidebar />
        
      </div>

    </div>
  );
}

export default Home;
