import Navbar from "components/Navbar";
import React, {useState} from "react";
import "assets/css/grid.css";
import "./index.scss";
import Banner from "components/Banner";
import GlobalAddress from "components/GlobalAddress"
import SlickList from "features/UserApp/components/Slide";
import Newfeed from "features/UserApp/components/Newfeed";
import Footer from "features/UserApp/components/Footer";

export default function MainPage() {
  const [SlideImage, setSlideImage] = useState([])
  
  return (
    <div className="main-page">
      <Navbar />
      <Banner/>
      <GlobalAddress />
      <SlickList />
      <Newfeed />
      <Newfeed />
      <Footer/>
    </div>
  );
}

