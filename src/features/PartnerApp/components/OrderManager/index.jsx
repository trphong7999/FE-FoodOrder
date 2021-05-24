import React, { useEffect, useRef, useState } from "react";
import { FiPower } from "react-icons/fi";
import { AiFillShop, AiOutlineInfoCircle } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Address2Geocode from "components/Address2Geocode";
import area from "assets/data/districtName";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "./style.scss";
import { validatePrice, computeDistant, datetimeFromTimestamp } from "func";
import { useHistory, useRouteMatch } from "react-router";
import orderApi from "api/orderApi";
import shopIcon from "assets/image/icons/shop-icon.png";
import mylocationIcon from "assets/image/icons/mylocation.png";
import socket from "socket-io.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutPartner } from "redux/loginPartnerAppSlice";
import partnerApi from "api/partnerApi";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

//custom hook
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

const useStyles = makeStyles((theme) => ({
  modalCheckIn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCurrentOrder: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: "80px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none",
    borderRadius: "4px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
    color: "white",
  },
}));

export default function OrderManager() {
  const histroy = useHistory();
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [setSelectorTime, setSetSelectorTime] = useState();
  const [statusCheckIn, setStatusCheckIn] = useState(false);
  const classes = useStyles();

  const handleChangeTab = (tab) => {
    setTab(tab);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeStatusCheckIn = () => {
    setStatusCheckIn(!statusCheckIn);
  };

  return (
    <div className="order-manager">
      <div className="order-manager__tab">
        <ul className="order-manager__tab-list">
          <li
            className={`tab-list__item ${
              tab === 0 ? "tab-list__item--active" : ""
            }`}
            onClick={() => handleChangeTab(0)}
          >
            FREE-PICK
          </li>
          <li
            className={`tab-list__item ${
              tab === 1 ? "tab-list__item--active" : ""
            }`}
            onClick={() => handleChangeTab(1)}
          >
            ĐANG LÀM
          </li>
          <li
            className={`tab-list__item ${
              tab === 2 ? "tab-list__item--active" : ""
            }`}
            onClick={() => handleChangeTab(2)}
          >
            ĐÃ XONG
          </li>
          <li
            className={`tab-list__item ${
              statusCheckIn ? "tab-list__item--on" : "tab-list__item--off"
            }`}
          >
            <FiPower onClick={handleOpen} />
          </li>
        </ul>
      </div>

      <div className="order-manager__content">
        {tab === 0 ? (
          <MapPick />
        ) : tab === 1 ? (
          <MakingFood data={1} />
        ) : (
          <FinishedDelivery data={2} />
        )}
      </div>

      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modalCurrentOrder}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {/* <CheckInToday
              handleClose={handleClose}
              callBackStatusCheckIn={handleChangeStatusCheckIn}
            /> */}
      {/* <CurrentOrder /> */}
      {/* </div> } */}
      {/* </Fade> */}
      {/* </Modal> */}
    </div>
  );
}

