import { useState, useEffect, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import styles from "./Message.module.scss";
import User from "./components/User";
import DetailMessage from "./components/DetailMessage";
import InforMess from "./components/InforMess";
import * as signalR from "@microsoft/signalr";
import { receiveMess } from "../../components/Redux/Slices/FriendSlice";


import { setCurrentUser } from "../../components/Redux/Slices/MessageSlice";

export const connectionContext = createContext();

function Message() {
    const currentUser = useSelector((state) => state.message.currentUserId);
    const dispatch = useDispatch();

    const [show, setShow] = useState(true);
    const [connection, setConnection] = useState(null)
    const connectionId = useSelector((state) => state.signalR.connectionId);

    const handleShowInfor = () => {
        setShow(!show);
    };

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:5164/onlinehub?connectionId=${connectionId}`)
        // .configureLogging(signalR.LogLevel.None)
        .withAutomaticReconnect()
        .build();
        connection.start().then(()=>{setConnection(connection)}).catch((error) => console.log("lỗi", error));
        
        connection.on("ReceiveMessage", async (message) => {
            await dispatch(receiveMess(message))
        });

        return () => dispatch(setCurrentUser(null));
    }, []);


    if (connection === null) {
        return <div>Đang kết nối...</div>;
    }


    return (
        <connectionContext.Provider value={connection}>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.left)}>
                    <User />
                </div>
                {currentUser ? (
                    <>
                        <div className={clsx(styles.center)}>
                            <DetailMessage
                                onShow={handleShowInfor}
                            ></DetailMessage>
                        </div>
                        {show && (
                            <div className={clsx(styles.right)}>
                                <div className={styles.infor}>
                                    <InforMess />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <h1 className={clsx(styles.validate, styles.center)}>
                        Hãy chọn đoạn tin nhắn muốn hiển thị
                    </h1>
                )}
            </div>
        </connectionContext.Provider>
    );
}

export default Message;
