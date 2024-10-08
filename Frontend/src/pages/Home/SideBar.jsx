import React from 'react';
import { FaRss, FaUserFriends, FaNewspaper, FaCalendarAlt, FaUsers, FaBell } from 'react-icons/fa';

function Sidebar() {
  return (
    <aside className="sidebar w-1/5 max-w-xs p-4">
      {/* Thông tin người dùng */}
      <div className="bg-white shadow-md rounded-lg mt-4 w-70">
        <div className="relative">
          <img
            src="https://via.placeholder.com/300x100"
            alt="Background"
            className="w-full h-24 object-cover rounded-t-lg"
          />
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="absolute top-12 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full"
          />
        </div>
        <div className="text-center mt-12">
          <h2 className="text-xl font-bold">Sam Lanson</h2>
          <p className="text-gray-500">Web Developer at Webestica</p>
          <p className="mt-2 text-sm text-gray-600">
            I'd love to change the world, but they won’t give me the source code.
          </p>
        </div>
        <div className="flex justify-around mt-4 border-t border-b py-2">
          <div className="text-center">
            <span className="font-bold">256</span>
            <p className="text-xs text-gray-500">Post</p>
          </div>
          <div className="text-center">
            <span className="font-bold">2.5K</span>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <span className="font-bold">365</span>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <FaRss className="text-blue-500 mr-2" />
            <span>Feed</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <FaUserFriends className="text-purple-500 mr-2" />
            <span>Connections</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <FaNewspaper className="text-green-500 mr-2" />
            <span>Latest News</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <FaCalendarAlt className="text-red-500 mr-2" />
            <span>Events</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <FaUsers className="text-pink-500 mr-2" />
            <span>Groups</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
            <FaBell className="text-yellow-500 mr-2" />
            <span>Notifications</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