function MapPick() {
  const [geo, setGeo] = useState({
    lat: "20.828790101307185",
    lng: "106.71664668177716",
  });
  const classes = useStyles();
  const partner = useSelector((state) => state.partner.profile);
  const [pickingOrder, setPickingOrder] = useState([]);
  const [open, setOpen] = useState(false);

  socket.on("newOrderFinding", (newPickingOrder) => {
    console.log("newOrderFinding");
    console.log(pickingOrder, newPickingOrder);
    setPickingOrder([...pickingOrder, newPickingOrder]);
  });

  let pickingOrderInDistance = pickingOrder.filter((order) => {
    return (
      parseFloat(
        computeDistant(
          order.merchantId.location.lat,
          order.merchantId.location.lng,
          geo.lat,
          geo.lng
        )
      ) > parseFloat(partner.setting.radiusWorking / 1000 || 2)
    );
  });
  const success = (pos) => {
    let { latitude, longitude } = pos.coords;
    if (latitude !== geo.lat || longitude !== geo.lng) {
      setGeo({ lat: latitude, lng: longitude });
    }
  };

  useInterval(() => {
    navigator.geolocation.getCurrentPosition(
      success,
      (e) => console.log("fail", e),
      { timeout: 10000 }
    );
  }, 2000);

  useEffect(() => {
    const fetchPickingOrder = async () => {
      const pickingOrder = await orderApi.getOrderByStatus("finding");
      setPickingOrder(pickingOrder);
    };
    fetchPickingOrder();
  }, []);

  var myIcon = new L.icon({
    iconUrl: shopIcon,
    iconSize: [28, 42],
    iconAnchor: [22, 34],
    popupAnchor: [-3, -46],
    shadowSize: [68, 45],
    shadowAnchor: [22, 44],
  });

  let DefaultIcon = L.icon({
    iconUrl: mylocationIcon,
    iconSize: [32, 32],
    iconAnchor: [15, 14],
    popupAnchor: [-3, -46],
    shadowSize: [50, 45],
    shadowAnchor: [22, 44],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeOrderPicked = (order_id) => {
    const newList = pickingOrder;
    const index = newList
      .map(function (e) {
        return e._id;
      })
      .indexOf(order_id);
    if (index > -1) {
      newList.splice(index, 1);
    }
    console.log(order_id, index);
    setPickingOrder(newList);
  };

  return (
    <MapContainer
      center={[geo.lat, geo.lng]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: `calc(100vh - 40px)`, width: "100%" }}
    >
      <ChangeView center={[geo.lat, geo.lng]} zoom={14} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[geo.lat, geo.lng]}>
        <Popup>Location</Popup>
      </Marker>
      <Circle
        center={[geo.lat, geo.lng]}
        radius={partner.setting.radiusWorking || 2000}
      />
      {pickingOrderInDistance.map((order) => (
        <Marker
          icon={myIcon}
          position={[
            order.merchantId.location.lat,
            order.merchantId.location.lng,
          ]}
          eventHandlers={{
            click: (e) => {
              handleOpen();
            },
          }}
        >
          <Modal
            open={open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modalCurrentOrder}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 300,
            }}
          >
            <CurrentOrder
              handleClose={handleClose}
              order={order}
              removeOrderPicked={removeOrderPicked}
            />
          </Modal>
        </Marker>
      ))}
    </MapContainer>
  );
}

function MakingFood() {
  return <Detail />;
}

function FinishedDelivery() {
  return (
    <div className="finish-delivery-list">
      <Detail />
      <Detail />
    </div>
  );
}

function Detail({ data }) {
  const history = useHistory();
  const match = useRouteMatch();
  const handleChangeUrlToDetail = (id) => {
    history.push(`${match.url}/making-detail/${id}`);
  };

  return (
    <div
      className="making-food"
      onClick={() => handleChangeUrlToDetail("06345-63454234")}
    >
      <div className="making-food__head">
        <div className="head-serial">29</div>
        <div className="head-code">06345-63454234</div>
        <div
          className={`head-status ${
            data === 0 ? "head-status--delivery" : "head-status--finished"
          }`}
        >
          <AiFillShop className="head-status__icon" />
          {data === 0 ? "Delivery" : "Finised"}
        </div>
      </div>

      <div className="making-food__shop">
        <div className="shop-title">
          <div className="shop-title__type">
            <GoPrimitiveDot className="type-icon" />
            Lấy
          </div>
          {"-"}
          <div className="shop-title__name">Ăn vặt thời đại</div>
          <div className="shop-title__amount">
            <span>Trả: </span>
            <span>{validatePrice(25000)}đ</span>
          </div>
        </div>
        <div className="shop-address">20 Nguyễn Văn Hới, Cát Bi, Hải An</div>
        <div className="shop-take">
          <div className="shop-take__time">
            <span>Lấy:</span>
            <span>09:31</span>
          </div>
        </div>
      </div>

      <div className="making-food__shop making-food__shop--receiver">
        <div className="shop-title">
          <div className="shop-title__type">
            <GoPrimitiveDot className="type-icon" />
            Giao
          </div>
          {"-"}
          <div className="shop-title__name">wind7689</div>
          <div className="shop-title__amount">
            <span>Thu: </span>
            <span>{validatePrice(25000)}đ</span>
          </div>
        </div>
        <div className="shop-address">193 Văn Cao, Đằng Giang, Ngô Quyền</div>
        <div className="shop-take">
          <div className="shop-take__time">
            <span>Lấy:</span>
            <span>09:40</span>
          </div>
          <div className="shop-take__distance">3.1km</div>
        </div>
      </div>

      <div className="making-food__confirm">
        <div className="confirm-text">
          {data === 0 ? "Đã nhận đơn hàng" : "Đã giao đơn hàng"}
        </div>
        <div className="confirm-time">Lúc 09:22 06/06/2021</div>
      </div>
    </div>
  );
}

