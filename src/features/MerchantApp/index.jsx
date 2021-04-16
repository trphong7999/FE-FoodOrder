import MainPage from "features/UserApp/pages/Main";
import React, { useState } from "react";
import ReceivedOrderDetail from "./components/ReceivedOrderDetail";
import { useSelector } from "react-redux";
import { Switch, useRouteMatch, Route } from "react-router";
import Login from "./pages/Login";
import Manager from "./pages/Manager";

function MerchantApp(props) {
  const match = useRouteMatch();
  const merchant = useSelector((state) => state.merchant);
  console.log(merchant);

  return (
    <Switch>
      <Route
        exact
        path={match.url}
        component={() => (merchant.email ? <Manager /> : <Login />)}
      />
      <Route path={`${match.url}/da-lay/:id`} component={ReceivedOrderDetail} />
    </Switch>
  );
}

export default MerchantApp;
