import React from 'react';
import styles from './ProfileContainerRight_Container_1.module.scss';

const AboutCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>Giới thiệu</div>
        </div>
        <div className={styles.cardBody}>
          <p className={styles.cardBodyPTop0}>
          Cộng đồng Sinh viên SGU
          🔹 Nơi giao lưu giữa sinh viên tất cả các khóa, dù là đang học hay sắp trở thành tân sinh viên trường, hay đã thành những cựu sinh viên của trường Đại học Sài Gòn!
          🔹 Khi bạn tham gia nhóm sẽ được:
          * Hỗ trợ giải đáp, tư vấn cho các vấn đề bạn gặp phải.
          * Được cập nhật văn bản, thông báo mới nhất của trường.
          * Tư vấn thông tin tuyển sinh nhà trường.
          * Giao lưu với các sinh viên khóa khác.
          * Cơ hội tìm kiếm phòng trọ, việc làm.
          * Tài liệu học tập cho các ngành học.
          * Nếu bạn ngại khi đăng một bài viết nào đó trong nhóm? Không sao cả, đã có chế độ đăng bài ẩn danh!
          </p>
          <ul className={styles.list}>
            <li className="styles.listItem">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path><path d="M8 11v-4a4 4 0 1 1 8 0v4"></path></svg>
              Riêng tư
            </li>
            <li className="styles.listItem">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
              Hiển thị
            </li>
            <li className="styles.listItem">
            <svg class="_icon_1gy0g_24" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"></path><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path></svg>
              Thành phố Hồ Chí Minh
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;

