import Navbar from "components/Navbar";
import React from "react";
import "assets/css/grid.css";
import Banner from "components/Banner";

function MainPage(props) {
  return (
    <div>
      <div className="grid wide">
        <Navbar />
      </div>
      <div className="grid__full-width">
        <Banner/>
      </div>
      
    </div>
  );
}

export default MainPage;
