import React, { useEffect, useState } from "react";
import NewOrder from "features/MerchantApp/components/NewOrder";
import "./style.scss";
import merchantApi from "api/merchantApi";
import { useDispatch } from "react-redux";
import { logoutMerchant } from "redux/loginMerchantAppSlice";
import TabMenu from "features/MerchantApp/components/TabMenu";
import NavBar from "features/MerchantApp/components/NavBar";
import socket from "socket-io.js";

function MainPageMerchant() {
  const dispatch = useDispatch();
  const [newListOrder, setNewListOrder] = useState([]);
  console.log(newListOrder);
  // Check login is the manager
  merchantApi.checkAuth().then((res) => {
    try {
      if (res.status === 400) {
        dispatch(logoutMerchant());
      }
    } catch {
      console.log("ok");
      return;
    }
  });

  socket.on("newOrder", (data) => {
    setNewListOrder([...newListOrder, data]);
  });
  socket.on("ordersMerchant", (data) => {
    setNewListOrder(data);
  });

  return (
    <div className="grid">
      <NavBar />
      <TabMenu />

      <div className="main-merchant">
        {newListOrder.length > 0 ? (
          <NewOrder newListOrder={newListOrder} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MainPageMerchant;
