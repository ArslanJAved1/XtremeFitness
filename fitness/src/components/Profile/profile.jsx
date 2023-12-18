import { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
export function Profile(props) {
  // let user = props.user;
  // if (user === undefined) {
  //   user = {
  //     email: "",
  //     username: "",
  //     password: "",
  //     phone: "",
  //     address: "",
  //   };
  // }
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState(-1);

  function handleEmailChange(value) {
    setEmail(value);
  }
  function handleUsernameChange(value) {
    setUsername(value);
  }
  function handlePasswordChange(value) {
    setPassword(value);
  }
  function handlePhoneChange(value) {
    setPhone(value);
  }
  function handleAddressChange(value) {
    setAddress(value);
  }

  useEffect(() => {
    const getProfile = async () => {
      const user_id = localStorage.getItem("user_id");
      if (user_id === undefined) return;
      try {
        const response = await axios.post(
          "http://localhost:3003/api/profile",
          {
            user_id: user_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const user = response.data[0];
          setEmail(user.email);
          setUsername(user.username);
          setPassword(user.password);
          setPhone(user.phone);
          setAddress(user.address);
          setId(user.id);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    getProfile();
  }, []);

  async function update() {
    if (username.length === 0 || password.length === 0 || email.length === 0) {
      alert("Fields are empty");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3003/api/updateUser",
        {
          email: email,
          username: username,
          password: password,
          phone: phone,
          address: address,
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        //updateUser(response.data);
        console.log(response.data);
        alert("User profile updated");
      }
    } catch (error) {
      console.log("Update Error", error);
      alert(error.response.data);
    }
  }

  return (
    <div className="profile_container">
      <div>
        <h5>Email</h5>
        <input
          className="input-text margin-left"
          type="text"
          defaultValue={email}
          name="email"
          onChange={(e) => handleEmailChange(e.target.value)}
        />
      </div>
      <div>
        <h5>Username</h5>
        <input
          className="input-text margin-left"
          type="text"
          defaultValue={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
      </div>
      <div>
        <h5>Password</h5>
        <input
          className="input-text margin-left"
          type="text"
          defaultValue={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
      </div>
      <div>
        <h5>Phone</h5>
        <input
          className="input-text margin-left"
          type="text"
          defaultValue={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
        />
      </div>
      <div>
        <h5>Address</h5>
        <input
          className="input-text margin-left"
          type="text"
          defaultValue={address}
          onChange={(e) => handleAddressChange(e.target.value)}
        />
      </div>
      <div className="button" type="button" onClick={update}>
        Update profile
      </div>
    </div>
  );
}

export default Profile;
