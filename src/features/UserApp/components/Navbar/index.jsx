import React, { useState } from "react";
import logo from "assets/image/logo.png";
import "./style.scss";
import { Link } from "react-router-dom";
import avt from "assets/image/avartar/slide1.jpg";

import ModalLogin from "features/UserApp/components/ModalLogin";
import NavAccount from "features/UserApp/components/Navbar/NavAccount";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdClear, MdAssignmentInd } from "react-icons/md";
import { FaSignInAlt, FaRedRiver } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";
import { MdAssignment } from "react-icons/md";
import { GoSignIn } from "react-icons/go";
import { logout } from "redux/loginUserAppSlice";
import { useDispatch, useSelector } from "react-redux";

function Navbar(props) {
  const user = useSelector((state) => state.loginUserApp);

  // -----------SHOW MOBILE MENU-----------------------
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenuMobile = () => {
    setShowMenu(!showMenu);
  };
  console.log(user);
  // --------------------------------
  return (
    <nav className="navbar">
      <section className="grid wide">
        <div className="nav__wrap">
          <div className="nav__logo">
            <Link to="/user">
              <img src={logo} alt="logo" className="nav-logo__img" />
            </Link>
          </div>

          <div className="nav__account">
            {user.username === null ? (
              <ModalLogin />
            ) : (
              <NavAccount avt={user.profile.info.avt || avt} />
            )}
          </div>

          {/* --------------- HANDLE MOBILE MENU START --------------------------------------- */}
          <div className="nav__menu-mobile">
            <div className="menu-mobile__icon">
              <GiHamburgerMenu onClick={handleShowMenuMobile} />
            </div>

            <div
              className={
                showMenu === true
                  ? "menu-mobile__wrap"
                  : "menu-mobile__wrap menu-mobile__wrap--hidden"
              }
            >
              <div
                className={
                  showMenu === true
                    ? "menu-mobile__content menu-mobile__content--open"
                    : "menu-mobile__content menu-mobile__content--close"
                }
              >
                <div className="content__head">
                  {user.username ? (
                    <img
                      src={user.profile.info.avt}
                      alt="avatar-user"
                      className="content__head-avt"
                    />
                  ) : (
                    <img src={logo} alt="logo" className="content__head-logo" />
                  )}
                  <span className="content__head-text">
                    {user.username ? user.profile.info.name : ""}
                  </span>
                  <MdClear
                    className="content__head-icon"
                    onClick={handleShowMenuMobile}
                  />
                </div>
                {user.username ? (
                  <ListMenuMobile />
                ) : (
                  <ul className="content__list">
                    <li className="content__list-item">
                      <FaSignInAlt className="content__list-icon" />
                      <span className="content__list-span">
                        <ModalLogin />
                      </span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* ------------------------ HANDLE MOBILE MENU END --------------------- */}
        </div>
      </section>
    </nav>
  );
}

export default Navbar;

function ListMenuMobile() {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <ul className="content__list">
      <li>
        <Link to="/user/tai-khoan" className="content__list-item">
          <MdAssignmentInd className="content__list-icon" />
          <span className="content__list-span">Hồ sơ của tôi</span>
        </Link>
      </li>
      <li>
        <Link to="/user/dang-den" className="content__list-item">
          <FaRedRiver className="content__list-icon" />
          <span className="content__list-span">Theo dõi đơn hàng</span>
        </Link>
      </li>
      <li>
        <Link to="/user/tai-khoan" className="content__list-item">
          <MdAssignment className="content__list-icon" />
          <span className="content__list-span">Lịch sử đơn hàng</span>
        </Link>
      </li>
      <li className="content__list-item" onClick={(e) => handleLogout(e)}>
        <GoSignIn className="content__list-icon" />
        <span className="content__list-span">Đăng xuất</span>
      </li>
    </ul>
  );
}
