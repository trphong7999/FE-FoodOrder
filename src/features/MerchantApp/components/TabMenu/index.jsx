import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { readDone, haveCancelOrder } from "redux/navMerchantUnread";

function TabMenu() {
  const dispatch = useDispatch();
  const unRead = useSelector((state) => state.unRead);
  const [tabNavOrder, setTabNavOrder] = useState([
    {
      id: 0,
      title: "Mới",
      active: true,
      link: "/merchant",
      unRead: unRead[0].count,
    },
    {
      id: 1,
      title: "Đã nhận",
      active: false,
      link: "/merchant/da-nhan",
      unRead: unRead[1].count,
    },
    {
      id: 2,
      title: "Lịch sử",
      active: false,
      link: "/merchant/lich-su",
      unRead: unRead[2].count,
    },
    {
      id: 3,
      title: "Đã hủy",
      active: false,
      link: "/merchant/da-huy",
      unRead: unRead[3].count,
    },
  ]);

  useEffect(() => {
    const updateUnread = () => {
      tabNavOrder.map((tab, idx) => {
        tab.unRead = unRead[idx].count;
        return tab;
      });
      setTabNavOrder([...tabNavOrder]);
    };
    updateUnread();
  }, [unRead]);

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
    dispatch(readDone(parseInt(index)));
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
            {item.title} (
            <span style={{ color: "green", fontWeight: "bold" }}>
              {item.unRead}
            </span>
            )
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default TabMenu;
