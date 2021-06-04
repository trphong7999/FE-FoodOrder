import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import avtDefault from "assets/image/avartar/slide1.jpg";
import "./style.scss";
import { logout } from "redux/loginUserAppSlice";
import { useDispatch, useSelector } from "react-redux";

export default function NavAccount({ avt }) {
  const user = useSelector((state) => state.loginUserApp);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.location.reload();
  };
  return (
    <div className="account">
      <AiFillCaretDown className="account__icon" />
      <img src={avt} alt="Avatar" className="account__img" />

      <ul className="action__list">
        <li className="action__list--item">
          <Link to="/user/tai-khoan" className="action__list--link">
            Hồ sơ của tôi
          </Link>
        </li>
        <li className="action__list--item">
          <Link to="/user/dang-den" className="action__list--link">
            Theo dõi đơn đang đến
          </Link>
        </li>
        <li className="action__list--item">
          <Link to="/user/tai-khoan" className="action__list--link">
            Lịch sử đơn hàng
          </Link>
        </li>
        <li className="action__list--item">
          <div className="action__list--link" onClick={(e) => handleLogout(e)}>
            Đăng xuất
          </div>
        </li>
      </ul>
    </div>
  );
}
