
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Login from "./pages/Login";
import Message from "./pages/Message";
import GroupList from "./pages/Group/components/GroupList";
import ProfileGroup from "./pages/ProfileGroup";
import Home from "./pages/Home";
<<<<<<< HEAD
import Information from "./pages/Information";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Profile from "./pages/Profile";
import Authentication from "./components/Authentication";
import { SetUser } from "./components/Redux/Actions/UserAction";
import Validate from "./components/Validate";

function App() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getuser = async () => {
            const response = await dispatch(SetUser());
            if (SetUser.fulfilled.match(response)) {
                navigate("/");
            }
        };
        getuser();
    }, []);

    return (
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
                            `<Information />
                        </Authentication>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Login />} />
            </Route>
        </Routes>
    );
<<<<<<< HEAD

=======
=======
import Login from "./pages/Login/index.jsx";
import Information from "./pages/Information/index.jsx";
import Group from "./pages/Group/index.jsx"
import NewGroupPage from "./pages/Group/NewGroup/index.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
      <Router>
          {isAuthenticated ? (
              <DefaultLayout>
                  <Routes>
                      <Route path="/message" element={<MessagePage />} />
                      <Route path="/" element={<Home />} />
                      <Route path="/group" element={<Group />} />
                      <Route path="/new-group" element={<NewGroupPage />} />
                      {/* <Route path="/profile" element={<Profile />} /> */}
                      <Route path="/information" element={<Information />} />
                  </Routes>
              </DefaultLayout>
          ) : (
              <Routes>
                  <Route
                      path="/login"
                      element={
                          <Login onLogin={() => {
                              setIsAuthenticated(true)
                              }
                              } />
                      }
                  />
                  <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
          )}
      </Router>
  );
>>>>>>> 94207f6 (Sidebar tạo nhóm, trang tạo nhóm, và post)
>>>>>>> 6198759 (Sidebar tạo nhóm, trang tạo nhóm, và post)
}

export default App;
