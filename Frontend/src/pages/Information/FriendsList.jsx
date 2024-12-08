import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Information.module.scss';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Gọi API lấy dữ liệu bạn bè
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('http://localhost:5164/api/Information/friends', {
          withCredentials: true,
        });

        // Xử lý dữ liệu bạn bè
        const transformedFriends = response.data.map(friend => ({
          id: friend.userId,
          name: `${friend.firstName} ${friend.lastName}`,
          imageUrl: friend.profilePicture?.src || 
          (friend.genderId === 2 
            ? '/public/img/default/woman_default.png' 
            : '/public/img/default/man_default.png'),
        }));

        setFriends(transformedFriends);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setMessage('Không thể tải danh sách bạn bè. Vui lòng thử lại!');
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className={styles.settingform2}>
      <div className={styles.tabs}>
        <button className={styles.activeTab}>Bạn bè</button>
      </div>

      <div className={styles.friendslist}>
        {friends.length === 0 ? (
          <p>Không tìm thấy bạn bè nào.</p>
        ) : (
          friends.map(friend => (
            <Link to={`/${friend.id}`} key={friend.id}>
              <div className={styles.friendcard}>
                <img
                  src={friend.imageUrl}
                  alt={friend.name}
                  className={styles.friendavatar}
                />
                <p className={styles.friendname}>{friend.name}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default FriendsList;
