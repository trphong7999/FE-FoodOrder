import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import MainPage from "./pages/Main";
import MerchantPage from "./pages/MerchantPage";

function UserApp(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />
      <Route path={`${match.url}/quan-an/:id`} component={MerchantPage} />
      <Route path={`${match.url}/tai-khoan`} component={AccountPage} />
    </Switch>
  );
}

export default UserApp;
