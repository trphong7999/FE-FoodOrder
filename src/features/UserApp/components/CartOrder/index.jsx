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
import { validatePrice } from "func.js";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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

export default function CartOrder({ merchantId }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const listCartOrder = useSelector((state) => state.cartOrder);
  const userProfile = useSelector((state) => state.loginUserApp.profile.info);
  const listItem = listCartOrder.filter(
    (item) => item.merchantId === merchantId
  );
  const dispatch = useDispatch();
  const history = useHistory();

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
    }

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
            <CheckOut />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

function CheckOut() {
  return (
    <div className="checkout">
      <div className="checkout--header">Xác nhận đơn hàng</div>
      <div className="checkout--detail-order">
        <div className="checkout--detail-order--profile">
          <div className="checkout--detail-order--map">
            <MapContainer
              center={[20.828790101307185, 106.71664668177716]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[20.828790101307185, 106.71664668177716]}>
                <Popup>Location</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="checkout--detail-order--info">
            <div className="checkout--detail-order--merchant address">
              <RiCheckboxBlankCircleFill className="icon inactive" />
              <div>
                <p>Trà Sữa Hot Cha</p>
                <p>69 Trung Lực, Quận Hải An, Hải Phòng</p>
              </div>
            </div>
            <div className="checkout--detail-order--user address">
              <RiCheckboxBlankCircleFill className="icon active" />
              <div>
                <p>Trà Sữa Hot Cha</p>
                <p>69 Trung Lực, Quận Hải An, Hải Phòng</p>
              </div>
            </div>
            <span className="checkout--predict">
              <AiOutlineClockCircle className="icon" />
              Dự kiến: 09:30 - 11/05 -
              <span style={{ color: "red" }}>2.2km</span>
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
              <div className="checkout--food">
                <div>
                  <span className="qty">3</span>
                  <span className="food-name">Trà sữa chân trâu</span>
                </div>
                <p>96,200đ</p>
              </div>
              <div className="checkout--food">
                <div>
                  <span className="qty">3</span>
                  <span className="food-name">Trà sữa chân trâu</span>
                </div>
                <p>96,200</p>
              </div>
              <div className="checkout--food">
                <div>
                  <span className="qty">3</span>
                  <span className="food-name">Trà sữa chân trâu</span>
                </div>
                <p>96,200đ</p>
              </div>
              <div className="checkout--food">
                <div>
                  <span className="qty">3</span>
                  <span className="food-name">Trà sữa chân trâu</span>
                </div>
                <p>96,200đ</p>
              </div>
              <div className="checkout--food">
                <div>
                  <span className="qty">3</span>
                  <span className="food-name">Trà sữa chân trâu</span>
                </div>
                <p>96,200đ</p>
              </div>
            </div>
          </div>
          <div className="checkout--order--bot">
            <div className="checkout-sum">
              <p>
                Tổng cộng <span style={{ fontWeight: "bold" }}>8</span> phần
              </p>
              <p>176,343đ</p>
            </div>
            <div className="checkout-feeship">
              <p>
                Phí vận chuyển: <span style={{ color: "red" }}> 2.2 km</span>
              </p>
              <p>176,343</p>
            </div>
            <div className="checkout-discount">
              <p>Mã khuyễn mãi:</p>
              <p>-176,343đ</p>
            </div>
            <div className="checkout-voucher">
              <div>Mã khuyến mãi</div>
              <div>
                <input type="text" placeholder="Nhập mã" />
                <TiTimesOutline className="icon checkout--pointer" />
                <button>Áp dụng</button>
              </div>
              <div className="checkout--pointer">
                Xem mã của bạn
                <IoIosArrowForward className="icon" />
              </div>
            </div>
            <div className="checkout-total">
              <p>Tổng cộng</p>
              <p>191.555đ</p>
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
              <span class="txt-gray">Không xuất hoá đơn VAT</span>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout--confirm">
        <button>Đặt hàng</button>
      </div>
    </div>
  );
}
