import React, { useEffect, useState } from "react";
import "./style.scss";
import YourOrder from "./YourOrder";
import FavoriteStore from "./FavoriteStore";
import CardManagement from "./CardManagement";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveTab } from "redux/tabNavSlice";
import orderApi from "api/orderApi";

export default function RightColAccount() {
  const dispatch = useDispatch();
  const listTabNav = useSelector((state) => state.tabNav);
  const user = useSelector((state) => state.loginUserApp);

  const [numericalOrder, setNumericalOrder] = useState(1);

  const [historyOrders, setHistoryOrders] = useState([]);

  const handleActiveClick = (index) => {
    const action = changeActiveTab(index);
    dispatch(action);
    setNumericalOrder(index + 1);
  };

  useEffect(() => {
    const fetchHistoryOrder = async () => {
      const historyOrders = await orderApi.getAllMyOrder();
      if (Array.isArray(historyOrders) && historyOrders.length > 0)
        setHistoryOrders(historyOrders.reverse());
    };
    fetchHistoryOrder();
  }, []);
  console.log(historyOrders);

  return (
    <div className="account-right">
      <div className="account-right__head">
        <ul className="tab-navigation">
          {listTabNav.map((item, index) => (
            <li
              key={item.id}
              index={index}
              className={item.active ? "active" : null}
              onClick={() => handleActiveClick(index)}
            >
              {item.head}
            </li>
          ))}
        </ul>
      </div>

      <div className="account-right__content">
        {numericalOrder === 1 ? (
          <YourOrder historyOrders={historyOrders} />
        ) : null}
        {numericalOrder === 2 ? (
          <FavoriteStore favorites={user.favoriteMerchant} />
        ) : null}
        {numericalOrder === 3 ? <CardManagement /> : null}
      </div>
    </div>
  );
}
