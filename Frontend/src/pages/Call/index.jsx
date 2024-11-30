import clsx from "clsx";
import styles from "./Call.module.scss";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Call() {
    const [toggleCamera, setToggleCamera] = useState(true);
    const [toggleVolume, setToggleVolume] = useState(false);
    const {id} = useParams()

    const userVideo = useRef(null);

    useEffect( () => {
        const calling = async () =>{
            try {
                const response = await axios.get(`localhost:5164/`,{
                    withCredentials:true,
                    params: {FriendId: id}
                })
                
            } catch (error) {
                console.log("Lỗi", error)
            }
        }
    },[]) 

    useEffect(() => {
        navigator.mediaDevices
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
    }, [toggleCamera,toggleVolume]);

    return (
        <div className={styles.wrapper}>
            <video
                className={styles.video}
            ></video>
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
                <i onClick={() => window.close()} className={clsx(styles.stop, "fa-solid fa-phone")}></i>
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
    );
}

export default Call;
