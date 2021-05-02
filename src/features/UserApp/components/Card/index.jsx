import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import iconDiscount from "assets/image/icons/discount.png";
import "./style.scss";

export default function Card({ merchant, index }) {
  const { _id, avt, name, location } = merchant;
  let match = useRouteMatch();
  console.log(merchant);

  return (
    <div className="col l-2-4 m-4 c-6">
      <Link to={`${match.url}/quan-an/${_id}`} className="dish-link">
        <div className="dish-item">
          <img src={avt} alt="ImageDish" className="dish-img" />
          <div className="dish-info">
            <div className="dish-name">{name}</div>
            <div className="dish-location">
              <div className="location">{location.address}</div>
            </div>
            <div className="dish-discount">
              <img
                src={iconDiscount}
                alt="icon-discount"
                className="dish-img__discount"
              />
              <div className="dish-discount_detail">Freeship 2km</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
