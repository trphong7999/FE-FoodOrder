import React from "react";
import "./styleContent.scss";
import { AiFillPushpin } from "react-icons/ai";
import { IoWallet, IoNotificationsCircleSharp } from "react-icons/io5";
import { Link, useRouteMatch } from "react-router-dom";

export default function ReceivedPrepare() {
  const match = useRouteMatch();
  return (
    <div className="received-content">
      <div className="received-content-list">
        <Link to={`${match.url}/chuan-bi/1`}>
          <div className="list-item">
            <div className="list-item__top">
              <div className="list-item__top-number">
                <span>22</span>
                <span>#0228</span>
              </div>
              <AiFillPushpin className="list-item__top-icon" />
            </div>
            <div className="list-item__time">
              <span>Giao hàng lúc 23:10 (trong - 30 phút)</span>
            </div>
            <div className="list-item__customer">
              <span>Huynh Nhi</span>
            </div>
            <div className="list-item__status-driver">
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
