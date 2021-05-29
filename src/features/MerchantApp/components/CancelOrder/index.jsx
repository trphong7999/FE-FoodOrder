import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import TabMenu from "../TabMenu";
import TookOrderDetail from "../CancelOrderDetail";
import orderApi from "api/orderApi";
import { HiLightBulb } from "react-icons/hi";
import { AiFillPushpin } from "react-icons/ai";
import { IoWallet } from "react-icons/io5";
import {
  formatDatetimeToString,
  validatePrice,
  sumTotal,
  sumQuantity,
} from "func";
import "./style.scss";

function TookOrder() {
  const [orderCancel, setOrderCancel] = useState([]);

  useEffect(() => {
    const getOrderCanceled = async () => {
      const ordersCanceled = await orderApi.getOrderByStatus("cancel");
      ordersCanceled.reverse();
      setOrderCancel([...ordersCanceled]);
    };
    getOrderCanceled();
  }, []);
  return (
    <div className="grid">
      <NavBar />
      <TabMenu />
      <div className="took-order"></div>
      {orderCancel.map((od, idx) => (
        <TookOrderLine order={od} key={idx} id={idx} />
      ))}
    </div>
  );
}

export default TookOrder;

function TookOrderLine({ order, id }) {
  return (
    <div className="received-content-list">
      <div
        className="list-item"
        key={order._id}
        // onClick={() => {
        //   changeUrlToDetail(order);
      >
        <div className="list-item__top">
          <div className="list-item__top-number">
            <span>{id + 1}</span>
            <span>#{order._id}</span>
          </div>
          <span className="status">Đã hủy</span>
        </div>
        <div className="list-item__time">
          <span>
            Thời gian đặt{" "}
            {formatDatetimeToString(new Date(parseInt(order.timeOrder)))}{" "}
          </span>
          <div style={{ margin: "0.5rem 0 0 0" }}>
            Lý do hủy{" "}
            {order.reasonCancel.map((rs) => (
              <span className="rs-cancel">{rs}</span>
            ))}{" "}
            {order.reasonCancel.length == 0 ? (
              <span className="rs-cancel">Hủy bởi khách</span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="list-item__customer">
          <span>{order.userOrderId.info.name}</span>
        </div>
        <div className="list-item__bot">
          <span>{order.detail.foods.reduce(sumQuantity, 0)} món</span>
          <div className="list-item__bot-total">
            <IoWallet className="list-item__bot-icon" />
            <span>
              Giá gốc: {validatePrice(order.detail.foods.reduce(sumTotal, 0))} đ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
