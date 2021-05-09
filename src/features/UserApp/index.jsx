import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import MainPage from "./pages/Main";
import MerchantPage from "./pages/MerchantPage";
import { useSelector } from "react-redux";

function UserApp(props) {
  const match = useRouteMatch();
  const user = useSelector((state) => state.loginUserApp);
  console.log(user);

  return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />
      <Route path={`${match.url}/quan-an/:id`} component={MerchantPage} />
      <Route
        exact
        path={`${match.url}/tai-khoan`}
        component={() => (user.username ? <AccountPage /> : <MainPage />)}
      />
    </Switch>
  );
}

export default UserApp;
