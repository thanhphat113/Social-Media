import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import Message from "./pages/Message";
import GroupList from "./pages/Group/components/GroupList";
import ProfileGroup from "./pages/ProfileGroup";
import Home from "./pages/Home";
import Information from "./pages/Information";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Profile from "./pages/Profile";
import Authentication from "./components/Authentication";
import axios from "axios";

export const TokenContext = createContext();

function App() {
    const [user, setUser] = useState(null);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5164/api/User/findbyid",
                    {
                        withCredentials: true,
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
    },[reset]);

    return (
        <TokenContext.Provider value={{ user, setReset, reset, setUser }}>
            <Router>
                <Routes>
                    <Route element={<DefaultLayout />}>
                        <Route
                            path="/message"
                            element={
                                <Authentication>
                                    <Message />
                                </Authentication>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <Authentication>
                                    <Home />
                                </Authentication>
                            }
                        />
                        <Route
                            path="/group"
                            element={
                                <Authentication>
                                    <GroupList />
                                </Authentication>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <Authentication>
                                    <Profile />
                                </Authentication>
                            }
                        />
                        <Route
                            path="/profilegroup"
                            element={
                                <Authentication>
                                    <ProfileGroup />
                                </Authentication>
                            }
                        />
                        <Route
                            path="/information"
                            element={
                                <Authentication>
                                    <Information />
                                </Authentication>
                            }
                        />
                          <Route path="/login" element={<Login />} />
                          <Route path="*" element={<Login /> } />
                    </Route>
                </Routes>
            </Router>
        </TokenContext.Provider>
    );
}

export default App;
