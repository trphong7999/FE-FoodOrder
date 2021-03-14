import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Login from "./pages/Login";
import Manager from "./pages/Manager";

function ManagerApp(props) {
  const match = useRouteMatch();
  const user = useSelector((state) => state.user);

  return (
    <Switch>
      <Route
        exact
        path={match.url}
        component={() => (user.username ? <Manager /> : <Login />)}
      />

      {/* <Route path={`${match.url}/add`} component={AddEditPage} />
      <Route path={`${match.url}/:photoId`} component={AddEditPage} /> */}

      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default ManagerApp;
