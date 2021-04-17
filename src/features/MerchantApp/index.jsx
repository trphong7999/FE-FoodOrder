import React from "react";
import TookOrderDetail from "./components/TookOrderDetail";
import { useSelector } from "react-redux";
import { Switch, useRouteMatch, Route, Router } from "react-router";
import Login from "./pages/Login";
import Manager from "./pages/Manager";
import ReceivedOrder from "./components/ReceivedOrder";
import TookOrder from "./components/TookOrder";
import CaceledOrder from "./components/CanceledOrder";
import ReceivedConfirm from "./components/ReceivedOrder/receivedConfirmDetail";
import ReceivedPrepareDetail from "./components/ReceivedOrder/receivedPrepareDetail";

function MerchantApp(props) {
  const match = useRouteMatch();
  const merchant = useSelector((state) => state.merchant);
  console.log(merchant);

  return (
    <div className="merchant-app">
      <Switch>
        <Route
          exact
          path={match.url}
          // component={() => (merchant.email ? <Manager /> : <Login />)}
          component={Manager}
        />

        <Route path={`${match.url}/da-nhan`} exact component={ReceivedOrder} />
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
        <Route path={`${match.url}/da-huy`} component={CaceledOrder} />
      </Switch>
    </div>
  );
}

export default MerchantApp;
