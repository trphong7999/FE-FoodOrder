import React from "react";
import "./styleContent.scss";
import { HiLightBulb } from "react-icons/hi";
import { AiFillPushpin } from "react-icons/ai";
import { IoWallet } from "react-icons/io5";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  validatePrice,
  sumQuantity,
  sumTotal,
  datetimeFromTimestamp,
} from "func";
import socket from "socket-io.js";

export default function ReceivedConfirm({ listReceived, setListReceived }) {
  const match = useRouteMatch();
  const history = useHistory();
  // const location = useLocation();

  const changeUrlToDetail = (order) => {
    const location = {
      pathname: `${match.url}/xac-nhan/${order._id}`,
      state: { orderDetail: order },
    };
    history.push(location);
    history.replace(location);
  };

  return (
    <div className="received-content">
      <div className="received-note">
        <div className="note-wrap">
          <div className="note-icon">
            <HiLightBulb className="icon" />
          </div>
          <div className="note-content">
            Vui lòng xem chi tiết đơn hàng để xác nhận đơn hàng. Nếu không, đơn
            có thể bị khách hủy
          </div>
        </div>
      </div>

      <div className="received-content-list">
        {listReceived.map((order, index) => (
          <div
            className="list-item"
            key={order._id}
            onClick={() => {
              changeUrlToDetail(order);
            }}
          >
            <div className="list-item__top">
              <div className="list-item__top-number">
                <span>{index + 1}</span>
                <span>#{order._id}</span>
              </div>
              <AiFillPushpin className="list-item__top-icon" />
            </div>
            <div className="list-item__time">
              <span>
                Giao hàng lúc{" "}
                {datetimeFromTimestamp(parseInt(order.timeOrder) + 15 * 60000)}{" "}
                (trong - {15} phút)
              </span>
            </div>
            <div className="list-item__customer">
              <span>{order.userOrderId.info.name}</span>
            </div>
            <div className="list-item__status-driver">
              <div className="status-driver__text">
                Trạng thái:
                {order.deliverId ? (
                  <span
                    className="status-driver-1"
                    style={{ color: "#53a653", fontWeight: "bold" }}
                  >
                    Tài xế <b>{order.deliverId.name}</b> đã nhận đơn
                  </span>
                ) : (
                  <span className="status-driver-1">Đang chỉ định tài xế</span>
                )}
              </div>
            </div>
            <div className="list-item__bot">
              <span>{order.detail.foods.reduce(sumQuantity, 0)} món</span>
              <div className="list-item__bot-total">
                <IoWallet className="list-item__bot-icon" />
                <span>
                  Giá gốc:{" "}
                  {validatePrice(order.detail.foods.reduce(sumTotal, 0))} đ
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
