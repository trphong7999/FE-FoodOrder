import React, { useState } from "react";
import SidebarElement from "../SidebarElement";
import {
  FaClipboardList,
  FaStore,
  FaMotorcycle,
  FaUserAlt,
} from "react-icons/fa";
import "./style.scss";

function Sidebar(props) {
  const [menubar, setMenubar] = useState([
    { Icon: FaClipboardList, content: "Dashboard", actived: true },
    { Icon: FaStore, content: "Merchant", actived: false },
    { Icon: FaMotorcycle, content: "Partner", actived: false },
    { Icon: FaUserAlt, content: "Customer", actived: false },
  ]);

  const changeActive = (index) => {
    const bar = menubar.map((item, i) => {
      if (i === index) item.actived = true;
      else item.actived = false;
      return item;
    });
    setMenubar(bar);
  };
  return (
    <div className="side-bar">
      <div className="create"></div>
      {menubar.map((item, index) => (
        <SidebarElement
          item={item}
          key={index}
          index={index}
          changeActive={changeActive}
        />
      ))}
    </div>
  );
}

export default Sidebar;
