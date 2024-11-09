import React, { useState } from 'react';
import { FaBirthdayCake } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { BsThreeDots } from 'react-icons/bs';
import ChatSettings from './ChatSettings';


function RightSidebar() {
  const [showSettings, setShowSettings] = useState(false); // State để quản lý việc hiển thị khung cài đặt

  

  const contacts = ['Nguyễn Văn C', 'Phạm Thị D'];

  const toggleSettings = () => {
    setShowSettings(!showSettings); // Toggle hiển thị khung cài đặt khi nhấn vào BsThreeDots
  };

  return (
    <aside className="rightbar w-1/5 p-4 relative"> {/* Relative để định vị khung cài đặt */}
     
      
      <div className="mb-4">
        <h2 className="font-bold mb-2">Sinh nhật</h2>
        <div className="flex items-center">
          <FaBirthdayCake className="mr-2" />
          <span>Hôm nay là sinh nhật của Nguyễn Trí.</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold">Người liên hệ</h2>
          <div className="flex items-center space-x-2 relative"> {/* Thêm relative ở đây */}
            <IoIosSearch className="cursor-pointer" />
            <BsThreeDots className="cursor-pointer" onClick={toggleSettings} /> {/* Sự kiện onClick */}
            
            {/* Hiển thị khung cài đặt nếu showSettings = true */}
            {showSettings && (
              <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg w-80 p-4 z-20"> {/* Điều chỉnh vị trí và không đè lên BsThreeDots */}
                <ChatSettings /> {/* Component khung cài đặt */}
              </div>
            )}
          </div>
        </div>
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center mb-2">
            <img src="contact.jpg" alt="Contact" className="w-8 h-8 rounded-full mr-2" />
            <span>{contact}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default RightSidebar;
