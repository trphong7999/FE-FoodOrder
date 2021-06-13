import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Report from "./components/Report";
import PrintReport from "./components/PrintReport";
import Invoice from "./components/Invoice";

function MerchantApp() {
  const match = useRouteMatch();
  const merchant = useSelector((state) => state.merchant);
  const token = localStorage.token;

  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        component={() =>
          typeof token === "undefined" ? <Login /> : <Manager />
        }
        // component={Manager}
      />
      <Route path={`${match.url}/moi-tu-choi`} component={ReasonRefusal} />
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
      <Route path={`${match.url}/lich-su/invoice`} exact component={Invoice} />
      <Route
        path={`${match.url}/lich-su/chi-tiet`}
        component={OrderHistoryDetail}
      />
      <Route path={`${match.url}/thuc-don`} exact component={FoodMenu} />
      <Route path={`${match.url}/thuc-don/:id`} component={FoodMenuEdit} />

      <Route path={`${match.url}/cai-dat`} exact component={Setting} />
      <Route path={`${match.url}/bao-cao`} exact component={Report} />
      <Route
        path={`${match.url}/bao-cao/report`}
        exact
        component={PrintReport}
      />
    </Switch>
  );
}

export default MerchantApp;
