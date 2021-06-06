import React, { useEffect, useState } from "react";
import "./styleDetail.scss";
import { FaPhoneAlt } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";
import { RiFileCopyLine } from "react-icons/ri";
import ava1 from "assets/image/avartar/ava1.jpg";
import { useHistory, useLocation } from "react-router-dom";
import {
  validatePrice,
  sumQuantity,
  sumTotal,
  datetimeFromTimestamp,
} from "func";
import socket from "socket-io";
import taixe1 from "assets/image/avartar/taixe1.jpg";
import TimeInput from "react-input-time";
import { toast, ToastContainer } from "react-toastify";
import userAPi from "api/userApi";

function ReceivedConfirmDetail() {
  const history = useHistory();
  const location = useLocation();
  const orderDetail = location.state.orderDetail;
  const [historyOrder, setHistoryOrder] = useState([]);
  const percent =
    historyOrder.filter((od) => od.status === "complete").length /
      historyOrder.length || 0;
  const lastOrder = historyOrder.slice(-1).pop() || {};

  const [timePartnerGetFood, setTimePartnerGetFood] = useState(
    orderDetail.timeOrder
  );
  const hourWarning = () =>
    toast.error(
      <div>
        <span style={{ fontSize: "2.5rem" }}>🤚</span>Giờ dự kiến giao không hợp
        lệ
      </div>
    );

  useEffect(() => {
    const fetchPrestige = async () => {
      const res = await userAPi.getPrestige(orderDetail.userOrderId._id);
      if (!res.status || res.status == 200) {
        setHistoryOrder(res);
      }
    };
    fetchPrestige();
  }, [orderDetail]);

  const onTimeChangeHandle = (val) => {
    let hour = new Date().setHours(parseInt(val.split(":")[0]));
    let time = new Date(hour).setMinutes(parseInt(val.split(":")[1]));
    console.log("new", time, val.split(":"));
    setTimePartnerGetFood(time);
  };

  const addReceivedPrepare = async () => {
    if (!isNaN(parseFloat(timePartnerGetFood))) {
      socket.emit("approveOrder", {
        order_id: orderDetail._id,
        timePartnerGetFood: timePartnerGetFood,
      });
      history.goBack();
    } else {
      hourWarning();
    }
  };

  return (
    <div className="received-confirm-detail">
      <ToastContainer />
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
          <span>{orderDetail.userOrderId.info.name}</span>
          <span>
            Đã đặt: {historyOrder.length} đơn | Tỉ lệ thành công:
            {percent.toFixed(2)}% | Đơn gần nhất:
            {lastOrder.status && lastOrder.status === "complete"
              ? "Thành công"
              : "Thất bại" || ""}
          </span>
        </div>
        <div className="partner-action">
          <FaPhoneAlt
            className="icon"
            onClick={() =>
              window.open("tel:" + orderDetail.userOrderId.info.phone)
            }
          />
        </div>
      </div>

      {orderDetail.deliverId ? (
        <div className="detail-partner">
          <div
            className="partner-avatar"
            style={{ backgroundImage: `url(${orderDetail.deliverId.avt})` }}
          >
            <img src={taixe1} alt="" />
          </div>
          <div className="partner-info">
            <span>{orderDetail.deliverId.name}</span>
            <span>{orderDetail.deliverId.phone}</span>
          </div>
          <div style={{ marginLeft: "8rem" }}>
            <span>Dự kiến giao cho Shipper </span>

            <TimeInput
              className="input-time"
              initialTime={
                `0${new Date(
                  parseInt(timePartnerGetFood) + 10 * 60000
                ).getHours()}`.slice(-2) +
                ":" +
                `0${new Date(
                  parseInt(timePartnerGetFood) + 10 * 60000
                ).getMinutes()}`.slice(-2)
              }
              onChange={(e) => onTimeChangeHandle(e.target.value)}
            />
          </div>
          <div className="partner-action">
            <FaPhoneAlt
              className="icon"
              onClick={() => window.open("tel:" + orderDetail.deliverId.phone)}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="detail-dishes">
        <div className="detail-dishes__list">
          {orderDetail.detail.foods.map((food, index) => (
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
            <span>{validatePrice(orderDetail.detail.total)} đ</span>
          </div>
          {/* <div className="count-discount">
            <span>Giảm giá</span>
            <span>{validatePrice(orderDetail.detail.discount)}</span>
          </div> */}
          <div className="count-commission">
            <span>Tiền hoa hồng (10%)</span>
            <span>
              {validatePrice(orderDetail.detail.total * (10 / 100))} đ
            </span>
          </div>
          <div className="count-total">
            <span>
              Tổng tiền ({orderDetail.detail.foods.reduce(sumQuantity, 0)} món)
            </span>
            <span>
              {validatePrice(
                orderDetail.detail.total - orderDetail.detail.total * (10 / 100)
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
            {orderDetail.id} <RiFileCopyLine />
          </span>
        </div>
        <div className="detail-bot__time">
          <span>Thời gian đặt đơn</span>
          <span>
            Hôm nay {datetimeFromTimestamp(parseInt(orderDetail.timeOrder))}
          </span>
        </div>
        <div className="detail-bot__space">
          <span>Khoảng cách</span>
          <span>{orderDetail.distance} km</span>
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
