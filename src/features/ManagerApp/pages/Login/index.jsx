import React, { useState } from "react";
import "./style.scss";
import { FaUsersCog, FaKey } from "react-icons/fa";
import logo from "assets/image/logo.png";

function ManagerApp({ user, setIsLogin }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
          <button
            onClick={(event) => {
              if (userName === user.name && password === user.pass)
                setIsLogin(true);
            }}
          >
            <i className="spinner"></i>
            <span className="state">Log in</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManagerApp;
