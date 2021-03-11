import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import UserApp from "./features/UserApp";
import MerchantApp from "./features/MerchantApp";
import PartnerApp from "./features/PartnerApp";
import ManagerApp from "features/ManagerApp";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "assets/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={UserApp} />
        <Route path="/merchant" exact component={MerchantApp} />
        <Route path="/partner" exact component={PartnerApp} />
        <Route path="/manager" exact component={ManagerApp} />
      </Switch>
    </Router>
  );
}

export default App;
