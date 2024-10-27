import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import styles from "./Login.module.scss";
import { login } from "../../components/Redux/Actions/LoginActions";
import { SetUser } from "../../components/Redux/Actions/UserAction";
import { getFriendList } from "../../components/Redux/Actions/FriendActions";
import logo from "/public/img/Cloudy.png";

// Component LoginForm
const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    onLogin,
    openSignUp,
}) => (
    <div className={styles.formContainer}>
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onLogin();
            }}
        >
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
    firstName,
    setFirstName,
    lastName,
    setLastName,
    signUpEmail,
    setSignUpEmail,
    validateEmail,
    setValidateEmail,
    signUpPassword,
    setSignUpPassword,
    signUpConfirmPassword,
    setSignUpConfirmPassword,
    closeSignUp,
}) => {
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `http://localhost:5164/api/Login/CheckEmail?email=${
                    signUpEmail || " "
                }`
            );
            setValidateEmail(response.data.result.result);
        }

        if (signUpEmail && signUpEmail.trim() !== "") {
            fetchData();
        } else {
            setValidateEmail("");
        }
    }, [signUpEmail]);

    return (
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
            <span style={{ color: validateEmail.isTrue ? "green" : "red" }}>
                {validateEmail.notification}
            </span>
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
                    onClick={async () => {
                        if (validateEmail.isTrue) {
                            if (signUpPassword === signUpConfirmPassword) {
                                const email = signUpEmail;
                                const passWord = signUpPassword;
                                try {
                                    const response = await axios.post(
                                        "http://localhost:5164/api/User",
                                        { firstName, lastName, email, passWord }
                                    );
                                    console.log(response.data);
                                } catch {
                                    console.log("Đăng ký thất bại rồi");
                                }
                                // Đặt lại các giá trị của form sau khi đăng ký thành công
                                setFirstName("");
                                setLastName("");
                                setSignUpEmail("");
                                setSignUpPassword("");
                                setSignUpConfirmPassword("");
                                closeSignUp(); // Đóng popup sau khi đăng ký thành công
                            } else {
                                alert("Passwords do not match!");
                            }
                        } else {
                            alert("Email của bạn không hợp lệ");
                        }
                    }}
                    className={`${styles.button} ${styles.signupButton}`}
                >
                    Sign Up
                </button>

                <button onClick={closeSignUp} className={styles.link}>
                    <FaArrowLeft />
                    Back to Log In
                </button>
            </div>
        </div>
    );
};

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    // State cho form đăng ký
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [validateEmail, setValidateEmail] = useState([]);
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        const actionResult = await dispatch(login({ email, password }));
        if (login.fulfilled.match(actionResult)) {
            if (actionResult.payload === true) {
                await dispatch(SetUser());
                navigate("/");
            } else {
                console.log("11");
            }
        } else {
            console.log("Có lỗi xảy ra trong quá trình đăng nhập");
        }
    };

    useEffect(() => {
        const getFriend = async () => {
            await dispatch(getFriendList(user.userId));
        };
        user && getFriend
    });

    return (
        <div className={styles.loginContainer}>
            <div className={styles.flexRow}>
                <div className={styles.leftSection}>
                    <img src={logo} alt="Cloudy Logo" className={styles.logo} />
                    <h1 className={styles.welcomeText}>
                        Chào mừng bạn đến với <strong>Cloudy</strong>
                    </h1>
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
                    <div
                        className={styles.popupOverlay}
                        onClick={() => setIsPopupOpen(false)}
                    ></div>
                    <div className={styles.popupContainer}>
                        <SignUpForm
                            firstName={firstName}
                            setFirstName={setFirstName}
                            lastName={lastName}
                            setLastName={setLastName}
                            validateEmail={validateEmail}
                            setValidateEmail={setValidateEmail}
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
