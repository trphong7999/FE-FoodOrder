import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MakingDetail from "./components/MakingDetail";
import Manager from "./pages/Manager";

function ParterApp(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={match.url} component={Manager} />
        <Route
          path={`${match.url}/making-detail/:id`}
          component={MakingDetail}
        />
      </Switch>
    </div>
  );
}

export default ParterApp;
