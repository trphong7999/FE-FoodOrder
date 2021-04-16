import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoWallet } from "react-icons/io5";
import { HiClipboardList, HiDocumentReport } from "react-icons/hi";
import { GiStorkDelivery } from "react-icons/gi";
import { MdClear } from "react-icons/md";
import NewOrder from "features/MerchantApp/components/NewOrder";
import ReceivedOrder from "features/MerchantApp/components/ReceivedOrder";
import TookOrder from "features/MerchantApp/components/TookOrder";
import CaceledOrder from "features/MerchantApp/components/CaceledOrder";
import "./style.scss";
import merchantApi from "api/merchantApi";
import { useDispatch } from "react-redux";
import { logoutMerchant } from "redux/loginMerchantAppSlice";

function MainPageMerchant() {
  const [openMenu, setOpenMenu] = useState(false);
  const [tabNavOrder, setTabNavOrder] = useState([
    { id: 0, title: "Mới", active: true },
    { id: 1, title: "Đã nhận", active: false },
    { id: 2, title: "Đã lấy", active: false },
    { id: 3, title: "Đã hủy", active: false },
  ]);
  const [serial, setSerial] = useState(1);
  const dispatch = useDispatch();

  // Check login is the manager
  merchantApi.checkAuth().then((res) => {
    try {
      if (res.status === 400) {
        dispatch(logoutMerchant());
      }
    } catch {
      return;
    }
  });

  const handleActive = (index) => {
    const list = tabNavOrder;

    list.map((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return i;
    });
    setTabNavOrder(list);
    setSerial(index + 1);
  };

  return (
    <div className="grid">
      <div className="main-merchant">
        {/* --------------------NAVBAR--------------------- */}
        <div className="header">
          <div>
            <TiThMenu
              className="header__icon-menu"
              onClick={() => setOpenMenu(!openMenu)}
            />
          </div>

          <select name="" id="" className="header-select">
            <option value="0">Hôm nay</option>
            <option value="1">Tuần này</option>
          </select>

          <div className="header-search">
            <input
              type="text"
              className="header-search__input"
              placeholder="Tìm kiếm đơn hàng"
            />
          </div>
        </div>

        {/* ----------------------TAB MENU----------------------- */}

        <ul className="tab-menu">
          {tabNavOrder.map((item, index) => (
            <li
              key={item.id}
              index={index}
              className={
                item.active
                  ? "tab-menu__item tab-menu__item--active"
                  : "tab-menu__item"
              }
              onClick={() => handleActive(index)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>

      {/* ----------------------CONTENT------------------------- */}
      {serial === 1 ? (
        <NewOrder />
      ) : serial === 2 ? (
        <ReceivedOrder />
      ) : serial === 3 ? (
        <TookOrder />
      ) : (
        <CaceledOrder />
      )}

      {/* -----------------CONTENT END----------------- */}

      {/* -------------------------------SIDE BAR MENU START------------------ */}
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
                <GiStorkDelivery className="menu-content__item-icon menu-content__item-icon--red" />
                <span>Ship</span>
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
                <li className="menu-content__list-item">Thực đơn</li>
                <li className="menu-content__list-item">Lịch sử đổi quà</li>
                <li className="menu-content__list-item">Khách hàng của tôi</li>
                <li className="menu-content__list-item">Quản lý nhân viên</li>
                <li className="menu-content__list-item">Cài đặt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------------------SIDE BAR MENU END -----------------------*/}
    </div>
  );
}

export default MainPageMerchant;
