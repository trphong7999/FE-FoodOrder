import React from "react";
import logo from "assets/image/logo.png";
import "./style.scss";

function NavbarManager(props) {
  return (
    <div className="navbar-manager">
      <div className="logo">
        <img src={logo} alt="logo" width="80" />
      </div>
      <div className="infos">
        <div className="account">
          <div className="avt"></div>
          <div className="username">
            <p>admin@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarManager;
