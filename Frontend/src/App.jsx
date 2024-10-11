import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { createContext } from 'react'

import Login from "./pages/Login";
import Message from "./pages/Message";
import GroupList from "./pages/Group/components/GroupList";
import Home from "./pages/Home";
import Information from "./pages/Information"
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Profile from "./pages/Profile";


function App() {
    return (
        <Router>
                <DefaultLayout>
                        <Routes>
                            <Route path="/message" element={<Message />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/group" element={<GroupList />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/information" element={<Information />} />
                        </Routes>
                </DefaultLayout>
                {/* <Routes>
                    <Route
                        path="/login"
                        element={<Login/>} />
                    <Route path="*" element={<Login></Login>} />
                </Routes> */}
        </Router>
    );
}

export default App;