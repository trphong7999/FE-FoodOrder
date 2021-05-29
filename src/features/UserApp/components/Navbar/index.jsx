import React, { useState } from "react";
import logo from "assets/image/logo.png";
import "./style.scss";
import { Link } from "react-router-dom";
import avt from "assets/image/avartar/slide1.jpg";

import ModalLogin from "features/UserApp/components/ModalLogin";
import NavAccount from "features/UserApp/components/Navbar/NavAccount";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdClear } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";
import { useSelector } from "react-redux";

function Navbar(props) {
  const user = useSelector((state) => state.loginUserApp);

  // -----------SHOW MOBILE MENU-----------------------
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenuMobile = () => {
    setShowMenu(!showMenu);
  };
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
                  <img src={logo} alt="logo" className="content__head-logo" />
                  <MdClear
                    className="content__head-icon"
                    onClick={handleShowMenuMobile}
                  />
                </div>
                <ul className="content__list">
                  <li className="content__list-item">
                    <FaSignInAlt className="content__list-icon" />
                    <span className="content__list-span">Đăng nhập</span>
                  </li>
                  <li className="content__list-item">
                    <RiUserAddFill className="content__list-icon" />
                    <span className="content__list-span">Đăng ký</span>
                  </li>
                </ul>
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
