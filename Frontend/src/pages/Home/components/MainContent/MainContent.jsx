import React, { useState } from 'react';
import { MdOutlineVideoCall, MdPhotoLibrary } from 'react-icons/md';
import { FaSmile, FaImage, FaMapMarkerAlt, FaVideo, FaTimes, FaFacebookMessenger, FaWhatsapp, FaLink, FaUsers, FaFlag } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import styles from 'Frontend/src/pages/Home/components/MainContent/MainContent.module.scss';
import Post from '../Post/Post';

function MainContent() {
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [isEmojiMenuVisible, setIsEmojiMenuVisible] = useState(false);
  const [hoveringLike, setHoveringLike] = useState(false);

  const post = {
    image: "img/Ảnh chụp màn hình 2024-06-10 024210.png",
    title: "Anime",
    userName: "Anime Season",
    content: "Re: Zero đã trở lại! 💀",
    time: "22 giờ · 🌍"
  };

  const [currentLike, setCurrentLike] = useState({ emoji: null, label: 'Like' }); // Lưu trữ biểu tượng cảm xúc và tên


  const handleLikeChange = (emoji, label) => {
    setCurrentLike({ emoji, label }); // Cập nhật biểu tượng cảm xúc và tên
    setIsEmojiMenuVisible(false); // Ẩn menu emoji
  };

  const handleMouseEnter = () => {
    setHoveringLike(true);
    setIsEmojiMenuVisible(true); // Hiện menu emoji khi hover
  };

  const handleMouseLeave = () => {
    if (!isEmojiMenuVisible) {
      setHoveringLike(false);
    }
  };

  const handleEmojiMenuMouseEnter = () => {
    setIsEmojiMenuVisible(true); // Giữ menu mở khi di chuột vào
  };

  const handleEmojiMenuMouseLeave = () => {
    setIsEmojiMenuVisible(false); // Ẩn menu khi không còn di chuột vào
  };

  // Xử lý thêm bình luận
  const handleAddComment = () => {
    if (currentComment.trim() !== '') {
      setComments([...comments, currentComment]);
      setCurrentComment('');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*,video/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  // Hàm để mở/đóng pop-up tạo bài viết
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <main className={styles.content}>
      <div className={styles.postContainer}>
        <input
          type="text"
          placeholder="Tiến ơi, bạn đang nghĩ gì thế?"
          className={styles.inputField}
          onFocus={togglePopup}
        />
        <div className={styles.actionButtons}>
          <button className={styles.photoButton} onClick={togglePopup}>
            <MdPhotoLibrary className={styles.iconGreen} />
            Ảnh/video
          </button>
        </div>
      </div>

      {/* Pop-up để tạo bài viết */}
      {isPopupOpen && (
        <>
          <div className={styles.popupOverlay} onClick={togglePopup}></div>
          <div className={styles.popup}>
            <div className={styles.popupHeader}>
              <h2 className={styles.popupTitle}>Tạo bài viết</h2>
              <button className={styles.closeButton} onClick={togglePopup}>X</button>
            </div>
            <div className={styles.userInfo}>
              <img src="profile.jpg" alt="Profile" className={styles.profileImage} />
              <div className={styles.userName}>
                <p className={styles.userNameText}>Nguyễn Tiến</p>
                <button className={styles.publicButton}>Công khai</button>
              </div>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Tiến ơi, bạn đang nghĩ gì thế?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <p>Thêm ảnh/video hoặc kéo và thả</p>
            </div>
            {/* <div className={styles.popupActions}>
              <button className={styles.mobileButton}>
                <FaVideo className={styles.iconBlue} /> Thêm ảnh và video từ thiết bị di động.
              </button>
              <button className={styles.addButton}>Thêm</button>
            </div> */}
            <div className={styles.extraOptions}>
              <p>Thêm vào bài viết của bạn</p>
              <div className={styles.iconOptions}>
                <FaImage className={styles.iconGreen} />
                <FaSmile className={styles.iconYellow} />
                <FaMapMarkerAlt className={styles.iconRed} />
                <span className={styles.iconPurple}>GIF</span>
              </div>
            </div>
            <button className={styles.continueButton}>Tiếp</button>
          </div>
        </>
      )}

      {/* Bài viết */}
      <Post
        post={post}
        currentLike={currentLike}
        setCurrentLike={setCurrentLike}
        handleLikeChange={handleLikeChange}
        hoveringLike={hoveringLike}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        isEmojiMenuVisible={isEmojiMenuVisible}
        handleEmojiMenuMouseEnter={handleEmojiMenuMouseEnter}
        handleEmojiMenuMouseLeave={handleEmojiMenuMouseLeave}
        comments={comments}
        currentComment={currentComment}
        handleAddComment={handleAddComment}
        setCurrentComment={setCurrentComment}
        
      />


      <Post
        post={post}
        currentLike={currentLike}
        setCurrentLike={setCurrentLike}
        handleLikeChange={handleLikeChange}
        hoveringLike={hoveringLike}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        isEmojiMenuVisible={isEmojiMenuVisible}
        handleEmojiMenuMouseEnter={handleEmojiMenuMouseEnter}
        handleEmojiMenuMouseLeave={handleEmojiMenuMouseLeave}
        comments={comments}
        currentComment={currentComment}
        handleAddComment={handleAddComment}
        setCurrentComment={setCurrentComment}
      />

    </main>
  );
}

export default MainContent;
