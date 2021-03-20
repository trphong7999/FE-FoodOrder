import React, { useState } from "react";
import logo from "assets/image/logo.png";
import "./style.scss";
import { Link } from "react-router-dom";
import TransitionsModal from "components/TransitionsModal";
import NavAccount from "components/NavAccount";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClear } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";

function Navbar(props) {
  const [account, setAccount] = useState(1);

  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenuMobile = () => {
    setShowMenu(!showMenu);
  };
  return (
    <nav className="navbar">
      <section className="grid wide">
        <div className="nav__wrap">
          <div className="nav__logo">
            <Link to="/user">
              <img src={logo} alt="logo" className="nav-logo__img" />
            </Link>
          </div>

          <ul className="nav__list">
            <li className="nav-list__item">
              <Link to="#" className="nav-list__link  ">
                Cửa hàng gần bạn
              </Link>
            </li>
            <li className="nav-list__item">
              <Link to="#" className="nav-list__link nav-list__link--active">
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

          <div className="nav__account">
            {account === 1 ? <TransitionsModal /> : <NavAccount />}
          </div>

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
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
