import Footer from "features/UserApp/components/Footer";
import Navbar from "features/UserApp/components/Navbar";
import React, { useEffect, useState } from "react";

import "./style.scss";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "socket-io";
import L from "leaflet";
import shopIcon from "assets/image/icons/shop-icon.png";
import homeIcon from "assets/image/icons/home.jfif";
import { FcInspection } from "react-icons/fc";
import { FcSurvey, FcSms } from "react-icons/fc";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { makeStyles } from "@material-ui/core";

export default function DeliveryPage() {
  const [haveOrder, setHaveOrder] = useState(false);
  const [geoPartner, setGeoPartner] = useState(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginUserApp);
  useEffect(() => {
    socket.emit("haveOrderProcessing", user.profile._id);
  }, []);
  console.log(haveOrder);
  socket.on("canOrder", (data) => {
    setHaveOrder(data);
  });

  socket.on("geoPartner", (data) => {
    setGeoPartner(data);
  });

  var userIcon = new L.icon({
    iconUrl: homeIcon,
    iconSize: [30, 42],
    iconAnchor: [22, 34],
    popupAnchor: [-3, -46],
    shadowSize: [68, 45],
    shadowAnchor: [22, 44],
  });

  var merchantIcon = new L.icon({
    iconUrl: shopIcon,
    iconSize: [30, 42],
    iconAnchor: [22, 34],
    popupAnchor: [-3, -46],
    shadowSize: [68, 45],
    shadowAnchor: [22, 44],
  });

  return (
    <div className="tracking-page">
      <Navbar />
      <FcInspection className="icon-detail" onClick={() => setOpen(!open)} />
      <OrderInfo />
      <ToastContainer />
      {haveOrder ? (
        <MapContainer
          center={[
            (parseFloat(haveOrder.merchantId.location.lat) +
              parseFloat(haveOrder.userOrderId.info.location.lat)) /
              2,
            (parseFloat(haveOrder.merchantId.location.lng) +
              parseFloat(haveOrder.userOrderId.info.location.lng)) /
              2,
          ]}
          zoom={13.5}
          scrollWheelZoom={false}
          style={{ height: "70vh", width: "100%", zIndex: "0" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            icon={userIcon}
            position={[
              haveOrder.userOrderId.info.location.lat,
              haveOrder.userOrderId.info.location.lng,
            ]}
          >
            <Popup>Nhà của tôi</Popup>
          </Marker>
          <Marker
            icon={merchantIcon}
            position={[
              haveOrder.merchantId.location.lat,
              haveOrder.merchantId.location.lng,
            ]}
          >
            <Popup>Cửa hàng</Popup>
          </Marker>
          {geoPartner ? (
            <Marker
              icon={merchantIcon}
              position={[geoPartner.lat, geoPartner.lng]}
            >
              <Popup>Shipper</Popup>
            </Marker>
          ) : (
            ""
          )}
        </MapContainer>
      ) : (
        <div>Không có đơn hàng đang vận chuyển, vui lòng đặt hàng!</div>
      )}
      <Footer />
    </div>
  );
}

function OrderInfo(order) {
  return (
    <div class="tracking-info">
      <div class="main-info"></div>
      <div class="nav-info">
        <FcSurvey class="icon-nav" />
        <FcSms class="icon-nav" />
      </div>
    </div>
  );
}
