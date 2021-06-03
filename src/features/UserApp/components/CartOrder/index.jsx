import React, { useState, useEffect } from "react";
import { GrLocation } from "react-icons/gr";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoIosArrowForward, IoIosLogIn } from "react-icons/io";
import { TiTimesOutline } from "react-icons/ti";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import novat from "assets/image/icons/novat.gif";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { incQuantity, decQuantity } from "redux/cartOrderSlice";
import { validatePrice, computeDistant, formatDatetimeToString } from "func.js";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "socket-io.js";
import L from "leaflet";
import shopIcon from "assets/image/icons/shop-icon.png";
import { DistanceMatrixService } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import FormAddressSearch from "../GlobalAddress/FormAddressSearch/FormAddressSearch";

import { MdClear } from "react-icons/md";

import voucherApi from "api/voucherApi";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none",
    borderRadius: "8px",
    height: "100vh",
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
  const loginWarning = () =>
    toast.warn("😮 Bạn cần đăng nhập để tiếp tục đặt hàng!");

  const infoWarning = () =>
    toast.error(
      <Link to="/user/tai-khoan">
        <div>🔎 Vui lòng bổ sung thông tin, ấn vào đây để bổ sung!</div>
      </Link>
    );

  const cartWarning = () =>
    toast.error(<div>🥰 Giỏ hàng đang trống, hãy lựa chọn đồ bạn nhé</div>);

  const orderProcessingWarning = () =>
    toast.error(
      <div onClick={() => history.push("/user/dang-den")}>
        🏍 Hãy hoàn thành đơn hàng trước khi đặt đơn hàng mới, theo dõi trong mục{" "}
        <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
          <i>Đang đến</i>
        </span>
      </div>
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

    if (user.username === null) {
      loginWarning();
      return;
    } else if (!name || !phone || !address || !lat || !lng) {
      infoWarning();
      return;
    } else if (listCartOrder.length < 1) {
      cartWarning();
      return;
    }
    socket.emit("haveOrderProcessing", user.profile._id);
  };

  useEffect(() => {
    const myFunc = (data) => {
      console.log("call");
      if (!data) {
        const status = statusOrder();
        // if (status === 1) {
        //   alert("Quán sắp đóng cửa, vui lòng đặt hàng vào ngày mai");
        // } else if (status === 2) {
        //   alert("Quán đã đóng cửa, vui lòng đặt hàng vào ngày mai");
        // } else handleOpen();
        handleOpen();
      } else orderProcessingWarning();
    };
    socket.on("canOrder", myFunc);
    return () => socket.off("canOrder", myFunc);
  }, []);

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

      <div className="order__button" onClick={() => handleContinues()}>
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
            <CheckOut
              userId={user.profile._id}
              user={userProfile}
              items={listItem}
              merchant={merchant}
              handleClose={handleClose}
            />
          </div>
        </Fade>
      </Modal>
      <ToastContainer />
    </div>
  );
}

