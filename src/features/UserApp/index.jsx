import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import MainPage from "./pages/Main";
import MerchantPage from "./pages/MerchantPage";
import DeliveryPage from "./pages/DeliveryPage";
import { useDispatch, useSelector } from "react-redux";
import userApi from "api/userApi";
import { logout } from "redux/loginUserAppSlice";

function UserApp(props) {
  const match = useRouteMatch();
  const user = useSelector((state) => state.loginUserApp);
  const dispatch = useDispatch();
  // Check login is the manager
  userApi.checkAuth().then((res) => {
    try {
      if (res.status === 400) {
        dispatch(logout());
      }
    } catch {
      return;
    }
  });

  return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />
      <Route path={`${match.url}/quan-an/:id`} component={MerchantPage} />
      <Route exact path={`${match.url}/dang-den`} component={DeliveryPage} />
      <Route
        exact
        path={`${match.url}/tai-khoan`}
        component={() => (user.username ? <AccountPage /> : <MainPage />)}
      />
    </Switch>
  );
}

export default UserApp;
