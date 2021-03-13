import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import ImageDish from "assets/image/dishes/dish1.jpg";
import iconDiscount from "assets/image/icons/discount.png";
import "./style.scss";

export default function Card({ merchant, index, key }) {
  const { merchantID, merchantImg, merchantName, merchantLocation } = merchant;
  return (
    <div className="col l-2">
      <Link to="/quanan" className="dish-link">
        <div className="dish-item">
          <img src={ImageDish} alt="ImageDish" className="dish-img" />
          <div className="dish-info">
            <div className="dish-name">{merchantName}</div>
            <div className="dish-location">
              <IoLocationOutline className="location-icon" />
              <div className="location-km">{merchantLocation}</div>
            </div>
            <div className="dish-location">
              <img
                src={iconDiscount}
                alt="icon-discount"
                className="dish-img__discount"
              />
              <div className="location-km">Freeship 2km</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
