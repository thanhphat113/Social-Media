import React, { useState } from 'react';
import GroupSidebar from '../GroupSidebar';
import styles from './GroupList.module.scss'; 


const groupsData = [
  {
    id: 1,
    name: 'Hội Câu Cá Sài Gòn',
    members: '15.3k',
    postsPerDay: '10',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661964095477-fe68b487f700?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmclMjBpbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
    joined: true
  },
  {
    id: 1,
    name: 'Hội Câu Cá Sài Gòn',
    members: '15.3k',
    postsPerDay: '10',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661964095477-fe68b487f700?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmclMjBpbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
    joined: true
  },
  {
    id: 1,
    name: 'Hội Câu Cá Sài Gòn',
    members: '15.3k',
    postsPerDay: '10',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661964095477-fe68b487f700?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmclMjBpbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
    joined: false
  },
  {
    id: 1,
    name: 'Hội Câu Cá Sài Gòn',
    members: '15.3k',
    postsPerDay: '10',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661964095477-fe68b487f700?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmclMjBpbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
    joined: true
  },
  {
    id: 2,
    name: 'Hội Câu Cá Hà Nội',
    members: '25.6k',
    postsPerDay: '40',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661964095477-fe68b487f700?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmclMjBpbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
    joined: false
  },
  {
    id: 3,
    name: 'Hội Câu Cá Đà Nẵng',
    members: '8.5k',
    postsPerDay: '5',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661964095477-fe68b487f700?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmclMjBpbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
    joined: false
  }
 
];

const GroupCard = ({ group }) => {
  return (
    <div className={styles.groupCard}>
      <img src={group.imageUrl} alt={group.name} className={styles.groupImage} />
      <h3>{group.name}</h3>
      <p>{group.members} thành viên / {group.postsPerDay} bài viết mỗi ngày </p>
      <button className={group.joined ? styles.joinedButton : styles.joinButton}>
        {group.joined ? 'Đã tham gia' : 'Tham gia nhóm'}
      </button>
      {!group.joined && (
        <button className={styles.removeButton}>✖</button> 
      )}
    </div>
  );
};

const GroupList = () => {
  const joinedGroups = groupsData.filter(group => group.joined);
  const suggestedGroups = groupsData.filter(group => !group.joined);

  return (
    <div className={styles.groupContainer}>
      {/* Sidebar */}
      <GroupSidebar />

      {/* Nội dung nhóm */}
      <div className={styles.content}>
        <div className={styles.joinedGroups}>
          <h2>Nhóm của bạn</h2>
          <div className={styles.groupRow}>
            {joinedGroups.length > 0 ? (
              joinedGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))
            ) : (
              <p>Bạn chưa tham gia nhóm nào.</p>
            )}
          </div>
        </div>

        <div className={styles.suggestedGroups}>
          <h2>Gợi ý nhóm</h2>
          <div className={styles.groupRow}>
            {suggestedGroups.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
