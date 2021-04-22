import React from "react";
import "./styleDetail.scss";
import { FaPhoneAlt } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";
import { RiFileCopyLine } from "react-icons/ri";
import ava1 from "assets/image/avartar/ava1.jpg";
import { useHistory, useLocation } from "react-router-dom";
import { validatePrice, sumQuantity, sumTotal } from "func";
import axios from "axios";

function ReceivedConfirmDetail() {
  const history = useHistory();
  const location = useLocation();
  const orderDetail = location.state.orderDetail;
  const quantityOrdered = orderDetail.customer.quantityOrdered;
  const totalNumberOfDishes = orderDetail.listFood.reduce(sumQuantity, 0);
  const totalAmountOfDishes = orderDetail.listFood.reduce(sumTotal, 0);
  const commissionMoney = totalAmountOfDishes * 0.1;
  const finalAmount = totalAmountOfDishes - commissionMoney;

  const orderPrepare = {
    ...orderDetail,
    totalNumberOfDishes: totalNumberOfDishes,
    totalAmountOfDishes: totalAmountOfDishes,
    discountMoney: 0,
    commissionMoney: commissionMoney,
    finalAmount: finalAmount,
    infoPartner: { name: null, phone: null, status: 0, avatar: "" },
  };

  const addReceivedPrepare = async () => {
    await axios.post(`http://localhost:5000/receivedPrepare`, orderPrepare);
    await axios.delete(`http://localhost:5000/receivedOrder/${orderDetail.id}`);
    history.goBack();
  };

  return (
    <div className="received-confirm-detail">
      <div className="detail-head">
        <div
          onClick={() => {
            history.goBack();
          }}
          className="detail-head__link"
        >
          <BsChevronLeft className="detail-head__icon" />
          <span>Đã nhận</span>
        </div>
      </div>

      <div className="detail-note">
        <span>Ghi chú khách hàng:</span>
        <span>{orderDetail.note}</span>
      </div>

      <div className="detail-partner">
        <div
          className="partner-avatar"
          style={{ backgroundImage: `url(${ava1})` }}
        ></div>
        <div className="partner-info">
          <span>{orderDetail.customer.name}</span>
          <span>
            {quantityOrdered < 1
              ? "Lần đầu đặt"
              : `Đã đặt: ${quantityOrdered} đơn`}
          </span>
        </div>
        <div className="partner-action">
          <FaPhoneAlt className="icon" />
        </div>
      </div>

      <div className="detail-dishes">
        <div className="detail-dishes__list">
          {orderDetail.listFood.map((food, index) => (
            <div className="detail-dishes__item" key={index}>
              <div className="item-quantity">{food.quantity} x</div>
              <div className="item-name">{food.name}</div>
              <div className="item-total">{validatePrice(food.total)}</div>
            </div>
          ))}
        </div>

        <div className="detail-dishes__count">
          <div className="count-cost">
            <span>Tổng tiền món (giá gốc)</span>
            <span>{validatePrice(totalAmountOfDishes)} đ</span>
          </div>
          <div className="count-discount">
            <span>Giảm giá</span>
            <span>0</span>
          </div>
          <div className="count-commission">
            <span>Tiền hoa hồng (10%)</span>
            <span>{validatePrice(commissionMoney)}</span>
          </div>
          <div className="count-total">
            <span>Tổng tiền ({totalNumberOfDishes} món)</span>
            <span>{validatePrice(finalAmount)} đ</span>
          </div>
        </div>
      </div>

      <div className="detail-bot">
        <div className="detail-bot__id">
          <span>Mã Đơn Hàng</span>
          <span>
            {orderDetail.id} <RiFileCopyLine />
          </span>
        </div>
        <div className="detail-bot__time">
          <span>Thời gian đặt đơn</span>
          <span>Hôm nay {orderDetail.time.startOrder}</span>
        </div>
        <div className="detail-bot__space">
          <span>Khoảng cách</span>
          <span>{orderDetail.space} km</span>
        </div>
      </div>

      <div className="detail-action">
        <button
          className="detail-action__btn"
          onClick={() => {
            addReceivedPrepare();
          }}
        >
          Quán xác nhận
        </button>
      </div>
    </div>
  );
}

export default ReceivedConfirmDetail;
