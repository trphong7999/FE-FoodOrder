import React, { useEffect, useState } from "react";
import Card from "features/UserApp/components/Card";
import "./style.scss";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import merchantApi from "api/merchantApi";
import { computeDistant, getLocationUser } from "func";

export default function Newfeed() {
  const [merchant, setMerchant] = useState([]);

  useEffect(() => {
    const fetchMerchantsList = async () => {
      try {
        // const params = {
        //   _page: 1,
        //   _limit: 10,

        // };
        let res = await merchantApi.getAll();
        const {
          latitude: userLat,
          longitude: userLng,
        } = getLocationUser().coords;

        res = res.map((merchant) => ({
          ...merchant,
          distance: computeDistant(
            userLat,
            userLng,
            merchant.location.lat,
            merchant.location.lng
          ),
        }));
        res = res.sort((pre, next) => pre.distance - next.distance);
        console.log(res);
        setMerchant(res);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchMerchantsList();
  }, []);

  return (
    <div className="newfeed-wrap">
      <section className="grid wide">
        <div className="filter">
          <div className="filter-cat">
            <div className="filter-cat--item">Khu vực</div>
            <div className="filter-cat--item">Phân loại</div>
          </div>
          <div className="filter-sort">
            200 kết quả
            <select class="filter-sort--item">
              <option value="">Gần tôi</option>
              <option value="">Đánh giá</option>
              <option value="">Bán chạy</option>
            </select>
          </div>
        </div>
        <div className="content">
          <div className="list-view row sm-gutter">
            {merchant.map((mer, index) => (
              <Card merchant={mer} key={index} index={index} />
            ))}
          </div>
          <Link to="/" className="view-all">
            Xem tất cả
            <FaChevronRight className="view-all-icon" />
          </Link>
        </div>
      </section>
    </div>
  );
}
