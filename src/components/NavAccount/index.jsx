import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import ava from "assets/image/avartar/ava1.jpg";
import "./style.scss";

export default function NavAccount() {
  return (
    <div className="account">
      <AiFillCaretDown className="account__icon" />
      <img src={ava} alt="Avatar" className="account__img" />

      <ul className="action__list">
        <li className="action__list--item">
          <Link to="user/tai-khoan" className="action__list--link">
            Hồ sơ của tôi
          </Link>
        </li>
        <li className="action__list--item">
          <Link to="user/tai-khoan" className="action__list--link">
            Lịch sử đơn hàng
          </Link>
        </li>
        <li className="action__list--item">
          <Link className="action__list--link">Đăng xuất</Link>
        </li>
      </ul>
    </div>
  );
}
