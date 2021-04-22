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
import TookOrder from "./components/TookOrder";
import CaceledOrder from "./components/CanceledOrder";
import ReceivedConfirm from "./components/ReceivedOrder/receivedConfirmDetail";
import ReceivedPrepareDetail from "./components/ReceivedOrder/receivedPrepareDetail";
import TookOrderDetail from "./components/TookOrderDetail";
import ReasonRefusal from "./components/ReasonRefusal";

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
          <Route path={`${match.url}/da-lay`} exact component={TookOrder} />
          <Route path={`${match.url}/da-lay/:id`} component={TookOrderDetail} />
          <Route path={`${match.url}/lich-su`} component={CaceledOrder} />
        </Switch>
      </div>
    </Router>
  );
}

export default MerchantApp;
