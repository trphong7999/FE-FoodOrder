import Navbar from "features/UserApp/components/Navbar";
import React from "react";
import Footer from "features/UserApp/components/Footer";
import Brand from "features/UserApp/components/Brand";
import CartOrder from "features/UserApp/components/CartOrder";

import "./style.scss";

export default function MerchantPage() {
  return (
    <div className="merchant__main">
      <Navbar />
      <div className="merchant__content">
        <section className="grid wide">
          <div className="row">
            <div className="col l-8">
              <Brand />
            </div>
            <div className="col l-4">
              <CartOrder />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
