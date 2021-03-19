import React, { useState } from "react";
import "assets/css/grid.css";
import "./index.scss";
import Banner from "components/Banner";
import GlobalAddress from "features/UserApp/components/GlobalAddress";
import SlickList from "features/UserApp/components/Slide";
import Newfeed from "features/UserApp/components/Newfeed";
import Footer from "features/UserApp/components/Footer";
import Navbar from "features/UserApp/components/Navbar";

export default function MainPage() {
  const [SlideImage, setSlideImage] = useState([]);

  return (
    <div className="main-page">
      <Navbar />
      <Banner />
      <GlobalAddress />
      <SlickList />
      <Newfeed />
      <Newfeed />
      <Footer />
    </div>
  );
}
