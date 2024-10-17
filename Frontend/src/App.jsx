import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5164/api/Login/gettoken",
                    { withCredentials: true }
                );
                setIsAuthenticated(response.data.isAuthenticated)
            } catch {
                return
            }
        };
        checkToken()
    }, [isAuthenticated]);

    return (
        <TokenContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
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
                        <Route
                        path="*"
                        element={
                            <Authentication>
                                <Home />
                            </Authentication>
                        }
                    />
                    </Route>
                    {!isAuthenticated && <Route path="/login" element={<Login />} />}
                    
                </Routes>
            </Router>
        </TokenContext.Provider>
    );
}

export default App;
