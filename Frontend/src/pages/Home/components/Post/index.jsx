import React, { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment, FaPaperPlane, FaFacebookMessenger, FaWhatsapp, FaLink, FaUsers, FaFlag, FaTimes } from 'react-icons/fa';
import { PiShareFatThin } from 'react-icons/pi';
import { BsThreeDots } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';  // Import biểu tượng đám mây
import styles from './Post.module.scss';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ImageGallery from 'Frontend/src/pages/Home/components/ImageGallery/index.jsx';


function Post({
  post,
  currentLike,
  setCurrentLike,
  hoveringLike,
  handleMouseEnter,
  handleMouseLeave,
  isEmojiMenuVisible,
  handleEmojiMenuMouseEnter,
  handleEmojiMenuMouseLeave,
  comments,
  currentComment,
  handleAddComment,
  setCurrentComment,
}) {
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false); // State cho pop-up chia sẻ
  const [visibility, setVisibility] = useState('Công khai'); // Tính năng hiển thị
  const [description, setDescription] = useState(''); // Nội dung mô tả

  // Hàm để mở/đóng pop-up chia sẻ
  const toggleSharePopup = () => {
    setIsSharePopupOpen(!isSharePopupOpen);
  };

  const handleShare = () => {
    alert('Post shared!');
    toggleSharePopup(); // Đóng pop-up chia sẻ sau khi chia sẻ
  };

  // Hàm xử lý khi nhấn nút Like
  const handleLikeChange = () => {
    setCurrentLike((prevLike) => ({
      ...prevLike,
      isLiked: !prevLike.isLiked, // Đổi trạng thái like
    }));
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <div className={styles.userPostInfo}>
          <img src={post.image} alt={post.title} className={styles.postImage} />
          <div>
            <span className={styles.postUserName}>{post.userName}</span> · <span className={styles.followButton}>Theo dõi</span>
            <p className={styles.postTime}>{post.time}</p>
          </div>
        </div>
        <BsThreeDots/>
      </div>
      <p className={styles.postText}>{post.content}</p>

      {isDeleteConfirmOpen && (
        <>
          <div className={styles.popupOverlay} onClick={cancelDelete}></div>
          <div className={styles.deleteConfirmPopup}>
            <h3>Bạn có chắc muốn xóa bài viết này không?</h3>
            <div className={styles.popupActions}>
              <button className={styles.confirmButton} onClick={confirmDeletePost}>Đồng ý</button>
              <button className={styles.cancelButton} onClick={cancelDelete}>Hủy</button>
            </div>
          </div>
        </>
      )}


      {/* Hiển thị nhiều ảnh */}
      <ImageGallery images={post.images} />

      {/* Popup hình ảnh */}
      {isImagePopupOpen && (
        <div className={styles.imagePopup}>
          <div className={styles.popupOverlay} onClick={closeImagePopup}></div>
          <div className={styles.popupContent}>
            <button className={styles.prevButton} onClick={prevImage}>❮</button>
            <img src={post.images[currentImageIndex]} alt={`Popup image`} className={styles.popupImage} />
            <button className={styles.nextButton} onClick={nextImage}>❯</button>
            <button className={styles.closeButton} onClick={closeImagePopup}>✖</button>
          </div>
        </div>
      )}


      {/* Bình luận và tương tác */}
      <div className={styles.interactionBar}>
        <div className={styles.likeButton}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleLikeChange} // Gọi hàm khi nhấn nút Like
        >
          <button className={styles.interactionButton}>
            <FontAwesomeIcon
              icon={faCloud}
              className={styles.faCloudIcon}
              style={{ color: currentLike.isLiked ? '#74C0FC' : '#1E3050' }} // Đổi màu theo trạng thái
            />
            <span>{currentLike.label || 'Cloud'}</span> {/* Gán nhãn cho biểu tượng đám mây */}
          </button>
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
    </div>
  );
}

export default Post;