import React, { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment, FaPaperPlane } from 'react-icons/fa';
import { PiShareFatThin } from 'react-icons/pi';
import { BsThreeDots } from 'react-icons/bs';
import styles from './Post.module.scss';

function Post({ post, currentLike, handleLikeChange, hoveringLike, handleMouseEnter, handleMouseLeave, isEmojiMenuVisible, handleEmojiMenuMouseEnter, handleEmojiMenuMouseLeave, toggleSharePopup, comments, currentComment, handleAddComment, setCurrentComment }) {
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
        <BsThreeDots onClick={toggleSharePopup} /> {/* Nút chia sẻ */}
      </div>
      <p className={styles.postText}>{post.content}</p>
      <img src={post.image} alt="Post" className={styles.postImageFull} />

      {/* Bình luận và tương tác */}
      <div className={styles.interactionBar}>
        <div className={styles.likeButton}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <button className={styles.interactionButton}>
            {currentLike.emoji ? currentLike.emoji : <AiOutlineLike />}
            <span>{currentLike.label}</span>
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
  );
}

export default Post;
