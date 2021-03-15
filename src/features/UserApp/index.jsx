import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainPage from "./pages/Main";
import MerchantPage from "./pages/MerchantPage";

function UserApp(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />
      <Route path={`${match.url}/:id`} component={MerchantPage} />
    </Switch>
  );
}

export default UserApp;
