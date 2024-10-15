import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.scss'; 
import logo from '/public/img/Cloudy.png'; 

// Component LoginForm
const LoginForm = ({ email, setEmail, password, setPassword, onLogin, openSignUp }) => (
  <div className={styles.formContainer}>
    <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
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

    <div className={styles.separator}></div>

    <div className="flex flex-col items-center text-sm">
      <a href="#" className={styles.link}>
        Forgot account?
      </a>
      <button
        onClick={openSignUp}
        className={`${styles.button} ${styles.signupButton}`}
      >
        Sign up for Facebook
      </button>
    </div>
  </div>
);

// Component SignUpForm
const SignUpForm = ({
  firstName, setFirstName,
  lastName, setLastName,
  signUpEmail, setSignUpEmail,
  signUpPassword, setSignUpPassword,
  signUpConfirmPassword, setSignUpConfirmPassword,
  closeSignUp
}) => (
  <div className={styles.formContainer}>
    <div className={styles.signUpTitle}>Sign Up</div>

    {/* Hàng chứa First Name và Last Name */}
    <div className={styles.nameRow}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className={`${styles.input} ${styles.inputHalf}`}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className={`${styles.input} ${styles.inputHalf}`}
      />
    </div>

    <input
      type="email"
      placeholder="Email"
      value={signUpEmail}
      onChange={(e) => setSignUpEmail(e.target.value)}
      className={styles.input}
    />
    <input
      type="password"
      placeholder="Password"
      value={signUpPassword}
      onChange={(e) => setSignUpPassword(e.target.value)}
      className={styles.input}
    />
    <input
      type="password"
      placeholder="Confirm Password"
      value={signUpConfirmPassword}
      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
      className={`${styles.input} mb-4`}
    />

    <div className={styles.buttonRow}>
      <button
        onClick={() => {
          if (signUpPassword === signUpConfirmPassword) {
            console.log("Sign up successful");
            // Đặt lại các giá trị của form sau khi đăng ký thành công
            setFirstName('');
            setLastName('');
            setSignUpEmail('');
            setSignUpPassword('');
            setSignUpConfirmPassword('');
            closeSignUp(); // Đóng popup sau khi đăng ký thành công
          } else {
            alert("Passwords do not match!");
          }
        }}
        className={`${styles.button} ${styles.signupButton}`}
      >
        Sign Up
      </button>

      <button
        onClick={closeSignUp} 
        className={styles.link}
      >
        <FaArrowLeft />
        Back to Log In
      </button>
    </div>
  </div>
);

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // State cho form đăng ký
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate('/');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.flexRow}>
        <div className={styles.leftSection}>
          <img src={logo} alt="Cloudy Logo" className={styles.logo} />
          <h1 className={styles.welcomeText}>Chào mừng bạn đến với Cloudy</h1>
        </div>
        <div className={styles.rightSection}>
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onLogin={handleLogin}
            openSignUp={() => setIsPopupOpen(true)}
          />
        </div>
      </div>

      {/* Popup cho form đăng ký */}
      {isPopupOpen && (
        <>
          <div className={styles.popupOverlay} onClick={() => setIsPopupOpen(false)}></div> 
          <div className={styles.popupContainer}>
            <SignUpForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              signUpEmail={signUpEmail}
              setSignUpEmail={setSignUpEmail}
              signUpPassword={signUpPassword}
              setSignUpPassword={setSignUpPassword}
              signUpConfirmPassword={signUpConfirmPassword}
              setSignUpConfirmPassword={setSignUpConfirmPassword}
              closeSignUp={() => setIsPopupOpen(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
