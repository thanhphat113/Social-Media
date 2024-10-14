import { useState } from "react";
import styles from "./DetailMessage.module.scss";
import { CustomTooltip } from "../../../../components/GlobalStyles";

function DetailMessage({ onShow }) {
    const [mess, setMess] = useState("");

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <CustomTooltip title="Trang cá nhân">
                    <div className={styles.information}>
                        <img src="/public/img/Cloudy.png"></img>
                        <h2>Thanh phát</h2>
                    </div>
                </CustomTooltip>
                <div className={styles.action}>
                    <CustomTooltip title="Gọi"><i className="fa-solid fa-phone"></i></CustomTooltip>
                    <CustomTooltip title="Gọi video"><i className="fa-solid fa-video"></i></CustomTooltip>
                    <CustomTooltip title="Xem thông tin">
                        <i
                            onClick={() => onShow()}
                            className="fa-solid fa-circle-info"
                        ></i>
                    </CustomTooltip>
                </div>
            </div>
            <div className={styles.content}>
                <p className={styles.usermessage}>aaaaaaaaa</p>
                <p className={styles.usermessage}>aaaaaaaaa</p>
                <p className={styles.othermessage}>aaaaaaaaa</p>
                <p className={styles.othermessage}>aaaaaaaaa</p>
            </div>
            <div className={styles.chat}>
                <input
                    value={mess}
                    onChange={(e) => setMess(e.target.value)}
                    placeholder="Aa"
                ></input>
                <i className="fa-solid fa-paper-plane"></i>
            </div>
        </div>
    );
}

export default DetailMessage;
