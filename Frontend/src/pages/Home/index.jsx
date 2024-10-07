import React, { useState } from 'react';

import Navbar from '../Navbar';
import Sidebar from './SideBar';
import MainContent from './MainContent';
import RightSidebar from './RightSideBar';
import styles from './Home.module.scss';

function HomePage() {
  const [friendRequests, setFriendRequests] = useState([{ name: 'Liên Nari', daysAgo: 5 }]);
  const [contacts, setContacts] = useState(['Tuấn Nguyễn', 'Hiền Thu Nguyễn', 'Ý Ý', 'Thiên Nhật Nguyễn', 'Đức Toàn', 'Ngọc Hòa Nguyễn', 'Hải Hậu Mai', 'C.B.CB Quỳnh']);
  const [search, setSearch] = useState('');
  return (

    <div className="flex h-screen" style={{ backgroundColor: '#F0F2F5', color: 'black' }}>
      <Navbar />
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

export default HomePage;
