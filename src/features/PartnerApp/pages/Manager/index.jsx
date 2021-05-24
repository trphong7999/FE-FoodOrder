import React, { useState } from "react";
import { RiBillFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoWalletSharp } from "react-icons/io5";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import "./style.scss";
import OrderManager from "features/PartnerApp/components/OrderManager";
import InCome from "features/PartnerApp/components/InCome";
import Profile from "features/PartnerApp/components/Profile";
import Wallet from "features/PartnerApp/components/Wallet";
import { useDispatch } from "react-redux";
import { logoutPartner } from "redux/loginPartnerAppSlice";
import partnerApi from "api/partnerApi";

export default function Manager() {
  const [footTabList, setFootTabList] = useState(1);
  const dispatch = useDispatch();

  partnerApi.checkAuth().then((res) => {
    try {
      if (res.status === 400) {
        dispatch(logoutPartner());
      }
    } catch {
      return;
    }
  });

  const handleChangeFootTabList = (num) => {
    setFootTabList(num);
  };

  return (
    <div className="grid">
      <div className="main-page__partner">
        <div className="main-body">
          {footTabList === 1 ? (
            <OrderManager />
          ) : footTabList === 2 ? (
            <InCome />
          ) : footTabList === 3 ? (
            <Wallet />
          ) : footTabList === 4 ? (
            "chate"
          ) : (
            <Profile />
          )}
        </div>
        <div className="main-foot">
          <FootTab
            footTabList={footTabList}
            changeTabCallBack={handleChangeFootTabList}
          />
        </div>
      </div>
    </div>
  );
}

function FootTab({ changeTabCallBack, footTabList }) {
  const sendDataChangeTab = (data) => {
    changeTabCallBack(data);
  };
  return (
    <div className="foot-tab">
      <ul className="tab-list">
        <li
          className={`tab-list__item ${
            footTabList === 1 ? "tab-list__item--active" : ""
          }`}
          onClick={() => {
            sendDataChangeTab(1);
          }}
        >
          <RiBillFill className="tab-list__item-icon" />
          Đơn
        </li>
        <li
          className={`tab-list__item ${
            footTabList === 2 ? "tab-list__item--active" : ""
          }`}
          onClick={() => {
            sendDataChangeTab(2);
          }}
        >
          <RiMoneyDollarCircleFill className="tab-list__item-icon" />
          Thu nhập
        </li>
        <li
          className={`tab-list__item ${
            footTabList === 3 ? "tab-list__item--active" : ""
          }`}
          onClick={() => {
            sendDataChangeTab(3);
          }}
        >
          <IoWalletSharp className="tab-list__item-icon" />
          Ví tiền
        </li>
        <li
          className={`tab-list__item ${
            footTabList === 4 ? "tab-list__item--active" : ""
          }`}
          onClick={() => {
            sendDataChangeTab(4);
          }}
        >
          <BsFillChatDotsFill className="tab-list__item-icon" />
          Chat
        </li>
        <li
          className={`tab-list__item ${
            footTabList === 5 ? "tab-list__item--active" : ""
          }`}
          onClick={() => {
            sendDataChangeTab(5);
          }}
        >
          <MdAccountCircle className="tab-list__item-icon" />
          Tôi
        </li>
      </ul>
    </div>
  );
}
