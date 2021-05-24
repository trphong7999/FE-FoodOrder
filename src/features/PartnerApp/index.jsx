import Login from "features/PartnerApp/pages/Login";
import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import MakingDetail from "./components/MakingDetail";
import Manager from "./pages/Manager";

import { useDispatch } from "react-redux";
import { logoutPartner } from "redux/loginPartnerAppSlice";
import partnerApi from "api/partnerApi";

import Chat from "./components/Chat";

function PartnerApp(props) {
  const match = useRouteMatch();
  const partner = useSelector((state) => state.partner);
  const dispatch = useDispatch();
  partnerApi.checkAuth().then((res) => {
    try {
      if (res.status === 400) {
        dispatch(logoutPartner());
      }
    } catch {
      return;
    }
  });
  return (
    <div>
      <Switch>
        <Route
          exact
          path={match.url}
          component={() => (partner.email ? <Manager /> : <Login />)}
        />
        <Route
          exact
          path={`${match.url}/detail-order/`}
          component={MakingDetail}
        />
        <Route exact path={`${match.url}/detail-order/chat`} component={Chat} />
      </Switch>
    </div>
  );
}

export default PartnerApp;
