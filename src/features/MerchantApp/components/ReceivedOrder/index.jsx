import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import TabMenu from "../TabMenu";
import ReceivedConfirm from "./receivedConfirm";
import ReceivedPrepare from "./receivedPrepare";
import ReceivedWait from "./receivedWait";
import "./style.scss";
import axios from "axios";

function ReceivedOrder() {
  const [listConfirm, setListConfirm] = useState([
    { id: 0, title: "Xác nhận bởi cửa hàng", active: true },
    { id: 1, title: "Đang chuẩn bị", active: false },
    { id: 2, title: "Chờ đến lấy", active: false },
  ]);
  const [countTabList, setCountTabList] = useState(1);
  const [listReceived, setListReceived] = useState([]);
  const [listPrepare, setListPrepare] = useState([]);
  const [listWait, setListWait] = useState([]);

  const handleActiveReceivedTabList = (index) => {
    const newListTab = listConfirm;
    listConfirm.map((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setListConfirm(newListTab);
    setCountTabList(index + 1);
  };

  useEffect(() => {
    const getReceivedList = async () => {
      const result = await axios(`http://localhost:5000/receivedOrder`);
      if (result) {
        setListReceived(result.data);
      }
    };
    getReceivedList();
  }, []);

  useEffect(() => {
    const getPrepareList = async () => {
      const result = await axios(`http://localhost:5000/receivedPrepare`);
      if (result) {
        setListPrepare(result.data);
      }
    };
    getPrepareList();
  }, []);

  useEffect(() => {
    const getWaitList = async () => {
      const result = await axios(`http://localhost:5000/receivedWait`);
      if (result) {
        setListWait(result.data);
      }
    };
    getWaitList();
  }, []);

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
          <ReceivedConfirm listReceived={listReceived} />
        ) : countTabList === 2 ? (
          <ReceivedPrepare listPrepare={listPrepare} />
        ) : (
          <ReceivedWait listWait={listWait} />
        )}

        {/* ----------RECEIVED CONFIRM END--------------- */}
      </div>
    </div>
  );
}

export default ReceivedOrder;
