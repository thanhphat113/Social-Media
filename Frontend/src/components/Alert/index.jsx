import clsx from "clsx";
import { useState, useEffect } from "react";
import styles from "./Alert.module.scss";

function Alert({ type, message }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isAppear, setIsAppear] = useState(false);
    const [shouldMove, setShouldMove] = useState(false);

	const alert = {
		icon: type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation',
		color: type === 'success' ? '#66f166': 'red',
	}

    useEffect(() => {
		const moveIn = setTimeout(() => {
            setIsAppear(true);
        }, 0);

        const moveOut = setTimeout(() => {
            setShouldMove(true);
        }, 4000);

        const hideTimeout = setTimeout(() => {
            setIsVisible(false);
        }, 5500);

        return () => {
            clearTimeout(moveIn);
            clearTimeout(moveOut);
            clearTimeout(hideTimeout);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div
                    className={clsx(styles.wrapper, {
                        [styles.moveOut]: shouldMove,
                        [styles.moveIn]: isAppear,
                    })}
                    style={{ borderColor: `${alert.color}` }}
                >
                    <div className={styles.type}>
                        <i
                            className= {clsx(`${alert.icon}`)}
                            style={{ color: `${alert.color}` }}
                        ></i>
                    </div>
                    <div className={styles.content}>
                        <h3>Thông báo</h3>
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Alert;
