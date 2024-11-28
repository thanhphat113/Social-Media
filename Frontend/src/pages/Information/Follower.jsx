import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Information.module.scss';

const FollowersList = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Gọi API lấy dữ liệu followers
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get('http://localhost:5164/api/User/user-login', {
          withCredentials: true,
        });

        // Xử lý dữ liệu followers
        const transformedFollowers = response.data.followers.map(follower => ({
          id: follower.userId,
          name: `${follower.firstName} ${follower.lastName}`,
          imageUrl: follower.profilePicture?.src && follower.profilePicture.src !== "" 
            ? `Picture/${follower.profilePicture.src}` 
            : 'default/man_default.png',
        }));

        setFollowers(transformedFollowers);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setMessage('Không thể tải danh sách người theo dõi. Vui lòng thử lại!');
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className={styles.settingform2}>
      <div className={styles.tabs}>
        <button className={styles.activeTab}>Người theo dõi</button>
      </div>

      <div className={styles.friendslist}>
        {followers.length === 0 ? (
          <p>Không tìm thấy người theo dõi nào.</p>
        ) : (
          followers.map(follower => (
            <Link to={`/${follower.id}`} key={follower.id}>
              <div className={styles.friendcard}>
                <img
                  src={`/public/img/${follower.imageUrl}`}
                  alt={follower.name}
                  className={styles.friendavatar}
                />
                <p className={styles.friendname}>{follower.name}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default FollowersList;
