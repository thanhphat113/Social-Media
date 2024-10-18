import { useContext,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomTooltip } from "../../../../../../../GlobalStyles";
import styles from "./AccountIcon.module.scss";
import { typeContext } from "../../../..";
import axios from "axios";
import { TokenContext } from "../../../../../../../../App";

function AccountIcon(props) {
    const { handleClick } = useContext(typeContext);
    const { user,setUser } = useContext(TokenContext);
    const navigate = useNavigate();

    const handleClickLogout = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5164/api/Login/logout",
                { withCredentials: true }
            );
            setUser(null)
            navigate("/")
        } catch (error){
            console.log("Lỗi hình thức đăng xuất: "+error);
        }
    };


    return (
        <div className={styles.accounticon}>
            <CustomTooltip title="Tài khoản">
                <img
                    onClick={() => {
                        props.onToggle("B");
                        // setIsClicked(!isClicked);
                    }}
                    className={styles.circle}
                    src={user.profilePicture}
                    alt="profile"
                ></img>
            </CustomTooltip>
            {props.isActive && (
                <div className={styles.content}>
                    <Link to="/profile" onClick={() => handleClick("profile")}>
                        <div className={styles.account}>
                            <img src={user.profilePicture|| ""} alt="profile"></img>
                            <span>{user.lastName + " " + user.firstName}</span>
                        </div>
                    </Link>
                    <Link
                        to="/information"
                        onClick={() => handleClick("profile")}
                    >
                        <div className={styles.choise}>
                            <i className="fa-solid fa-gear"></i>
                            <span>Thông tin cá nhân</span>
                        </div>
                    </Link>
                    <button
                        className={styles.choise}
                        onClick={() => handleClickLogout()}
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Đăng xuất</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default AccountIcon;
