import React, { useState, useEffect } from "react";
import { IoWallet } from "react-icons/io5";
import "./style.scss";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { validatePrice } from "func";

function NewOrder({ newListOrder }) {
  const match = useRouteMatch();
  const history = useHistory();
  const [serialOrder, setSerialOrder] = useState(0);
  const detailOrder = newListOrder[serialOrder];
  const id = detailOrder.id;

  const handleChangeOrderDetail = (index) => {
    setSerialOrder(index);
  };

  let sumQuantity = (acc, curr) => acc + curr.quantity;

  let sumTotal = (acc, curr) => acc + curr.total;
  //---------------------------------------------------------------//
  const addReceivedOrder = async (order) => {
    await axios.post(`http://localhost:5000/receivedOrder`, order);
  };

  const removeListNewOrderItem = async (idNewOrder) => {
    await axios.delete(`http://localhost:5000/newListOrder/${idNewOrder}`);
  };

  const handleConfirmAdd = () => {
    addReceivedOrder(detailOrder);
    removeListNewOrderItem(id);
    history.push(`merchant/da-nhan`);
  };
  // ------------------------------------------------------------
  const changeUrlToRefusal = () => {
    history.push(`${match.url}/moi-tu-choi/${detailOrder.id}`);
  };

  return (
    <div className="content">
      <ul className="content-new-come">
        {newListOrder.map((item, index) => (
          <li
            key={item.id}
            index={index}
            className={
              serialOrder === index
                ? "new-come__item new-come__item--active"
                : "new-come__item"
            }
            onClick={() => {
              handleChangeOrderDetail(index);
            }}
          >
            <span className="new-come__item-stt">{index + 1}</span>
            <span className="new-come__item-time">({item.time.limit}')</span>
          </li>
        ))}
      </ul>

      <div className="content-body">
        <div className="content-title">
          <span className="title-name">{detailOrder.customer.name}</span>
          <span className="title-quantity">
            Đã đặt: {detailOrder.customer.quantityOrdered}
          </span>
        </div>

        <div className="content-time">
          <div className="time-left">
            <span className="time-left__limit">
              Lấy trong <span>{detailOrder.time.limit}</span> phút (
              {detailOrder.time.startOrder})
            </span>
            <span className="time-left__space">
              cách: {detailOrder.space} km
            </span>
          </div>
          <div className="time-right">
            <button className="time-right__button">Trì hoãn</button>
          </div>
        </div>

        <div className="content-order">
          <div className="content-note">
            <span className="note-title">Ghi chú khách hàng: </span>
            <span className="note-content">{detailOrder.note}</span>
          </div>

          {detailOrder.listFood.map((food, index) => (
            <div key={index} index={index} className="content-order__item">
              <div className="item-quantity">{food.quantity} x</div>
              <div className="item-food">
                <div className="item-food__name">{food.name}</div>
              </div>
              <div className="item-total">{validatePrice(food.total)}</div>
            </div>
          ))}
        </div>

        <div className="confirm-order">
          <div className="confirm-order__text">
            <span>
              Thu của khách hàng ({detailOrder.listFood.reduce(sumQuantity, 0)}{" "}
              món)
            </span>
            <div className="text-total">
              <IoWallet className="text-total__icon" />
              <span>
                {validatePrice(detailOrder.listFood.reduce(sumTotal, 0))} đ
              </span>
            </div>
          </div>

          <div className="confirm-order__button">
            <button
              onClick={() => {
                changeUrlToRefusal();
              }}
            >
              Từ chối
            </button>

            <button
              onClick={() => {
                handleConfirmAdd();
              }}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
