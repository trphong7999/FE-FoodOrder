import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import UserApp from "./features/UserApp";
import MerchantApp from "./features/MerchantApp";
import PartnerApp from "./features/PartnerApp";
import ManagerApp from "features/ManagerApp";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/user" eact component={UserApp} />
        <Route path="/merchant" component={MerchantApp} />
        <Route path="/partner" component={PartnerApp} />
        <Route path="/manager" component={ManagerApp} />
      </Switch>
    </Router>
  );
}

export default App;
