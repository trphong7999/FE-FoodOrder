import Navbar from "components/Navbar";
import React from "react";
import "assets/css/grid.css";
import Banner from "components/Banner";
import GlobalAddress from "components/GlobalAddress"

function MainPage(props) {
  return (
    <div>
      <div className="grid wide">
        <Navbar />
      </div>
      <div className="grid__full-width">
        <Banner/>
      </div>
      <div className="grid wide">
        <GlobalAddress />
      </div>
    </div>
  );
}

export default MainPage;
