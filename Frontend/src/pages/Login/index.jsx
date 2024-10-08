import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import './Login.module.scss';
import logo from '/public/img/Cloudy.png'; // Đường dẫn logo

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Trạng thái cho popup
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      alert("Invalid login credentials");
    }
  };

  // Form đăng ký
  const SignUpForm = () => (
    <div className="bg-white p-6 rounded shadow-md w-80">
      <div className="text-3xl font-semibold mb-4">Sign Up</div>
      <input
        type="text"
        placeholder="First Name"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Last Name"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={() => {
          if (password === confirmPassword) {
            console.log("Sign up successful");
            setIsPopupOpen(false); // Đóng popup sau khi đăng ký thành công
          } else {
            alert("Passwords do not match!");
          }
        }}
        className="w-full bg-blue-600 text-white p-2 rounded font-semibold"
      >
        Sign Up
      </button>
      
      <div className="text-center mt-4">
        <button
          onClick={() => setIsPopupOpen(false)} // Đóng popup
          className="text-blue-600"
        >
          Back to Log In
        </button>
      </div>
    </div>
  );

  // Form đăng nhập
  const LoginForm = () => (
    <div className="bg-white p-6 rounded shadow-md w-80">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded font-semibold"
        >
          Log In
        </button>
      </form>

      {/* Đường gạch ngang phân cách */}
      <div className="my-4">
        <hr className="border-t border-gray-300" />
      </div>

      {/* Link quên mật khẩu và nút tạo tài khoản */}
      <div className="flex flex-col items-center text-sm">
        <a href="#" className="text-blue-600 mb-2">
          Forgot account?
        </a>
        <button
          onClick={() => setIsPopupOpen(true)} // Mở popup đăng ký
          className="w-full bg-green-600 text-white p-2 rounded font-semibold"
        >
          Sign up for Facebook
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-row w-full max-w-4xl bg-gray-100">
        <div className="flex items-center p-6 w-1/2">
          <img src={logo} alt="Cloudy Logo" className="h-12 mr-4" />
          <h1 className="text-2xl font-bold text-blue-600">Chào mừng bạn đến với Cloudy</h1>
        </div>
        <div className="flex items-center justify-center w-1/2">
          {LoginForm()}
        </div>
      </div>

      {/* Popup cho form đăng ký */}
      {isPopupOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsPopupOpen(false)}></div> {/* Lớp phủ */}
          <div className="fixed inset-0 flex items-center justify-center">
            <SignUpForm />
          </div>
        </>
      )}
    </div>
  );
}

export default LoginPage;
