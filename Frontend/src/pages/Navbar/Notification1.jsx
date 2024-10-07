import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';

function NotificationItem({ avatar, content, time }) {
  return (
    <div className="flex items-start p-2 border-b">
      <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
      <div className="flex-1">
        <p className="text-sm">{content}</p>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <FaEllipsisH className="text-gray-500" />
    </div>
  );
}

function Notification() {
  const [notifications] = useState([
    {
      avatar: 'https://via.placeholder.com/40',
      content: 'Hôm nay, bạn có thể ôn lại kỷ niệm.',
      time: '7 giờ',
    },
    {
      avatar: 'https://via.placeholder.com/40',
      content: 'The Moon đã đăng trong Cộng đồng Sinh viên SGU...',
      time: '7 giờ',
    },
    {
        avatar: 'https://via.placeholder.com/40',
        content: 'Bạn có thể chơi 8 Ball Pool cùng Lê Đức Duy Tân và những người khác.',
        time: '10 giờ',
      },
      {
        avatar: 'https://via.placeholder.com/40',
        content: 'Nguyễn Hà đã gắn thẻ bạn trong một bài viết trong nhóm THỰC TẬP SINH NĂM 3, 4 - INTERNSH...',
        time: '15 giờ',
      },
    
     
  ]);

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Thông báo</h2>
        <div className="flex justify-between mt-2">
          <button className="text-blue-500">Tất cả</button>
          <button className="text-gray-500">Chưa đọc</button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-2">Trước đó</h3>
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            avatar={notification.avatar}
            content={notification.content}
            time={notification.time}
          />
        ))}
        <button className="w-full mt-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
          Xem thông báo trước đó
        </button>
      </div>
    </div>
  );
}

export default Notification;
