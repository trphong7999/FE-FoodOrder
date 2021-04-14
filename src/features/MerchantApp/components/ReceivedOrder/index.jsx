import React from "react";
import "./style.scss";
import { HiLightBulb } from "react-icons/hi";
import { AiFillPushpin } from "react-icons/ai";
import { IoWallet } from "react-icons/io5";

function ReceivedOrder() {
  return (
    <div className="received-order">
      <div className="received-confirm">
        <div className="confirm active">Xác nhận bởi cửa hàng</div>
        <div className="confirm">Xác nhận tự động</div>
      </div>

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

      <div className="received-list">
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

export default ReceivedOrder;
