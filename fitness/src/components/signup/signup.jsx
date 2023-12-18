import { useState } from "react";
import "./signup.css";
import background from "../../images/Signup/background.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup(props) {
  const { login, updateUser } = props;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  function handleUsernameChange(change) {
    setUsername(change);
  }

  function handlePasswordChange(change) {
    setPassword(change);
  }

  function handleEmailChange(change) {
    setEmail(change);
  }

  async function variftUser() {
    setError("");
    if (isEmpty() === true) {
      setError("Fields are empty");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3003/api/createUser",
        {
          email: email,
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
        login();
        navigate("/");
        updateUser(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log("Signup Error", error);
      setError(error.response.data);
    }
  }

  function isEmpty() {
    let empty = false;
    if (username.length === 0) empty = true;
    if (email.length === 0) empty = true;
    if (password.length === 0) empty = true;
    console.log(empty);
    return empty;
  }

  return (
    <div className="signup_main">
      <div className="signup-container">
        <h1 className="signup_title">SignUp</h1>
        <p className="signup_welcome_text">
          Sign Up To Start This Xtreme Level Fitness Joureny Today!
        </p>
        <h4>Email</h4>
        <input
          className="input-text"
          type="text"
          onChange={(e) => handleEmailChange(e.target.value)}
        />
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
            Sign Up
          </div>
          <Link className="button" to={"/login"}>
            Login
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

export default Signup;
