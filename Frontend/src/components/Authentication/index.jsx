import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectSignalR } from "../Redux/Actions/ConnectSignalR";
import { useEffect } from "react";

function Authentication({ children }) {
    const user = useSelector((state) => state.user.information);
    const dispatch = useDispatch();

    useEffect(() => {
        user && getConnect();
    }, []);

    const getConnect = async () => {
        await dispatch(connectSignalR(`http://localhost:5164/onlinehub`));
    };

    if (user) {
        return children;
    }

    return <Navigate to="/login"></Navigate>;
}

export default Authentication;
