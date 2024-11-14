import React, { useRef, useState } from 'react';
import styles from './ProfileInfoGeneral.module.scss';

const Profile = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostOn, setIsPostOn] = useState(false);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Kích hoạt sự kiện click của file input
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleModalClose = () => {
  };
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setImage(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div>
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatarImg}
            src="https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-default-avatar-image_2237213.jpg"
            alt="avatar"
          />
          <button onClick={toggleModal} className={styles.avatarButton} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Chỉnh sửa ảnh đại diện">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path><path d="M13.5 6.5l4 4"></path></svg>
          </button>
        </div>
      </div>
      <div className={styles.userInfo}>
        <h1 className={styles.profileName}>
        {user.information.lastName + " " + user.information.firstName}{' '}
        </h1>
        {/* <p className={styles.connectionInfo}>{user.friends.length} người bạn</p> */}
      </div>
      <div className={styles.actionButtons}>
        <button type="button" className={styles.editProfileButton}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
          Chỉnh sửa trang cá nhân
        </button>
      </div>
      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Chỉnh sửa ảnh đại diện</h2>
              <button className={styles.closeButton} onClick={toggleModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 6l-12 12"></path><path d="M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className={styles.formCheck}>
              <input id="postOnCheckbox" className={styles.checkInput} type="checkbox" checked={isPostOn} onChange={() => setIsPostOn(!isPostOn)} />
              <label htmlFor="postOnCheckbox" className={styles.checkLabel}>
                Đăng lên trang cá nhân
              </label>
            </div>
            {isPostOn && (
              <div>
                <div className={styles.formSelect}>
                  <label className={styles.checkLabel}>
                    Quyền riêng tư
                  </label>
                    <select className={styles.publicButton}>
                      <option value="public">Công khai</option>
                      <option value="friends">Bạn bè</option>
                      <option value="private">Riêng tư</option>
                    </select>
                </div>
                <div className={styles.formTextArea}>
                  <textarea className={styles.textArea}
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Mô tả"
                      ></textarea>
                </div>
              </div>
            )}

          <div onClick={handleDivClick} className={styles.dropzone}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple={false}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            {image ? (
              <img src={image} alt="Preview" className={styles.imagePreview} />
            ) : (
              <p>Tải ảnh lên</p>
            )}
          </div>

          <div className={styles.formButton}>
            
            <div className={styles.formButtonW_50}>
              <button className={styles.formButtonUpdate}>Xác nhận</button>
            </div>
            <div className={styles.formButtonW_50}>
              <button className={styles.formButtonCancel}>Hủy</button>
            </div>

          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
