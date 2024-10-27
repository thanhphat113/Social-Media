import React, { useState } from 'react';
import { FaRegComment, FaPaperPlane, FaFacebookMessenger, FaWhatsapp, FaLink, FaUsers, FaFlag, FaTimes } from 'react-icons/fa';
import { PiShareFatThin } from 'react-icons/pi';
import { BsThreeDots } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import styles from './Post.module.scss';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function Post({
  post,
  currentLike,
  setCurrentLike,
  handleMouseEnter,
  handleMouseLeave,
  comments,
  currentComment,
  handleAddComment,
  setCurrentComment
}) {
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [visibility, setVisibility] = useState('Công khai');
  const [description, setDescription] = useState('');
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Thêm trạng thái cho menu
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // Thêm trạng thái cho popup xác nhận


  const toggleSharePopup = () => {
    setIsSharePopupOpen(!isSharePopupOpen);
  };

  const handleShare = () => {
    alert('Post shared!');
    toggleSharePopup();
  };

  const handleLikeChange = () => {
    setCurrentLike((prevLike) => ({
      ...prevLike,
      isLiked: !prevLike.isLiked,
    }));
  };

  const openImagePopup = (index) => {
    setCurrentImageIndex(index);
    setIsImagePopupOpen(true);
  };

  const closeImagePopup = () => {
    setIsImagePopupOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length);
  };

  // Xử lý mở menu khi nhấn vào BsThreeDots
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Hàm xử lý khi xóa bài viết
  const handleDeletePost = () => {
    setIsDeleteConfirmOpen(true); // Mở popup xác nhận
  };

  const confirmDeletePost = () => {
    // Logic xóa bài viết
    alert('Bài viết đã bị xóa');
    setIsDeleteConfirmOpen(false); // Đóng popup sau khi xóa
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false); // Đóng popup nếu hủy
  };




  // Hàm xử lý khi sửa bài viết
  const handleEditPost = () => {
    alert('Sửa bài viết');
    // Ở đây bạn có thể thêm logic để sửa bài viết
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

        {/* Menu khi nhấn vào icon BsThreeDots */}
        <div className={styles.menuContainer}>
          <BsThreeDots onClick={toggleMenu} className={styles.threeDotsIcon} />
          {isMenuOpen && (
            <div className={styles.dropdownMenu}>
              <button className={styles.menuItem} onClick={handleEditPost}><FaRegEdit /> Sửa bài viết</button>
              <button className={styles.menuItem} onClick={handleDeletePost}><MdDeleteForever /> Xóa bài viết</button>
            </div>
          )}
        </div>
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
      <div className={styles.imageGallery}>
        {post.images.length === 1 ? (
          <img
            src={post.images[0]}
            alt={`Post image 1`}
            className={styles.fullImage}
            onClick={() => openImagePopup(0)} // Mở popup khi nhấn vào hình
          />
        ) : post.images.length === 2 ? (
          <div className={styles.twoImageLayout}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className={styles.halfImage}
                onClick={() => openImagePopup(index)}
              />
            ))}
          </div>
        ) : post.images.length === 3 ? (
          <div className={styles.threeImageLayout}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className={index === 2 ? styles.centerImage : styles.thumbnailImage}
                onClick={() => openImagePopup(index)}
              />
            ))}
          </div>
        ) : post.images.length === 4 ? (
          <div className={styles.fourImageLayout}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className={styles.quarterImage}
                onClick={() => openImagePopup(index)}
              />
            ))}
          </div>
        ) : (
          <>
            <img
              src={post.images[0]}
              alt={`Post image 1`}
              className={styles.mainImage}
              onClick={() => openImagePopup(0)} // Mở popup khi nhấn vào hình
            />
            <div className={styles.moreImages}>
              +{post.images.length - 1}
            </div>
          </>
        )}
      </div>

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
          onClick={handleLikeChange}
        >
          <button className={styles.interactionButton}>
            <FontAwesomeIcon
              icon={faCloud}
              className={styles.faCloudIcon}
              style={{ color: currentLike.isLiked ? '#74C0FC' : '#1E3050' }}
            />
            <span>{currentLike.label || 'Cloud'}</span>
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
