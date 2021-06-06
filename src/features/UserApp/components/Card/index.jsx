import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import iconDiscount from "assets/image/icons/discount.png";
import "./style.scss";
import { GrStatusGoodSmall } from "react-icons/gr";

export default function Card({ merchant, index }) {
  const { _id, avt, name, location } = merchant;
  let match = useRouteMatch();

  return (
    <div className="col l-2-4 m-4 c-6" style={{ position: "relative" }}>
      <GrStatusGoodSmall
        style={{
          position: "absolute",
          left: "0.4rem",
          top: "-0.3rem",
          fontSize: "2.2rem",
          color: merchant.status == "close" ? "gray" : "rgb(35, 152, 57)",
        }}
      />
      <a
        href={`${match.url}/quan-an/${_id}`}
        className="dish-link"
        target="_blank"
        rel="noreferrer"
      >
        <div className="dish-item">
          <img src={avt} alt="ImageDish" className="dish-img" height="110" />
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
      </a>
    </div>
  );
}
