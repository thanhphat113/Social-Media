import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import MessagePage from "./pages/Message";
import DefaultLayout from "./components/Layouts/DefaultLayout";
// import Profile from "./pages/Profile";
// import ProfileGroup from "./pages/ProfileGroup";
import Home from "./pages/Home";
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
}

export default App;
