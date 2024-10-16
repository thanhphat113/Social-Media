import { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { CustomTooltip } from "../../../../../../../GlobalStyles";
import styles from "./AccountIcon.module.scss";
import { typeContext } from "../../../..";
import { UserContext } from "../../../../..";
import Cookies from "js-cookie";
import { TokenContext } from "../../../../../../../../App";

function AccountIcon(props) {
    const user = props;
    const { handleClick } = useContext(typeContext);
    const UserLogin = useContext(UserContext)
    const { setToken } = useContext(TokenContext)
    const navigate = useNavigate()

    const handleClickLogout = () => {
        Cookies.remove("token", { path: "/" })
        setToken(null)
        navigate('/login')
    }

    return (
        <div className={styles.accounticon}>
            <CustomTooltip title={user.title}>
                <img
                    onClick={() => {
                        props.onToggle("B");
                        // setIsClicked(!isClicked);
                    }}
                    className={styles.circle}
                    src={UserLogin.profilePicture}
                    alt="profile"
                ></img>
            </CustomTooltip>
            {props.isActive && (
                <div className={styles.content}>
                    <Link to="/profile" onClick={() => handleClick("profile")}>
                        <div className={styles.account}>
                            <img src={user.img} alt="profile"></img>
                            <span>{UserLogin.lastName + " " + UserLogin.firstName}</span>
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
