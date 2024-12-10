import React, { useEffect, useState } from 'react';
import GroupSidebar from '../GroupSidebar';
import styles from './GroupList.module.scss'; 
import { Link } from 'react-router-dom';


const GroupList = () => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [suggestedGroups, setSuggestedGroups] = useState([]);
  const [adminGroups, setAdminGroups] = useState([]);

  // Gọi API khi component được render
  useEffect(() => {
  // Lấy nhóm đã tham gia
  fetch('http://localhost:5164/api/UserGroup/groups_in', {
    method: 'GET',
    credentials: 'include',  // Đảm bảo cookie được gửi kèm
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => setJoinedGroups(data))
    .catch((error) => console.error('Error fetching groups_in:', error));

  // Lấy nhóm gợi ý
  fetch('http://localhost:5164/api/UserGroup/groups_suggest', {
    method: 'GET',
    credentials: 'include',  // Đảm bảo cookie được gửi kèm
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => setSuggestedGroups(data))
    .catch((error) => console.error('Error fetching groups_suggest:', error));

  // Lấy nhóm quản trị viên
  fetch('http://localhost:5164/api/UserGroup/groups_created_by_user', {
    method: 'GET',
    credentials: 'include',  // Đảm bảo cookie được gửi kèm
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => setAdminGroups(data))
    .catch((error) => console.error('Error fetching groups_created_by_user:', error));
}, []);

  // Component hiển thị từng nhóm
  const GroupCard = ({ group, isJoined, isAdmin }) => {
    return (
      // <Link to={`/group/${group.groupId}`} className={styles.groupLink}>
      <div className={styles.groupCard}>
        
        <Link to={`/group/${group.groupId}`} className={styles.groupLink}>
        <img 
  src={`http://localhost:5164/media/${group.profilePicture || 'Cloudy.png'}`} 
  alt={group.groupName} 
  className={styles.groupImage} 
/>

        <h3>{group.groupName}</h3>
        <p>{group.bio}</p>
        {!isAdmin && (
          <button className={isJoined ? styles.joinedButton : styles.joinButton}>
            {isJoined ? 'Đã tham gia' : 'Tham gia nhóm'}
          </button>
        )}
        </Link>
        
      </div>
      // </Link>
    );
  };

  return (
    <div className={styles.groupContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <GroupSidebar />
      </div>

      {/* Nội dung chính */}
      <div className={styles.content}>
        {/* Nhóm của bạn */}
        <div className={styles.groupSection}>
          <h2>Nhóm của bạn</h2>
          <div className={styles.groupRow}>
            {joinedGroups.length > 0 ? (
              joinedGroups.map((group) => (
                <GroupCard key={group.groupId} group={group} isJoined={true}  isAdmin={false} />
              ))
            ) : (
              <p>Bạn chưa tham gia nhóm nào.</p>
            )}
          </div>
        </div>

        {/* Gợi ý nhóm */}
        <div className={styles.groupSection}>
          <h2>Gợi ý nhóm</h2>
          <div className={styles.groupRow}>
            {suggestedGroups.length > 0 ? (
              suggestedGroups.map((group) => (
                <GroupCard key={group.groupId} group={group} isJoined={false} isAdmin={false} />
              ))
            ) : (
              <p>Không có gợi ý nhóm nào.</p>
            )}
          </div>
        </div>

        {/* Nhóm bạn là quản trị viên */}
        <div className={styles.groupSection}>
          <h2>Nhóm bạn là quản trị viên</h2>
          <div className={styles.groupRow}>
            {adminGroups.length > 0 ? (
              adminGroups.map((group) => (
                <GroupCard key={group.groupId} group={group} isJoined={true} isAdmin={true} />
              ))
            ) : (
              <p>Bạn chưa quản trị nhóm nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupList;