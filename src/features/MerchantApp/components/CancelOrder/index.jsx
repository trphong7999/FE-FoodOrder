import React from "react";
import NavBar from "../NavBar";
import TabMenu from "../TabMenu";

function TookOrder() {
  return (
    <div className="grid">
      <NavBar />
      <TabMenu />
      <div className="took-order"></div>
      <b>this is took order</b>
    </div>
  );
}

export default TookOrder;
