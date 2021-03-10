import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Login from "./pages/Login";
import Manager from "./pages/Manager";
function UserApp(props) {
  const match = useRouteMatch();
  const [isLogin, setIsLogin] = useState(true);
  const user = {
    name: "admin",
    pass: "admin",
  };
  console.log(isLogin);
  return (
    <Switch>
      <Route
        exact
        path={match.url}
        component={() =>
          isLogin ? <Manager /> : <Login user={user} setIsLogin={setIsLogin} />
        }
      />

      {/* <Route path={`${match.url}/add`} component={AddEditPage} />
      <Route path={`${match.url}/:photoId`} component={AddEditPage} /> */}

      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default UserApp;
