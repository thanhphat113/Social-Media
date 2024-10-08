import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import './Login.module.scss'

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [showSignUp, setShowSignUp] = useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
    navigate("/");
      
    } else {
      alert("Invalid login credentials");
    }
  };

  // Form đăng ký
  const SignUpForm = () => (
    <div className="bg-white p-6 rounded shadow-md w-80">
      <div className="text-lg font-semibold mb-4">Sign Up</div>
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
          onClick={() => setShowSignUp(false)}
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
      <div className="text-lg font-semibold mb-4">Log Into Facebook</div>
      <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-4">
        You must log in to continue.
      </div>
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
      <div className="flex justify-between text-sm mt-4">
        <a href="#" className="text-blue-600">
          Forgot account?
        </a>
        <button
          onClick={() => setShowSignUp(true)} 
          className="text-blue-600"
        >
          Sign up for Facebook
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-4xl font-bold text-blue-600 mb-4">facebook</div>
      <div className="flex items-center bg-white p-2 rounded shadow-md mb-4">
        <FaInfoCircle className="text-blue-600 mr-2" />
        <span>You must log in to continue.</span>
      </div>
      {showSignUp ? <SignUpForm /> : <LoginForm />}
    </div>
  );
}

export default LoginPage;
