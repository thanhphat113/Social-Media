import React from 'react';
import { FaCog, FaQuestionCircle, FaMoon, FaCommentDots, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function UserSettings() {
  const notifications = 50;
  const navigate = useNavigate(); // Hook để điều hướng

  const handleLogout = () => {
    // Xóa thông tin đăng nhập (nếu cần)
    // Ví dụ: localStorage.removeItem('userToken');
    
    // Điều hướng đến trang LoginPage
    navigate('/login');
  };

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden mt-2">
      <div className="flex items-center px-6 py-3 bg-blue-900">
        <img className="h-12 w-12 rounded-full object-cover" src="profile.jpg" alt="Profile" />
        <h1 className="mx-3 text-white font-semibold text-lg">Nguyễn Tiến</h1>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-blue-500 hover:underline">Xem tất cả trang cá nhân</a>
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{notifications}+</span>
        </div>
        <div className="mt-4">
          <MenuItem icon={<FaCog />} text="Cài đặt & quyền riêng tư" />
          <MenuItem icon={<FaQuestionCircle />} text="Trợ giúp & hỗ trợ" />
          <MenuItem icon={<FaMoon />} text="Màn hình & trợ năng" />
          <MenuItem icon={<FaCommentDots />} text="Đóng góp ý kiến" />
          <MenuItem icon={<FaSignOutAlt />} text="Đăng xuất" onClick={handleLogout} /> {/* Sử dụng onClick để xử lý đăng xuất */}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-100 text-xs text-gray-600">
        <p>Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo · Cookie · Xem thêm · Meta © 2024</p>
      </div>
    </div>
  );
}

function MenuItem({ icon, text, onClick }) {
  return (
    <div className="flex items-center justify-between mt-3 cursor-pointer" onClick={onClick}> {/* Thêm onClick */}
      <div className="flex items-center">
        <div className="text-gray-600">{icon}</div>
        <span className="ml-3 text-gray-700">{text}</span>
      </div>
      <span className="text-gray-400">{'>'}</span>
    </div>
  );
}

export default UserSettings;
