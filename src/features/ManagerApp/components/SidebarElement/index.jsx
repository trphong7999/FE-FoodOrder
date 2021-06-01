import React from "react";
import "./style.scss";

function SidebarElement({ item, index, changeActive }) {
  const { Icon, content, active } = item;
  return (
    <div
      className={active ? "sidebarEl actived" : "sidebarEl"}
      onClick={() => changeActive(index)}
    >
      <div>
        <Icon className="icon" />
      </div>
      <div>
        <span>{content}</span>
      </div>
    </div>
  );
}

export default SidebarElement;
