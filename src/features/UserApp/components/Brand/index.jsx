import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import "./style.scss";
import productimg from "assets/image/dishes/trasua.jpg";
import { BiTimeFive } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { validatePrice, computeDistant, getLocationUser } from "func.js";
import { useDispatch, useSelector } from "react-redux";
import { addCartOrder } from "redux/cartOrderSlice";

export default function Brand({ merchant }) {
  const dispatch = useDispatch();
  const listCartOrder = useSelector((state) => state.cartOrder);
  const userLat = sessionStorage.getItem("lat") || 20.8351;
  const userLng = sessionStorage.getItem("lng") || 106.7071;
  // ------------------------ HANDLE TIME OPEN - CLOSE ------------------

  const getStrDayOfWeek = () => {
    const now = new Date();
    const dayOfWeek = now.toString().split(" ")[0];
    return dayOfWeek.toLowerCase();
  };

  const computeStatus = (openTime) => {
    const now = new Date();
    const openTimeToDay = openTime[getStrDayOfWeek()];
    const [timeOpen, timeClose] = openTimeToDay.time.split("-");
    const [hourOpen, minuteOpen] = timeOpen.split(":");
    const [hourClose, minuteClose] = timeClose.split(":");
    if (
      hourOpen < now.getHours() < hourClose &&
      minuteOpen < now.getMinutes() < minuteClose
    )
      return true;
    return false;
  };
  // ------------------------ HANDLE TIME OPEN - CLOSE END------------------

  const handleAddCartOrder = (name, price, merchantId) => {
    const dish = { merchantId: merchantId, name: name, price: price };
    const dishesExisted = listCartOrder.filter(
      (item) => item.merchantId === merchantId && item.name === name
    );
    if (!dishesExisted.length) {
      console.log("ok");
      const action = addCartOrder(dish);
      dispatch(action);
    }
  };

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
        <div className="brand-banner-wrap">
          <div
            className="brand__banner"
            style={{ backgroundImage: `url("${merchant.avt}")` }}
          ></div>
          <div
            className="brand__banner"
            style={{ backgroundImage: `url("${merchant.avt}")` }}
          ></div>
          <div
            className="brand__banner"
            style={{ backgroundImage: `url("${merchant.avt}")` }}
          ></div>
          <div
            className="brand__banner"
            style={{ backgroundImage: `url("${merchant.avt}")` }}
          ></div>
        </div>

        <div className="brand__info">
          <div className="brand-info__name">{merchant.name}</div>
          <span className="brand-info__type">
            {merchant.typeFood === 0 ? "Đồ ăn" : "Đồ uống"}
          </span>
          <div className="brand-info__distant">
            <IoLocationOutline className="brand-info__distant-icon" />
            {computeDistant(
              userLat,
              userLng,
              merchant.location.lat,
              merchant.location.lng
            ).toFixed(1)}
            km
          </div>
          <div className="brand-info__time">
            {computeStatus(merchant.openTime) ? (
              <div className="brand-info__open">
                <GoPrimitiveDot />
                Đang mở cửa
              </div>
            ) : (
              <div className="brand-info__close">
                <GoPrimitiveDot />
                Chưa mở cửa
              </div>
            )}
            <div className="brand-info__text">
              <BiTimeFive className="brand-info__text-icon" />
              {merchant.openTime[getStrDayOfWeek()].label}{" "}
              {merchant.openTime[getStrDayOfWeek()].time.split("-").join(" - ")}
            </div>
          </div>

          <div className="brand-info__location">
            {merchant.location.address}
          </div>
        </div>
      </div>

      <div className="brand-content row">
        <div className="col l-3 brand__category">
          <ul id="category-list" className="category__list">
            {merchant.category.map((item, index) => (
              <li key={index}>
                <Link to={`#group${index}`} className="category__item">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col l-9 brand__products">
          {merchant.category.map((cat, index) => (
            <div id={`group${index}`} className="product__category" key={index}>
              <div className="product__category-name">{cat.name}</div>
              <div className="product__list-item">
                {cat.foods.map((food, index) => (
                  <div className="product__item" key={index}>
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
                      <div className="product__name">{food.name}</div>
                      <div className="product__price">
                        {validatePrice(food.price)} đ
                      </div>
                    </div>
                    <div className="product__add">
                      <button
                        className="product__add-btn"
                        onClick={() => {
                          handleAddCartOrder(
                            food.name,
                            food.price,
                            merchant._id
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
