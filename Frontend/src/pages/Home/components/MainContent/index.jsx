import { useState } from 'react';
import { MdPhotoLibrary } from 'react-icons/md';
import { FaSmile, FaImage, FaMapMarkerAlt, FaTimes, FaFacebookMessenger, FaWhatsapp, FaLink, FaUsers, FaFlag } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import styles from './MainContent.module.scss';
import Post from 'Frontend/src/pages/Home/components/Post/index.jsx';

function MainContent() {
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
    });
    const [files, setFiles] = useState([]); // State để lưu trữ nhiều file đã chọn
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
    const [visibility, setVisibility] = useState("Công khai");

    const handleLikeChange = (emoji, label) => {
        setCurrentLike({ emoji, label });
        setIsEmojiMenuVisible(false);
    };

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

            {/* Phần hiển thị hình ảnh hoặc video đã chọn */}
            {files.length > 0 && (
                <div className={styles.previewContainer}>
                    {files.map((file, index) => (
                        <div key={index} className={styles.previewItem}>
                            {file.type.startsWith("image/") ? (
                                <img src={file.preview} alt="Preview" className={styles.previewImage} />
                            ) : (
                                <video controls className={styles.previewVideo}>
                                    <source src={file.preview} type={file.type} />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    ))}
                </div>
            )}

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
}

export default MainContent;
