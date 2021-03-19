import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import ImageDish from "assets/image/dishes/dish1.jpg";
import iconDiscount from "assets/image/icons/discount.png";
import "./style.scss";

export default function Card({ merchant, index }) {
  const { merchantId, merchantImg, merchantName, merchantLocation } = merchant;
  let match = useRouteMatch();

  return (
    <div className="col l-2 m-4 c-6">
      <Link to={`${match.url}/quan-an/${merchantId}`} className="dish-link">
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
