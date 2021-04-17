import React, { useState } from "react";
import NavBar from "../NavBar";
import TabMenu from "../TabMenu";
import ReceivedConfirm from "./receivedConfirm";
import ReceivedPrepare from "./receivedPrepare";
import ReceivedWait from "./receivedWait";
import "./style.scss";

function ReceivedOrder() {
  const [listConfirm, setListConfirm] = useState([
    { id: 0, title: "Xác nhận bởi cửa hàng", active: true },
    { id: 1, title: "Đang chuẩn bị", active: false },
    { id: 2, title: "Chờ đến lấy", active: false },
  ]);
  const [countTabList, setCountTabList] = useState(1);

  const handleActiveReceivedTabList = (index) => {
    const newList = listConfirm;
    listConfirm.map((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setListConfirm(newList);
    setCountTabList(index + 1);
    console.log(index);
    console.log(newList);
  };

  return (
    <div className="grid">
      <NavBar />
      <TabMenu />
      <div className="received-order">
        <div className="received-tab">
          <ul className="received-tab__list">
            {listConfirm.map((item, index) => (
              <li
                key={item.id}
                index={index}
                className={
                  item.active
                    ? "received-tab__list-item received-tab__list-item--active"
                    : "received-tab__list-item "
                }
                onClick={() => {
                  handleActiveReceivedTabList(index);
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        {/* ----------RECEIVED CONFIRM--------------- */}
        {countTabList === 1 ? (
          <ReceivedConfirm />
        ) : countTabList === 2 ? (
          <ReceivedPrepare />
        ) : (
          <ReceivedWait />
        )}

        {/* ----------RECEIVED CONFIRM END--------------- */}
      </div>
    </div>
  );
}

export default ReceivedOrder;
