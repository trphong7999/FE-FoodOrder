import React, { useState } from "react";
import "./style.scss";
import { FaUsersCog, FaKey } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "redux/userSlice";
import logo from "assets/image/logo.png";
import managerApi from "api/managerApi";

function ManagerApp({ setIsLogin }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const Login = async (event) => {
    event.preventDefault();
    let res = await managerApi.login({ username: userName, password });
    if (typeof res === "string") {
      const action = login({ username: userName, token: res });
      dispatch(action);
    }
  };

  return (
    <div className="wrapper">
      <div className="layer">
        <form className="login">
          <div className="top">
            <p className="title">Log in</p>
            <img src={logo} alt="logo" width="100"></img>
          </div>

          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoFocus
          />
          <FaUsersCog className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaKey className="icon" />
          <a>Forgot your password?</a>
          <button onClick={Login}>
            <i className="spinner"></i>
            <span className="state">Log in</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManagerApp;
