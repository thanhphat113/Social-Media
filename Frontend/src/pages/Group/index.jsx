import React from 'react';
import GroupSidebar from './components/GroupSidebar';

const Group = () => {
  return (
    <div style={{ display: 'flex' }}>
      <GroupSidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Nội dung của Group */}
        <h1>Trang Group</h1>
        <p>Đây là nội dung chính của trang Group.</p>
      </div>
    </div>
  );
};

export default Group;
