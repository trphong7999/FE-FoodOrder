import React, { useState } from "react";
import "./style.scss";
import { TiThMenu } from "react-icons/ti";
import { IoWallet } from "react-icons/io5";
import { HiClipboardList, HiDocumentReport } from "react-icons/hi";
import { MdClear } from "react-icons/md";
import {
  Link,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
  NavLink,
} from "react-router-dom";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const createNewPlace = (place) => {
    history.push("thuc-don");
  };

  return (
    <div className="navbar-merchant">
      <div className="header">
        <div>
          <TiThMenu
            className="header__icon-menu"
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>

        {/* <select name="" id="" className="header-select">
          <option value="0">Hôm nay</option>
          <option value="1">Tuần này</option>
        </select> */}

        <div className="header-search">
          <input
            type="text"
            className="header-search__input"
            placeholder="Tìm kiếm"
          />
        </div>
      </div>

      {/* side bar */}
      <div className="side-bar">
        <div
          className={
            openMenu === false
              ? "side-bar__overlay side-bar__overlay--close"
              : "side-bar__overlay side-bar__overlay--open"
          }
        ></div>
        <div
          className={
            openMenu === false
              ? "side-bar__menu side-bar__menu--close"
              : "side-bar__menu side-bar__menu--open"
          }
        >
          <div className="menu-wrap">
            <div className="menu-name">
              <span>Hải Sản Hội An</span>
              <MdClear
                id="close-menu-merchant-menu"
                className="menu-name__icon"
                onClick={() => setOpenMenu(!openMenu)}
              />
            </div>
            <div className="menu-content">
              <div className="menu-content__item">
                <HiClipboardList className="menu-content__item-icon menu-content__item-icon--blue" />
                <span>Đơn hàng</span>
              </div>
              <div className="menu-content__item">
                <HiClipboardList className="menu-content__item-icon menu-content__item-icon--yellow" />
                <span>Khuyến mãi</span>
              </div>
              <div className="menu-content__item">
                <HiDocumentReport className="menu-content__item-icon menu-content__item-icon--purple" />
                <span>Báo cáo</span>
              </div>
              <div className="menu-content__item">
                <IoWallet className="menu-content__item-icon menu-content__item-icon--gray" />
                <span>FLM Wallet</span>
              </div>

              <ul className="menu-content__list">
                <li
                  className="menu-content__list-item"
                  onClick={() => {
                    createNewPlace(`thuc-don`);
                  }}
                >
                  Thực đơn
                </li>
                <li>
                  <NavLink
                    to="merchant/thuc-don"
                    className="menu-content__list-item"
                  >
                    Khách hàng của tôi
                  </NavLink>
                </li>
                <li>
                  <Link to="" className="menu-content__list-item">
                    Quản lý nhân viên
                  </Link>
                </li>
                <li>
                  <Link to="" className="menu-content__list-item">
                    Cài đặt
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* side bar end */}
      </div>
    </div>
  );
}
