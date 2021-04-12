import MainPage from "features/UserApp/pages/Main";
import React,{useState} from "react";
import { Switch,useRouteMatch,Route } from "react-router";
import LoginMerchant from "./pages/LoginMerchant";
import MainPageMerchant from "./pages/MainPageMerchant";

function MerchantApp(props) {
  const match = useRouteMatch();
  const [loginMerchant, setLoginMerchant] = useState(true)

  return (
    <Switch>
      <Route exact path={match.url} component={loginMerchant === false ? LoginMerchant : MainPageMerchant}/>
    </Switch>
  );
}

export default MerchantApp;
