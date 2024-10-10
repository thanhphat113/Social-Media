import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import styles from './Login.module.scss'; // Nhập file SCSS
import logo from '/public/img/Cloudy.png'; // Đường dẫn logo

function Login( {onLogin} ) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Trạng thái cho popup
  const navigate = useNavigate(); 

  const handleLogin = () => {
    onLogin();
    navigate('/');
  };

  // Form đăng ký
  const SignUpForm = () => (
    <div className={`${styles.formContainer}`}>
      <div className="text-3xl font-semibold mb-4">Sign Up</div>
      <input
        type="text"
        placeholder="First Name"
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Last Name"
        className={styles.input}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={`${styles.input} mb-4`}
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
        className={`${styles.button} ${styles.signupButton}`}
      >
        Sign Up
      </button>
      
      <div className="text-center mt-4">
        <button
          onClick={() => setIsPopupOpen(false)} // Đóng popup
          className={styles.link}
        >
          Back to Log In
        </button>
      </div>
    </div>
  );

  // Form đăng nhập
  const LoginForm = () => (
    <div className={styles.formContainer}>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <input
          type="text"
          placeholder="Email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${styles.input} mb-4`}
          required
        />
        <button
          type="submit"
          className={`${styles.button} ${styles.loginButton}`}
        >
          Log In
        </button>
      </form>

      {/* Đường gạch ngang phân cách */}
      <div className={styles.separator}></div>

      {/* Link quên mật khẩu và nút tạo tài khoản */}
      <div className="flex flex-col items-center text-sm">
        <a href="#" className={styles.link}>
          Forgot account?
        </a>
        <button
          onClick={() => setIsPopupOpen(true)} // Mở popup đăng ký
          className={`${styles.button} ${styles.signupButton}`}
        >
          Sign up for Facebook
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.loginContainer}>
      <div className={styles.flexRow}>
        <div className={styles.leftSection}>
          <img src={logo} alt="Cloudy Logo" className={styles.logo} />
          <h1 className={styles.welcomeText}>Chào mừng bạn đến với Cloudy</h1>
        </div>
        <div className={styles.rightSection}>
          {LoginForm()}
        </div>
      </div>

      {/* Popup cho form đăng ký */}
      {isPopupOpen && (
        <>
          <div className={styles.popupOverlay} onClick={() => setIsPopupOpen(false)}></div> {/* Lớp phủ */}
          <div className={styles.popupContainer}>
            <SignUpForm />
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
