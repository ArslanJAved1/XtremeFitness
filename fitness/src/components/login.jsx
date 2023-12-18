import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import background from "../images/Signup/background.png";
import axios from "axios";

export function Login(props) {
  const { login, updateUser } = props;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleUsernameChange(change) {
    setUsername(change);
  }

  function handlePasswordChange(change) {
    setPassword(change);
  }

  async function variftUser() {
    setError("");
    if (username.length === 0 || password.length === 0) {
      setError("Empty Fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3003/api/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        updateUser(response.data[0]);
        localStorage.setItem("user_id", response.data[0].id);
        login();
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
      setError(error.response.data);
    }
  }

  return (
    <div className="signup_main">
      <div className="signup-container">
        <h1 className="signup_title">Xtreme Fitness</h1>
        <p className="signup_welcome_text">LogIn to Xtreme fitness</p>
        <h4>Username</h4>
        <input
          className="input-text"
          type="text"
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
        <h4>Password</h4>
        <input
          className="input-text"
          type="password"
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <div className="buttons">
          <div className="button" type="button" onClick={variftUser}>
            Login
          </div>
          <Link className="button" to={"/signup"}>
            Sign Up
          </Link>
        </div>
        <h4>{error}</h4>
      </div>
      <div className="signup_back">
        <img src={background} width="100%" height="100%" />
      </div>
    </div>
  );
}

export default Login;
