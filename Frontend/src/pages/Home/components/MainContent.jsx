import React, { useState } from 'react';
import { MdOutlineVideoCall, MdPhotoLibrary } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment, FaPaperPlane } from 'react-icons/fa';
import { PiShareFatThin } from 'react-icons/pi';
import { FaSmile, FaImage, FaMapMarkerAlt, FaVideo, FaTimes, FaFacebookMessenger, FaWhatsapp, FaLink, FaUsers, FaFlag } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import styles from 'Frontend/src/pages/Home/Home.module.scss';

function MainContent() {
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false); // State cho pop-up chia sẻ
  const [postContent, setPostContent] = useState('');
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState(''); // Nội dung mô tả
  const [visibility, setVisibility] = useState('Công khai'); // Tính năng hiển thị
  const [isEmojiMenuVisible, setIsEmojiMenuVisible] = useState(false);

  const [hoveringLike, setHoveringLike] = useState(false);



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

  // Hàm để mở/đóng pop-up chia sẻ
  const toggleSharePopup = () => {
    setIsSharePopupOpen(!isSharePopupOpen);
  };

  const handleShare = () => {
    alert('Post shared!');
    toggleSharePopup(); // Đóng pop-up chia sẻ sau khi chia sẻ
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
              {/* <img src="profile.jpg" alt="Profile" className={styles.profileImage} /> */}
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
            <div className={styles.popupActions}>
              <button className={styles.mobileButton}>
                <FaVideo className={styles.iconBlue} /> Thêm ảnh và video từ thiết bị di động.
              </button>
              <button className={styles.addButton}>Thêm</button>
            </div>
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

      {/* Pop-up chia sẻ */}
      {isSharePopupOpen && (
        <>
          <div className={styles.popupOverlay} onClick={toggleSharePopup}></div>
          <div className={styles.sharePopup}>
            <div className={styles.popupHeader}>
              <h2 className={styles.popupTitle}>Chia sẻ</h2>
              <button className={styles.closeButton} onClick={toggleSharePopup}><FaTimes /></button>
            </div>
            <div className={styles.p4}>
              <div className={styles.userInfo1}>
                {/* <img src="profile.jpg" alt="Profile" className={styles.profileImage} /> */}
                <div className={styles.userName}>
                  <p className={styles.userNameText}>Nguyễn Tiến</p>
                  <div className={styles.visibilityButtons}>
                    <button className={styles.visibilityButton} onClick={() => setVisibility(visibility === 'Công khai' ? 'Riêng tư' : 'Công khai')}>{visibility}</button>
                  </div>
                </div>
              </div>
              <textarea
                className={styles.textarea}
                placeholder="Hãy nói gì đó về nội dung này..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className={styles.popupActions}>
                <button className={styles.shareButton} onClick={handleShare}>Chia sẻ ngay</button>
              </div>
              <div className={styles.extraOptions}>
                <h3 className={styles.extraOptionsTitle}>Chia sẻ lên</h3>
                <div className={styles.shareIcons}>
                  <button className={styles.iconButton}><FaFacebookMessenger /></button>
                  <button className={styles.iconButton}><FaWhatsapp /></button>
                  <button className={styles.iconButton}><FaLink /></button>
                  <button className={styles.iconButton}><FaUsers /></button>
                  <button className={styles.iconButton}><FaFlag /></button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bài viết */}
      <div className={styles.postContainer}>
        <div className={styles.postHeader}>
          <div className={styles.userPostInfo}>
            <img src="img/Ảnh chụp màn hình 2024-06-10 024210.png" alt="Anime" className={styles.postImage} />
            <div>
              <span className={styles.postUserName}>Anime Season</span> · <span className={styles.followButton}>Theo dõi</span>
              <p className={styles.postTime}>22 giờ · 🌍</p>
            </div>
          </div>
          <BsThreeDots onClick={toggleSharePopup} /> {/* Nút chia sẻ */}
        </div>
        <p className={styles.postText}>Re: Zero đã trở lại! 💀</p>
        <img src="img/Ảnh chụp màn hình 2024-06-10 024210.png" alt="Anime Post" className={styles.postImageFull} />

        {/* Bình luận và tương tác */}
        <div className={styles.interactionBar}>
          <div className={styles.likeButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <button className={styles.interactionButton}>
              {currentLike.emoji ? currentLike.emoji : <AiOutlineLike />} {/* Hiển thị emoji nếu có */}
              <span>{currentLike.label}</span> {/* Hiển thị tên cảm xúc */}
            </button>

            {hoveringLike && isEmojiMenuVisible && (
              <div
                className={styles.emojiOptions}
                onMouseEnter={handleEmojiMenuMouseEnter}
                onMouseLeave={handleEmojiMenuMouseLeave}
              >
                <button className={styles.emojiButton} onClick={() => handleLikeChange('❤️', 'Love')}><span role="img" aria-label="love">❤️</span></button>
                <button className={styles.emojiButton} onClick={() => handleLikeChange('😂', 'Haha')}><span role="img" aria-label="haha">😂</span></button>
                <button className={styles.emojiButton} onClick={() => handleLikeChange('😮', 'Wow')}><span role="img" aria-label="wow">😮</span></button>
                <button className={styles.emojiButton} onClick={() => handleLikeChange('😢', 'Sad')}><span role="img" aria-label="sad">😢</span></button>
                <button className={styles.emojiButton} onClick={() => handleLikeChange('😡', 'Angry')}><span role="img" aria-label="angry">😡</span></button>
                <button className={styles.emojiButton} onClick={() => handleLikeChange('👍', 'Like')}><span role="img" aria-label="thumbs up">👍</span></button>
              </div>
            )}
          </div>

          <button className={styles.interactionButton}>
            <FaRegComment />
            <span>Comment</span>
          </button>
          <button className={styles.interactionButton} onClick={toggleSharePopup}>
            <PiShareFatThin />
            <span>Share</span>
          </button>
        </div>

        {/* Bình luận */}
        <div className={styles.commentInputContainer}>
          <input
            type="text"
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            placeholder="Viết bình luận..."
            className={styles.commentInput}
          />
          <button onClick={handleAddComment} className={styles.sendButton}>
            <FaPaperPlane size={24} />
          </button>
        </div>

        {/* Hiển thị danh sách bình luận */}
        <div className={styles.commentSection}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <strong>Người dùng:</strong> {comment}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}

export default MainContent;
