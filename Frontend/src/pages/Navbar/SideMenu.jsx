import React from 'react';
import { FaSearch, FaCalendarAlt, FaUserFriends, FaUsers, FaNewspaper, FaFlag, FaVideo } from 'react-icons/fa';

function SideMenu() {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <div className="mb-4">
        <div className="flex items-center bg-gray-200 p-2 rounded-full">
          <FaSearch className="text-gray-500" />
          <input type="text" placeholder="Tìm kiếm trong menu" className="bg-transparent ml-2 outline-none" />
        </div>
      </div>
      <MenuSection title="Xã hội" items={[
        { icon: <FaCalendarAlt />, label: 'Sự kiện', description: 'Tổ chức hoặc tìm sự kiện cùng những hoạt động khác trên mạng và ở quanh đây.' },
        { icon: <FaUserFriends />, label: 'Bạn bè (62 người đang online)', description: 'Tìm kiếm bạn bè hoặc những người bạn có thể biết.' },
        { icon: <FaUsers />, label: 'Nhóm', description: 'Kết nối với những người cùng chung sở thích.' },
        { icon: <FaNewspaper />, label: 'Bảng tin', description: 'Xem bài viết phù hợp của những người và Trang bạn theo dõi.' },
        { icon: <FaFlag />, label: 'Trang', description: 'Khám phá và kết nối với các doanh nghiệp trên Facebook.' },
      ]} />
      <MenuSection title="Giải trí" items={[
        { icon: <FaVideo />, label: 'Video chơi game', description: 'Xem, kết nối với những game và người phát trực tiếp.' },
      ]} />
    </div>
  );
}

function MenuSection({ title, items }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      {items.map((item, index) => (
        <div key={index} className="flex items-start mb-2">
          <div className="text-blue-500 mr-2">{item.icon}</div>
          <div>
            <p className="font-semibold">{item.label}</p>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SideMenu;
