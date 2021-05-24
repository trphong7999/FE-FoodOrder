import React, { useRef, useState } from "react";
import { AiOutlineArrowLeft, AiFillPhone, AiFillWechat } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { IoWallet } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import avtDefault from "assets/image/avartar/avt-default.jpg";

import "./style.scss";
import { sumQuantity, validatePrice } from "func";
import { useHistory, useLocation, useRouteMatch } from "react-router";

export default function MakingDetail() {
  const history = useHistory();
  const infoOrder = useLocation().state.orderDetail;
  const [show, setShow] = useState(true);
  const [pickUpStatus, setPickUpStatus] = useState(true);

  const handleChangeShowHead = (data) => {
    setShow(data);
  };

  const handleChangePickUpStatus = (data) => {
    setPickUpStatus(data);
  };

  return (
    <div className="grid">
      <div
        className="making-detail"
        style={
          pickUpStatus
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
              <div className="head-shop__code">{infoOrder._id}</div>
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
              <Infomation order={infoOrder} info={infoOrder.merchantId} />
            ) : (
              <Infomation order={infoOrder} info={infoOrder.userOrderId.info} />
            )}
          </div>
        </div>

        <div className="making-detail__content">
          <div className="content-main">
            {pickUpStatus ? (
              <ContentOrder order={infoOrder} />
            ) : (
              <DeliveryFinish order={infoOrder} />
            )}
          </div>
        </div>

        <div className="making-detail__action">
          {pickUpStatus ? (
            <MakingAction
              pickUpCallback={handleChangePickUpStatus}
              order={infoOrder}
            />
          ) : (
            <FinisedAction />
          )}
        </div>
      </div>
    </div>
  );
}

function MakingAction({ pickUpCallback, order }) {
  const history = useHistory();
  const match = useRouteMatch();
  const sendDataPickUpStatus = (data) => {
    pickUpCallback(data);
  };

  const handleOpenChat = () => {
    const location = {
      pathname: `${match.url}/chat`,
      state: { order },
    };
    history.push(location);
    history.replace(location);
  };

  return (
    <div className="action-pending">
      <div className="action-row">
        <div
          className="action-row__item"
          onClick={() => window.open("tel:090451997")}
        >
          <AiFillPhone className="action-row__item-icon" />
          Gọi
        </div>
        <div className="action-row__item" onClick={() => handleOpenChat()}>
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
          <div
            style={{ "&::before": { content: "30'" } }}
            onClick={() => sendDataPickUpStatus(false)}
          >
            Đã lấy hàng
          </div>
        </div>
        <div className="action-row__item">
          <IoWallet className="action-row__item-icon" />
          Ví
        </div>
      </div>
    </div>
  );
}

function FinisedAction() {
  return (
    <div className="action-finised">
      <span>Vui lòng chuyển trạng thái đơn hàng</span>
      <button className="finised-button">Đã giao xong</button>
    </div>
  );
}

function Infomation({ order, info }) {
  return (
    <div className="head-bot">
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
        <span>Đã nhận đơn hàng</span>
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
