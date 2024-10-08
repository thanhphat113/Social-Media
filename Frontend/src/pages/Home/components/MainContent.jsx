import React, { useState } from 'react';
import { MdOutlineVideoCall, MdPhotoLibrary } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment, FaPaperPlane } from 'react-icons/fa';
import { PiShareFatThin } from 'react-icons/pi';
import { FaSmile, FaImage, FaMapMarkerAlt, FaVideo } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import './Home.module.scss'; 

function MainContent() {
  // State để lưu bình luận
  const [comments, setComments] = useState([]); // Danh sách bình luận
  const [currentComment, setCurrentComment] = useState(''); // Bình luận hiện tại
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State để kiểm soát pop-up
  const [postContent, setPostContent] = useState(''); // Nội dung bài viết
  const [files, setFiles] = useState([]); // Danh sách tệp

  // Xử lý thêm bình luận
  const handleAddComment = () => {
    if (currentComment.trim() !== '') {
      setComments([...comments, currentComment]);
      setCurrentComment(''); // Reset trường input sau khi bình luận
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

  // Hàm để mở/đóng pop-up
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <main className="content w-3/5 p-4">
      <div className="bg-white p-4 rounded-lg mb-4">
        <input
          type="text"
          placeholder="Tiến ơi, bạn đang nghĩ gì thế?"
          className="w-full p-2 bg-white rounded-full mb-2"
          onFocus={togglePopup} // Mở pop-up khi nhấn vào ô nhập
        />
        <div className="flex justify-between">
          <button className="flex items-center" onClick={togglePopup}> {/* Mở pop-up khi nhấn nút */}
            <MdPhotoLibrary className="text-green-500 mr-2" />
            Ảnh/video
          </button>
        </div>
      </div>

      {/* Pop-up để tạo bài viết */}
      {isPopupOpen && (
        <>
          <div className="popup-overlay" onClick={togglePopup}></div> {/* Nền mờ */}
          <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md popup">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Tạo bài viết</h2>
              <button className="text-gray-500" onClick={togglePopup}>X</button>
            </div>
            <div className="flex items-center mt-4">
              <img src="profile.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
              <div className="ml-2">
                <p className="font-semibold">Nguyễn Tiến</p>
                <button className="text-blue-500 text-sm">Công khai</button>
              </div>
            </div>
            <textarea
              className="w-full mt-4 p-2 border rounded-lg"
              placeholder="Tiến ơi, bạn đang nghĩ gì thế?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div {...getRootProps({ className: 'dropzone mt-4 p-4 border rounded-lg text-center' })}>
              <input {...getInputProps()} />
              <p>Thêm ảnh/video hoặc kéo và thả</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="flex items-center text-blue-500">
                <FaVideo className="mr-2" /> Thêm ảnh và video từ thiết bị di động.
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Thêm</button>
            </div>
            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <p>Thêm vào bài viết của bạn</p>
              <div className="flex space-x-2">
                <FaImage className="text-green-500" />
                <FaSmile className="text-yellow-500" />
                <FaMapMarkerAlt className="text-red-500" />
                <span className="text-purple-500">GIF</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-gray-300 text-gray-500 py-2 rounded-lg">Tiếp</button>
          </div>
        </>
      )}

      {/* Bài viết */}
      <div className="bg-white p-4 rounded-lg mb-4">
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

        {/* Bình luận và tương tác */}
        <div className="flex justify-between text-gray-500 border-t pt-2">
          <div className="relative hover-trigger">
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <AiOutlineLike />
              <span>Like</span>
            </button>
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

        {/* Danh sách các bình luận nằm phía trên input */}
        <div className="mt-4">
          {comments.length > 0 && (
            <ul className="space-y-2 mb-4">
              {comments.map((comment, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded-md">
                  {comment}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Input để thêm bình luận */}
        <div className="flex items-center">
          <input
            type="text"
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            placeholder="Viết bình luận..."
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleAddComment}
            className="text-blue-500 p-2"
          >
            <FaPaperPlane size={24} /> 
          </button>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
