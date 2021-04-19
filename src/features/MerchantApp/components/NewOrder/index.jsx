import React, { useState } from "react";
import { IoWallet } from "react-icons/io5";
import "./style.scss";
import newListOrders from "./data";

function NewOrder() {
  const [serialOrder, setSerialOrder] = useState(0);
  const detailOrder = newListOrders[serialOrder];

  const handleChangeOrderDetail = (index) => {
    setSerialOrder(index);
  };

  let validatePrice = (price) => {
    if (typeof price === "string") {
      return price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    } else {
      const numberPrice = price.toString();
      return numberPrice.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
  };

  let sumQuantity = (accumulator, currentValue) =>
    accumulator + parseInt(currentValue.quantiy);

  let sumTotal = (accumulator, currentValue) =>
    accumulator + parseInt(currentValue.total);

  console.log(newListOrders[0]);
  return (
    <div className="content">
      <ul className="content-new-come">
        {newListOrders.map((item, index) => (
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
              <div className="item-quantity">{food.quantiy} x</div>
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
            <button>Từ chối</button>
            <button>Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
