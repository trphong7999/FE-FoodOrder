import React from "react";
import "./styleContent.scss";
import { AiFillPushpin } from "react-icons/ai";
import { IoWallet, IoNotificationsCircleSharp } from "react-icons/io5";
import { useHistory, useRouteMatch } from "react-router-dom";
import { validatePrice } from "func";

export default function ReceivedPrepare({ listPrepare }) {
  const match = useRouteMatch();
  const history = useHistory();
  console.log(listPrepare);

  const changeUrlToDetailPrepare = (order) => {
    const location = {
      pathname: `${match.url}/chuan-bi/${order.id}`,
      state: { prepareDetail: order },
    };
    history.push(location);
    history.replace(location);
  };
  return (
    <div className="received-content">
      <div className="received-content-list">
        {listPrepare.map((order, index) => (
          <div
            className="list-item"
            onClick={() => {
              changeUrlToDetailPrepare(order);
            }}
          >
            <div className="list-item__top">
              <div className="list-item__top-number">
                <span>{index + 1}</span>
                <span>#{order.id}</span>
              </div>
              <AiFillPushpin className="list-item__top-icon" />
            </div>
            <div className="list-item__time">
              <span>
                Giao hàng lúc {order.time.startOrder} (trong -{" "}
                {order.time.limit} phút)
              </span>
            </div>
            <div className="list-item__customer">
              <span>{order.customer.name}</span>
            </div>
            <div className="list-item__status-driver">
              <div className="status-driver__text">
                Trạng thái:
                <span className="status-driver-2">
                  {order.finalAmount.status === 0
                    ? "Đang chỉ định tài xế"
                    : "Tài xế đang đến"}
                </span>
              </div>
              <div className="status-driver__action">
                <IoNotificationsCircleSharp className="status-driver__action-icon" />
                Báo cho tài xế
              </div>
            </div>
            <div className="list-item__bot">
              <span>{order.totalNumberOfDishes} món</span>
              <div className="list-item__bot-total">
                <IoWallet className="list-item__bot-icon" />
                <span>{validatePrice(order.finalAmount)} đ</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
