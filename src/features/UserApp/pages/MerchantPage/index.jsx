import Navbar from "features/UserApp/components/Navbar";
import React, { useEffect, useState } from "react";
import Footer from "features/UserApp/components/Footer";
import Brand from "features/UserApp/components/Brand";
import CartOrder from "features/UserApp/components/CartOrder";

import "./style.scss";
import { useRouteMatch } from "react-router";
import merchantApi from "api/merchantApi";

export default function MerchantPage() {
  const match = useRouteMatch();
  const [merchant, setMerchant] = useState(false);

  useEffect(() => {
    const fetchMerchant = async () => {
      try {
        // const params = {
        //   _page: 1,
        //   _limit: 10,

        // };
        const res = await merchantApi.get(match.params.id);
        setMerchant(res);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };

    fetchMerchant();
  }, []);
  return (
    <div className="merchant__main">
      <Navbar />

      <div className="merchant__content">
        <section className="grid wide">
          <div className="row">
            <div className="col l-8">
              {merchant ? <Brand merchant={merchant} /> : ""}
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
