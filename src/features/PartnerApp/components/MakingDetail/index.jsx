import React, { useRef, useState } from "react";
import { AiOutlineArrowLeft, AiFillPhone, AiFillWechat } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { IoWallet } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import avtDefault from "assets/image/avartar/avt-default.jpg";
import socket from "socket-io";

import "./style.scss";
import { sumQuantity, validatePrice } from "func";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast, ToastContainer } from "react-toastify";

export default function MakingDetail() {
  const history = useHistory();
  const [order, setOrder] = useState(useLocation().state.orderDetail);
  const [show, setShow] = useState(true);

  const handleChangeShowHead = (data) => {
    setShow(data);
  };

  return (
    <div className="grid">
      <div
        className="making-detail"
        style={
          order.status !== "delivering"
            ? { "--height-action": "118px" }
            : { "--height-action": "86px" }
        }
      >
        <div className="making-detail__head">
          <div className="making-detail__head-top">
            <div
              className="head-back"
              onClick={() => {
                history.goBack();
              }}
            >
              <AiOutlineArrowLeft />
            </div>
            <div
              className={`head-shop ${
                show === true ? "head-item--active" : ""
              }`}
              onClick={() => handleChangeShowHead(true)}
            >
              <div className="head-shop__title">
                <span>Delivery</span>
                <BsDot className="head-shop__title-icon" />
                <span>Quán</span>
              </div>
              <div className="head-shop__code">{order._id}</div>
            </div>
            <div
              className={`head-customer ${
                show === false ? "head-item--active" : ""
              }`}
              onClick={() => handleChangeShowHead(false)}
            >
              Khách
            </div>
          </div>

          <div className="making-detail__head-bot">
            {show === true ? (
              <Infomation order={order} info={order.merchantId} />
            ) : (
              <Infomation order={order} info={order.userOrderId.info} />
            )}
          </div>
        </div>

        <div className="making-detail__content">
          <div className="content-main">
            {order.status !== "delivering" ? (
              <ContentOrder order={order} />
            ) : (
              <DeliveryFinish order={order} />
            )}
          </div>
        </div>

        <div className="making-detail__action">
          {order.status !== "delivering" ? (
            <MakingAction setOrder={setOrder} order={order} />
          ) : (
            <FinishedAction history={history} order={order} />
          )}
        </div>
      </div>
    </div>
  );
}

