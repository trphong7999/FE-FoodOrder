import React from "react";
import banner1 from "assets/image/brand/brand-banner1.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { GoDiffAdded } from "react-icons/go";
import "./style.scss";
import productimg from "assets/image/dishes/trasua.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Brand() {
  const classes = useStyles();

  return (
    <div className="brand">
      <div className="brand-top">
        <div
          className="brand__banner"
          style={{ backgroundImage: `url("${banner1}")` }}
        ></div>
        <div className="brand__info">
          <div className="brand-info__name">
            Trà Sữa Thiên Hội - Khánh Tường
          </div>
          <span className="brand-info__type">Trà Sữa</span>
          <div className="brand-info__open">Đang mở cửa</div>
          <div className="brand-info__location">
            238 Khánh Hội, Phường 6 Quận 4 Hồ Chí Minh
          </div>
        </div>
      </div>
      <div className="brand-content">
        <div className="brand__category">
          <ul className="category__list">
            <li className="category__item">collagen</li>
            <li className="category__item">collagen</li>
            <li className="category__item">collagen</li>
            <li className="category__item">collagen</li>
            <li className="category__item">collagen</li>
            <li className="category__item">collagen</li>
            <li className="category__item">collagen</li>
            <li className="category__item">collagen</li>
          </ul>
        </div>
        <div className="brand__products">
          <div className="product__category">
            <div className="product__category-name">collagen</div>
            <div className="product__list-item">
              <div className="product__item">
                <div
                  className="product__item-img"
                  style={{ backgroundImage: `url("${productimg}")` }}
                ></div>
                <div className="product__item-content">
                  <div className="product__name">Trà Sữa Collagen</div>
                  <div className="product__price">64.000 đ</div>
                </div>
                <div className="product__add">
                  <button className="product__add-btn">+</button>
                </div>
              </div>
              <div className="product__item">
                <div
                  className="product__item-img"
                  style={{ backgroundImage: `url("${productimg}")` }}
                ></div>
                <div className="product__item-content">
                  <div className="product__name">Đào Collagen</div>
                  <div className="product__price">64.000 đ</div>
                </div>
                <div className="product__add">
                  <button className="product__add-btn">+</button>
                </div>
              </div>
            </div>
          </div>
          <div className="product__category">
            <div className="product__category-name">collagen</div>
            <div className="product__list-item">
              <div className="product__item">
                <div
                  className="product__item-img"
                  style={{ backgroundImage: `url("${productimg}")` }}
                ></div>
                <div className="product__item-content">
                  <div className="product__name">Trà Sữa Collagen</div>
                  <div className="product__price">64.000 đ</div>
                </div>
                <div className="product__add">
                  <button className="product__add-btn">+</button>
                </div>
              </div>
              <div className="product__item">
                <div
                  className="product__item-img"
                  style={{ backgroundImage: `url("${productimg}")` }}
                ></div>
                <div className="product__item-content">
                  <div className="product__name">Đào Collagen</div>
                  <div className="product__price">64.000 đ</div>
                </div>
                <div className="product__add">
                  <button className="product__add-btn">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
