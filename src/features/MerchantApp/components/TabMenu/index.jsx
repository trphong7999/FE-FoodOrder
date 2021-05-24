import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./style.scss";

function TabMenu() {
  const [tabNavOrder, setTabNavOrder] = useState([
    { id: 0, title: "Mới", active: true, link: "/merchant" },
    { id: 1, title: "Đã nhận", active: false, link: "/merchant/da-nhan" },
    { id: 2, title: "Lịch sử", active: false, link: "/merchant/lich-su" },
    { id: 3, title: "Đã hủy", active: false, link: "/merchant/da-huy" },
  ]);

  const handleActive = (index) => {
    const list = tabNavOrder;

    list.map((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setTabNavOrder(list);
  };
  return (
    <ul className="tab-menu">
      {tabNavOrder.map((item, index) => (
        <li
          key={item.id}
          index={index}
          className="tab-menu__item"
          onClick={() => handleActive(index)}
        >
          <NavLink
            exact
            activeStyle={{
              color: "#1964d4",
              borderBottom: "3px solid #1964d4",
            }}
            to={item.link}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default TabMenu;
