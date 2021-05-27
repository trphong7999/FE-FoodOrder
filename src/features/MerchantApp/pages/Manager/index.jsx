import React, { useEffect, useState } from "react";
import NewOrder from "features/MerchantApp/components/NewOrder";
import "./style.scss";
import merchantApi from "api/merchantApi";
import { useDispatch } from "react-redux";
import { logoutMerchant } from "redux/loginMerchantAppSlice";
import TabMenu from "features/MerchantApp/components/TabMenu";
import NavBar from "features/MerchantApp/components/NavBar";
import socket from "socket-io.js";
import orderApi from "api/orderApi";

function MainPageMerchant() {
  const dispatch = useDispatch();
  const [newListOrder, setNewListOrder] = useState([]);

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

  socket.on("userCancelOrder", (orderId) => {
    const idx = newListOrder.findIndex((order) => {
      return String(order._id) == orderId;
    });
    console.log(idx, orderId, newListOrder);
    if (idx > -1) {
      newListOrder.splice(idx, 1);
      setNewListOrder([...newListOrder]);
    }
  });

  useEffect(() => {
    const fetchNewOrder = async () => {
      const newOrder = await orderApi.getOrderByStatus("new");
      setNewListOrder(newOrder);
    };
    fetchNewOrder();
  }, []);
  return (
    <div className="grid">
      <NavBar />
      <TabMenu />

      <div className="main-merchant">
        {newListOrder.length > 0 ? (
          <NewOrder
            newListOrder={newListOrder}
            setNewListOrder={setNewListOrder}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MainPageMerchant;
