import React from "react";
import "./styleDetail.scss";
import { FaPhoneAlt } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";
import { RiFileCopyLine } from "react-icons/ri";
import ava1 from "assets/image/avartar/ava1.jpg";
import taixe1 from "assets/image/avartar/taixe1.jpg";
import deliveryMan from "assets/image/icons/delivery-man.png";
import { useHistory, useLocation } from "react-router-dom";
import { sumQuantity, validatePrice } from "func";
import socket from "socket-io.js";
import { Rating } from "@material-ui/lab";

function ReceivedPrepareDetail() {
  const history = useHistory();
  const location = useLocation();
  const prepareDetail = location.state.prepareDetail;
  const quantityOrdered = prepareDetail.userOrderId.quantityOrderedSuccess;

  const addReceivedWait = () => {
    socket.emit("prepareDone", prepareDetail._id);
    history.goBack();
  };

  return (
    <div className="received-confirm-detail">
      <div className="detail-head">
        <div
          className="detail-head__link"
          onClick={() => {
            history.goBack();
          }}
        >
          <BsChevronLeft className="detail-head__icon" />
          <span>Đã nhận</span>
        </div>
      </div>

      <div className="detail-approve">Đơn đã được quán xác nhận</div>

      <div className="detail-note">
        <span>Ghi chú khách hàng:</span>
        <span>{prepareDetail.note}</span>
      </div>

      <div className="detail-partner">
        <div
          className="partner-avatar"
          style={{ backgroundImage: `url(${ava1})` }}
        ></div>
        <div className="partner-info">
          <span>{prepareDetail.userOrderId.info.name}</span>
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

      {prepareDetail.deliverId ? (
        <div className="detail-partner">
          <div
            className="partner-avatar"
            style={{ backgroundImage: `url(${deliveryMan})` }}
          >
            <img src={taixe1} alt="" />
          </div>
          <div className="partner-info">
            <span>{prepareDetail.deliverId.name}</span>
            <span>{prepareDetail.deliverId.phone}</span>
          </div>
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.5}
            readOnly
            style={{ fontSize: "2.2rem", marginLeft: "2rem" }}
          />
          <div className="partner-action">
            <FaPhoneAlt className="icon" />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="detail-dishes">
        <div className="detail-dishes__list">
          {prepareDetail.detail.foods.map((food, index) => (
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
            <span>{validatePrice(prepareDetail.detail.total)} đ</span>
          </div>
          <div className="count-discount">
            <span>Giảm giá</span>
            <span>{validatePrice(prepareDetail.detail.discount)}</span>
          </div>
          <div className="count-commission">
            <span>Tiền hoa hồng(10%)</span>
            <span>
              {validatePrice(
                (prepareDetail.detail.total * prepareDetail.merchantId.deduct) /
                  100
              )}
            </span>
          </div>
          <div className="count-total">
            <span>
              Tổng tiền ({prepareDetail.detail.foods.reduce(sumQuantity, 0)}{" "}
              món)
            </span>
            <span>
              {validatePrice(
                prepareDetail.detail.total -
                  prepareDetail.detail.total *
                    (prepareDetail.merchantId.deduct / 100)
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="detail-bot">
        <div className="detail-bot__id">
          <span>Mã Đơn Hàng</span>
          <span>
            {prepareDetail._id} <RiFileCopyLine />
          </span>
        </div>
        <div className="detail-bot__time">
          <span>Thời gian đặt đơn</span>
          <span>Hôm nay {prepareDetail.startOrder}</span>
        </div>
        <div className="detail-bot__space">
          <span>Khoảng cách</span>
          <span>{prepareDetail.distance} km</span>
        </div>
      </div>

      <div className="detail-action">
        <button
          className="detail-action__btn"
          onClick={() => {
            addReceivedWait();
          }}
          disabled={!prepareDetail.deliverId}
          // style={{ background: !prepareDetail.deliverId ? "#888" : "" }}
        >
          {prepareDetail.deliverId
            ? "Báo cho tài xế đã xong"
            : "Đang tìm tài xế khác"}
        </button>
      </div>
    </div>
  );
}

export default ReceivedPrepareDetail;
