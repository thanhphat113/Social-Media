import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as signalR from '@microsoft/signalr';

import { CustomTooltip } from "../../../../../../../GlobalStyles";


import styles from "./AccountIcon.module.scss";
import { typeContext } from "../../../..";
import { logout } from "../../../../../../../Redux/Actions/LoginActions";
import { SetUser } from "../../../../../../../Redux/Actions/UserAction";

function AccountIcon(props) {
    const { handleClick } = useContext(typeContext);
    const user = useSelector((state) => state.user.information);
    const profilePicture = useSelector((state) => state.user.profilePicture);
    const connectionId = useSelector( (state) => state.signalR.connectionId)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dispose = () => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`http://localhost:5164/onlinehub?id=${connectionId}`)
            .build();
        connection.stop().then(() => {
            console.log("dừng thành công")
        }).catch(error => console.log("lỗi", error))
    }

    const handleClickLogout = async () => {
        const result = await dispatch(logout());
        if (logout.fulfilled.match(result)) {
            navigate("/login");
            await dispatch(SetUser());
            dispose();
        }
    };

    return (
        <div className={styles.accounticon}>
            <CustomTooltip title="Tài khoản">
                <img
                    onClick={() => {
                        props.onToggle("B");
                    }}
                    className={styles.circle}
                    src={
                        profilePicture
                            ? `${profilePicture.src}`
                            : `/public/img/default/${
                                  user.genderId !== 2 ? "man" : "woman"
                              }_default.png`
                    }
                    alt="profile"
                ></img>
            </CustomTooltip>
            {props.isActive && (
                <div className={styles.content}>
                    <Link
                        to={`/${user.userId}`}
                        onClick={() => handleClick("profile")}
                    >
                        <div className={styles.account}>
                            <img
                                src={
                                    profilePicture
                                        ? `${profilePicture.src}`
                                        : `/public/img/default/${
                                              user.genderId !== 2
                                                  ? "man"
                                                  : "woman"
                                          }_default.png`
                                }
                                alt="profile"
                            ></img>
                            <span>{user.lastName + " " + user.firstName}</span>
                        </div>
                    </Link>
                    <Link
                        to={`/information/${user.userId}`}
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
