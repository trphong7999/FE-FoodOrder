import Navbar from "components/Navbar";
import React, {useState} from "react";
import "assets/css/grid.css";
import Banner from "components/Banner";
import GlobalAddress from "components/GlobalAddress"
import SlickList from "features/UserApp/components/Slide";
import Newfeed from "features/UserApp/components/Newfeed";

export default function MainPage() {
  const [SlideImage, setSlideImage] = useState([])
  
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
      <div className="grid wide">
        <SlickList />
      </div>
      <div className="grid wide">
        <Newfeed />
      </div>
    </div>
  );
}

