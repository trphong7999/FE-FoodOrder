import React from "react";
import NavBar from "../NavBar";
import TabMenu from "../TabMenu";

function CanceledOrder() {
  return (
    <div className="grid">
      <NavBar />
      <TabMenu />
      <div className="cancel-order"></div>
      <b>this is cancel order</b>
    </div>
  );
}

export default CanceledOrder;
