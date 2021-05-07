import React from "react";
import { AiOutlineArrowLeft, AiFillPhone, AiFillWechat } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { IoWallet } from "react-icons/io5";
import avtDefault from "assets/image/avartar/avt-default.jpg";

import "./style.scss";

export default function MakingDetail() {
  return (
    <div className="grid">
      <div className="making-detail">
        <div className="making-detail__head">
          <div className="head-back">
            <AiOutlineArrowLeft />
          </div>
          <div className="head-shop head-item--active">
            <div className="head-shop__title">
              <span>Delivery</span>
              <BsDot className="head-shop__title-icon" />
              <span>Quán</span>
            </div>
            <div className="head-shop__code">06345-63454234</div>
          </div>
          <div className="head-customer">Khách</div>
        </div>

        <div className="making-detail__content">
          <div className="content-top">
            <div className="content-top__name">Khôi - Phở Lẩu bò</div>
            <div className="content-top__address">
              60 Hồ Đào, Tô Hiệu, Lê Chân
            </div>
            <div className="content-top__tool">
              <div className="tool-item">
                Trả<span className="tool-item__price">81,900đ</span>
              </div>
              <BsDot />
              <div className="tool-item">
                Lấy<span className="tool-item__time">09:20</span>
              </div>
              <BsDot />
              <div className="tool-item">Quán tools</div>
            </div>
          </div>

          <div className="content-main">
            <ContentOrder />
          </div>
        </div>

        <div className="making-detail__action">
          <div className="action-row">
            <div className="action-row__item">
              <AiFillPhone className="action-row__item-icon" />
              Gọi
            </div>
            <div className="action-row__item">
              <AiFillWechat className="action-row__item-icon" />
              Chat
            </div>
            <div className="action-row__item">
              <TiDelete className="action-row__item-icon" />
              Hủy
            </div>
          </div>
          <div className="action-row">
            <div className="action-row__itemx2">
              <div style={{ "&::before": { content: "30'" } }}>Đã lấy hàng</div>
            </div>
            <div className="action-row__item">
              <IoWallet className="action-row__item-icon" />
              Ví
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentOrder() {
  return (
    <div className="content-main__order">
      <div className="order-status">
        <span>Trạng thái</span>
        <BsDot />
        <span>Đã nhận đơn hàng</span>
      </div>
      <div className="order-note">
        <div className="order-note__avatar">
          <img src={avtDefault} alt="" />
        </div>
        <div className="order-note__text">
          <span>Khách ghi chú</span>
          <span>bạn xin thêm dùm giá với hành ạ</span>
        </div>
      </div>
      <div className="order-order"></div>
    </div>
  );
}
