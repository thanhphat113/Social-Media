import React, { useState } from 'react';



import './Information.scss';



import styles from './Information.module.scss';

function App() {


  
  const [selectedTab, setSelectedTab] = useState('account');


  const friends = [
    { id: 1, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 2, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 3, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 4, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 5, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 6, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 7, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 8, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 9, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 10, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 1, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 2, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 3, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 4, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 5, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 6, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 7, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 8, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 9, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' },
    { id: 10, name: 'Your Friend', imageUrl: 'https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg' }

    
  ];


  const notifications = [

    { id: 1, type: 'friend-request', name: 'Judy Nguyen', imageUrl: 'https://themes.stackbros.in/social_r/assets/01-DSmaVzM7.jpg', time: '2 min' },
    { id: 2, type: 'friend-request', name: 'John Doe', imageUrl: 'https://themes.stackbros.in/social_r/assets/01-DSmaVzM7.jpg', time: '5 min' },
    
  
    { id: 3, type: 'other', message: 'Alice Johnson commented on your photo.', time: '15 min' },
    { id: 4, type: 'other', message: 'Peter shared your post.', time: '30 min' },
    { id: 5, type: 'other', message: 'John Doe liked your post.', time: '10 min' }
  ];


  const media = [
    { type: 'photo', src: 'https://themes.stackbros.in/social_r/assets/05-B6qRKeDi.jpg', alt: 'Photo 1' },
    { type: 'photo', src: 'https://themes.stackbros.in/social_r/assets/05-B6qRKeDi.jpg', alt: 'Photo 1' },
    { type: 'photo', src: 'https://themes.stackbros.in/social_r/assets/05-B6qRKeDi.jpg', alt: 'Photo 1' },
    { type: 'photo', src: 'https://themes.stackbros.in/social_r/assets/05-B6qRKeDi.jpg', alt: 'Photo 1' },
    { type: 'photo', src: 'https://themes.stackbros.in/social_r/assets/05-B6qRKeDi.jpg', alt: 'Photo 1' },

    { type: 'video', src: '', alt: 'Video 1' },

    { type: 'video', src: '', alt: 'Video 1' },
    { type: 'photo', src: 'https://themes.stackbros.in/social_r/assets/05-B6qRKeDi.jpg', alt: 'Photo 1' },

    
  ]
    

  const renderContent = () => {
    switch (selectedTab) {
      case 'account':
        return (
          <div>
            <div className = 'setting_form_1'>

              <h2>Cài đặt tài khoản</h2>
              <form >
                <div className='group_1'>

                  <div className="form-group">
                    <label>First name</label>
                    <input className='group_1_input' type="text" name="firstName" />
                  </div>
                  <div className="form-group ">
                    <label>Last name</label>
                    <input className='group_1_input' type="text" name="lastName" />
                  </div>
                </div>
                <div className='group_1'>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" />
                    {/* <button type="button" className="add-button">
                      Add new email address
                    </button> */}
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea name="overview" />
                    <p >Giới hạn ký tự: 300
                    </p>
                  </div>

                </div>
                
            
                
                <button type="submit" className="save-button">
                  Lưu thay đổi
                </button>
              </form>
            </div>
            
            
          </div>
        );

        case 'change_password':
          return(
            <div className='setting_form_2'>



            <h2>Đổi mật khẩu</h2>
            <form>
              <div className="form-group">
                <label>Mật khẩu hiện tại</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>New password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>Confirm password</label>
                <input type="password" />
              </div>
              <button type="submit" className="save-button">
                Cập nhật mật khẩu
              </button>
            </form>
            </div>
          );
      case 'notifications':
        
      // Add your notification settings content here

        return (
          <div className='setting_form_2'>



            <h2>Thông báo</h2>
            <div className="notification-section">
      {notifications.map((notification) => (


       
            <div key={notification.id} className="notification-item">
         
         {notification.type === 'friend-request' ? (
           <>
             <img src={notification.imageUrl} alt={notification.name} className="avatar" />
             <div className="notification-content">
               <p><strong>{notification.name}</strong> sent you a friend request.</p>
             </div>
             <div className="notification-actions">
               <button className="accept-button">Accept</button>
               <button className="delete-button">Delete</button>
             </div>
           </>
         ) : (
          
            

           <div className="notification-content">
             <p>{notification.message}</p>
           </div>
          
         )}
         <div className="notification-time">
           <p>{notification.time}</p>
         </div>

         
       </div>
      
      
        
      ))}
    </div>
           
            </div>
        );
      case 'friends':
        return (

          
          <div className='setting_form_2'>



            <h2>Bạn bè</h2>

            <div className="friends-list">
               {friends.map((friend) => (
                <a href="">

                <div key={friend.id} className="friend-card">
                  <img src={friend.imageUrl} alt={friend.name} className="friend-avatar" />
                  <p className="friend-name">{friend.name}</p>
                </div>
                </a>
      ))}
    </div>
            
            </div>
        );


        case 'media':
         
        return (
          <div className='setting_form_2'>
      <h2>Media</h2>

      <div className="gallery-container">
        {/* Photos Section */}
        <div className="photos-section">
          <h3>Photos</h3>
          <div className="media-grid">
            {media
              .filter(item => item.type === 'photo')
              .map((item, index) => (
                <img key={index} src={item.src} alt={item.alt} className="media-item" />
              ))}
          </div>
        </div>

        {/* Divider */}
        <hr style={{ margin: '5rem 2rem 5rem 0', border: '1px solid #ccc' }} />

        {/* Videos Section */}
        <div className="videos-section">
          <h3>Videos</h3>
          <div className="media-grid">
            {media
              .filter(item => item.type === 'video')
              .map((item, index) => (
                <video key={index} controls className="media-item">
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
          </div>
        </div>
      </div>
    </div>
        );


      
    }
  };

  return (
    <div className="settings-container">
      <div className="grid">
        <nav className="settings-nav">
          <ul>
            <li 
              onClick={() => setSelectedTab('account')}
              className={selectedTab === 'account' ? 'active' : ''}
            >
              <img src="https://social-react-sb.vercel.app/assets/person-outline-filled-BjpzZeOc.svg" alt="" />
              Tài khoản
            </li>

            <li 
              onClick={() => setSelectedTab('change_password')}
              className={selectedTab === 'change_password' ? 'active' : ''}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#FFD43B" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/></svg>
              Đổi mật khẩu
            </li>



            <li 
              onClick={() => setSelectedTab('notifications')}
              className={selectedTab === 'notifications' ? 'active' : ''}
            >
              <img src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2018.0.0,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3c!DOCTYPE%20svg%20PUBLIC%20%27-//W3C//DTD%20SVG%201.1//EN%27%20%27http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd%27%3e%3csvg%20version=%271.1%27%20id=%27Layer_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%2064%2064%27%20enable-background=%27new%200%200%2064%2064%27%20xml:space=%27preserve%27%3e%3cg%20id=%27XMLID_3_%27%3e%3cg%3e%3cg%3e%3cpath%20fill=%27%23FF5F5F%27%20d=%27M52,47c0,4.4,2.8,8.1,6.7,9.4v0c-3.4-1.1-10.3-2-18.8-2.3C37.4,54,34.8,54,32,54s-5.4,0-8,0.2%20c-8.7,0.3-15.8,1.2-19,2.4v0c4.1-1.3,7-5.1,7-9.5c0-0.5,0-1.2,0-1.9c5.2-0.7,12.2-1.1,20-1.1s14.8,0.4,20,1.1V47z%27/%3e%3c/g%3e%3cg%3e%3cpath%20fill=%27%23BEBECC%27%20d=%27M28,5c0-2.2,1.8-4,4-4c1.1,0,2.1,0.5,2.8,1.2C35.5,2.9,36,3.9,36,5v2l-0.1,0.4C34.7,7.1,33.3,7,32,7%20l-3.9,0.4L28,7V5z%27/%3e%3c/g%3e%3cg%3e%3cpath%20fill=%27%23BEBECC%27%20d=%27M40,54.2c-0.3,4.1-3.8,7.3-8,7.3s-7.6-3.2-8-7.3c2.5-0.1,5.2-0.2,8-0.2S37.4,54,40,54.2z%27/%3e%3c/g%3e%3cg%3e%3cpath%20fill=%27%23F7C331%27%20d=%27M32,61.5l0,1.5c-16,0-29-2.8-29-5c0-0.5,0.7-1,2-1.5c3.3-1.2,10.3-2,19-2.4C24.4,58.3,27.8,61.5,32,61.5z%20%27/%3e%3c/g%3e%3cg%3e%3cpath%20fill=%27%23F7C331%27%20d=%27M32,61.5c4.2,0,7.6-3.2,8-7.3c8.5,0.3,15.4,1.2,18.8,2.3c1.5,0.5,2.3,1,2.3,1.5c0,2.2-13,5-29,5h0%20L32,61.5z%27/%3e%3c/g%3e%3cg%3e%3cpath%20fill=%27%23FCDA4F%27%20d=%27M52,27v18.1C46.8,44.4,39.8,44,32,44s-14.8,0.4-20,1.1c0-5.9,0-18.1,0-18.1c0-5.5,2.2-10.5,5.9-14.1%20c2.7-2.7,6.3-4.7,10.2-5.5L32,7c1.3,0,2.7,0.1,3.9,0.4C45.1,9.2,52,17.3,52,27z%27/%3e%3c/g%3e%3c/g%3e%3cg%3e%3cg%3e%3cpath%20fill=%27%232C2C3D%27%20d=%27M36,8c-0.6,0-1-0.4-1-1V5c0-0.8-0.3-1.5-0.9-2.1C33.5,2.3,32.8,2,32,2c-1.7,0-3,1.3-3,3v2%20c0,0.6-0.4,1-1,1s-1-0.4-1-1V5c0-2.8,2.2-5,5-5c1.3,0,2.6,0.5,3.5,1.5C36.5,2.4,37,3.7,37,5v2C37,7.6,36.6,8,36,8z%27/%3e%3c/g%3e%3cg%3e%3cpath%20fill=%27%232C2C3D%27%20d=%27M32,62.5c-4.7,0-8.6-3.6-9-8.3c0-0.2,0-0.5,0-0.7h2c0,0.2,0,0.4,0,0.6c0.3,3.6,3.4,6.4,7,6.4%20s6.7-2.8,7-6.4c0-0.2,0-0.4,0-0.6h2c0,0.3,0,0.5,0,0.8C40.6,58.9,36.7,62.5,32,62.5z%27/%3e%3c/g%3e%3cg%3e%3cpath%20fill=%27%232C2C3D%27%20d=%27M32,64L32,64c-12.6,0-30-2.1-30-6c0-1.5,2-2.2,2.7-2.4c3.4-1.2,10.5-2.1,19.3-2.4c2.4-0.1,5.1-0.2,8-0.2%20s5.6,0.1,8,0.2c8.6,0.3,15.5,1.2,19,2.3c1.3,0.4,3,1.1,3,2.5C62,61.9,44.6,64,32,64z%20M4.1,58c1.7,1.5,12.7,4,27.9,4h0%20c15.2,0,26.2-2.5,27.9-4c-0.2-0.1-0.6-0.4-1.5-0.6c-3.3-1.1-10.2-1.9-18.5-2.2C37.5,55.1,34.8,55,32,55s-5.5,0.1-7.9,0.2%20c-8.5,0.3-15.6,1.2-18.7,2.3C4.7,57.7,4.3,57.9,4.1,58z%27/%3e%3c/g%3e%3cg%3e%3cpath%20fill=%27%232C2C3D%27%20d=%27M52,46.1c0,0-0.1,0-0.1,0C46.5,45.4,39.4,45,32,45s-14.5,0.4-19.9,1.1c-0.5,0.1-1-0.3-1.1-0.9%20c-0.1-0.5,0.3-1,0.9-1.1C17.3,43.4,24.5,43,32,43s14.7,0.4,20.1,1.1c0.5,0.1,0.9,0.6,0.9,1.1C52.9,45.7,52.5,46.1,52,46.1z%27/%3e%3c/g%3e%3cg%3e%3cpath%20fill=%27%232C2C3D%27%20d=%27M5,57.5c-0.4,0-0.8-0.3-1-0.7c-0.2-0.5,0.1-1.1,0.7-1.3C8.5,54.4,11,51,11,47V27c0-5.6,2.2-10.9,6.2-14.8%20c3-3,6.7-4.9,10.7-5.8l4-0.4c1.6,0,2.9,0.1,4.2,0.4C45.9,8.4,53,17,53,27v20c0,3.8,2.4,7.2,6,8.5c0.1,0,0.2,0.1,0.2,0.1l-0.3,1%20l-0.3,0.9l0.3-0.9l-0.4,0.9c-0.1,0-0.2-0.1-0.3-0.1C54,55.9,51,51.7,51,47V27c0-9-6.4-16.8-15.3-18.6C34.5,8.1,33.3,8,32,8%20l-3.8,0.4c-3.6,0.7-6.9,2.5-9.6,5.2C15,17.2,13,21.9,13,27v20c0,4.8-3.1,9.1-7.7,10.5C5.2,57.5,5.1,57.5,5,57.5z%27/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e" alt="" />
              Thông báo
            </li>
            <li 
              onClick={() => setSelectedTab('friends')}
              className={selectedTab === 'friends' ? 'active' : ''}
            >
              <img src="https://social-react-sb.vercel.app/assets/handshake-outline-filled-BCija3um.svg" alt="" />
              Bạn bè
            </li>

            <li 
              onClick={() => setSelectedTab('media')}
              className={selectedTab === 'media' ? 'active' : ''}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#63E6BE" d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
              Media
            </li>


            <li 
              className='view_profile' 
              onClick={() => setSelectedTab('profile')}
             
            >
              Xem trang cá nhân
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
