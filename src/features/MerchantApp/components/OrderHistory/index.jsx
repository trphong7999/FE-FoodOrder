import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import TabMenu from "../TabMenu";
import "./style.scss";
import { GiRoundStar } from "react-icons/gi";
import { useHistory, useRouteMatch } from "react-router";
import { validatePrice } from "func";
import orderApi from "api/orderApi";
import { formatDatetimeToString, sumQuantity } from "func";

function OrderHistory() {
  const history = useHistory();
  const match = useRouteMatch();
  const [historyList, setHistoryList] = useState([]);
  const handleToOrderHistoryDetail = (order) => {
    const location = {
      pathname: `${match.url}/chi-tiet`,
      state: { detailHistory: order },
    };
    history.push(location);
    history.replace(location);
  };

  useEffect(() => {
    const getOrderHistoryList = async () => {
      const ordersDelivering = await orderApi.getOrderByStatus("delivering");
      if (!ordersDelivering.status || ordersDelivering.status !== 400)
        ordersDelivering.reverse();
      const ordersComplete = await orderApi.getOrderByStatus("complete");
      if (!ordersComplete.status || ordersDelivering.status !== 400)
        ordersComplete.reverse();
      if (!ordersComplete.status && !ordersDelivering.status)
        setHistoryList([...ordersDelivering, ...ordersComplete]);
    };
    getOrderHistoryList();
  }, []);

  const checkInvoice = (order) => {
    const location = {
      pathname: `${match.url}/invoice`,
      state: { order },
    };
    history.push(location);
    history.replace(location);
  };

  return (
    <div className="grid">
      <NavBar />
      <TabMenu />
      <div className="order-history">
        {historyList.map((od, index) => (
          <React.Fragment>
            <button
              style={{
                borderRadius: "10px",
                padding: "0.3rem 0.7rem",
                marginRight: "1rem",
                zIndex: "1000000",
                position: "relative",
                top: "3rem",
                left: "13rem",
              }}
              onClick={() => checkInvoice(od)}
            >
              Hóa đơn
            </button>
            <div
              className="order-history__item"
              onClick={() => {
                handleToOrderHistoryDetail(od);
              }}
              key={index}
            >
              <div className="item-head">
                <div className="head__date">
                  {formatDatetimeToString(
                    new Date(parseInt(od.timePartnerGetFood))
                  )}
                </div>
                <div className="head__status">
                  {od.status === "delivering"
                    ? "Đang giao"
                    : (od.status = "complete" ? "Đã giao" : "Giao thất bại")}
                </div>
              </div>
              <div className="wrap">
                <div className="item-top">
                  <div className="item-top__left">{index + 1}</div>
                  <div className="item-top__right">
                    <div className="right__name-customer">
                      {od.userOrderId.info.name}
                    </div>
                    <div className="right__code-order">#{od._id}</div>
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
                      <td>
                        {formatDatetimeToString(
                          new Date(parseInt(od.timePartnerGetFood))
                        )}
                      </td>
                      <td>
                        {od.timeDeliverDone
                          ? formatDatetimeToString(
                              new Date(parseInt(od.timeDeliverDone))
                            )
                          : "Đang giao"}
                      </td>
                      <td>{od.detail.foods.reduce(sumQuantity, 0)}</td>
                      <td>{od.distance}km</td>
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
                      {validatePrice(od.detail.total)}đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
