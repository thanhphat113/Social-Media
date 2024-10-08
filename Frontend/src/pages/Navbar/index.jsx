import React, { useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { AiFillHome, AiOutlineMessage, AiOutlineBell } from 'react-icons/ai';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { PiTelevisionSimple, PiStorefrontThin } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoGameControllerOutline } from "react-icons/io5";
import Notification from './Notification1';
import SideMenu from './SideMenu';
import UserSettings from './UserSettings'

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false); // State để quản lý hiển thị khung menu

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleAvatarClick = () => {
    setShowUserSettings(!showUserSettings);
  };

  const handleGridClick = () => {
    setShowSideMenu(!showSideMenu); // Toggle hiển thị khung menu khi nhấn vào biểu tượng grid
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10 flex items-center justify-between px-4">
      {/* Left navigation */}
      <div className="leftnav flex items-center">
        <FaFacebook className="text-blue-500 text-3xl" />
        <input type="text" placeholder="Tìm kiếm trên Facebook" className="ml-2 p-2 bg-white rounded-full w-64" />
      </div>

      {/* Main navigation - center */}
      <div className="mainnav flex items-center justify-center flex-grow space-x-20">
        <AiFillHome className="text-2xl mr-4" />
        <PiTelevisionSimple className="text-2xl mr-4" />
        <PiStorefrontThin className="text-2xl mr-4" />
        <HiOutlineUserGroup className="text-2xl mr-4" />
        <IoGameControllerOutline className="text-2xl mr-4" />
      </div>

      {/* Right navigation */}
      <div className="rightnav flex items-center relative">
        <BsFillGrid3X3GapFill className="text-2xl mr-4 cursor-pointer" onClick={handleGridClick} />
        <AiOutlineMessage className="text-2xl mr-4" />
        <AiOutlineBell className="text-2xl mr-4 cursor-pointer" onClick={handleBellClick} />
        <img src="contact.jpg" alt="Contact" className="w-8 h-8 rounded-full mr-2 cursor-pointer" onClick={handleAvatarClick} />
        
        {/* Hiển thị khung thông báo */}
        {showNotifications && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-80">
            <Notification />
          </div>
        )}

        {/* Hiển thị khung cài đặt người dùng */}
        {showUserSettings && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-80">
            <UserSettings />
          </div>
        )}

        {/* Hiển thị khung menu */}
        {showSideMenu && (
          <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-96">
            <SideMenu />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
