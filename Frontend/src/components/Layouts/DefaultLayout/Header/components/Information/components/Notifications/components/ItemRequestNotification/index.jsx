import { Link } from "react-router-dom";
import styles from "./ItemRequestNotification.module.scss";

function ItemRequestNotification(props) {
    const item = props.package;

    return (
        <Link className={styles.wrapper}>
            <img src={item.profilePicture || `/public/img/default/${item.genderId !==2 ? "man" : "woman"}_default.png`}></img>
            <div className={styles.content}>
                <p>
                    <strong>
                        {item.firstName}{" "}
                        {item.lastName}
                    </strong>{" "}
                    {`Đã gửi lời mời kết bạn`}
                </p>
				<div className={styles.choice}>
					<button className={styles.accept}>Chấp nhận</button>
					<button className={styles.deny}>Từ chối</button>
				</div>
            </div>
            <div className={styles.isread}>
                {item.isRead === 0 && <span></span>}
            </div>
        </Link>
    );
}

export default ItemRequestNotification;
