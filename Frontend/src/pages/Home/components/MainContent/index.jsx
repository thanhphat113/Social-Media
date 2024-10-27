<<<<<<< HEAD
import { useState } from 'react';
import { MdPhotoLibrary } from 'react-icons/md';
=======
<<<<<<< HEAD:Frontend/src/pages/Home/components/MainContent/index.jsx
<<<<<<< HEAD:Frontend/src/pages/Home/components/MainContent/index.jsx
import  { useState } from 'react';
import {  MdPhotoLibrary } from 'react-icons/md';
>>>>>>> 6198759 (Sidebar tạo nhóm, trang tạo nhóm, và post)
import { FaSmile, FaImage, FaMapMarkerAlt, FaTimes, FaFacebookMessenger, FaWhatsapp, FaLink, FaUsers, FaFlag } from 'react-icons/fa';
=======
import React, { useState } from 'react';
import { MdOutlineVideoCall, MdPhotoLibrary } from 'react-icons/md';
import { FaSmile, FaImage, FaMapMarkerAlt } from 'react-icons/fa';
>>>>>>> 94207f6 (Sidebar tạo nhóm, trang tạo nhóm, và post):Frontend/src/pages/Home/components/MainContent/MainContent.jsx
import { useDropzone } from 'react-dropzone';
import styles from './MainContent.module.scss';
import Post from '../Post';
=======
import React, { useState } from "react";
import { MdOutlineVideoCall, MdPhotoLibrary } from "react-icons/md";
import { FaSmile, FaImage, FaMapMarkerAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import styles from "Frontend/src/pages/Home/components/MainContent/MainContent.module.scss";
import Post from "../Post/Post";
>>>>>>> 957ef15 (sửa sơ css):Frontend/src/pages/Home/components/MainContent/MainContent.jsx

function MainContent() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 870dc3d (sửa sơ css)
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
<<<<<<< HEAD
=======
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [isEmojiMenuVisible, setIsEmojiMenuVisible] = useState(false);
  const [hoveringLike, setHoveringLike] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentLike, setCurrentLike] = useState({ emoji: null, label: 'Like' });
  const [files, setFiles] = useState([]); // State để lưu trữ nhiều file đã chọn
=======
    });
    const [files, setFiles] = useState([]); // State để lưu trữ nhiều file đã chọn
>>>>>>> 870dc3d (sửa sơ css)

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

<<<<<<< HEAD:Frontend/src/pages/Home/components/MainContent/index.jsx
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(file => {
        console.log(file.type); // Kiểm tra kiểu MIME của file
>>>>>>> 32c7979 (Thay cách thức repository được gọi)
    });
<<<<<<< HEAD
    const [files, setFiles] = useState([]); // State để lưu trữ nhiều file đã chọn
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
    const [visibility, setVisibility] = useState("Công khai");

<<<<<<< HEAD
    const handleLikeChange = (emoji, label) => {
        setCurrentLike({ emoji, label });
        setIsEmojiMenuVisible(false);
    };
=======
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
>>>>>>> 6198759 (Sidebar tạo nhóm, trang tạo nhóm, và post)

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
=======
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
=======
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
>>>>>>> 957ef15 (sửa sơ css):Frontend/src/pages/Home/components/MainContent/MainContent.jsx

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

<<<<<<< HEAD:Frontend/src/pages/Home/components/MainContent/index.jsx
>>>>>>> 870dc3d (sửa sơ css)
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

<<<<<<< HEAD
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

=======
      {isPopupOpen && (
        <>
          <div className={styles.popupOverlay} onClick={togglePopup}></div>
          <div className={styles.popup}>
            <div className={styles.popupHeader}>
              <h2 className={styles.popupTitle}>Tạo bài viết</h2>
              <button className={styles.closeButton} onClick={togglePopup}>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
              </button>
            </div>
            <div className={styles.userInfo}>
              <img src="https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" alt="Profile" className={styles.profileImage} />
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
<<<<<<< HEAD:Frontend/src/pages/Home/components/MainContent/index.jsx
            {/* <div className={styles.popupActions}>
              <button className={styles.mobileButton}>
                <FaVideo className={styles.iconBlue} /> Thêm ảnh và video từ thiết bị di động.
              </button>
              <button className={styles.addButton}>Thêm</button>
            </div> */}
            {/* <div className={styles.extraOptions}>
=======
            <div className={styles.extraOptions}>
>>>>>>> 94207f6 (Sidebar tạo nhóm, trang tạo nhóm, và post):Frontend/src/pages/Home/components/MainContent/MainContent.jsx
              <p>Thêm vào bài viết của bạn</p>
              <div className={styles.iconOptions}>
                <FaImage className={styles.iconGreen} />
                <FaSmile className={styles.iconYellow} />
                <FaMapMarkerAlt className={styles.iconRed} />
                <span className={styles.iconPurple}>GIF</span>
              </div>
<<<<<<< HEAD:Frontend/src/pages/Home/components/MainContent/index.jsx
            </div> */}
            <button className={styles.continueButton}>Đăng</button>
=======
            </div>
            <button className={styles.continueButton} onClick={handlePostSubmit}>Đăng</button>
>>>>>>> 94207f6 (Sidebar tạo nhóm, trang tạo nhóm, và post):Frontend/src/pages/Home/components/MainContent/MainContent.jsx
          </div>
        </>
      )}
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
>>>>>>> 957ef15 (sửa sơ css):Frontend/src/pages/Home/components/MainContent/MainContent.jsx

<<<<<<< HEAD
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
>>>>>>> 6198759 (Sidebar tạo nhóm, trang tạo nhóm, và post)
    </main>
  );
>>>>>>> 32c7979 (Thay cách thức repository được gọi)
=======
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
>>>>>>> 870dc3d (sửa sơ css)
}

export default MainContent;
