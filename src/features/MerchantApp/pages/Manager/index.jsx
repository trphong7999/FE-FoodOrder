import React from "react";
import NewOrder from "features/MerchantApp/components/NewOrder";
import "./style.scss";
import merchantApi from "api/merchantApi";
import { useDispatch } from "react-redux";
import { logoutMerchant } from "redux/loginMerchantAppSlice";
import TabMenu from "features/MerchantApp/components/TabMenu";
import NavBar from "features/MerchantApp/components/NavBar";

function MainPageMerchant() {
  const dispatch = useDispatch();

  // Check login is the manager
  merchantApi.checkAuth().then((res) => {
    try {
      if (res.status === 400) {
        dispatch(logoutMerchant());
      }
    } catch {
      return;
    }
  });

  return (
    <div className="grid">
      <NavBar />
      <TabMenu />

      <div className="main-merchant">
        <NewOrder />
      </div>
    </div>
  );
}

export default MainPageMerchant;
