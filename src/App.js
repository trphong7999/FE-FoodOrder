import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import UserApp from "./features/UserApp";
import MerchantApp from "./features/MerchantApp";
import PartnerApp from "./features/PartnerApp";
import ManagerApp from "features/ManagerApp";
import NotFound from "components/pages/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/user" />
        <Route path="/user" component={UserApp} />
        <Route path="/merchant" component={MerchantApp} />
        <Route path="/partner" component={PartnerApp} />
        <Route path="/manager" component={ManagerApp} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
