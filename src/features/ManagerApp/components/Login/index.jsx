import React from "react";
import "./style.scss";
import { FaUsersCog, FaKey } from "react-icons/fa";
import logo from "assets/image/logo.png";

function ManagerApp(props) {
  return (
    <div class="wrapper">
      <div class="layer">
        <form class="login">
          <div class="top">
            <p class="title">Log in</p>
            <img src={logo} alt="logo" width="100"></img>
          </div>

          <input type="text" placeholder="Username" autofocus />
          <FaUsersCog class="icon" />
          <input type="password" placeholder="Password" />
          <FaKey class="icon" />
          <a>Forgot your password?</a>
          <button>
            <i class="spinner"></i>
            <span class="state">Log in</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManagerApp;
