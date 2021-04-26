import React from "react";
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

function MerchantApp(props) {
  const match = useRouteMatch();
  const merchant = useSelector((state) => state.merchant);
  console.log(merchant);

  return (
    <Router>
      <div className="merchant-app">
        <Switch>
          <Route
            exact
            path={match.url}
            // component={() => (merchant.email ? <Manager /> : <Login />)}
            component={Manager}
          />
          <Route
            path={`${match.url}/moi-tu-choi/:id`}
            component={ReasonRefusal}
          />
          <Route
            path={`${match.url}/da-nhan`}
            exact
            component={ReceivedOrder}
          />
          <Route
            path={`${match.url}/da-nhan/xac-nhan/:id`}
            component={ReceivedConfirm}
          />
          <Route
            path={`${match.url}/da-nhan/chuan-bi/:id`}
            component={ReceivedPrepareDetail}
          />
          <Route path={`${match.url}/da-huy`} exact component={CancelOrder} />
          <Route
            path={`${match.url}/da-huy/:id`}
            component={CancelOrderDetail}
          />
          <Route path={`${match.url}/lich-su`} exact component={OrderHistory} />
          <Route
            path={`${match.url}/lich-su/:id`}
            component={OrderHistoryDetail}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default MerchantApp;
