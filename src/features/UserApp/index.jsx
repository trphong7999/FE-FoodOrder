import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainPage from "./pages/Main";

function UserApp(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />
      <Route exact path={`${match.url}/nemnuongnhatrang`} component={MainPage} />

      {/* <Route path={`${match.url}/add`} component={AddEditPage} />
      <Route path={`${match.url}/:photoId`} component={AddEditPage} /> */}

      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default UserApp;
