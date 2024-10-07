import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessagePage from "./pages/Message";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import Navbar from "./pages/Navbar";
import PrivateRoute from "./pages/Login/PrivateRoute";

function App() {
    return (
        <Router>
        <Routes>
    
          <Route path="/login" element={<LoginPage />} />
        
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    );
}

export default App;
