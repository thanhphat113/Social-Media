import React from "react";

function Call() {
  return (
    <div className="call-page">
      <div className="call-header">
        <span>Đang gọi...</span>
      </div>
      <div className="video-call">
        {/* Đây có thể là hình ảnh đại diện cho người gọi */}
        <img src="https://via.placeholder.com/150" alt="Caller" />
      </div>
      <button className="end-call-button">
        Kết thúc cuộc gọi
      </button>
    </div>
  );
}

export default Call;
