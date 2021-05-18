import React from "react";
import "./styleContent.scss";
import { AiFillPushpin } from "react-icons/ai";
import { IoWallet, IoNotificationsCircleSharp } from "react-icons/io5";
import { Link, useRouteMatch } from "react-router-dom";
import { datetimeFromTimestamp, sumQuantity, validatePrice } from "func";

export default function ReceivedWait({ listWait }) {
  const match = useRouteMatch();
  return (
    <div className="received-content">
      <div className="received-content-list">
        {listWait.map((item, index) => (
          <div className="list-item" key={index}>
            <div className="list-item__top">
              <div className="list-item__top-number">
                <span>{index + 1}</span>
                <span>#{item._id}</span>
              </div>
              <AiFillPushpin className="list-item__top-icon" />
            </div>

            <div className="list-item__wait-time">
              Giao hàng lúc{" "}
              {datetimeFromTimestamp(parseInt(item.timeOrder) + 15 * 60000)}{" "}
              (trong -{"15"}
              phút)
            </div>

            <div className="list-item__wait-cus list-item__dashed-boder">
              {item.userOrderId.info.name}
            </div>

            <div className="list-item__status-driver list-item__dashed-boder list-item--p1">
              <div className="status-driver__text">
                Trạng thái:
                <span className="status-driver-2" style={{ color: "#53a653" }}>
                  {" "}
                  Tài xế <b>{item.deliverId.name}</b> đang đến
                </span>
              </div>
              <div className="status-driver__action">
                <IoNotificationsCircleSharp className="status-driver__action-icon" />
                Báo cho tài xế
              </div>
            </div>
            <div className="list-item__bot">
              <span>{item.detail.foods.reduce(sumQuantity, 0)} món</span>
              <div className="list-item__bot-total">
                <span className="list-item__bot-cash">Cash</span>
                <span>
                  {validatePrice(
                    item.detail.total -
                      item.detail.total * (item.merchantId.deduct / 100)
                  )}{" "}
                  đ
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
