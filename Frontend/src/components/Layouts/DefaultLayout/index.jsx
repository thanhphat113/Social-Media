import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { TokenContext } from "../../../App";
import Header from "./Header";
import axios from "axios";

export const UserContext = createContext();

function DefaultLayout() {
    const { isAuthenticated, setIsAuthenticated } = useContext(TokenContext);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5164/api/User/findbyid",
                    {
                        withCredentials: true,
                    }
                );
                setIsAuthenticated(true);
                setUser(response.data);
            } catch (error) {
                console.log(
                    "Truyền dữ liệu thất bại",
                    error.response?.data || error.message
                );
                setIsAuthenticated(false);
            }
        };
        fetchUserData();
    }, []);


    useEffect(() => {
        if (isAuthenticated && location.pathname === "/login") {
            navigate("/");
        }
    }, [isAuthenticated, location])


    return (
        <UserContext.Provider
            value={{ user, isAuthenticated, setIsAuthenticated }}
        >
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </UserContext.Provider>
    );
}

export default DefaultLayout;
