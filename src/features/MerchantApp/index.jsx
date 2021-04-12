import React from "react";
import { Switch,useRouteMatch,Route } from "react-router";
import LoginMerchant from "./pages/LoginMerchant"

function MerchantApp(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={LoginMerchant}/>
    </Switch>
  );
}

export default MerchantApp;
