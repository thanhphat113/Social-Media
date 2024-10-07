import React from 'react';
import { MdOutlineVideoCall, MdPhotoLibrary, MdEmojiEmotions } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { PiShareFatThin } from 'react-icons/pi';
import styles from './Home.module.scss';

function MainContent() {
  return (
    <main className="content w-3/5 p-4">
      <div className="bg-white p-4 rounded-lg mb-4">
        <input type="text" placeholder="Tiến ơi, bạn đang nghĩ gì thế?" className="w-full p-2 bg-white rounded-full mb-2" />
        <div className="flex justify-between">
          <button className="flex items-center">
            <MdOutlineVideoCall className="text-red-500 mr-2" />
            Video trực tiếp
          </button>
          <button className="flex items-center">
            <MdPhotoLibrary className="text-green-500 mr-2" />
            Ảnh/video
          </button>
          <button className="flex items-center">
            <MdEmojiEmotions className="text-yellow-500 mr-2" />
            Cảm xúc/hoạt động
          </button>
        </div>
      </div>

      {/* Các bài viết */}
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img src="img/Ảnh chụp màn hình 2024-06-10 024210.png" alt="Anime" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <span className="font-bold">Anime Season</span> · <span className="text-blue-500">Theo dõi</span>
              <p className="text-sm">22 giờ · 🌍</p>
            </div>
          </div>
          <BsThreeDots />
        </div>
        <p className="mb-2">Re: Zero đã trở lại! 💀</p>
        <img src="img/Ảnh chụp màn hình 2024-06-10 024210.png" alt="Anime Post" className="w-full rounded-lg mb-4" />
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <i className="far fa-thumbs-up text-blue-500"></i>
            <span className="ml-1">2.5K lượt thích</span>
          </div>
          <div className="flex space-x-2">
            <span>1K bình luận</span>
            <span>500 lượt chia sẻ</span>
          </div>
        </div>
        <div className="flex justify-between text-gray-500 border-t pt-2">
          <div className="relative hover-trigger">
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <AiOutlineLike />
              <span>Like</span>
            </button>
            {/* Danh sách biểu tượng cảm xúc */}
            <div className={`${styles['emoji-list']}`}>
              <img src="img/like.png" alt="Like" className="w-8 h-8 cursor-pointer" />
              <img src="img/love.png" alt="Love" className="w-8 h-8 cursor-pointer" />
              <img src="img/haha.png" alt="Haha" className="w-8 h-8 cursor-pointer" />
              <img src="img/wow.png" alt="Wow" className="w-8 h-8 cursor-pointer" />
              <img src="img/sad.png" alt="Sad" className="w-8 h-8 cursor-pointer" />
              <img src="img/angry.png" alt="Angry" className="w-8 h-8 cursor-pointer" />
            </div>
          </div>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <FaRegComment />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <PiShareFatThin />
            <span>Share</span>
          </button>
        </div>

      </div>

      <div className="bg-white p-4 rounded-lg mb-4">

      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img src="img/Ảnh chụp màn hình 2024-06-10 024210.png" alt="Anime" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <span className="font-bold">Anime Season</span> · <span className="text-blue-500">Theo dõi</span>
              <p className="text-sm">22 giờ · 🌍</p>
            </div>
          </div>
          <BsThreeDots />
        </div>
        <p className="mb-2">Re: Zero đã trở lại! 💀</p>
        <img src="img/Ảnh chụp màn hình 2024-06-10 024210.png" alt="Anime Post" className="w-full rounded-lg mb-4" />
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <i className="far fa-thumbs-up text-blue-500"></i>
            <span className="ml-1">2.5K lượt thích</span>
          </div>
          <div className="flex space-x-2">
            <span>1K bình luận</span>
            <span>500 lượt chia sẻ</span>
          </div>
        </div>



        <div className="flex justify-between text-gray-500 border-t pt-2">
          <div className="relative hover-trigger">
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <AiOutlineLike />
              <span>Like</span>
            </button>
            {/* Danh sách biểu tượng cảm xúc */}
            <div className="emoji-list absolute hidden bg-white border border-gray-300 shadow-lg rounded-lg mt-1 hover-show">
              <img src="img/like.png" alt="Like" className="w-8 h-8 cursor-pointer" />
              <img src="img/love.png" alt="Love" className="w-8 h-8 cursor-pointer" />
              <img src="img/haha.png" alt="Haha" className="w-8 h-8 cursor-pointer" />
              <img src="img/wow.png" alt="Wow" className="w-8 h-8 cursor-pointer" />
              <img src="img/sad.png" alt="Sad" className="w-8 h-8 cursor-pointer" />
              <img src="img/angry.png" alt="Angry" className="w-8 h-8 cursor-pointer" />
            </div>
          </div>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <FaRegComment />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <PiShareFatThin />
            <span>Share</span>
          </button>
        </div>

      </div>
    </main>
  );
}

export default MainContent;