function CheckInToday({ handleClose, callBackStatusCheckIn }) {
  const startCheckIn = () => {
    callBackStatusCheckIn();
    handleClose();
  };
  return (
    <div className="check-in">
      <div className="check-in__head">
        <div className="head-title">Check-in Hôm nay</div>
        <div className="head-time">2021-06-06</div>
      </div>
      <div className="check-in__pick">
        <div className="pick-title">
          <span>Đăng ký</span>
          <span>Part Time 00:00 - 23:59</span>
        </div>
        <div className="pick-action">
          <div className="pick-action__item">
            <div className="item-text">Bắt đầu</div>
            <div className="item-current">Hiện tại</div>
          </div>
          <div className="pick-action__item">
            <div className="item-text">Kết thúc</div>
            <div className="item-time">
              <TimePickers />
            </div>
          </div>
        </div>
      </div>

      <div className="check-in__location">
        <div className="location-text">Vị trí hiện tại</div>
        <div className="location-address">
          244 Ngô Gia Tự, Đằng Giang, Ngô Quyền, Hải Phòng, Việt Nam
        </div>
        <div className="location-coordinates">
          <span>Lat: 10,5435346; </span>
          <span>Lng: 106,436436</span>
        </div>
      </div>

      <div className="check-in__action">
        <div className="action-out" onClick={handleClose}>
          Thoát
        </div>
        <div className="action-in" onClick={startCheckIn}>
          Check-in
        </div>
      </div>
    </div>
  );
}

function TimePickers() {
  const classes = useStyles();
  const [time, setTime] = useState("23:59");
  const handleChangeTime = (e) => {
    setTime(e.target.value);
  };
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        label=""
        type="time"
        defaultValue={time}
        onChange={(e) => {
          handleChangeTime(e);
        }}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </form>
  );
}

function CurrentOrder({ handleClose, order, removeOrderPicked }) {
  const chooseOrder = (order_id) => {
    socket.emit("chooseOrder", order_id);
    removeOrderPicked(order_id);
    handleClose();
  };

  return (
    <div className="current-order">
      <div className="current-order__content">
        <div className="content-head">
          <div className="content-head__type">
            <AiFillShop className="type-icon" />
            <span>Delivery</span>
          </div>
          <div className="content-head__text">
            <div className="text-distance">{order.distance} km</div>
            <div className="text-cost">
              {order.fee}
              <AiOutlineInfoCircle className="cost-icon" />
            </div>
            <div className="text-time">
              Giao{" "}
              <span>
                {datetimeFromTimestamp(parseInt(order.timeOrder) + 15 * 60000)}
              </span>
            </div>
          </div>
        </div>

        <div className="content-cus cotent-cus__color-green">
          <div className="cus-title">
            <div className="cus-title__name">
              <GoPrimitiveDot className="name-icon" />
              <div className="name-text">Lấy: {order.merchantId.name}</div>
            </div>
            <div className="cus-title__price">
              Trả: <span>{(order.detail.total * 90) / 100}đ</span>
            </div>
          </div>
          <div className="cus-address">{order.merchantId.location.address}</div>
        </div>

        <div className="content-cus cotent-cus__color-red">
          <div className="cus-title">
            <div className="cus-title__name">
              <GoPrimitiveDot className="name-icon" />
              <div className="name-text">
                Giao: {order.userOrderId.info.name}
              </div>
            </div>
            <div className="cus-title__price">
              Thu:{" "}
              <span>
                {order.detail.total + order.detail.fee - order.detail.discount}{" "}
                đ
              </span>
            </div>
          </div>
          <div className="cus-address">
            {order.userOrderId.info.location.address}
          </div>
        </div>

        <div className="content-action">
          <button
            className="content-action__button"
            onClick={() => chooseOrder(order._id)}
          >
            Lấy đơn hàng này
          </button>
        </div>
      </div>
    </div>
  );
}
