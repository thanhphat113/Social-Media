import React, { useState } from 'react';
import NewGroupSidebar from '../components/NewGroupSidebar';
import NewGroupMain from '../components/NewGroupMain';

const NewGroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const [privacy, setPrivacy] = useState('');

  const handleBack = () => {
    // Logic quay lại trang trước (nếu cần)
  };

  return (
    <div style={styles.page}>
      
      <NewGroupSidebar 
        setGroupName={setGroupName} 
        setPrivacy={setPrivacy} 
        privacy={privacy} 
      />
      <div style={styles.content}>
        <NewGroupMain groupName={groupName} privacy={privacy} />
      </div>
    </div>
  );
};

// ... (phần còn lại của mã không thay đổi)


const styles = {
  page: {
    display: 'flex',
  },
  content: {
    flex: 1,
    padding: '20px',
  },
};

export default NewGroupPage;
