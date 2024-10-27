import React, { useState } from 'react';
import { FaPhone, FaBell, FaEnvelope, FaUserFriends, FaLock, FaPaperPlane, FaBan } from 'react-icons/fa';

function ChatSettings() {
  const [settings, setSettings] = useState({
    incomingCallSound: true,
    messageSound: true,
    newMessagePopup: true,
    showContacts: true,
    activeStatus: true,
  });

  const toggleSetting = (setting) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-xl font-bold">Cài đặt chat</h1>
      <p className="text-gray-500">Tùy chỉnh trải nghiệm trên Messenger.</p>
      <div className="mt-4">
        <SettingItem
          icon={<FaPhone />}
          label="Âm thanh cuộc gọi đến"
          isEnabled={settings.incomingCallSound}
          onToggle={() => toggleSetting('incomingCallSound')}
        />
        <SettingItem
          icon={<FaBell />}
          label="Âm thanh tin nhắn"
          isEnabled={settings.messageSound}
          onToggle={() => toggleSetting('messageSound')}
        />
        <SettingItem
          icon={<FaEnvelope />}
          label="Tin nhắn mới bật lên"
          description="Tự động mở tin nhắn mới."
          isEnabled={settings.newMessagePopup}
          onToggle={() => toggleSetting('newMessagePopup')}
        />
        <SettingItem
          icon={<FaUserFriends />}
          label="Hiển thị danh bạ"
          isEnabled={settings.showContacts}
          onToggle={() => toggleSetting('showContacts')}
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <FaLock className="mr-2" />
            <span>Quyền riêng tư & an toàn</span>
          </div>
          <span>&gt;</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span>Trạng thái hoạt động: </span>
            <span className="font-bold ml-1">{settings.activeStatus ? 'ĐANG BẬT' : 'TẮT'}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <FaPaperPlane className="mr-2" />
            <span>Cài đặt gửi tin nhắn</span>
          </div>
          <span>&gt;</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <FaBan className="mr-2" />
            <span>Cài đặt chặn</span>
          </div>
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
}

function SettingItem({ icon, label, description, isEnabled, onToggle }) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        {icon}
        <div className="ml-2">
          <span>{label}</span>
          {description && <p className="text-gray-500 text-sm">{description}</p>}
        </div>
      </div>
      <label className="switch">
        <input type="checkbox" checked={isEnabled} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default ChatSettings;
