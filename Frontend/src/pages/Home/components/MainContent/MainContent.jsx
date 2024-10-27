import React, { useState } from "react";
import { MdOutlineVideoCall, MdPhotoLibrary } from "react-icons/md";
import { FaSmile, FaImage, FaMapMarkerAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import styles from "Frontend/src/pages/Home/components/MainContent/MainContent.module.scss";
import Post from "../Post/Post";

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

    return (
        <main className={styles.content}>
            <div className={styles.postContainer}>
                <input
                    type="text"
                    placeholder="Tiến ơi, bạn đang nghĩ gì thế?"
                    className={styles.inputField}
                    onFocus={togglePopup}
                />
                <div className={styles.line}></div>
                <div className={styles.actionButtons}>
                    <button
                        className={styles.photoButton}
                        onClick={togglePopup}
                    >
                        <MdPhotoLibrary className={styles.iconGreen} />
                        Ảnh/video
                    </button>
                </div>
            </div>

            {isPopupOpen && (
                <>
                    <div
                        className={styles.popupOverlay}
                        onClick={togglePopup}
                    ></div>
                    <div className={styles.popup}>
                        <div className={styles.popupHeader}>
                            <h2 className={styles.popupTitle}>Tạo bài viết</h2>
                            <button
                                className={styles.closeButton}
                                onClick={togglePopup}
                            >
                                X
                            </button>
                        </div>
                        <div className={styles.userInfo}>
                            <img
                                src="profile.jpg"
                                alt="Profile"
                                className={styles.profileImage}
                            />
                            <div className={styles.userName}>
                                <p className={styles.userNameText}>
                                    Nguyễn Tiến
                                </p>
                                <button className={styles.publicButton}>
                                    Công khai
                                </button>
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
                        <button
                            className={styles.continueButton}
                            onClick={handlePostSubmit}
                        >
                            Đăng
                        </button>
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
