import React from "react";
import { Switch, Route } from "react-router-dom";
import MakingDetail from "./components/MakingDetail";
import Manager from "./pages/Manager";

function ParterApp(props) {
  return (
    <div>
      {/* <Manager /> */}
      <MakingDetail />
    </div>
  );
}

export default ParterApp;
