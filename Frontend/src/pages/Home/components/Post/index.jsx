import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { FaRegComment, FaPaperPlane, FaFacebookMessenger, FaWhatsapp, FaLink, FaUsers, FaFlag, FaTimes } from 'react-icons/fa';
import { PiShareFatThin } from 'react-icons/pi';
import { BsThreeDots } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import styles from './Post.module.scss';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ImageGallery from 'Frontend/src/pages/Home/components/ImageGallery/index.jsx';

function Post({
  post,
  currentLike,
  setCurrentLike,
  handleMouseEnter,
  handleMouseLeave,
  comments,
  currentComment,
  handleAddComment,
  setCurrentComment,
  onDeletePost
}) {
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [visibility, setVisibility] = useState('Công khai');
  const [description, setDescription] = useState('');
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Thêm trạng thái cho menu
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // Thêm trạng thái cho popup xác nhận
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content); // Nội dung bài viết đang sửa
  const [editedImages, setEditedImages] = useState([...post.images]);
  const menuRef = useRef(null);
  
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [sharesCount, setSharesCount] = useState(0);

  const toggleSharePopup = () => {
    setIsSharePopupOpen(!isSharePopupOpen);
  };

  const handleShare = () => {
    setSharesCount((prevCount) => prevCount + 1); // Tăng số lượt chia sẻ
    toggleSharePopup();
  };

  const handleAddComment1 = () => {
    if (currentComment.trim()) {
      comments.push(currentComment); // Cập nhật danh sách bình luận
      setCommentsCount(comments.length); // Tăng số lượng bình luận
      setCurrentComment(''); // Xóa nội dung ô nhập
    }
  };

  const handleLikeChange = () => {
    setCurrentLike((prevLike) => {
      const isLiked = !prevLike.isLiked;
      setLikesCount((prevCount) => (isLiked ? prevCount + 1 : prevCount - 1));
      return { ...prevLike, isLiked };
    });
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

  const handleDeletePost = () => {
    setIsDeleteConfirmOpen(true); // Mở popup xác nhận
  };

  const confirmDeletePost = () => {
    if (onDeletePost) {
      onDeletePost(post.id); // Gọi hàm xóa từ cha
    }
    setIsDeleteConfirmOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false); // Đóng popup nếu hủy
  };

  // Mở popup chỉnh sửa
  const handleEditPost = () => {
    setIsEditPopupOpen(true);
  };

  // Đóng popup chỉnh sửa
  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  // Cập nhật nội dung bài viết
  const saveEditPost = () => {
    const updatedContent = {
      content: editedContent,
      images: editedImages,
    };
  
    if (typeof onUpdateContent === 'function') {
      onUpdateContent(post.id, updatedContent); // Gọi hàm nếu được truyền từ cha
    } else {
      // Nếu không, cập nhật trực tiếp tại đây
      post.content = editedContent;
      post.images = editedImages;
    }
  
    // Đóng popup sau khi lưu
    closeEditPopup();
  };

  // Xóa ảnh
  const handleRemoveImage = (index) => {
    setEditedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Thêm ảnh mới
  const handleAddImage = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setEditedImages((prevImages) => [...prevImages, ...newImages]);
  };

  

  const handlePostEdit = (id, updatedContent, updatedFiles) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, content: updatedContent, images: updatedFiles }
          : post
      )
    );
  };

  // Hàm để đóng menu khi nhấn vào chỗ khác
  const closeMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  // Lắng nghe sự kiện khi nhấn vào bất kỳ chỗ nào trên trang
  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);

    // Dọn dẹp khi component bị hủy
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);


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
        <div className={styles.menuContainer} ref={menuRef}>
          <BsThreeDots onClick={toggleMenu} className={styles.threeDotsIcon} />
          {isMenuOpen && (
            <div className={styles.dropdownMenu}>
              <button className={styles.menuItem} onClick={handleEditPost}><FaRegEdit /> Sửa bài viết</button>
              <button className={styles.menuItem} onClick={handleDeletePost}><MdDeleteForever /> Xóa bài viết</button>
            </div>
          )}
        </div>
      </div>
      {/* <p className={styles.postText}>{post.content}</p> */}

      {/* Nội dung bài viết */}
      <p className={styles.postContent}>{post.content}</p>

      {/* Hiển thị hình ảnh */}
      <ImageGallery images={post.images} />


      {/* Popup chỉnh sửa */}
      {isEditPopupOpen && (
        <>
          <div className={styles.popupOverlay} onClick={closeEditPopup}></div>
          <div className={styles.editPopup}>
            <div className={styles.popupHeader}>
              <h3>Chỉnh sửa bài viết</h3>
              <button className={styles.closeButton} onClick={closeEditPopup}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.userInfo}>
              <img
                src="https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g"
                alt="Profile"
                className={styles.profileImage}
              />
              <div className={styles.userName}>
                <p className={styles.userNameText}>Nguyễn Tiến</p>
                <select
                  className={styles.visibilitySelect}
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                >
                  <option value="Công khai">Công khai</option>
                  <option value="Riêng tư">Riêng tư</option>
                </select>
              </div>
            </div>

            {/* Chỉnh sửa nội dung */}
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={styles.textarea}
            />

            {/* Chỉnh sửa ảnh - Di chuyển phần này ra khỏi cuộn ảnh */}
            <div className={styles.imageEditorFixed}>
              <div className={styles.imageEditor}>
                {editedImages.map((image, index) => (
                  <div key={index} className={styles.imagePreview}>
                    <img src={image} alt={`Preview ${index}`} />
                    {/* Icon xóa ảnh */}
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className={styles.removeImageButton}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>

              {/* Thêm ảnh */}
              <label className={styles.addImageButton}>
                Thêm ảnh
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAddImage}
                  className={styles.imageInput}
                />
              </label>
            </div>

            {/* Hành động */}
            <div className={styles.popupActions}>
              <button onClick={saveEditPost} className={styles.saveButton}>
                Lưu
              </button>
              <button onClick={closeEditPopup} className={styles.cancelButton}>
                Hủy
              </button>
            </div>
          </div>
        </>
      )}

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
            <span>{likesCount}</span>
          </button>
        </div>

        <button className={styles.interactionButton}>
          <FaRegComment />
          <span>Comment</span>
          <span>{commentsCount}</span>
        </button>
        <button className={styles.interactionButton} onClick={toggleSharePopup}>
          <PiShareFatThin />
          <span>Share</span>
          <span>{sharesCount}</span>
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
