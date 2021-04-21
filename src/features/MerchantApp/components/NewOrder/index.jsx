import React, { useState, useEffect } from "react";
import { IoWallet } from "react-icons/io5";
import axios from "axios";
import "./style.scss";
import { Link, useRouteMatch } from "react-router-dom";

function NewOrder() {
  const match = useRouteMatch();
  const [serialOrder, setSerialOrder] = useState(0);
  const [newListOrder, setNewListOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:5000/newListOrder`);
      if (result) {
        setNewListOrder(result.data);
      }
    };
    fetchData();
  }, []);

  const detailOrder = newListOrder[serialOrder];

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

  return (
    <div className="content">
      {newListOrder.length === 0 ? (
        <h1>Hiện chưa có đơn hàng mới</h1>
      ) : (
        <div>
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
                <span className="new-come__item-time">
                  ({item.time.limit}')
                </span>
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
                  Thu của khách hàng (
                  {detailOrder.listFood.reduce(sumQuantity, 0)} món)
                </span>
                <div className="text-total">
                  <IoWallet className="text-total__icon" />
                  <span>
                    {validatePrice(detailOrder.listFood.reduce(sumTotal, 0))} đ
                  </span>
                </div>
              </div>

              <div className="confirm-order__button">
                <button>
                  <Link to={`${match.url}/moi-tu-choi/${detailOrder.id}`}>
                    Từ chối
                  </Link>
                </button>

                <button>Xác nhận</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewOrder;
