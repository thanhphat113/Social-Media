// import { useDispatch, useSelector } from "react-redux";
// import styles from "./Information.module.scss";
// import axios from "axios";
// import clsx from "clsx";

// function Information() {
//     const user = useSelector((state) => state.user);
//     const infor = user.information || null
//     const friends = useSelector((state) => state.friends.allFriends);



//     return (
//         <div className={styles.wrapper}>
//             <div className={styles.avatar}>
//                 <img
//                     className={styles.cover}
//                     src={user.coverPhoto || "/public/img/default/loadingbg.jpg"}
//                 />
//                 <img
//                     className={styles.profile}
//                     src={
//                         infor.profilePicture
//                             ? infor.profilePicture?.src
//                             : `/public/img/default/${
//                                   infor.genderId !== 2 ? "man" : "woman"
//                               }_default`
//                     }
//                 />
//                 <p style={{ marginTop: `6rem`, fontSize: `larger` }}>
//                     <strong>{`${infor.lastName} ${infor.firstName}`}</strong>
//                 </p>
//             </div>
//             <div className={styles.bio}>{infor.bio}</div>

//             <div className={styles.friends}>
//                 <div className={styles.item}>
//                     <strong>{friends.length}</strong>
//                     <p>Bạn bè</p>
//                 </div>
//                 <div className={clsx(styles.item, styles.center)}>
//                     <strong>{user.followers}</strong>
//                     <p>Người theo dõi</p>
//                 </div>
//                 <div className={styles.item}>
//                     <strong>{user.posts}</strong>
//                     <p>Bài viết</p>
//                 </div>
//             </div>
//             <div className={styles.about}>
//                 {infor.location && (
//                     <div className={styles.content}>
//                         <i className="fa-solid fa-globe"></i>
//                         <p>{infor.location}</p>
//                     </div>
//                 )}
//                 <div className={styles.content}>
//                     <i className="fa-solid fa-user"></i>
//                     <p>
//                         {infor.genderId === 0
//                             ? "Không cung cấp"
//                             : user.information.genderId === 1
//                             ? "Nam"
//                             : "Nữ"}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Information;
