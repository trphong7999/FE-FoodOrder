import React from "react";
import "./styleDetail.scss";
import { FaPhoneAlt } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";
import { RiFileCopyLine } from "react-icons/ri";
import ava1 from "assets/image/avartar/ava1.jpg";
import taixe1 from "assets/image/avartar/taixe1.jpg";
import deliveryMan from "assets/image/icons/delivery-man.png";
import { Link } from "react-router-dom";

function ReceivedPrepareDetail() {
  return (
    <div className="received-confirm-detail">
      <div className="detail-head">
        <Link to="/merchant/da-nhan" className="detail-head__link">
          <BsChevronLeft className="detail-head__icon" />
          <span>Đã nhận</span>
        </Link>
      </div>

      <div className="detail-approve">Đơn đã được quán xác nhận</div>

      <div className="detail-note">
        <span>Ghi chú khách hàng:</span>
        <span>Lấy dụng cụ ăn uống</span>
      </div>

      <div className="detail-partner">
        <div
          className="partner-avatar"
          style={{ backgroundImage: `url(${ava1})` }}
        ></div>
        <div className="partner-info">
          <span>Huynh Nhi</span>
          <span>Đã đặt: 1 đơn</span>
        </div>
        <div className="partner-action">
          <FaPhoneAlt className="icon" />
        </div>
      </div>

      <div className="detail-partner">
        <div
          className="partner-avatar"
          style={{ backgroundImage: `url(${deliveryMan})` }}
        >
          <img src={taixe1} alt="" />
        </div>
        <div className="partner-info">
          <span>Phùng Hoàng Đại</span>
          <span>0858888486</span>
        </div>
        <div className="partner-action">
          <FaPhoneAlt className="icon" />
        </div>
      </div>

      <div className="detail-dishes">
        <div className="detail-dishes__list">
          <div className="detail-dishes__item">
            <div className="item-quantity">1 x</div>
            <div className="item-name">Bánh Tráng Bơ</div>
            <div className="item-total">26,000</div>
          </div>
          <div className="detail-dishes__item">
            <div className="item-quantity">1 x</div>
            <div className="item-name">Bánh Tráng Tự trộn</div>
            <div className="item-total">10,000</div>
          </div>
          <div className="detail-dishes__item">
            <div className="item-quantity">1 x</div>
            <div className="item-name">Bánh Tráng Sate</div>
            <div className="item-total">46,000</div>
          </div>
        </div>

        <div className="detail-dishes__count">
          <div className="count-cost">
            <span>Tổng tiền món (giá gốc)</span>
            <span>87,000 đ</span>
          </div>
          <div className="count-discount">
            <span>Giảm giá</span>
            <span>-5,000</span>
          </div>
          <div className="count-commission">
            <span>Tiền hoa hồng(20%)</span>
            <span>-16,400</span>
          </div>
          <div className="count-total">
            <span>Tổng tiền (3 món)</span>
            <span>65,600 đ</span>
          </div>
        </div>
      </div>

      <div className="detail-bot">
        <div className="detail-bot__id">
          <span>Mã Đơn Hàng</span>
          <span>
            12041-650862857 <RiFileCopyLine />
          </span>
        </div>
        <div className="detail-bot__time">
          <span>Thời gian đặt đơn</span>
          <span>Hôm nay 18:04</span>
        </div>
        <div className="detail-bot__space">
          <span>Khoảng cách</span>
          <span>4.2km</span>
        </div>
      </div>

      <div className="detail-action">
        <button className="detail-action__btn">Báo cho tài xế đã xong</button>
      </div>
    </div>
  );
}

export default ReceivedPrepareDetail;
