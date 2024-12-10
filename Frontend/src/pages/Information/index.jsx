import React, { useState } from 'react';
import styles from './Information.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import FriendsList from './FriendsList';
import FollowersList from './Follower';
import MediaGallery from './MediaGallery';


function App() {

  const [selectedTab, setSelectedTab] = useState('account');
  const [selectedTabFriendFollow, setSelectedTabFriendFollow] = useState('friend');
  const user = useSelector((state) => state.user.information);
  
  const UpdateAccount = ({ user }) => {
    const [accountData, setAccountData] = useState({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      location: user.location || '',
      bio: user.bio || ''
    });
    const [message, setMessage] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAccountData({
        ...accountData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Kiểm tra nếu các trường có giá trị không rỗng
      if (!accountData.firstName || !accountData.lastName || !accountData.email) {
        setMessage('Vui lòng điền đầy đủ thông tin!');
        return;
      }
  
      try {
        const response = await axios.put(
          'http://localhost:5164/api/Information',
          accountData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, 
          }
        );
  
        if (response.status === 200) {
          setMessage('Thông tin tài khoản đã được cập nhật thành công! Vui lòng đăng nhập lại');
        } else {
          setMessage(response.data.message || 'Có lỗi xảy ra, vui lòng thử lại!');
        }
      } catch (error) {
        console.error(error);
  
        if (error.response) {
          setMessage(error.response.data.message || 'Email này đã được sử dụng hoặc sai định dạng.');
        } else {
          setMessage('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!');
        }
      }
    };
  
    return (
      <div className={styles.settingform1}>
        <h2>Cài đặt tài khoản</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.group1}>
            <div className={styles.formgroup}>
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={accountData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formgroup}>
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={accountData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
  
          <div className={styles.group1}>
            <div className={styles.formgroup}>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={accountData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formgroup}>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={accountData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
  
          <div className={styles.group1}>
            <div className={styles.formgroup}>
              <label>Bio</label>
              <textarea
                className={styles.textarea}
                name="bio"
                value={accountData.bio}
                onChange={handleInputChange}
              />
              <p>Giới hạn ký tự: 300</p>
            </div>
          </div>
  
          <button type="submit" className={styles.savebutton}>
            Lưu thay đổi
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  };
  
    

  const renderContent = () => {
    switch (selectedTab) {
      
      case 'account':
        
      return <UpdateAccount user={user} />;

        case 'change_password':
          const ChangePassword = () => {
            const [passwordData, setPasswordData] = useState({
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            });
            const [message, setMessage] = useState('');
    
            const handleInputChange = (e) => {
              const { name, value } = e.target;
              setPasswordData({
                ...passwordData,
                [name]: value
              });
            };
    
            const handleSubmit = async (e) => {
              e.preventDefault();
            
              // Kiểm tra nếu các trường có giá trị không rỗng
              if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
                setMessage('Vui lòng điền đầy đủ thông tin!');
                return;
              }
            
              if (passwordData.newPassword !== passwordData.confirmPassword) {
                setMessage('Mật khẩu mới và xác nhận mật khẩu không khớp!');
                return;
              }
            
              try {
                const response = await axios.put(
                  'http://localhost:5164/api/Information/change-password',
                  passwordData,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    withCredentials: true, 
                  }
                );
            
                if (response.status === 200) {
                  setMessage('Mật khẩu đã được thay đổi thành công!');
                } else {
                  setMessage(response.data.message || 'Có lỗi xảy ra, vui lòng thử lại!');
                }
              } catch (error) {
                console.error(error);
            
                if (error.response) {
                  setMessage(error.response.data.message || 'Có lỗi xảy ra, vui lòng thử lại!');
                } else {
                  setMessage('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!');
                }
              }
            };
            
            
            
    
            return (
              <div className={styles.settingform2}>
                <h2>Đổi mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formgroup}>
                    <label>Mật khẩu hiện tại</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formgroup}>
                    <label>Mật khẩu mới</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formgroup}>
                    <label>Xác nhận mật khẩu</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className={styles.savebutton}>
                    Cập nhật mật khẩu
                  </button>
                </form>
                {message && <p>{message}</p>}
              </div>
            );
          };
          return <ChangePassword />;
        
  
        case 'friends':
          return <FriendsList />;
       
          
        case 'followers':
          return <FollowersList />;



        case 'media':
          return <MediaGallery />;
          // return (
           
          //   <div className={styles.settingform2}>
          //     <h2>Media</h2>
      
          //     <div className={styles.gallerycontainer}>
          //       {/* Photos Section */}
          //       <div className="photos-section">
          //         {/* <h3>Photos</h3> */}
          //         <div className={styles.mediagrid}>
          //           {media
          //             .filter(item => item.type === 'photo')
          //             .map((item, index) => (
          //               <img key={index} src={item.src} alt={item.alt} className={styles.mediaitem} />
          //             ))}
          //         </div>
          //       </div>
      
          //       {/* Divider */}
          //       <hr style={{ margin: '5rem 2rem 5rem 0', border: '1px solid #ccc' }} />
      
          //       {/* Videos Section
          //       <div className="videos-section">
          //         <h3>Videos</h3>
          //         <div className={styles.mediagrid}>
          //           {media
          //             .filter(item => item.type === 'video')
          //             .map((item, index) => (
          //               <video key={index} controls className={styles.mediaitem}>
          //                 <source src={item.src} type="video/mp4" />
          //                 Your browser does not support the video tag.
          //               </video>
          //             ))}
          //         </div>
          //       </div> */}
          //     </div>
          //   </div>
          // );

        default:
          return null;

      
    }
  };

  return (
    <div className={styles.settingscontainer}>
      <div className={styles.grid}>
        <nav className={styles['settingsnav']}>
          <ul>
            <li 
              onClick={() => setSelectedTab('account')}
              className={selectedTab === 'account' ? styles.active : ''}
            >
              <img className={styles.navimg} src="https://social-react-sb.vercel.app/assets/person-outline-filled-BjpzZeOc.svg" alt="" />
              Tài khoản
            </li>

            <li 
              onClick={() => setSelectedTab('change_password')}
              className={selectedTab === 'change_password' ? styles.active : ''}
            >
              <svg className={styles.navsvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#FFD43B" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/></svg>
              Đổi mật khẩu
            </li>



            <li 
              onClick={() => setSelectedTab('followers')}
              
              className={selectedTab === 'followers' ? styles.active : ''}
            >
              {/* <img className={styles.navimg} src="" alt="" /> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#74C0FC" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>              Người theo dõi
            </li>
            <li 
              onClick={() => setSelectedTab('friends')}
              className={selectedTab === 'friends' ? styles.active : ''}
            >
              <img className={styles.navimg} src="https://social-react-sb.vercel.app/assets/handshake-outline-filled-BCija3um.svg" alt="" />
              Bạn bè
            </li>

            <li 
              onClick={() => setSelectedTab('media')}
              className={selectedTab === 'media' ? styles.active : ''}
            >
              <svg className={styles.navsvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#63E6BE" d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
              Media
            </li>


            <li 
              className={styles['viewprofile']}
              onClick={() => setSelectedTab('profile')}
             
            >
               <Link to={`/${user.userId}`} key={user.userId}>
              Xem trang cá nhân
               </Link>
            </li>
          </ul>
        </nav>

        <div className="settings-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;