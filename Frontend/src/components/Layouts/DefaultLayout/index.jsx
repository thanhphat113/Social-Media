import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { useEffect, useRef, useState, createContext  } from "react";
import { receiveMess } from "../../Redux/Slices/FriendSlice";
import { setNNPassive, setTopicPassive } from "../../Redux/Slices/MessageSlice";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";
import clsx from "clsx";
import Validate from "../../Validate";

export const messageContext = createContext();

function DefaultLayout() {
    const user = useSelector((state) => state.user.information);
    const [caller, setCaller] = useState();
    const [haveCalling, setHaveCalling] = useState();
    const location = useLocation();
    const audioRef = useRef();
    const callingRef = useRef();
    const [request, setRequest] = useState();
    const [accept, setAccept] = useState();
    const [connection, setConnection] = useState();

    const [toggleCamera, setToggleCamera] = useState(true);
    const [toggleVolume, setToggleVolume] = useState(false);

    const userVideo = useRef(null);
    const otherVideo = useRef(null);

    const dispatch = useDispatch();


    useEffect(() => {
        haveCalling && navigator.mediaDevices
            .getUserMedia({ video: toggleCamera, audio: toggleVolume })
            .then((stream) => {
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            })
            .catch((err) => {
                console.error("Lỗi truy cập thiết bị media:", err);
            });

        return () => {
            if (userVideo.current && userVideo.current.srcObject) {
                let tracks = userVideo.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [toggleCamera, toggleVolume, haveCalling]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`http://localhost:5164/onlinehub`)
            .configureLogging(signalR.LogLevel.None)
            .withAutomaticReconnect()
            .build();

        user &&
            connection
                .start()
                .then(() => setConnection(connection))
                .catch((error) => console.log("lỗi", error));

        const audioElement = callingRef.current;
        if (audioElement) {
            audioElement.addEventListener("ended", handleAudioEnd);
        }

        console.log(location.pathname);

        return () => {
            if (connection && !window.name.includes("call")) connection.stop();
            setRequest(null);
            setAccept(null);
            if (audioElement) {
                audioElement.removeEventListener("ended", handleAudioEnd);
            }

            if (callingRef.current && !callingRef.current.paused) {
                console.log("Audio is playing, attempting to stop.");
                callingRef.current.pause();
                callingRef.current.currentTime = 0;
            } else {
                console.log("Audio is not playing.");
            }
        };
    }, [user]);

    const handleAudioEnd = () => {
        cancelCall();
    };


    const handleAcceptCall = () => {
        if (callingRef.current) {
            console.log("Stopping calling audio");
            callingRef.current.pause();
            callingRef.current.currentTime = 0;
        }

        setHaveCalling(true)
        setCaller(null);
        connection
            .invoke("AcceptCall", caller.userId)
            .catch((err) => console.log("Lỗi", err));
    };

    useEffect(() => {
        caller
            ? calling()
            : () => {
                  callingRef.current.pause();
                  callingRef.current.currentTime = 0;
              };
    }, [caller]);

    useEffect(() => {
        if (connection) {
            connection.on("ReceiveMessage", async (message) => {
                await dispatch(receiveMess(message));
                notifications();
            });

            connection.on("ReceiveTopic", async (MainTopic, UserId) => {
                console.log(MainTopic, UserId);
                dispatch(setTopicPassive({ MainTopic, UserId }));
            });

            connection.on("ReceiveNickName", async (userId, message) => {
                console.log(userId, message);
                dispatch(setNNPassive({ userId, message }));
            });

            connection.on("ConnectCall", async (value) => {
                console.log("đã chạy vào đây");
                console.log(value);
                await setCaller(value);
                // calling();
            });

            connection.on("CallDeclined", async (value) => {
                await setRequest(null);
                await setAccept(value);
            });

            connection.on("RequestCall", async (value) => {
                await setHaveCalling(value);
                await setRequest(null);
                await setCaller(null);
            });

            connection.on("sendLeaveCall", async (value) => {
                console.log("đã vào đây",value)
                await setHaveCalling(value);
            });
        }
    });

    const notifications = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const cancelCall = async () => {
        callingRef.current.pause();
        callingRef.current.currentTime = 0;
        connection
            .invoke("DeclineCall", caller.userId)
            .catch((err) => console.log("Lỗi", err));
        setCaller(null);
        setRequest(null);
    };

    const leaveCall = async () => {
        connection.invoke("LeaveCall", haveCalling.callerId, haveCalling.calleeId)
            .catch((err) => console.log("Lỗi", err));
        setHaveCalling()
    }

    const calling = () => {
        if (callingRef.current) {
            callingRef.current.play();
        }
    };

    return (
        <messageContext.Provider value={{ request, setRequest }}>
            <div className={styles.wrapper}>
                <audio
                    ref={audioRef}
                    src="/public/sound/notification.mp3"
                    style={{ display: "none" }}
                />
                <audio
                    ref={callingRef}
                    src="/public/sound/calling.mp3"
                    style={{ display: "none" }}
                />
                {user && !location.pathname.startsWith("/call") && <Header />}
                <div className="container">
                    <Outlet />
                </div>
                {caller && (
                    <div className={styles.receiveCall}>
                        <div className={styles.content}>
                            <img
                                className={styles.img}
                                src={
                                    caller.profilePicture
                                        ? `${caller.profilePicture.src}`
                                        : `/public/img/default/${
                                              caller.genderId !== 2
                                                  ? "man"
                                                  : "woman"
                                          }_default.png`
                                }
                            />
                            <h1>{`${caller.lastName} ${caller.firstName}`}</h1>
                            <div className={styles.action}>
                                <i
                                    onClick={() => handleAcceptCall()}
                                    className={clsx(
                                        "fa-solid fa-check",
                                        styles.accept
                                    )}
                                ></i>
                                <i
                                    onClick={() => cancelCall()}
                                    className={clsx(
                                        "fa-solid fa-xmark",
                                        styles.cancel
                                    )}
                                ></i>
                            </div>
                        </div>
                    </div>
                )}
                {request &&
                    (request.isConnect ? (
                        <Validate message={request.message || null} />
                    ) : (
                        <Validate
                            onAccept={() => setRequest(null)}
                            message={request.message}
                        />
                    ))}
                {accept &&
                    (accept.isAccept ? (
                        <Validate message={request.message || null} />
                    ) : (
                        <Validate
                            onAccept={async () => {
                                setAccept(null);
                            }}
                            message={accept.message}
                        />
                    ))}
                {haveCalling && (
                    <div className={styles.callFrame}>
                        <video className={styles.video} ref={otherVideo}></video>
                        <div className={styles.actions}>
                            <i
                                onClick={() => setToggleCamera(!toggleCamera)}
                                className={clsx(
                                    styles.camera,
                                    toggleCamera
                                        ? "fa-solid fa-video"
                                        : "fa-solid fa-video-slash"
                                )}
                            ></i>
                            <i
                                onClick={() => setToggleVolume(!toggleVolume)}
                                className={clsx(
                                    styles.camera,
                                    toggleVolume
                                        ? "fa-solid fa-volume-high"
                                        : "fa-solid fa-volume-xmark"
                                )}
                            ></i>
                            <i
                                onClick={() => leaveCall()}
                                className={clsx(
                                    styles.stop,
                                    "fa-solid fa-phone"
                                )}
                            ></i>
                        </div>

                        <div className={styles.userScreen}>
                            <video
                                ref={userVideo}
                                autoPlay
                                playsInline
                                style={{ display: !toggleCamera && `none` }}
                            ></video>
                        </div>
                    </div>
                )}
            </div>
        </messageContext.Provider>
    );
}

export default DefaultLayout;
