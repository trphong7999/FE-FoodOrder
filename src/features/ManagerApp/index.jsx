import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Login from "./components/Login";
import Manage from "./components/Manage";
function UserApp(props) {
  const match = useRouteMatch();
  let user = false;
  return (
    <Switch>
      <Route
        exact
        path={match.url}
        component={() => (user ? <Manage /> : <Login />)}
      />

      {/* <Route path={`${match.url}/add`} component={AddEditPage} />
      <Route path={`${match.url}/:photoId`} component={AddEditPage} /> */}

      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default UserApp;
