import React, { useState } from "react";
import SidebarElement from "../SidebarElement";
import {
  FaClipboardList,
  FaStore,
  FaMotorcycle,
  FaUserAlt,
} from "react-icons/fa";
import "./style.scss";

function Sidebar({ setSidebar }) {
  const [menubar, setMenubar] = useState([
    { Icon: FaClipboardList, content: "Dashboard", active: true },
    { Icon: FaStore, content: "Merchant", active: false },
    { Icon: FaMotorcycle, content: "Partner", active: false },
    { Icon: FaUserAlt, content: "Customer", active: false },
  ]);

  const changeActive = (index) => {
    const bar = menubar.map((item, i) => {
      if (i === index) item.active = true;
      else item.active = false;
      return item;
    });
    setMenubar(bar);
    setSidebar(index + 1);
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
          setSidebar={setSidebar}
        />
      ))}
    </div>
  );
}

export default Sidebar;
