import React, { useState, useEffect } from "react";
import "./style.scss";
import { TiThMenu } from "react-icons/ti";
import { IoWallet } from "react-icons/io5";
import { HiClipboardList, HiDocumentReport } from "react-icons/hi";
import { MdClear, MdRestaurantMenu } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { Link, useHistory, NavLink } from "react-router-dom";
import merchantApi from "api/merchantApi";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [name, setName] = useState("");
  const history = useHistory();
  const merchantId = localStorage.merchantId;

  const createNewPlace = (place) => {
    history.push(place);
  };

  useEffect(() => {
    const getNameMerchant = async () => {
      try {
        const res = await merchantApi.get(merchantId);
        if (res) {
          setName(res.name);
        }
      } catch (error) {
        console.log("Failed get profile merchant:", error);
      }
    };
    getNameMerchant();
  }, []);

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
              <span>{name}</span>
              <MdClear
                id="close-menu-merchant-menu"
                className="menu-name__icon"
                onClick={() => setOpenMenu(!openMenu)}
              />
            </div>
            <div className="menu-content">
              <div
                className="menu-content__item"
                onClick={() => createNewPlace(`/merchant`)}
              >
                <HiClipboardList className="menu-content__item-icon menu-content__item-icon--blue" />
                <span>Đơn hàng</span>
              </div>
              <div className="menu-content__item">
                <HiDocumentReport className="menu-content__item-icon menu-content__item-icon--purple" />
                <span>Báo cáo</span>
              </div>
              <div
                className="menu-content__item"
                onClick={() => {
                  createNewPlace(`/merchant/thuc-don`);
                }}
              >
                <MdRestaurantMenu className="menu-content__item-icon menu-content__item-icon--yellow" />
                <span>Thực đơn</span>
              </div>
              <div
                className="menu-content__item"
                onClick={() => {
                  createNewPlace(`/merchant/cai-dat`);
                }}
              >
                <AiFillSetting className="menu-content__item-icon menu-content__item-icon--gray" />
                <span>Cài đặt</span>
              </div>
              {/* <div className="menu-content__item">
                <HiClipboardList className="menu-content__item-icon menu-content__item-icon--yellow" />
                <span>Khuyến mãi</span>
              </div>
              <div className="menu-content__item">
                <IoWallet className="menu-content__item-icon menu-content__item-icon--gray" />
                <span>FLM Wallet</span>
              </div> */}

              {/* <ul className="menu-content__list">
                <li
                  className="menu-content__list-item"
                  onClick={() => {
                    createNewPlace(`/merchant/thuc-don`);
                  }}
                >
                  Thực đơn
                </li>
                <li>
                  <NavLink to="" className="menu-content__list-item">
                    Khách hàng của tôi
                  </NavLink>
                </li>
                <li>
                  <Link to="" className="menu-content__list-item">
                    Quản lý nhân viên
                  </Link>
                </li>
                <li
                  className="menu-content__list-item"
                  onClick={() => {
                    createNewPlace(`/merchant/cai-dat`);
                  }}
                >
                  Cài đặt
                </li>
              </ul> */}
            </div>
          </div>
        </div>
        {/* side bar end */}
      </div>
    </div>
  );
}
