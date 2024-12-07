import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Information.module.scss';
const MediaGallery = () => {
    const [media, setMedia] = useState([]); // State lưu danh sách media
    const [loading, setLoading] = useState(true); // State hiển thị trạng thái loading
    const [error, setError] = useState(null); // State hiển thị lỗi
  
    useEffect(() => {
      const fetchMedia = async () => {
        try {
          // Gọi API lấy danh sách media
          const response = await axios.get("http://localhost:5164/api/Information/user-media", {
            withCredentials: true, // Đảm bảo cookie được gửi nếu cần xác thực
          });
  
          // Cập nhật media từ dữ liệu trả về
          setMedia(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message || "Something went wrong");
          setLoading(false);
        }
      };
  
      fetchMedia();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className={styles.settingform2}>
        <h2>Media</h2>
  
        <div className={styles.gallerycontainer}>
          <div className="photos-section">
            <div className={styles.mediagrid}>
                
              {media.map((item, index) => (
               
                <img
                  key={index}
                  src={item.src}
                  alt={`Media ${item.mediaId}`}
                  className={styles.mediaitem}
                />
               

              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MediaGallery;


