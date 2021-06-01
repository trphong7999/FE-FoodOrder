import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { RiFileCopyLine } from "react-icons/ri";
import avatarDefault from "assets/image/avartar/avatar-default.png";
import taixe2 from "assets/image/avartar/taixe2.jpg";
import { useHistory, useLocation } from "react-router-dom";
import "../ReceivedOrder/style.scss";
import {
  formatDatetimeToString,
  sumQuantity,
  sumTotal,
  validatePrice,
} from "func";
import "./style.scss";

function OrderHistoryDetail() {
  const history = useHistory();
  const location = useLocation();
  const order = location.state.detailHistory;

  return (
    <div className="received-order-detail received-order-detail-merchant">
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
          <span>{order.userOrderId.info.name}</span>
          <span>
            {order.userOrderId.quantityOrderedSuccess < 1
              ? "Lần đầu đặt"
              : `Đã đặt ${order.userOrderId.quantityOrderedSuccess} đơn`}
          </span>
        </div>
      </div>

      <div className="detail-note">
        <span>Ghi chú khách hàng:</span>
        <span>{order.note}</span>
      </div>

      <div className="detail-partner">
        <div
          className="partner-avatar"
          style={{ backgroundImage: `url(${taixe2})` }}
        ></div>
        <div className="partner-info">
          <span>{order.deliverId.name}</span>
          <span>{order.deliverId.phone}</span>
        </div>
        <div className="partner-action">
          <FaPhoneAlt
            className="icon"
            onClick={() => window.open("tel:" + order.deliverId.phone)}
          />
        </div>
      </div>

      <div className="detail-dishes">
        <div className="detail-dishes__list">
          {order.detail.foods.map((item, index) => (
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
            <span>
              {" "}
              {validatePrice(order.detail.foods.reduce(sumTotal, 0))} đ
            </span>
          </div>
          {/* <div className="count-discount">
            <span>Giảm giá</span>
            <span>{validatePrice(order.detail.discount)} đ</span>
          </div> */}
          <div className="count-commission">
            <span>Tiền chiết khấu ({order.merchantId.deduct}%)</span>
            <span>
              -
              {validatePrice(
                (order.detail.total * order.merchantId.deduct) / 100
              )}
            </span>
          </div>
          <div className="count-total">
            <span>
              Tổng tiền ({order.detail.foods.reduce(sumQuantity, 0)} món)
            </span>
            <span>
              {" "}
              {validatePrice(
                order.detail.total -
                  order.detail.total * (order.merchantId.deduct / 100)
              )}{" "}
              đ
            </span>
          </div>
        </div>
      </div>

      <div className="detail-bot">
        <div className="detail-bot__id">
          <span>Mã Đơn Hàng</span>
          <span>
            {order._id} <RiFileCopyLine />
          </span>
        </div>
        <div className="detail-bot__time">
          <span>Thời gian đặt đơn</span>
          <span>
            {formatDatetimeToString(new Date(parseInt(order.timeOrder)))}
          </span>
        </div>
        <div className="detail-bot__space">
          <span>Khoảng cách</span>
          <span>{order.distance}km</span>
        </div>
        <div className="detail-bot__time">
          <span>Thời gian lấy hàng</span>
          <span>
            {formatDatetimeToString(
              new Date(parseInt(order.timePartnerGetFood))
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryDetail;