function CheckOut({ userId, user, items, merchant, handleClose }) {
  const [applyVoucher, setApplyVoucher] = useState({});
  const [voucher, setVoucher] = useState("");
  const [open, setOpen] = useState(false);
  console.log(open);
  const {
    name: userName,
    location: { address: userAddress, lat: userLat, lng: userLng },
    phone: userPhone,
  } = user;
  const [tempAddress, setTempAddress] = useState(
    localStorage.address || userAddress
  );
  const [tempLat, setTempLat] = useState(localStorage.lat || userLat);
  const [tempLng, setTempLng] = useState(localStorage.lng || userLng);

  const [location, setLocation] = useState({
    address: localStorage.address || userAddress,
    lat: localStorage.lat || userLat,
    lng: localStorage.lng || userLng,
  });

  const {
    name: merchantName,
    location: { address: merchantAddress, lat: merchantLat, lng: merchantLng },
  } = merchant;

  const distance = computeDistant(tempLat, tempLng, merchantLat, merchantLng);

  const orderSuccess = () =>
    toast.success(
      <Link to="/user/dang-den">
        <div>
          😍 Đặt hàng thành công, vui lòng theo dõi đơn hàng trong mục{" "}
          <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
            <i>Đang đến</i>
          </span>
        </div>
      </Link>
    );
  console.log(applyVoucher);
  const wrongCode = () => toast.error("🤔Mã không hợp lệ!");

  const applyFail = () => toast.error("🤔Đơn hàng không đạt điều kiện!");

  const codeOut = () => toast.error("🤔Mã hết lượt sử dụng!");

  const codeUsed = () => toast.error("🤔Bạn chỉ được sử dụng mã này một lần!");

  const applySuccess = () => toast.success("😍Áp mã thành công!");

  const totalPrice = items.reduce(
    (value, item) => value + item.price * item.quantity,
    0
  );
  const feeShip = distance <= 3 ? 13000 : distance * 4500;

  const handleApplyVoucher = async () => {
    const vc = await voucherApi.check({ code: voucher.toUpperCase() });
    if (vc.status != 400) {
      if (vc.status == 201) codeOut();
      else if (vc.status == 202) codeUsed();
      else if (vc.condition <= totalPrice) {
        setApplyVoucher(vc);
        applySuccess();
      } else applyFail();
    } else wrongCode();
  };

  const getTimeExpect = () => {
    const diffTime = distance * 5 + 10;
    const now = new Date();
    now.setMinutes(now.getMinutes() + diffTime);
    return formatDatetimeToString(now);
  };

  const handleOrder = () => {
    const order = {
      userOrderId: userId,
      merchantId: merchant._id,
      detail: {
        foods: items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
        fee: feeShip,
        discount: applyVoucher.discount || 0,
        total: totalPrice,
        location: {
          address: tempAddress,
          lat: tempLat,
          lng: tempLng,
        },
      },
      distance: distance,
      note: "Đây là note",
      timeDeliverDone: Date.now() + (distance * 5 + 10) * 60000,
      code: applyVoucher.code,
    };
    socket.emit("startOrder", order);
    handleClose();
    orderSuccess();
  };

  var myIcon = new L.icon({
    iconUrl: shopIcon,
    iconSize: [28, 45],
    iconAnchor: [22, 49],
    popupAnchor: [-3, -46],
    shadowSize: [68, 45],
    shadowAnchor: [22, 44],
  });

  const callBackOpenChangeAddress = () => {
    setOpen(false);
  };

  return (
    <div className="checkout">
      <div className="checkout--header">
        Xác nhận đơn hàng
        <MdClear className="header-icon" onClick={() => handleClose()} />
      </div>

      <ToastContainer />
      <div className="checkout--header">Xác nhận đơn hàng</div>

      <div className="checkout--detail-order">
        <div className="checkout--detail-order--profile">
          <div className="checkout--detail-order--map">
            <MapContainer
              center={[
                (parseFloat(merchantLat) + parseFloat(tempLat)) / 2,
                (parseFloat(merchantLng) + parseFloat(tempLng)) / 2,
              ]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[tempLat, tempLng]}>
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
                <p>{tempAddress}</p>
              </div>
            </div>
            <span className="checkout--predict">
              <AiOutlineClockCircle className="icon" />
              Dự kiến: {getTimeExpect()} -
              <span style={{ color: "red" }}> {distance}km</span>
            </span>
            <div className="checkout--change" onClick={() => setOpen(true)}>
              <p>Thay đổi thông tin nhận hàng</p>

              <IoIosArrowForward />
            </div>
            {open ? (
              <div className="modal-location">
                <FormAddressSearch
                  location={location}
                  setLocation={setLocation}
                  setRefreshNewFeed={setOpen}
                  closeModal={callBackOpenChangeAddress}
                />
              </div>
            ) : (
              ""
            )}
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
              <div className="title">Mã khuyến mãi</div>

              <div className="voucher-group">
                <input
                  type="text"
                  onChange={(e) => setVoucher(e.target.value)}
                  placeholder="Nhập mã"
                  maxLength="15"
                  minLength="3"
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    width: "70%",
    height: "47%",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
};
