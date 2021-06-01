import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Manager from "./pages/Manager";
import ReceivedOrder from "./components/ReceivedOrder";
import CancelOrder from "./components/CancelOrder";
import OrderHistory from "./components/OrderHistory";
import ReceivedConfirm from "./components/ReceivedOrder/receivedConfirmDetail";
import ReceivedPrepareDetail from "./components/ReceivedOrder/receivedPrepareDetail";
import CancelOrderDetail from "./components/CancelOrderDetail";
import ReasonRefusal from "./components/ReasonRefusal";
import OrderHistoryDetail from "./components/OrderHistoryDetail";
import FoodMenu from "./components/FoodMenu";
import merchantApi from "api/merchantApi";
import FoodMenuEdit from "./components/FoodMenuEdit";
import Setting from "./components/Setting";

function MerchantApp() {
  const match = useRouteMatch();
  const merchant = useSelector((state) => state.merchant);

  // const [infoMerchant, setInfoMerchant] = useState(1);
  // useEffect(() => {
  //   const fetchMerchant = async () => {
  //     try {
  //       // const params = {
  //       //   _page: 1,
  //       //   _limit: 10,

  //       // };
  //       const res = await merchantApi.get(merchantId);
  //       if (res.status !== 400) setInfoMerchant(res);
  //       else setInfoMerchant(false);
  //     } catch (error) {
  //       console.log("Failed to fetch merchant info: ", error);
  //     }
  //   };

  //   fetchMerchant();
  // }, []);

  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        component={() => (merchant.email ? <Manager /> : <Login />)}
        // component={Manager}
      />
      <Route path={`${match.url}/moi-tu-choi/:id`} component={ReasonRefusal} />
      <Route path={`${match.url}/da-nhan`} exact component={ReceivedOrder} />
      <Route
        path={`${match.url}/da-nhan/xac-nhan/:id`}
        component={ReceivedConfirm}
      />
      <Route
        path={`${match.url}/da-nhan/chuan-bi/:id`}
        component={ReceivedPrepareDetail}
      />
      <Route path={`${match.url}/da-huy`} exact component={CancelOrder} />
      {/* <Route path={`${match.url}/da-huy/:id`} component={CancelOrderDetail} /> */}
      <Route path={`${match.url}/lich-su`} exact component={OrderHistory} />
      <Route
        path={`${match.url}/lich-su/chi-tiet`}
        component={OrderHistoryDetail}
      />
      <Route path={`${match.url}/thuc-don`} exact component={FoodMenu} />
      <Route path={`${match.url}/thuc-don/:id`} component={FoodMenuEdit} />

      <Route path={`${match.url}/cai-dat`} exact component={Setting} />
    </Switch>
  );
}

export default MerchantApp;
