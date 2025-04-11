import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./Signup.css";
import Hdr from "../../components/hdr/hdr";
import Footer from "../../components/footer/footer";

const LoginRegister = () => {
  const navigate = useNavigate(); // ✅ Initialize useNavigate
  const [isLogin, setIsLogin] = useState(true);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { userName, email, password, confirmPassword } = registerData;

    if (password !== confirmPassword) {
      setRegisterMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/public/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setRegisterMessage("Registered successfully!");

        const loginRes = await fetch("http://localhost:8080/public/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, password }),
        });

        const loginData = await loginRes.json();
        localStorage.setItem("jwtToken", loginData.token);
        localStorage.setItem("userId", loginData.userId);

        navigate("/dashboard"); // ✅ Navigate after success
      } else {
        setRegisterMessage(data.message || "Registration failed.");
      }
    } catch (err) {
      setRegisterMessage("Network error. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: loginUsername, password: loginPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("userId", data.userId);
        setLoginMessage("Login successful!");
        navigate("/dashboard"); // ✅ Navigate after success
      } else {
        setLoginMessage(data.message || "Login failed.");
      }
    } catch (err) {
      setLoginMessage("Network error. Please try again.");
    }
  };

  return (
    <>
      <Hdr />
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-toggle-buttons">
            <button
              onClick={() => setIsLogin(true)}
              className={isLogin ? "signup-active" : ""}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={!isLogin ? "signup-active" : ""}
            >
              Register
            </button>
          </div>
          <div className="signup-form-container">
            {isLogin ? (
              <form onSubmit={handleLogin} className="signup-form signup-active">
                <h2>Login</h2>
                <input
                  type="text"
                  id="loginUsername"
                  placeholder="Username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  id="loginPassword"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
                <p style={{ color: loginMessage.includes("successful") ? "green" : "red" }}>
                  {loginMessage}
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="signup-form signup-active">
                <h2>Register</h2>
                <input
                  type="text"
                  id="userName"
                  placeholder="Username"
                  value={registerData.userName}
                  onChange={handleRegisterChange}
                  required
                />
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
                <button type="submit">Register</button>
                <p
                  style={{ color: registerMessage.includes("success") ? "green" : "red" }}
                >
                  {registerMessage}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginRegister;
