import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Login from "./pages/Login";
import Manager from "./pages/Manager";
import MerchantPage from "./pages/MerchantPage";
import PartnerPage from "./pages/PartnerPage";
import UserPage from "./pages/UserPage";
import Report from "./components/Report";

function ManagerApp(props) {
  const match = useRouteMatch();
  const user = useSelector((state) => state.manager);

  return (
    <Switch>
      <Route
        exact
        path={match.url}
        component={() => (user.username ? <Manager /> : <Login />)}
      />
      <Route exact path={`${match.url}/report`} component={Report} />
      <Route
        exact
        path={`${match.url}/merchant/:id`}
        component={MerchantPage}
      />
      <Route exact path={`${match.url}/partner/:id`} component={PartnerPage} />
      <Route exact path={`${match.url}/user/:id`} component={UserPage} />

      {/* <Route path={`${match.url}/add`} component={AddEditPage} />
      <Route path={`${match.url}/:photoId`} component={AddEditPage} /> */}

      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default ManagerApp;
