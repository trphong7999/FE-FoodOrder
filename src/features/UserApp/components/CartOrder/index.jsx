import React, { useState, useEffect } from "react";
import { GrLocation } from "react-icons/gr";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { TiTimesOutline } from "react-icons/ti";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import novat from "assets/image/icons/novat.gif";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { incQuantity, decQuantity } from "redux/cartOrderSlice";
import { validatePrice, computeDistant } from "func.js";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { NavDropdown } from "react-bootstrap";
import socket from "socket-io.js";
import L from "leaflet";
import shopIcon from "assets/image/icons/shop-icon.png";
import { DistanceMatrixService } from "@react-google-maps/api";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none",
    borderRadius: "8px",
  },
}));

export default function CartOrder({ merchant }) {
  const { _id: merchantId } = merchant;
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginUserApp);
  const [open, setOpen] = React.useState(false);
  const listCartOrder = useSelector((state) => state.cartOrder);
  const userProfile = useSelector((state) => state.loginUserApp.profile.info);
  const listItem = listCartOrder.filter(
    (item) => item.merchantId === merchantId
  );

  const history = useHistory();

  const getStrDayOfWeek = () => {
    const now = new Date();
    const dayOfWeek = now.toString().split(" ")[0];
    return dayOfWeek.toLowerCase();
  };

  const statusOrder = () => {
    const { lat: userLat, lng: userLng } = userProfile.location;
    const {
      openTime,
      location: { lat: merchantLat, lng: merchantLng },
    } = merchant;
    const distance = computeDistant(userLat, userLng, merchantLat, merchantLng);
    const diffTime = distance * 7;
    const openTimeToDay = openTime[getStrDayOfWeek()];
    const [timeOpen, timeClose] = openTimeToDay.time.split("-");
    const [hourOpen, minuteOpen] = timeOpen.split(":");
    const [hourClose, minuteClose] = timeClose.split(":");
    const now = new Date();
    const timeExpect = new Date();
    timeExpect.setMinutes(now.getMinutes() + diffTime);
    console.log(openTimeToDay, timeExpect);
    if (
      hourOpen <= now.getHours() <= hourClose &&
      minuteOpen <= now.getMinutes() <= minuteClose &&
      (hourOpen >= timeExpect.getHours() ||
        timeExpect.getHours() >= hourClose) &&
      (minuteOpen > timeExpect.getMinutes() ||
        timeExpect.getMinutes() > minuteClose)
    )
      return 1;
    else if (
      (hourOpen >= timeExpect.getHours() ||
        timeExpect.getHours() >= hourClose) &&
      (minuteOpen > timeExpect.getMinutes() ||
        timeExpect.getMinutes() > minuteClose)
    )
      return 2;
    return 3;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinues = () => {
    const {
      name,
      phone,
      location: { address, lat, lng },
    } = userProfile;

    if (!name || !phone || !address || !lat || !lng) {
      alert("Vui lòng bổ sung thông tin");
      history.push("/user/tai-khoan");
    } else if (user.username === null) {
      alert("Bạn cần đăng nhập để tiếp tục đặt hàng!");
      return;
    } else if (listCartOrder.length < 1) {
      alert("Bạn chưa thêm món ăn vào giỏ!");
      return;
    }
    const status = statusOrder();
    console.log(status);
    // if (status === 1) {
    //   alert("Quán sắp đóng cửa, vui lòng đặt hàng vào ngày mai");
    // } else if (status === 2) {
    //   alert("Quán đã đóng cửa, vui lòng đặt hàng vào ngày mai");
    // } else handleOpen();
    handleOpen();
  };

  useEffect(() => {
    const cartList = document.getElementById("cart2");
    const sticky = cartList.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        cartList.classList.add("sticky-order-cart");
      } else {
        cartList.classList.remove("sticky-order-cart");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  const handleIncQuantity = (merchantId, name) => {
    const dish = { merchantId: merchantId, name: name };
    const action = incQuantity(dish);
    dispatch(action);
  };

  const handleDecQuantity = (merchantId, name) => {
    const dish = { merchantId: merchantId, name: name };
    const action = decQuantity(dish);
    dispatch(action);
  };

  const handleSumTotal = listItem.reduce((pre, item) => {
    return pre + item.price * item.quantity;
  }, 0);

  return (
    <div id="cart2" className="order">
      <div className="order__promotion">
        <div className="promotion__title">Ưu đãi</div>
        <div className="promotion__content">
          <GrLocation className="promotion__icon" />
          Freeship đơn hàng dưới 2km
        </div>
      </div>

      <div className="order__cart-list">
        <div className="list__title">Đơn hàng của bạn</div>
        <div className="list__item">
          {listItem.map((item, index) => (
            <div className="item" key={index}>
              <div className="item-name">{item.name} </div>
              <div className="item-update">
                <button
                  className="item-update__down"
                  onClick={() => handleDecQuantity(item.merchantId, item.name)}
                >
                  -
                </button>
                <div className="item-update__quantity">{item.quantity}</div>
                <button
                  className="item-update__up"
                  onClick={() => handleIncQuantity(item.merchantId, item.name)}
                >
                  +
                </button>
              </div>
              <div className="item-price">
                {validatePrice(item.price * item.quantity)}
                <span
                  style={{
                    fontWeight: "400",
                    position: "relative",
                    top: "-9px",
                    fontSize: "10px",
                    right: "0",
                  }}
                >
                  đ
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="list__amount">
          Tổng :
          <div className="amount__num">
            ≈{validatePrice(handleSumTotal)}
            <span
              style={{
                fontWeight: "400",
                position: "relative",
                top: "-9px",
                fontSize: "10px",
                right: "0",
              }}
            >
              đ
            </span>
          </div>
        </div>
      </div>

      <div className="order__button" onClick={handleContinues}>
        Tiếp tục
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <CheckOut user={userProfile} items={listItem} merchant={merchant} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

function CheckOut({ user, items, merchant }) {
  const [applyVoucher, setApplyVoucher] = useState({});
  const [voucher, setVoucher] = useState("");
  const [distance, setDistance] = useState(0);
  const {
    name: userName,
    location: { address: userAddress, lat: userLat, lng: userLng },
    phone: userPhone,
  } = user;
  const {
    name: merchantName,
    location: { address: merchantAddress, lat: merchantLat, lng: merchantLng },
  } = merchant;

  const totalPrice = items.reduce(
    (value, item) => value + item.price * item.quantity,
    0
  );
  const feeShip = distance <= 3 ? 13000 : distance * 4500;

  const handleApplyVoucher = () => {
    if (voucher === "VUICUOITUAN" && totalPrice >= 60000)
      setApplyVoucher({
        name: voucher,
        condition: 60000,
        discount: 10000,
      });
  };

  const getTimeExpect = () => {
    const diffTime = distance * 5 + 10;
    const now = new Date();
    now.setMinutes(now.getMinutes() + diffTime);

    return `${("0" + now.getHours()).slice(-2)}:${(
      "0" + now.getMinutes()
    ).slice(-2)} - ${("0" + now.getDate()).slice(-2)}/${(
      "0" + now.getDay()
    ).slice(-2)}`;
  };

  const handleOrder = () => {
    const order = {
      userOrder: user._id,
      merchant: merchant._id,
      status: "processing",
      detail: {
        foods: items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
        fee: feeShip,
        discount: applyVoucher.discount || 0,
        total: totalPrice + feeShip - (applyVoucher.discount || 0),
      },
    };
    console.log(order);
    socket.emit("startOrder", order);
  };

  var myIcon = new L.icon({
    iconUrl: shopIcon,
    iconSize: [28, 45],
    iconAnchor: [22, 34],
    popupAnchor: [-3, -46],
    shadowSize: [68, 45],
    shadowAnchor: [22, 44],
  });
  return (
    <div className="checkout">
      <div className="checkout--header">Xác nhận đơn hàng</div>
      <div className="checkout--detail-order">
        <div className="checkout--detail-order--profile">
          <div className="checkout--detail-order--map">
            <DistanceMatrixService
              options={{
                destinations: [
                  {
                    lat: parseFloat(merchantLat),
                    lng: parseFloat(merchantLng),
                  },
                ],
                origins: [
                  { lng: parseFloat(userLng), lat: parseFloat(userLat) },
                ],
                travelMode: "DRIVING",
              }}
              callback={(response) => {
                setDistance(
                  response["rows"][0].elements[0].distance.text.split(" ")[0]
                );
              }}
            />
            <MapContainer
              center={[
                (parseFloat(merchantLat) + parseFloat(userLat)) / 2,
                (parseFloat(merchantLng) + parseFloat(userLng)) / 2,
              ]}
              zoom={14}
              scrollWheelZoom={false}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[userLat, userLng]}>
                <Popup>Location</Popup>
              </Marker>
              <Marker icon={myIcon} position={[merchantLat, merchantLng]}>
                <Popup>Location</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="checkout--detail-order--info">
            <div className="checkout--detail-order--merchant address">
              <RiCheckboxBlankCircleFill className="icon inactive" />
              <div>
                <p>{merchantName}</p>
                <p>{merchantAddress}</p>
              </div>
            </div>
            <div className="checkout--detail-order--user address">
              <RiCheckboxBlankCircleFill className="icon active" />
              <div>
                <p>
                  {userName} - {userPhone}
                </p>
                <p>{userAddress}</p>
              </div>
            </div>
            <span className="checkout--predict">
              <AiOutlineClockCircle className="icon" />
              Dự kiến: {getTimeExpect()} -
              <span style={{ color: "red" }}> {distance}km</span>
            </span>
            <div className="checkout--change">
              <p>Thay đổi thông tin nhận hàng</p>
              <IoIosArrowForward />
            </div>
          </div>
        </div>
        <div className="checkout--detail-order--order">
          <div className="checkout--order--top">
            <h1>Chi tiết đơn hàng</h1>
            <div className="checkout--foods">
              {items.map((item, index) => (
                <div className="checkout--food" key={index}>
                  <div>
                    <span className="qty">{item.quantity}</span>
                    <span className="food-name">{item.name}</span>
                  </div>
                  <p>{validatePrice(item.price * item.quantity)} đ</p>
                </div>
              ))}
            </div>
          </div>
          <div className="checkout--order--bot">
            <div className="checkout-sum">
              <p>
                Tổng cộng{" "}
                <span style={{ fontWeight: "bold" }}>
                  {items.reduce((value, item) => value + item.quantity, 0)}
                </span>{" "}
                phần
              </p>
              <p>{validatePrice(totalPrice)} đ</p>
            </div>
            <div className="checkout-feeship">
              <p>
                Phí vận chuyển:{" "}
                <span style={{ color: "red" }}>
                  {distance}
                  km
                </span>
              </p>
              <p>{validatePrice(feeShip)} đ</p>
            </div>
            {Object.keys(applyVoucher).length !== 0 ? (
              <div className="checkout-discount">
                <p>Mã khuyễn mãi:</p>
                <p>-{validatePrice(applyVoucher.discount)} đ</p>
              </div>
            ) : (
              ""
            )}
            <div className="checkout-voucher">
              <div>Mã khuyến mãi</div>
              <div>
                <input
                  type="text"
                  onChange={(e) => setVoucher(e.target.value)}
                  placeholder="Nhập mã"
                />
                {Object.keys(applyVoucher).length !== 0 ? (
                  <TiTimesOutline
                    className="icon checkout--pointer"
                    onClick={() => {
                      setApplyVoucher({});
                    }}
                  />
                ) : (
                  ""
                )}
                <button onClick={() => handleApplyVoucher()}>Áp dụng</button>
              </div>
              <div className="checkout--pointer">
                Xem mã của bạn
                <IoIosArrowForward className="icon" />
              </div>
            </div>
            <div className="checkout-total">
              <p>Tổng cộng</p>
              <p>
                {validatePrice(
                  totalPrice + feeShip - (applyVoucher.discount || 0)
                )}{" "}
                đ
              </p>
            </div>

            <div className="checkout-payment">
              <p
                style={{ fontSize: "2rem", color: "black", fontWeight: "bold" }}
              >
                Tiền mặt
              </p>
              <p className="checkout--pointer">
                Thay đổi <IoIosArrowForward className="icon" />
              </p>
            </div>

            <div className="novat">
              <img src={novat} alt="novat" width="28px" />
              <span className="txt-gray">Không xuất hoá đơn VAT</span>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout--confirm">
        <button onClick={() => handleOrder()}>Đặt hàng</button>
      </div>
    </div>
  );
}
