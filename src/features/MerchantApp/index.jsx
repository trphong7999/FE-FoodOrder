import React from "react";
import TookOrderDetail from "./components/TookOrderDetail";
import { useSelector } from "react-redux";
import { Switch, useRouteMatch, Route } from "react-router";
import Login from "./pages/Login";
import Manager from "./pages/Manager";
import ReceivedOrder from "./components/ReceivedOrder";
import TookOrder from "./components/TookOrder";
import CaceledOrder from "./components/CanceledOrder";
import ReceivedConfirm from "./components/ReceivedOrder/ReceivedConfirm";

function MerchantApp(props) {
  const match = useRouteMatch();
  const merchant = useSelector((state) => state.merchant);
  console.log(merchant);

  return (
    <Switch>
      <Route
        exact
        path={match.url}
        // component={() => (merchant.email ? <Manager /> : <Login />)}
        component={Manager}
      />

      <Route path={`${match.url}/da-nhan`} component={ReceivedOrder} />
      <Route path={`${match.url}/da-nhan/:id`} component={ReceivedConfirm} />
      <Route path={`${match.url}/da-lay`} component={TookOrder} />
      <Route path={`${match.url}/da-lay/:id`} component={TookOrderDetail} />
      <Route path={`${match.url}/da-huy`} component={CaceledOrder} />
    </Switch>
  );
}

export default MerchantApp;
