import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { RiFileCopyLine } from "react-icons/ri";
import avatarDefault from "assets/image/avartar/avatar-default.png";
import taixe2 from "assets/image/avartar/taixe2.jpg";
import { useHistory, useLocation } from "react-router-dom";
import "../ReceivedOrder/style.scss";
import { validatePrice } from "func";

function OrderHistoryDetail() {
  const history = useHistory();
  const location = useLocation();
  const detail = location.state.detailHistory;

  return (
    <div className="received-order-detail">
      <div className="detail-head">
        <div
          className="detail-head__link"
          onClick={() => {
            history.goBack();
          }}
        >
          <BsChevronLeft className="detail-head__icon" />
          <span>Đã lấy</span>
        </div>
      </div>

      <div className="detail-customer">
        <div
          className="customer-avatar"
          style={{ backgroundImage: `url(${avatarDefault})` }}
        ></div>
        <div className="customer-info">
          <span>{detail.customer.name}</span>
          <span>
            {detail.customer.quantityOrdered < 1
              ? "Lần đầu đặt"
              : `Đã đặt ${detail.customer.quantityOrdered} đơn`}
          </span>
        </div>
      </div>

      <div className="detail-note">
        <span>Ghi chú khách hàng:</span>
        <span>{detail.note}</span>
      </div>

      <div className="detail-partner">
        <div
          className="partner-avatar"
          style={{ backgroundImage: `url(${taixe2})` }}
        ></div>
        <div className="partner-info">
          <span>{detail.infoPartner.name}</span>
          <span>{detail.infoPartner.phone}</span>
        </div>
        <div className="partner-action">
          <FaPhoneAlt className="icon" />
        </div>
      </div>

      <div className="detail-dishes">
        <div className="detail-dishes__list">
          {detail.listFood.map((item, index) => (
            <div className="detail-dishes__item" key={index}>
              <div className="item-quantity">{item.quantity} x</div>
              <div className="item-name">{item.name}</div>
              <div className="item-total">{validatePrice(item.total)}</div>
            </div>
          ))}
        </div>

        <div className="detail-dishes__count">
          <div className="count-cost">
            <span>Tổng tiền món (giá gốc)</span>
            <span>{validatePrice(detail.totalAmountOfDishes)} đ</span>
          </div>
          <div className="count-discount">
            <span>Giảm giá</span>
            <span>{validatePrice(detail.discountMoney)}</span>
          </div>
          <div className="count-commission">
            <span>Tiền hoa hồng(20%)</span>
            <span>-{validatePrice(detail.commissionMoney)}</span>
          </div>
          <div className="count-total">
            <span>Tổng tiền ({detail.totalNumberOfDishes} món)</span>
            <span>{validatePrice(detail.finalAmount)} đ</span>
          </div>
        </div>
      </div>

      <div className="detail-bot">
        <div className="detail-bot__id">
          <span>Mã Đơn Hàng</span>
          <span>
            {detail.id} <RiFileCopyLine />
          </span>
        </div>
        <div className="detail-bot__time">
          <span>Thời gian đặt đơn</span>
          <span>Hôm nay {detail.time.startOrder}</span>
        </div>
        <div className="detail-bot__space">
          <span>Khoảng cách</span>
          <span>{detail.space}km</span>
        </div>
        <div className="detail-bot__time">
          <span>Thời gian lấy hàng</span>
          <span>Hôm nay {detail.time.takeOrder}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryDetail;
