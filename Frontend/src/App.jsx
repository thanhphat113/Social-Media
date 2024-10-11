import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import MessagePage from "./pages/Message";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Profile from "./pages/Profile/Profile";
import ProfileGroup from "./pages/ProfileGroup/ProfileGroup";

function App() {
    return (
        <Router>
        <DefaultLayout>
                <Routes>
                    <Route path="/message" element={<MessagePage />} />
                    <Route path="/" element={<MessagePage />} />
                    <Route path="/group" element={<MessagePage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profilegroup" element={<ProfileGroup />} />
                </Routes>
        </DefaultLayout>
            </Router>
    );
}

export default App;