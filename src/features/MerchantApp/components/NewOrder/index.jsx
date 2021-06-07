import React, { useState, useEffect } from "react";
import { IoWallet } from "react-icons/io5";
import "./style.scss";
import { useHistory, useRouteMatch } from "react-router-dom";
import { validatePrice, datetimeFromTimestamp, sumQuantity } from "func";
import socket from "socket-io.js";
import userAPi from "api/userApi";

function NewOrder({ newListOrder }) {
  const match = useRouteMatch();
  const history = useHistory();
  const [serialOrder, setSerialOrder] = useState(0);
  const [historyOrder, setHistoryOrder] = useState([]);
  const detailOrder = newListOrder[serialOrder];
  const userInfo = detailOrder.userOrderId.info;
  const percent =
    historyOrder.filter((od) => od.status === "complete").length /
      historyOrder.length || 0;
  const lastOrder = historyOrder.slice(-1).pop() || {};
  const handleChangeOrderDetail = (index) => {
    setSerialOrder(index);
  };
  const handleConfirmAdd = () => {
    socket.emit("acceptOrder", detailOrder._id);
    history.push(`merchant/da-nhan`);
  };
  // ------------------------------------------------------------
  const changeUrlToRefusal = () => {
    const location = {
      pathname: `${match.url}/moi-tu-choi`,
      state: { detailOrderNeedCancel: detailOrder },
    };
    console.log(location);
    history.push(location);
    history.replace(location);
  };

  useEffect(() => {
    const fetchPrestige = async () => {
      const res = await userAPi.getPrestige(
        newListOrder[serialOrder].userOrderId._id
      );
      if (!res.status || res.status == 200) {
        setHistoryOrder(res);
      }
    };
    fetchPrestige();
  }, [serialOrder]);

  return (
    <div className="content">
      <ul className="content-new-come">
        {newListOrder.map((item, index) => (
          <li
            key={item._id}
            index={index}
            className={
              serialOrder === index
                ? "new-come__item new-come__item--active"
                : "new-come__item"
            }
            onClick={() => {
              handleChangeOrderDetail(index);
            }}
          >
            <span className="new-come__item-stt">{index + 1}</span>
            <span className="new-come__item-time">({15}')</span>
          </li>
        ))}
      </ul>

      <div className="content-body">
        <div className="content-title">
          <span className="title-name">{userInfo.name}</span>
          <span className="title-quantity">
            Đã đặt: {historyOrder.length} đơn | Tỉ lệ thành công:
            {percent.toFixed(2) * 100}% | Đơn gần nhất:
            {lastOrder.status && lastOrder.status === "complete"
              ? "Thành công"
              : "Thất bại" || ""}
          </span>
        </div>

        <div className="content-time">
          <div className="time-left">
            <span className="time-left__limit">
              Lấy trong <span>{15}</span> phút (
              {datetimeFromTimestamp(
                parseInt(detailOrder.timeOrder) +
                  (detailOrder.distance * 5 + 10) * 60000
              )}
              )
            </span>
            <span className="time-left__space">
              cách: {detailOrder.distance} km
            </span>
          </div>
        </div>

        <div className="content-order">
          <div className="content-note">
            <span className="note-title">Ghi chú khách hàng: </span>
            <span className="note-content">{detailOrder.note}</span>
          </div>

          {detailOrder.detail.foods.map((food, index) => (
            <div key={index} index={index} className="content-order__item">
              <div className="item-quantity">{food.quantity} x</div>
              <div className="item-food">
                <div className="item-food__name">{food.name}</div>
              </div>
              <div className="item-total">{validatePrice(food.total)}</div>
            </div>
          ))}
        </div>

        <div className="confirm-order">
          <div className="confirm-order__text">
            <span>
              Thu của khách hàng (
              {detailOrder.detail.foods.reduce(sumQuantity, 0)} món)
            </span>
            <div className="text-total">
              <IoWallet className="text-total__icon" />
              <span>{validatePrice(detailOrder.detail.total)} đ</span>
            </div>
          </div>

          <div className="confirm-order__button">
            <button
              onClick={() => {
                changeUrlToRefusal();
              }}
            >
              Từ chối
            </button>

            <button
              onClick={() => {
                handleConfirmAdd();
              }}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
