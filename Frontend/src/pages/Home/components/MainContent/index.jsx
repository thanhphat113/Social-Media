import { useState } from 'react';
import { MdPhotoLibrary } from 'react-icons/md';
import { FaSmile, FaImage, FaMapMarkerAlt, FaTimes, FaFacebookMessenger, FaWhatsapp, FaLink, FaUsers, FaFlag } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import styles from './MainContent.module.scss';
import Post from '../Post';

function MainContent() {
<<<<<<< HEAD
    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [postContent, setPostContent] = useState("");
    const [isEmojiMenuVisible, setIsEmojiMenuVisible] = useState(false);
    const [hoveringLike, setHoveringLike] = useState(false);
    const [posts, setPosts] = useState([]);
    const [currentLike, setCurrentLike] = useState({
        emoji: null,
        label: "Like",
=======
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
    accept: 'image/*',
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(file => {
        console.log(file.type); // Kiểm tra kiểu MIME của file
>>>>>>> 32c7979 (Thay cách thức repository được gọi)
    });
    const [files, setFiles] = useState([]); // State để lưu trữ nhiều file đã chọn
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
    const [visibility, setVisibility] = useState("Công khai");

    const handleLikeChange = (emoji, label) => {
        setCurrentLike({ emoji, label });
        setIsEmojiMenuVisible(false);
    };

<<<<<<< HEAD
    const handleMouseEnter = () => {
        setHoveringLike(true);
        setIsEmojiMenuVisible(true);
    };

    const handleMouseLeave = () => {
        if (!isEmojiMenuVisible) {
            setHoveringLike(false);
        }
    };

    const handleAddComment = () => {
        if (currentComment.trim() !== "") {
            setComments([...comments, currentComment]);
            setCurrentComment("");
        }
    };

    const handlePostSubmit = () => {
        if (postContent.trim() !== "") {
            const newPost = {
                images: files.map((file) => file.preview), // Thay đổi thành mảng các ảnh
                title: "Anime",
                userName: "Nguyễn Tiến",
                content: postContent,
                time: "Mới đây",
            };

            setPosts([newPost, ...posts]);
            setPostContent("");
            setFiles([]); // Reset files
            setIsPopupOpen(false);
        }
    };
=======
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
>>>>>>> 32c7979 (Thay cách thức repository được gọi)

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*,video/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

<<<<<<< HEAD
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const toggleSharePopup = () => {
        setIsSharePopupOpen(!isSharePopupOpen);
    };

    const handleShare = () => {
        alert("Post shared!");
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
                            <button className={styles.closeButton} onClick={togglePopup}>
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
                        <div className={styles.extraOptions}>
                            <p>Thêm vào bài viết của bạn</p>
                            <div className={styles.iconOptions}>
                                <FaImage className={styles.iconGreen} />
                                <FaSmile className={styles.iconYellow} />
                                <FaMapMarkerAlt className={styles.iconRed} />
                                <span className={styles.iconPurple}>GIF</span>
                            </div>
                        </div>
                        <button className={styles.continueButton} onClick={handlePostSubmit}>
                            Đăng
                        </button>
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
                            <button className={styles.closeButton} onClick={toggleSharePopup}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.p4}>
                            <div className={styles.userInfo1}>
                                <div className={styles.userName}>
                                    <p className={styles.userNameText}>Nguyễn Tiến</p>
                                    <div className={styles.visibilityButtons}>
                                        <button
                                            className={styles.visibilityButton}
                                            onClick={() =>
                                                setVisibility(
                                                    visibility === "Công khai"
                                                        ? "Riêng tư"
                                                        : "Công khai"
                                                )
                                            }
                                        >
                                            {visibility}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {posts.map((post, index) => (
                <Post
                    key={index}
                    post={post}
                    currentLike={currentLike}
                    setCurrentLike={setCurrentLike}
                    handleLikeChange={handleLikeChange}
                    hoveringLike={hoveringLike}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    isEmojiMenuVisible={isEmojiMenuVisible}
                    comments={comments}
                    currentComment={currentComment}
                    handleAddComment={handleAddComment}
                    setCurrentComment={setCurrentComment}
                />
            ))}
        </main>
    );
=======
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
>>>>>>> 32c7979 (Thay cách thức repository được gọi)
}

export default MainContent;