function MakingAction({ setOrder, order }) {
  const history = useHistory();
  const match = useRouteMatch();
  const pịckupFail = () =>
    toast.error(
      <div>
        <span style={{ fontSize: "2.5rem" }}>🤚</span>Chờ quán xác nhận và chuẩn
        bị món ăn
      </div>
    );

  const PickupOrder = () => {
    if (order.status == "waitConfirm") return pịckupFail();
    socket.emit("DeliveringOrder", order._id);
    const od = order;
    od.status = "delivering";
    setOrder({ ...od });
  };

  const handleCancelOrder = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            socket.emit("cancelOrder", order._id);
            history.goBack();
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleOpenChat = () => {
    const location = {
      pathname: `${match.url}/chat`,
      state: { order },
    };
    history.push(location);
    history.replace(location);
  };
  console.log(order.status in ["complete", "cancel"], order.status);
  return (
    <div className="action-pending">
      {!["complete", "cancel"].includes(order.status) ? (
        <React.Fragment>
          <ToastContainer style={{ top: "10%" }} />
          <div className="action-row">
            <div
              className="action-row__item"
              onClick={() => window.open("tel:090451997")}
            >
              <AiFillPhone className="action-row__item-icon" />
              Gọi
            </div>
            <div
              className="action-row__item"
              onClick={() => handleOpenChat()}
              disabled={order.status === "waitConfirm"}
            >
              <AiFillWechat className="action-row__item-icon" />
              Chat
            </div>
            <div className="action-row__item">
              <TiDelete
                className="action-row__item-icon"
                onClick={() => handleCancelOrder()}
              />
              Hủy
            </div>
          </div>
          <div className="action-row">
            <div className="action-row__itemx2">
              <div
                style={{ "&::before": { content: "30'" } }}
                onClick={() => PickupOrder()}
                disabled={order.status === "waitConfirm"}
              >
                Đã lấy hàng
              </div>
            </div>
            <div className="action-row__item">
              <IoWallet className="action-row__item-icon" />
              Ví
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div
          className="action-row"
          style={{
            height: "var(--height-action)",
            background: order.status === "complete" ? `#4a934a` : `#d9534f`,
            lineHeight: "var(--height-action)",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          {order.status === "complete" ? "Đã hoàn thành" : "Đã hủy"}
        </div>
      )}
    </div>
  );
}

function FinishedAction({ history, order }) {
  const completeOrder = () => {
    socket.emit("completeOrder", order._id);
    history.goBack();
  };
  return (
    <div className="action-finised">
      <span>Vui lòng chuyển trạng thái đơn hàng</span>
      <button className="finised-button" onClick={() => completeOrder()}>
        Đã giao xong
      </button>
    </div>
  );
}

function Infomation({ order, info }) {
  const [userCancel, setUserCancel] = useState(false);
  const [code, setCode] = useState("");
  const history = useHistory();
  const codeWrong = () =>
    toast.error(
      <div>
        <span style={{ fontSize: "2.5rem" }}>🤚</span>Mã xác thực sai, vui lòng
        liên hệ đại lý H2P để được hỗ trợ
      </div>
    );

  const handleUserCancel = () => {
    setUserCancel(true);
  };
  const submitUserCancel = () => {
    if (code == "1111") {
      socket.emit("userNotReceiveFoods", order._id);
      history.goBack();
    } else codeWrong();
  };

  return (
    <div className="head-bot">
      <ToastContainer style={{ top: "10%" }} />
      <div className="head-bot__name">{info.name}</div>
      <div className="head-bot__address">{info.location.address}</div>
      <div className="head-bot__tool">
        <div className="tool-item">
          {info.representative ? (
            <div>
              Trả
              <span className="tool-item__price">
                {validatePrice(
                  order.detail.total -
                    (order.detail.total * order.merchantId.deduct) / 100
                )}
                đ
              </span>
            </div>
          ) : (
            <div>
              Thu
              <span className="tool-item__price">
                {validatePrice(
                  order.detail.total + order.detail.fee - order.detail.discount
                )}
                đ
              </span>
            </div>
          )}
        </div>
        <BsDot />
        <div className="tool-item">
          {info.representative ? "Lấy" : "Giao"}
          <span className="tool-item__time">{}</span>
        </div>
        <BsDot />
        <div className="tool-item">
          {info.representative ? "Quán tools" : "ASAP"}
        </div>
        {!info.representative && order.status == "delivering" && !userCancel ? (
          <button
            style={{ marginLeft: "auto", borderRadius: "8px", outline: "none" }}
            onClick={() => handleUserCancel()}
          >
            Khách hủy
          </button>
        ) : (
          ""
        )}
        {userCancel ? (
          <div style={{ marginLeft: "auto" }}>
            <input
              style={{
                width: "8rem",
                outline: "none",
                letterSpacing: "1.1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength="4"
              placeholder="____"
              type="text"
            />
            <button
              style={{
                padding: "0.2rem 1.3rem",
                marginLeft: "0.5rem",
                borderRadius: "4px",
                outline: "none",
              }}
              onClick={() => submitUserCancel()}
            >
              Gửi
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function ContentOrder({ order, headBot }) {
  return (
    <div className="content-main__order">
      <div className="order-status">
        <span>Trạng thái</span>
        <BsDot />
        <span>
          {order.status === "waitConfirm"
            ? "Đã nhận đơn hàng, chờ cửa hàng xác nhận"
            : order.status === "picking"
            ? "Đơn đã xác nhận, hãy chuẩn bị đến lấy"
            : order.status === "waitPick"
            ? "Đã chuẩn bị xong món, chờ đến lấy"
            : order.status === "delivering"
            ? "Đã lấy thành công, đang giao"
            : order.status === "complete"
            ? "Giao thành công"
            : "Đơn đã bị hủy"}
        </span>
      </div>
      <div className="order-note">
        <div className="order-note__avatar">
          <img src={avtDefault} alt="" />
        </div>
        <div className="order-note__text">
          <span>Khách ghi chú</span>
          <span>{order.note}</span>
        </div>
      </div>

      <div className="order-detail">
        <div className="order-detail__head">
          <span>Chi tiết đơn hàng</span>
          <span>Số lượng: {order.detail.foods.reduce(sumQuantity, 0)}</span>
        </div>
        <div className="order-detail__body">
          <table>
            <thead>
              <tr>
                <th style={{ width: "60%" }}>#Tên món</th>
                <th style={{ width: "10%" }}>SL</th>
                <th style={{ width: "30%" }}>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.detail.foods.map((food, idx) => (
                <tr>
                  <td>{idx + " ." + food.name}</td>
                  <td>{food.quantity}</td>
                  <td>{validatePrice(food.total)}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="order-bill">
        <DeliveryPending order={order} />
      </div>
    </div>
  );
}

function DeliveryPending({ order }) {
  return (
    <div className="delivery-pending">
      <div className="delivery-mission">
        <ul className="delivery-mission__list">
          <li className="list-item">
            <span>Hóa đơn quán</span>
          </li>
          <li className="list-item">
            <span>Tổng đơn hàng</span>
            <span>{validatePrice(order.detail.total)}đ</span>
          </li>
          <li className="list-item">
            <span>Quán giảm giá</span>
            <span>
              {validatePrice(
                (order.detail.total * order.merchantId.deduct) / 100
              )}
              đ
            </span>
          </li>
          <li className="list-item">
            <span>Tổng tiền trả cho quán</span>
            <span className="list-item--red">
              {validatePrice(
                order.detail.total -
                  (order.detail.total * order.merchantId.deduct) / 100
              )}
              đ
            </span>
          </li>
        </ul>
        <div className="delivery-mission__title">
          <RiMoneyDollarCircleFill className="delivery-mission__title-icon" />
          Thanh toán ngay khi lấy hàng
        </div>
      </div>

      <div className="delivery-mission">
        <ul className="delivery-mission__list">
          <li className="list-item">
            <span>Hóa đơn khách</span>
          </li>
          <li className="list-item">
            <span>Tổng đơn hàng</span>
            <span>{validatePrice(order.detail.total)}đ</span>
          </li>
          <li className="list-item">
            <span>Ship</span>
            <span>{validatePrice(order.detail.fee)}đ</span>
          </li>
          <li className="list-item">
            <span>Giảm giá</span>
            <span>{validatePrice(order.detail.discount)}đ</span>
          </li>
          <li className="list-item">
            <span>Tổng tiền thu khách</span>
            <span className="list-item--green">
              {validatePrice(
                order.detail.total + order.detail.fee - order.detail.discount
              )}
              đ
            </span>
          </li>
        </ul>
        <div className="delivery-mission__title">
          <RiMoneyDollarCircleFill className="delivery-mission__title-icon" />
          Thanh toán tiền mặt
        </div>
      </div>
    </div>
  );
}

function DeliveryFinish({ order }) {
  return (
    <div className="content-main__delivery">
      <div className="delivery-finished">
        <div className="delivery-finished__head">
          <div>Chi tiết đơn hàng</div>
          <div>Số lượng: {order.detail.foods.reduce(sumQuantity, 0)}</div>
        </div>
        <div className="delivery-finished__content">
          <table>
            <thead>
              <tr>
                <th>#Tên món</th>
                <th>SL</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.detail.foods.map((food, idx) => (
                <tr>
                  <td>{idx + " ." + food.name}</td>
                  <td>{food.quantity}</td>
                  <td>{validatePrice(food.total)}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="delivery-finished__bot">
          <div>
            <span>Tổng đơn hàng</span>
            <span>{validatePrice(order.detail.total)}đ</span>
          </div>
          <div>
            <span>Ship</span>
            <span>{validatePrice(order.detail.fee)}đ</span>
          </div>
          <div>
            <span>Giảm giá</span>
            <span>{validatePrice(order.detail.discount)}đ</span>
          </div>
          <div>
            <span>Tổng tiền thu khách</span>
            <span className="list-item--green">
              {validatePrice(
                order.detail.total + order.detail.fee - order.detail.discount
              )}
              đ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
