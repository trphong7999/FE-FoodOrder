import React from "react";
import logo from "assets/image/logo.png";
import "./style.scss";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="nav__logo">
        <Link to="#">
          <img src={logo}  alt="logo" className="nav-logo__img" />
        </Link>
      </div>

      <ul className="nav__list">
        <li className="nav-list__item">
          <Link to="#" className="nav-list__link">
            Cửa hàng gần bạn
          </Link>
        </li>
        <li className="nav-list__item">
          <Link to="#" className="nav-list__link">
            Ăn sáng
          </Link>
        </li>
        <li className="nav-list__item">
          <Link to="#" className="nav-list__link">
            Ăn trưa
          </Link>
        </li>
        <li className="nav-list__item">
          <Link to="#" className="nav-list__link">
           Ăn tối
          </Link>
        </li>
        <li className="nav-list__item">
          <Link to="#" className="nav-list__link">
            Đồ ăn
          </Link>
        </li>
        <li className="nav-list__item">
          <Link to="#" className="nav-list__link">
            Đồ uống
          </Link>
        </li>
      </ul>
    
      <div className="nav__login">
        <span className="btn nav-login__btn">Đăng nhập</span>
      </div>
    </nav>
  );
}

export default Navbar;
