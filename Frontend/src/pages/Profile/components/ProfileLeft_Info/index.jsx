import React, { useRef, useState } from 'react';
import styles from './ProfileLeftInfo.module.scss';
import BackgroundImage from '../BackgroundImageComponent';
import ProfileInfoGeneral from '../ProfileInfoGeneral';
import ProfileInfoGeneral_2 from '../ProfileInfoGeneral_2';
import ProfileInfoTabs from '../ProfileInfoTabs';
import axios from "axios";


const ProfileGeneral = ({ user, resetTab, onUserInfoUpdate, activeTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostOn, setIsPostOn] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateCoverPicture = async () => {
    if (loading) return; // Tránh gọi lại nếu đang xử lý
    if (!fileInputRef.current.files[0]) {
      alert('Vui lòng chọn một tệp hình ảnh hợp lệ!');
      return;
    }
  
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', fileInputRef.current.files[0]);
      formData.append('userId', user.userInfor.userId);
      formData.append('mediaId', 0);
  
      const response = await axios.put(
        'http://localhost:5164/api/User/UpdateCoverPicture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
  
      if (response.data.isSuccess === true) {
        alert('Cập nhật ảnh bìa thành công!');
  
        const updatedCoverPicture = response.data.fileUrl;

        const updatedUser = { ...user, srcCoverPhoto: { src: updatedCoverPicture } };

        onUserInfoUpdate(updatedUser);
        toggleModal();
      } else {
        alert('Đã xảy ra lỗi khi cập nhật!');
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi trong quá trình gọi API!');
    } finally {
      setLoading(false);
    }
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

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerBackground}>
          <BackgroundImage user={user.userInfor}/>
          {!user.relationshipToUser.isSucces && (
            <button onClick={toggleModal} className={styles.buttonChangeBackground} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Chỉnh sửa ảnh bìa">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path><path d="M13.5 6.5l4 4"></path></svg>
            </button>
          )}
          {isModalOpen && (
            <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
              <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalTitle}>Chỉnh sửa ảnh bìa</h2>
                  <button className={styles.closeButton} onClick={toggleModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 6l-12 12"></path><path d="M6 6l12 12"></path></svg>
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
                  <button className={styles.formButtonUpdate} onClick={handleUpdateCoverPicture}>Xác nhận</button>
                </div>
                <div className={styles.formButtonW_50}>
                  <button className={styles.formButtonCancel}>Hủy</button>
                </div>

              </div>
              </div>
            </div>
          )}
      </div>
      <ProfileInfoGeneral user={user.userInfor} userCheck={user.relationshipToUser.isSucces} userFriend={user.userFriends} onUserInfoUpdate={onUserInfoUpdate}/>
      <ProfileInfoGeneral_2 user={user.userInfor} />
      <ProfileInfoTabs user={user} resetTab={resetTab} defaultTab={activeTab}/>
  </div>
  );
};

export default ProfileGeneral;
