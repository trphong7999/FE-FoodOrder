import React from "react";
import "./styleContent.scss";
import { AiFillPushpin } from "react-icons/ai";
import { IoWallet, IoNotificationsCircleSharp } from "react-icons/io5";
import { Link, useRouteMatch } from "react-router-dom";

export default function ReceivedWait() {
  const match = useRouteMatch();
  return (
    <div className="received-content">
      <div className="received-content-list">
        <Link to={`${match.url}/cho-lay/1`}>
          <div className="list-item">
            <div className="list-item__top">
              <div className="list-item__top-number">
                <span>21</span>
                <span>#0227</span>
              </div>
              <AiFillPushpin className="list-item__top-icon" />
            </div>

            <div className="list-item__wait-time">
              Giao hàng lúc 9:10 (trong - 30 phút)
            </div>

            <div className="list-item__wait-cus list-item__dashed-boder">
              Duy Phong
            </div>

            <div className="list-item__status-driver list-item__dashed-boder list-item--p1">
              <div className="status-driver__text">
                Trạng thái:
                <span className="status-driver-2">Tài xế đang đến</span>
              </div>
              <div className="status-driver__action">
                <IoNotificationsCircleSharp className="status-driver__action-icon" />
                Báo cho tài xế
              </div>
            </div>
            <div className="list-item__bot">
              <span>3 món</span>
              <div className="list-item__bot-total">
                <IoWallet className="list-item__bot-icon" />
                <span>49.700 đ</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
