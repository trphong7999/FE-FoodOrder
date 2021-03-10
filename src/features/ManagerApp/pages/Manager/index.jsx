import React, { useState } from "react";
import NavbarManage from "components/NavbarManager";
import "./style.scss";
import SidebarElement from "features/ManagerApp/components/SidebarElement";
import {
  FaClipboardList,
  FaStore,
  FaMotorcycle,
  FaUserAlt,
} from "react-icons/fa";
function Manager(props) {
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
  };
  return (
    <div className="ManagerApp">
      <NavbarManage />
      <div className="main">
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
        <div className="content"></div>
      </div>
    </div>
  );
}

export default Manager;
