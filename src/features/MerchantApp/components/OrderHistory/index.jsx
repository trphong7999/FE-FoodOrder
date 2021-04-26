import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import TabMenu from "../TabMenu";
import "./style.scss";
import { GiRoundStar } from "react-icons/gi";
import { useHistory, useRouteMatch } from "react-router";
import axios from "axios";
import { validatePrice } from "func";

function OrderHistory() {
  const history = useHistory();
  const match = useRouteMatch();
  const [historyList, setHistoryList] = useState([]);

  const handleToOrderHistoryDetail = (order) => {
    const location = {
      pathname: `${match.url}/${order.id}`,
      state: { detailHistory: order },
    };
    history.push(location);
    history.replace(location);
  };

  useEffect(() => {
    const getOrderHistoryList = async () => {
      const result = await axios(`http://localhost:5000/orderHistory`);
      if (result) {
        setHistoryList(result.data);
      }
    };
    getOrderHistoryList();
  }, []);

  return (
    <div className="grid">
      <NavBar />
      <TabMenu />
      <div className="order-history">
        {historyList.map((item, index) => (
          <div
            className="order-history__item"
            onClick={() => {
              handleToOrderHistoryDetail(item);
            }}
            key={index}
          >
            <div className="item-head">
              <div className="head__date">{item.time.date}</div>
              <div className="head__status">
                {item.time.status === 0 ? "Chưa giao" : "Đã giao"}
              </div>
            </div>
            <div className="wrap">
              <div className="item-top">
                <div className="item-top__left">{index + 1}</div>
                <div className="item-top__right">
                  <div className="right__name-customer">
                    {item.customer.name}
                  </div>
                  <div className="right__code-order">#{item.id}</div>
                </div>
              </div>
              <table className="item-table">
                <thead>
                  <tr>
                    <th>Đã lấy</th>
                    <th>Đã giao</th>
                    <th>Số món</th>
                    <th>Khoảng cách</th>
                  </tr>
                </thead>
                <tbody className="item-table__row-2">
                  <tr>
                    <td>{item.time.takeOrder}</td>
                    <td>{item.time.deliveryOrder}</td>
                    <td>{item.totalNumberOfDishes}</td>
                    <td>{item.space}km</td>
                  </tr>
                </tbody>
              </table>
              <div className="item-bot">
                <div className="bot__evaluate">
                  <GiRoundStar className="bot__evaluate-icon" />
                  <GiRoundStar className="bot__evaluate-icon" />
                  <GiRoundStar className="bot__evaluate-icon" />
                  <GiRoundStar className="bot__evaluate-icon" />
                </div>
                <div className="bot__cash">
                  <span className="bot__cash-text">Cash</span>
                  <span className="bot__cash-number">
                    {validatePrice(item.finalAmount)}đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
