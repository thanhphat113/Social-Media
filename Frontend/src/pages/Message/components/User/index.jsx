import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import styles from "./User.module.scss";
import ItemUser from "./components/ItemUser";
import { findFriend } from "../../../../components/Redux/Slices/UserSlice";
import axios from "axios";

function User() {
    const friends = useSelector((state) => state.friends.allFriends);
    const userid = useSelector((state) => state.user.userid);

    const [search, setSearch] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [ischoice, setIsChoice] = useState("mess");
    const [findFriend, setFindFriend] = useState([]);

    const list = findFriend.length > 0 ? findFriend : friends;

    const handleSearch = () => {
        setFindFriend(friends.filter(user =>
            (user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase()).includes(search.toLowerCase()) // So sánh tên có phân biệt dấu
        ));
    }
    
    useEffect(() => {
        search !== "" ? handleSearch() : setFindFriend([]);
    }, [search]);


    const handleClick = () => {
        setSearch("");
        setIsShow(false);
    };

    return (
        <div className={styles.wrapper}>
            <h1>Đoạn chat</h1>
            <div className={styles.search}>
                {isShow && (
                    <button onClick={handleClick} className={styles.circle}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                )}
                <input
                    onClick={() => setIsShow(true)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm bạn bè"
                />
            </div>
            <div className={styles.choice}>
                <button
                    onClick={() => setIsChoice("mess")}
                    className={clsx({ [styles.active]: ischoice === "mess" })}
                >
                    Hộp thư
                </button>
                <button
                    onClick={() => setIsChoice("group")}
                    className={clsx({ [styles.active]: ischoice === "group" })}
                >
                    Nhóm
                </button>
            </div>
            <div className={styles.content}>
                {list && list.length > 0 ? (
                    <ItemUser list={list} />
                ) : (
                    <p style={{ paddingLeft: "10px" }}>
                        Không có ai để nhắn tin cả
                    </p>
                )}
            </div>
        </div>
    );
}

export default User;
