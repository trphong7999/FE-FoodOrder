import React, { useState } from "react";
import "./style.scss";
import YourOrder from "./YourOrder";
import FavoriteStore from "./FavoriteStore";
import CardManagement from "./CardManagement";

export default function RightColAccount() {
  const [tab, setTab] = useState([
    { id: 1, head: "Đơn hàng của bạn", active: true },
    { id: 2, head: "Cửa hàng yêu thích", active: false },
    { id: 3, head: "Quản lý thẻ", active: false },
  ]);

  const [numericalOrder, setNumericalOrder] = useState(1);

  const changeActiveTab = (index) => {
    const listTab = tab.map((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setTab(listTab);
    setNumericalOrder(index + 1);
  };

  return (
    <div className="account-right">
      <div className="account-right__head">
        <ul className="tab-navigation">
          {tab.map((item, index) => (
            <li
              key={item.id}
              index={index}
              className={item.active ? "active" : null}
              onClick={() => changeActiveTab(index)}
            >
              {item.head}
            </li>
          ))}
        </ul>
      </div>

      <div className="account-right__content">
        {numericalOrder === 1 ? <YourOrder /> : null}
        {numericalOrder === 2 ? <FavoriteStore /> : null}
        {numericalOrder === 3 ? <CardManagement /> : null}
      </div>
    </div>
  );
}
