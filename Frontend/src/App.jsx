import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

import Login from "./pages/Login";
import Message from "./pages/Message";
import GroupList from "./pages/Group/components/GroupList";
import ProfileGroup from "./pages/ProfileGroup";
import Home from "./pages/Home";
import Information from "./pages/Information";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Profile from "./pages/Profile";
import Authentication from "./components/Authentication";

export const AccountContext = createContext();

function App() {
    return (
        <AccountContext.Provider value={token}>
            <Router>
                <DefaultLayout>
                    <Routes>
                        <Route path="/message" element={<Authentication><Message /></Authentication>} />
                        <Route path="/" element={<Authentication><Home /></Authentication>} />
                        <Route path="/group" element={<Authentication><GroupList /></Authentication>} />
                        <Route path="/profile" element={<Authentication><Profile /></Authentication>} />
                        <Route path="/profilegroup" element={<Authentication><ProfileGroup /></Authentication>} />
                        <Route path="/information" element={<Authentication><Information /></Authentication>} />
                    </Routes>
                </DefaultLayout>
                <Routes>
                        <Route
                            path="/login"
                            element={<Login />} />
                        <Route path="*" element={<Navigate to ="/Login" />} />
                    </Routes>
            </Router>
        </AccountContext.Provider>
    );
}

export default App;
