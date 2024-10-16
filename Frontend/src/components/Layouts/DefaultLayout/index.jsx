import { Outlet } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { TokenContext } from "../../../App";
import Header from "./Header";
import axios from "axios";

export const UserContext = createContext();

function DefaultLayout() {
    const { token } = useContext(TokenContext);
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (token) {
            const fetchUserData = async () => {
				console.log("Fetching user data...");
                try {
                    const response = await axios.get(
                        "http://localhost:5164/api/User/findbyid",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setUser(response.data);
                } catch (error) {
                    console.log(
                        "Truyền dữ liệu thất bại",
                        error.response?.data || error.message
                    );
                }
            };
            fetchUserData();
        }
    },[]);

    return (
        <UserContext.Provider value={user}>
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </UserContext.Provider>
    );
}

export default DefaultLayout;
