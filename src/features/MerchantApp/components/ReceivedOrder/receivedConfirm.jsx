import React from "react";
import "./styleContent.scss";
import { HiLightBulb } from "react-icons/hi";
import { AiFillPushpin } from "react-icons/ai";
import { IoWallet } from "react-icons/io5";
import { Link, useRouteMatch } from "react-router-dom";

export default function ReceivedConfirm() {
  const match = useRouteMatch();
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
        <Link to={`${match.url}/xac-nhan/1`}>
          <div className="list-item">
            <div className="list-item__top">
              <div className="list-item__top-number">
                <div>23</div>
                <div>#0229</div>
              </div>
              <AiFillPushpin className="list-item__top-icon" />
            </div>
            <div className="list-item__time">
              <span>Giao hàng lúc 23:10 (trong - 17h 12m)</span>
            </div>
            <div className="list-item__customer">
              <span>Tran Duy Phong</span>
            </div>
            <div className="list-item__status-driver">
              <span>Trạng thái:</span>
              <span className="status-driver-1">Đang chỉ định tài xế</span>
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

        <div className="list-item">
          <div className="list-item__top">
            <div className="list-item__top-number">
              <div>23</div>
              <div>#0229</div>
            </div>
            <AiFillPushpin className="list-item__top-icon" />
          </div>

          <div className="list-item__time">
            <span>Giao hàng lúc 23:10 (trong - 17h 12m)</span>
          </div>
          <div className="list-item__customer">
            <span>Huynh Nhi</span>
          </div>
          <div className="list-item__status-driver">
            <span>Trạng thái:</span>
            <span>Đang chỉ định tài xế</span>
          </div>

          <div className="list-item__bot">
            <span>3 món</span>
            <div className="list-item__bot-total">
              <IoWallet className="list-item__bot-icon" />
              <span>49.700 đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
