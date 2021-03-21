import React, { useState } from "react";
import "./style.scss";
import YourOrder from "./YourOrder";
import FavoriteStore from "./FavoriteStore";
import CardManagement from "./CardManagement";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveTab } from "redux/tabNavSlice";

export default function RightColAccount() {
  const dispatch = useDispatch();
  const listTabNav = useSelector((state) => state.tabNav);

  const [numericalOrder, setNumericalOrder] = useState(1);

  const handleActiveClick = (index) => {
    const action = changeActiveTab(index);
    dispatch(action);
    setNumericalOrder(index + 1);
  };

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
        {numericalOrder === 1 ? <YourOrder /> : null}
        {numericalOrder === 2 ? <FavoriteStore /> : null}
        {numericalOrder === 3 ? <CardManagement /> : null}
      </div>
    </div>
  );
}
