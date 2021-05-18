import Login from "features/PartnerApp/pages/Login";
import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MakingDetail from "./components/MakingDetail";
import Manager from "./pages/Manager";

function ParterApp(props) {
  const match = useRouteMatch();
  const partner = useSelector((state) => state.partner);
  console.log(partner);
  return (
    <div>
      <Switch>
        <Route
          exact
          path={match.url}
          component={() => (partner.email ? <Manager /> : <Login />)}
        />
        <Route
          path={`${match.url}/making-detail/:id`}
          component={MakingDetail}
        />
      </Switch>
    </div>
  );
}

export default ParterApp;
