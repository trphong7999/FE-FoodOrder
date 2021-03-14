import React, { useEffect, useState } from "react";
import banner1 from "assets/image/brand/brand-banner1.jpg";
import { HashLink as Link } from "react-router-hash-link";
import "./style.scss";
import productimg from "assets/image/dishes/trasua.jpg";

export default function Brand() {
  useEffect(() => {
    const catList = document.getElementById("category-list");
    const sticky = catList.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        catList.classList.add("stick-category-list");
      } else {
        catList.classList.remove("stick-category-list");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

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

      <div className="brand-content row">
        <div className="col l-3 brand__category">
          <ul id="category-list" className="category__list">
            <li>
              <Link to="#group1" className="category__item">
                collagen
              </Link>
            </li>
            <li>
              <Link to="#group2" className="category__item">
                kem tuyết
              </Link>
            </li>
            <li>
              <Link to="#group3" className="category__item">
                macchiato series
              </Link>
            </li>
            <li>
              <Link to="#group4" className="category__item">
                trà nguyên chất
              </Link>
            </li>
          </ul>
        </div>

        <div className="col l-9 brand__products">
          <div id="group1" className="product__category">
            <div className="product__category-name">collagen</div>
            <div className="product__list-item">
              <div className="product__item">
                <div
                  className="product__item-img hover-mode"
                  style={{ backgroundImage: `url("${productimg}")` }}
                >
                  <div className="img-big__wrapper hidden">
                    <div
                      className="img-big"
                      style={{ backgroundImage: `url("${productimg}")` }}
                    ></div>
                  </div>
                </div>
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
                  className="product__item-img hover-mode"
                  style={{ backgroundImage: `url("${productimg}")` }}
                >
                  <div className="img-big__wrapper hidden">
                    <div
                      className="img-big"
                      style={{ backgroundImage: `url("${productimg}")` }}
                    ></div>
                  </div>
                </div>
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

          <div id="group2" className="product__category">
            <div className="product__category-name">kem tuyết</div>
            <div className="product__list-item">
              <div className="product__item">
                <div
                  className="product__item-img hover-mode"
                  style={{ backgroundImage: `url("${productimg}")` }}
                >
                  <div className="img-big__wrapper hidden">
                    <div
                      className="img-big"
                      style={{ backgroundImage: `url("${productimg}")` }}
                    ></div>
                  </div>
                </div>
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
                  className="product__item-img hover-mode"
                  style={{ backgroundImage: `url("${productimg}")` }}
                >
                  <div className="img-big__wrapper hidden">
                    <div
                      className="img-big"
                      style={{ backgroundImage: `url("${productimg}")` }}
                    ></div>
                  </div>
                </div>
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

          <div id="group3" className="product__category">
            <div className="product__category-name">MACCHIATO SERIES</div>
            <div className="product__list-item">
              <div className="product__item">
                <div
                  className="product__item-img hover-mode"
                  style={{ backgroundImage: `url("${productimg}")` }}
                >
                  <div className="img-big__wrapper hidden">
                    <div
                      className="img-big"
                      style={{ backgroundImage: `url("${productimg}")` }}
                    ></div>
                  </div>
                </div>
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
                  className="product__item-img hover-mode"
                  style={{ backgroundImage: `url("${productimg}")` }}
                >
                  <div className="img-big__wrapper hidden">
                    <div
                      className="img-big"
                      style={{ backgroundImage: `url("${productimg}")` }}
                    ></div>
                  </div>
                </div>
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

          <div id="group4" className="product__category">
            <div className="product__category-name">TRÀ NGUYÊN CHẤT</div>
            <div className="product__list-item">
              <div className="product__item">
                <div
                  className="product__item-img hover-mode"
                  style={{ backgroundImage: `url("${productimg}")` }}
                >
                  <div className="img-big__wrapper hidden">
                    <div
                      className="img-big"
                      style={{ backgroundImage: `url("${productimg}")` }}
                    ></div>
                  </div>
                </div>
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
                  className="product__item-img hover-mode"
                  style={{ backgroundImage: `url("${productimg}")` }}
                >
                  <div className="img-big__wrapper hidden">
                    <div
                      className="img-big"
                      style={{ backgroundImage: `url("${productimg}")` }}
                    ></div>
                  </div>
                </div>
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
