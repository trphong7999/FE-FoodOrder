import React from "react";
import { RiBillFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoWalletSharp } from "react-icons/io5";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import "./style.scss";
import OrderManager from "features/PartnerApp/components/OrderManager";

export default function Manager() {
  return (
    <div className="grid">
      <div className="main-page__partner">
        <div className="main-body">
          <OrderManager />
        </div>
        <div className="main-foot">
          <div className="foot-tab">
            <ul className="tab-list">
              <li className="tab-list__item tab-list__item--active">
                <RiBillFill className="tab-list__item-icon" />
                Đơn
              </li>
              <li className="tab-list__item">
                <RiMoneyDollarCircleFill className="tab-list__item-icon" />
                Thu nhập
              </li>
              <li className="tab-list__item">
                <IoWalletSharp className="tab-list__item-icon" />
                Ví tiền
              </li>
              <li className="tab-list__item">
                <BsFillChatDotsFill className="tab-list__item-icon" />
                Chat
              </li>
              <li className="tab-list__item">
                <MdAccountCircle className="tab-list__item-icon" />
                Tôi
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
