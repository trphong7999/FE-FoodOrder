import MainPage from "features/UserApp/pages/Main";
import React, { useState } from "react";
import { Switch, useRouteMatch, Route } from "react-router";
import ReceivedOrderDetail from "./components/ReceivedOrderDetail";
import LoginMerchant from "./pages/LoginMerchant";
import MainPageMerchant from "./pages/MainPageMerchant";

function MerchantApp(props) {
  const match = useRouteMatch();
  const [loginMerchant, setLoginMerchant] = useState(true);

  return (
    <Switch>
      <Route
        exact
        path={match.url}
        component={loginMerchant === false ? LoginMerchant : MainPageMerchant}
      />
      <Route path={`${match.url}/da-lay/:id`} component={ReceivedOrderDetail} />
    </Switch>
  );
}

export default MerchantApp;
