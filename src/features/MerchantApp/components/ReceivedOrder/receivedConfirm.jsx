import React, { useState, useEffect } from "react";
import "./styleContent.scss";
import { HiLightBulb } from "react-icons/hi";
import { AiFillPushpin } from "react-icons/ai";
import { IoWallet } from "react-icons/io5";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { validatePrice, sumQuantity, sumTotal } from "func";

export default function ReceivedConfirm({ listReceived }) {
  const match = useRouteMatch();
  const history = useHistory();
  // const location = useLocation();

  const changeUrlToDetail = (id, order) => {
    const location = {
      pathname: `${match.url}/xac-nhan/${id}`,
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
            key={order.id}
            onClick={() => {
              changeUrlToDetail(order.id, order);
            }}
          >
            <div className="list-item__top">
              <div className="list-item__top-number">
                <span>{index + 1}</span>
                <span>#{order.id}</span>
              </div>
              <AiFillPushpin className="list-item__top-icon" />
            </div>
            <div className="list-item__time">
              <span>
                Giao hàng lúc {order.time.startOrder} (trong -{" "}
                {order.time.limit} phút)
              </span>
            </div>
            <div className="list-item__customer">
              <span>{order.customer.name}</span>
            </div>
            <div className="list-item__status-driver">
              <div className="status-driver__text">
                Trạng thái:
                <span className="status-driver-1">Đang chỉ định tài xế</span>
              </div>
            </div>
            <div className="list-item__bot">
              <span>{order.listFood.reduce(sumQuantity, 0)} món</span>
              <div className="list-item__bot-total">
                <IoWallet className="list-item__bot-icon" />
                <span>
                  Giá gốc: {validatePrice(order.listFood.reduce(sumTotal, 0))} đ
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
