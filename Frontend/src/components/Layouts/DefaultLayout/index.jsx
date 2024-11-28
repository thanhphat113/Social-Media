import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { useEffect, useRef } from "react";
import { receiveMess } from "../../Redux/Slices/FriendSlice";
import { setNNPassive, setTopicPassive } from "../../Redux/Slices/MessageSlice";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";

function DefaultLayout() {
    const user = useSelector((state) => state.user.information);
    const audioRef = useRef()

    const dispatch = useDispatch();

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`http://localhost:5164/onlinehub`)
            // .configureLogging(signalR.LogLevel.None)
            .withAutomaticReconnect()
            .build();

        user && connection.start().catch((error) => console.log("lỗi", error));

        connection.on("ReceiveMessage", async (message) => {
            await dispatch(receiveMess(message));
            notifications();
        });

        connection.on("ReceiveTopic", async (MainTopic, UserId) => {
            // await dispatch(receiveMess(message));
            console.log(MainTopic, UserId);
            dispatch(setTopicPassive({ MainTopic, UserId }));
        });

        connection.on(
            "ReceiveNickName",
            async (userId, message) => {
                // await dispatch(receiveMess(message));
                console.log(userId, message);
                dispatch(setNNPassive( {userId, message} ))
            }
        );

        return () => {
            if (connection) connection.stop();
        };
    });

    const notifications = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className={styles.wrapper}>
            <audio
                ref={audioRef}
                src="/public/sound/notification.mp3"
                style={{ display: "none" }}
            />
            {user && <Header />}
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;
