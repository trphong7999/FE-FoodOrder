import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import TabMenu from "../TabMenu";
import ReceivedConfirm from "./receivedConfirm";
import ReceivedPrepare from "./receivedPrepare";
import ReceivedWait from "./receivedWait";
import "./style.scss";
import axios from "axios";
import socket from "socket-io.js";
import orderApi from "api/orderApi";

function ReceivedOrder() {
  const [listConfirm, setListConfirm] = useState([
    { id: 0, title: "Xác nhận bởi cửa hàng", active: false },
    { id: 1, title: "Đang chuẩn bị", active: false },
    { id: 2, title: "Chờ đến lấy", active: false },
  ]);
  const [countTabList, setCountTabList] = useState(
    sessionStorage.stateOrder || 1
  );
  const [listReceived, setListReceived] = useState([]);
  const [listPrepare, setListPrepare] = useState([]);
  const [listWait, setListWait] = useState([]);

  socket.on("findDonePartner", ({ orderId, partner }) => {
    const updatePartner = (list, setList) => {
      let currentList = [...list];
      let order = currentList.find((or) => or._id == orderId);
      if (order) {
        order.deliverId = partner;
        order.sort((a, b) => {
          let pa, pb;
          pa = !a.deliverId ? 0 : 1;
          pb = !a.deliverId ? 0 : 1;
          if (pa !== pb) return pb - pa;
          return a.timeOrder - b.timeOrder;
        });
        setList(order);
      }
    };
    updatePartner(listReceived, setListReceived);
    updatePartner(listPrepare, setListPrepare);
  });

  useEffect(() => {
    let newList = listConfirm;
    if (sessionStorage.stateOrder) {
      newList.map((i, index) => {
        i.active = index == sessionStorage.stateOrder ? true : false;
        return i;
      });
    } else newList[0].active = true;
    setListConfirm(newList);
  }, []);

  const handleActiveReceivedTabList = (index) => {
    const newListTab = listConfirm;
    sessionStorage.setItem("stateOrder", index);
    listConfirm.map((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setListConfirm(newListTab);
    setCountTabList(index);
  };

  useEffect(() => {
    const getReceivedList = async () => {
      const ordersFinding = await orderApi.getOrderByStatus("finding");
      ordersFinding.sort((a, b) => a.timeOrder - b.timeOrder);

      const ordersWaitConfirm = await orderApi.getOrderByStatus("waitConfirm");
      ordersWaitConfirm.sort((a, b) => a.timeOrder - b.timeOrder);

      setListReceived([...ordersWaitConfirm, ...ordersFinding]);
    };

    getReceivedList();
  }, []);

  useEffect(() => {
    const getPrepareList = async () => {
      const ordersFinding = await orderApi.getOrderByStatus("picking");
      setListPrepare(ordersFinding);
    };
    getPrepareList();
  }, []);

  useEffect(() => {
    const getWaitList = async () => {
      const ordersWaitPick = await orderApi.getOrderByStatus("waitPick");
      setListWait(ordersWaitPick);
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
        {countTabList == 0 ? (
          <ReceivedConfirm
            listReceived={listReceived}
            setListReceived={setListReceived}
          />
        ) : countTabList == 1 ? (
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
