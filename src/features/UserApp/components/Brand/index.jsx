import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { BiTimeFive } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { validatePrice, computeDistant, formatDatetimeToString } from "func.js";
import { useDispatch, useSelector } from "react-redux";
import { addCartOrder } from "redux/cartOrderSlice";
import { DistanceMatrixService } from "@react-google-maps/api";
import { toast } from "react-toastify";
import loading from "assets/image/icons/loading.png";
import avtDefault from "assets/image/avartar/slide1.jpg";
import "./style.scss";
import { FaComment, FaStar } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import reviewApi from "api/review";

export default function Brand({ merchant }) {
  const [distance, setDistance] = useState(0);
  const [switchh, setSwitchh] = useState(1);
  const [allReview, setAllReview] = useState([]);
  const dispatch = useDispatch();
  const listCartOrder = useSelector((state) => state.cartOrder);
  const user = useSelector((state) => state.loginUserApp.profile);
  const latUser = localStorage.getItem("lat") || user.info.location.lat;
  const lngUser = localStorage.getItem("lng") || user.info.location.lng;

  const cartWarning = () =>
    toast.error(
      <div>
        <span style={{ fontSize: "2.5rem" }}>🤚</span>Bạn đã có món này trong
        giỏ
      </div>
    );
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
      const action = addCartOrder(dish);
      dispatch(action);
    } else {
      cartWarning();
      return;
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

  useEffect(() => {
    const getAllReviewByMer = async () => {
      const res = await reviewApi.getReviewByMerId(merchant._id);
      res.reverse();
      setAllReview(res);
    };
    getAllReviewByMer();
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
            <DistanceMatrixService
              options={{
                destinations: [
                  {
                    lat: parseFloat(merchant.location.lat || 0),
                    lng: parseFloat(merchant.location.lng || 0),
                  },
                ],
                origins: [
                  {
                    lng: parseFloat(lngUser),
                    lat: parseFloat(latUser),
                  },
                ],
                travelMode: "DRIVING",
              }}
              callback={(response) => {
                if (
                  response &&
                  response["rows"][0] &&
                  response["rows"][0].elements[0].distance
                )
                  setDistance(
                    response["rows"][0].elements[0].distance.text.split(" ")[0]
                  );
                else
                  setDistance(
                    computeDistant(
                      latUser,
                      lngUser,
                      merchant.location.lat,
                      merchant.location.lng
                    )
                  );
              }}
            />
            <IoLocationOutline className="brand-info__distant-icon" />
            {distance}
            km
          </div>
          <div className="brand-info__time">
            {merchant.status == "open" ? (
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
        <div className="col l-3 m-3 c-12 brand__category">
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

        <div className="col l-9 m-9 c-12 brand__products">
          <div className="brand__product-switch">
            <div
              className={`switch ${switchh === 1 ? "active" : ""}`}
              onClick={() => setSwitchh(1)}
            >
              Menu
            </div>
            <div
              className={`switch ${switchh === 2 ? "active" : ""}`}
              onClick={() => setSwitchh(2)}
            >
              Đánh giá
            </div>
          </div>
          {switchh === 1 ? (
            <div>
              {merchant.category.map((cat, index) => (
                <div
                  id={`group${index}`}
                  className="product__category"
                  key={index}
                >
                  <div className="product__category-name">{cat.name}</div>
                  <div className="product__list-item">
                    {cat.foods.map((food, index) => (
                      <div className="product__item" key={index}>
                        <div
                          className="product__item-img hover-mode"
                          style={{
                            backgroundImage: `${
                              food.img === ""
                                ? `url("${loading}")`
                                : `url("${food.img}")`
                            }`,
                          }}
                        >
                          <div className="img-big__wrapper hidden">
                            <div
                              className="img-big"
                              style={{
                                backgroundImage: `${
                                  food.img === ""
                                    ? `url("${loading}")`
                                    : `url("${food.img}")`
                                }`,
                              }}
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
          ) : (
            <div className="brand-review">
              {allReview.map((review, idx) => (
                <div key={idx} className="brand-reviewm__item">
                  <div className="item-head">
                    <div className="item-head__left">
                      <img
                        src={
                          review.reviewer.info.avt === ""
                            ? avtDefault
                            : review.reviewer.info.avt
                        }
                        alt="avt-user-review"
                      />
                      <div className="user">
                        <span>{review.reviewer.info.name}</span>
                        <span>
                          {formatDatetimeToString(
                            new Date(parseInt(review.timeReview))
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="item-head__right">
                      {[...Array(review.rate)].map((star, i) => {
                        return (
                          <label className="review-star__wrap" key={i}>
                            <FaStar
                              className="icon-star"
                              color={"#ffc107"}
                              size={12}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="item-body">
                    <span>{review.text}</span>
                    <div className="item-body__action">
                      <span>
                        <AiFillHeart /> Thích
                      </span>
                      <span>
                        <FaComment /> Thảo luận
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
