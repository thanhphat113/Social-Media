import React, { useState } from 'react';
import NewGroupSidebar from '../components/NewGroupSidebar';
import NewGroupMain from '../components/NewGroupMain';

const NewGroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const [privacyId, setPrivacyId] = useState('');

  const handleCreateGroup = () => {
    
  };

  return (
    <div style={styles.page}>
      
      <NewGroupSidebar 
        setGroupName={setGroupName} 
        setPrivacy={setPrivacyId} 
        privacy={privacyId} 
      />
      <div style={styles.content}>
        <NewGroupMain groupName={groupName} privacy={privacyId} />
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
