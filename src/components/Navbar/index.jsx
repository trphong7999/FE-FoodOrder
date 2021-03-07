import React from "react";
import logo from "assets/image/logo.png";
import "./style.scss";
function Navbar(props) {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="" width="50" />
      </div>
      <div className="choose">
        <li className="type">Cửa hàng gần bạn</li>
        <li className="type">Ăn sáng</li>
        <li className="type">Ăn trưa</li>
        <li className="type">Ăn tối</li>
        <li className="type">Đồ ăn</li>
        <li className="type">Đồ uống</li>
      </div>
    </nav>
  );
}

export default Navbar;
