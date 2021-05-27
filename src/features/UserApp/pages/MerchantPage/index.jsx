import Navbar from "features/UserApp/components/Navbar";
import React, { useEffect, useState } from "react";
import Footer from "features/UserApp/components/Footer";
import Brand from "features/UserApp/components/Brand";
import CartOrder from "features/UserApp/components/CartOrder";

import "./style.scss";
import { useRouteMatch } from "react-router";
import merchantApi from "api/merchantApi";
import NotFound from "components/pages/NotFound";

export default function MerchantPage() {
  const match = useRouteMatch();
  const [merchant, setMerchant] = useState(1);
  useEffect(() => {
    const fetchMerchant = async () => {
      try {
        // const params = {
        //   _page: 1,
        //   _limit: 10,

        // };
        const res = await merchantApi.get(match.params.id);
        if (res.status !== 400) setMerchant(res);
        else setMerchant(false);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };

    fetchMerchant();
  }, []);
  return (
    <div className="merchant__main">
      <Navbar />
      {typeof merchant === "object" ? (
        <div className="merchant__content">
          <section className="grid wide">
            <div className="row">
              <div className="col l-8 m-12">
                <Brand merchant={merchant} />
              </div>
              <div className="col l-4 m-0 c-12">
                <CartOrder merchant={merchant} />
              </div>
            </div>
          </section>
        </div>
      ) : merchant === 1 ? (
        ""
      ) : (
        <NotFound />
      )}
      <Footer />
    </div>
  );
}
