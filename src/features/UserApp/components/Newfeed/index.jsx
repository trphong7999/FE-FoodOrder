import React, { useState } from "react";
import Card from "features/UserApp/components/Card";
import "./style.scss";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export default function Newfeed() {
  const [merchant, setMerchant] = useState([
    {
      merchantId: "1",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "Cơm Tấm 89",
      merchantLocation: "2km",
    },
    {
      merchantId: "2",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "Thịt Xiên Nướng Ohio",
      merchantLocation: "8.6km",
    },
    {
      merchantId: "3",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "Mỳ Cay Seoul - Tô Hiệu",
      merchantLocation: "5.6km",
    },
    {
      merchantId: "4",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "Bánh Tráng Trộn",
      merchantLocation: "4km",
    },
    {
      merchantId: "5",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "Nem Nướng Thái Bình",
      merchantLocation: "6km",
    },
    {
      merchantId: "6",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "Hậu Hương - Bánh Mì Pate Cột Đèn",
      merchantLocation: "3.5km",
    },
    {
      merchantId: "7",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "Nem Nướng Nha Trang - Cát Bi",
      merchantLocation: "2.2km",
    },
    {
      merchantId: "8",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "Soho Tea - Hào Khê",
      merchantLocation: "2km",
    },
    {
      merchantId: "9",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "E Coffee",
      merchantLocation: "2km",
    },
    {
      merchantId: "10",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "Trà Sữa Heeka - Trần Hoàn",
      merchantLocation: "3.1km",
    },
    {
      merchantId: "11",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "Vua Gà Hàn Quốc",
      merchantLocation: "3.1km",
    },
    {
      merchantId: "12",
      merchantImg: "assets/image/dishes/dish1.jpg",
      merchantName: "Bếp Mẹ Mía",
      merchantLocation: "3.1km",
    },
  ]);

  return (
    <div className="newfeed-wrap">
      <section className="grid wide">
        <div className="title">
          <h1>cửa hàng gần bạn</h1>
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
