import React, { useState, useEffect } from "react";
import { GrLocation } from "react-icons/gr";
import { AiOutlineClockCircle, AiOutlineFieldTime } from "react-icons/ai";
import { IoIosArrowForward, IoIosLogIn } from "react-icons/io";
import { TiTimesOutline } from "react-icons/ti";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { FcClock } from "react-icons/fc";
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
import voucherApi from "api/voucherApi";
import TimeInput from "react-input-time";

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

  const statusWarning = () =>
    toast.warn("😮 Quán đã đóng cửa, hãy quay lại vào ngày mai!");

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

  const statusOrder = (time) => {
    const { openTime } = merchant;
    const openTimeToDay = openTime[getStrDayOfWeek()];
    const [timeOpen, timeClose] = openTimeToDay.time.split("-");
    const [hourOpen, minuteOpen] = timeOpen.split(":");
    const [hourClose, minuteClose] = timeClose.split(":");
    let now = new Date(+time);
    if (
      (+hourOpen < now.getHours() && now.getHours() < +hourClose) ||
      (+hourOpen === now.getHours() && +minuteOpen <= now.getMinutes()) ||
      (now.getHours() === +hourClose && now.getMinutes() < +minuteClose)
    )
      return true;
    return false;
  };

  console.log("status", statusOrder(Date.now()));

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
    } else if (listItem.length < 1) {
      cartWarning();
      return;
    } else if (merchant.status !== "open") {
      return statusWarning();
    } else if (merchant.status === "open" && !statusOrder(Date.now())) {
      socket.emit("closeMerchant", merchantId);
      return statusWarning();
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
  const [note, setNote] = useState("");
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
  const [predict, setPredict] = useState(
    Date.now() + (distance * 5 + 10) * 60000
  );

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

  const wrongCode = () => toast.error("🤔Mã không hợp lệ!");

  const orderFail = () =>
    toast.error(
      "❌Tài khoản của bạn đã bị khóa, vui lòng liên hệ CSKH để biết thêm thông tin chi tiết!"
    );

  const applyFail = () => toast.error("🤔Đơn hàng không đạt điều kiện!");

  const codeOut = () => toast.error("🤔Mã hết lượt sử dụng!");

  const codeUsed = () => toast.error("🤔Bạn chỉ được sử dụng mã này một lần!");

  const applySuccess = () => toast.success("😍Áp mã thành công!");

  const predictFail = () =>
    toast.success(
      "🤔Thời gian dự kiến nhận hàng không được nhỏ hơn thời gian tối thiểu!"
    );

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
    return formatDatetimeToString(new Date(predict));
  };

  const handleOrder = () => {
    console.log(predict);
    if (!predict || predict < Date.now() + (distance * 5 + 9) * 60000)
      return predictFail();
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
      distance,
      note,
      timeDeliverDone: predict,
      code: applyVoucher.code,
    };
    socket.emit("startOrder", order, (data) => {
      console.log(data);
      if (data) {
        handleClose();
        orderSuccess();
      } else {
        handleClose();
        orderFail();
      }
    });
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

  const onTimeChangeHandle = (val) => {
    let hour = new Date().setHours(parseInt(val.split(":")[0]));
    let time = new Date(hour).setMinutes(parseInt(val.split(":")[1]));
    console.log("new", time, val.split(":"));
    setPredict(time);
  };

  return (
    <div className="checkout">
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
            <FcClock
              style={{ fontSize: "2rem", margin: "0 0.3rem 0 1.5rem" }}
            />
            <TimeInput
              className="input-time"
              initialTime={
                `0${new Date(parseInt(predict)).getHours()}`.slice(-2) +
                ":" +
                `0${new Date(parseInt(predict)).getMinutes()}`.slice(-2)
              }
              onChange={(e) => onTimeChangeHandle(e.target.value)}
              style={{
                width: "4.5rem",
                height: "3rem",
                borderRadius: "12px",
                outline: "none",
              }}
            />
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
            <div className="checkout-voucher">
              <div className="title">Ghi chú</div>

              <div className="voucher-group">
                <textarea
                  type="text"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                  style={{ width: "100%" }}
                />
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
