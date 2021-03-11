import React from "react";
import "./style.scss";

function SidebarElement({ item, index, changeActive }) {
  const { Icon, content, actived } = item;
  return (
    <div
      className={actived ? "sidebarEl actived" : "sidebarEl"}
      onClick={() => changeActive(index)}
    >
      <div>
        <Icon className="icon" />
      </div>
      <p>{content}</p>
    </div>
  );
}

export default SidebarElement;
