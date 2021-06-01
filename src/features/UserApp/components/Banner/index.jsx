import React, { useState } from "react";
import "./Banner.scss";
import banner from "assets/image/banner.jpg";
import { BsSearch } from "react-icons/bs";

function Banner({ keyFind, setKeyFind }) {
  // let a;
  const handleChangeQuery = (val) => {
    setKeyFind(val);
  };
  return (
    <div className="banner-wrap">
      <section className="grid__full-width">
        <div
          className="banner-img"
          style={{ backgroundImage: `url("${banner}")` }}
        >
          <div className="search-box">
            <span className="btn-search">
              <BsSearch className="icon-search" />
            </span>

            <input
              type="text"
              // value={keyFind}
              onChange={(e) => handleChangeQuery(e.target.value)}
              className="input-search"
              placeholder="Tìm món ăn yêu thích để đặt FoodLovers giao ngay"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
