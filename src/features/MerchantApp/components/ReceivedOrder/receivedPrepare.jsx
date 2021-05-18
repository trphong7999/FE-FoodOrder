import React from "react";
import "./styleContent.scss";
import { AiFillPushpin } from "react-icons/ai";
import { IoWallet, IoNotificationsCircleSharp } from "react-icons/io5";
import { useHistory, useRouteMatch } from "react-router-dom";
import { datetimeFromTimestamp, sumQuantity, validatePrice } from "func";

export default function ReceivedPrepare({ listPrepare }) {
  const match = useRouteMatch();
  const history = useHistory();

  const changeUrlToDetailPrepare = (order) => {
    const location = {
      pathname: `${match.url}/chuan-bi/${order._id}`,
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
            key={index}
            onClick={() => {
              changeUrlToDetailPrepare(order);
            }}
          >
            <div className="list-item__top">
              <div className="list-item__top-number">
                <span>{index + 1}</span>
                <span>#{order._id}</span>
              </div>
              <AiFillPushpin className="list-item__top-icon" />
            </div>
            <div className="list-item__time">
              <span>
                Giao hàng lúc{" "}
                {datetimeFromTimestamp(parseInt(order.timeOrder) + 15 * 60000)}{" "}
                (trong -{"15"}
                phút)
              </span>
            </div>
            <div className="list-item__customer">
              <span>{order.userOrderId.info.name}</span>
            </div>
            <div className="list-item__status-driver">
              <div className="status-driver__text">
                Trạng thái:
                {!order.deliverId ? (
                  <span
                    style={{ color: "#d89c46" }}
                    className="status-driver-2"
                  >
                    Đang chỉ định tài xế
                  </span>
                ) : (
                  <span
                    className="status-driver-2"
                    style={{ color: "#53a653" }}
                  >
                    Tài xế <b>{order.deliverId.name}</b> đang đến
                  </span>
                )}
              </div>
              {order.deliverId ? (
                <div
                  className="status-driver__action"
                  style={{
                    width: "20rem",
                    height: "5rem",
                    cursor: "pointer",
                    position: "absolute",
                    right: "0.5rem",
                    top: "-3.5rem",
                  }}
                >
                  <IoNotificationsCircleSharp className="status-driver__action-icon" />
                  Báo cho tài xế chuẩn bị
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="list-item__bot">
              <span>{order.detail.foods.reduce(sumQuantity, 0)} món</span>
              <div className="list-item__bot-total">
                <span className="list-item__bot-cash">Cash</span>

                <span>
                  {validatePrice(
                    order.detail.total - order.detail.total * (10 / 100)
                  )}{" "}
                  đ
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
