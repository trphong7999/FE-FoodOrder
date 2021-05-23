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
import { IoSend } from "react-icons/io5";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { makeStyles } from "@material-ui/core";
import loading from "assets/image/avartar/avatar-default.png";
import { datetimeFromTimestamp, validatePrice } from "func.js";
import ScrollToBottom from "react-scroll-to-bottom";

export default function DeliveryPage() {
  const [haveOrder, setHaveOrder] = useState(false);
  const [geoPartner, setGeoPartner] = useState(null);
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  const changeOpen = () => {
    setOpen(!open);
  };

  const user = useSelector((state) => state.loginUserApp);
  useEffect(() => {
    socket.emit("haveOrderProcessing", user.profile._id);
  }, []);

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
      <FcInspection className="icon-detail" onClick={changeOpen} />
      {open ? <OrderInfo order={haveOrder} setHaveOrder={setHaveOrder} /> : ""}

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
          style={{
            height: "70vh",
            width: "100%",
            zIndex: "0",
            borderTop: "1px solid #ebebeb",
          }}
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

function OrderInfo({ order, setHaveOrder }) {
  const [numShow, setNumShow] = useState(true);

  return (
    <div class="tracking-info">
      <div class="nav-info">
        <div
          className={`nav-info__item ${
            numShow ? "nav-info__item--active" : ""
          }`}
          onClick={() => setNumShow(true)}
        >
          <FcSurvey class="icon-nav" />
        </div>
        <div
          className={`nav-info__item ${
            numShow ? "" : "nav-info__item--active"
          }`}
          onClick={() => setNumShow(false)}
        >
          <FcSms class="icon-nav" />
        </div>
      </div>
      <div class="main-info">
        {numShow ? (
          <DetailOrder order={order} />
        ) : (
          <Chat order={order} setOrder={setHaveOrder} />
        )}
      </div>
    </div>
  );
}

function DetailOrder({ order }) {
  console.log("this is", order);
  return (
    <div className="main-info__item">
      {order ? (
        <div className="detail">
          <div className="detail-item">
            <span className="id">#{order._id}</span>{" "}
          </div>
          <div className="detail-item">
            Thời gian đặt hàng{" "}
            {datetimeFromTimestamp(parseInt(order.timeOrder) + 15 * 60000)}
          </div>
          <div className="detail-item">
            Thời gian dự kiến{" "}
            {datetimeFromTimestamp(
              parseInt(order.timeDeliverDone) + 15 * 60000
            )}
          </div>
          <div className="detail-item">
            <span>Cửa hàng</span>
            <span className="name-shop">{order.merchantId.name}</span>
          </div>
          <div className="detail-item">
            <span>Trạng thái</span>
            <span className="status">
              {order.status === "new"
                ? "Chờ quán chấp nhận"
                : order.status === "finding"
                ? "Đang tìm tài xế"
                : order.status === "waitConfirm"
                ? "Chờ quán xác nhận"
                : order.status === "picking" || order.status === "waitPick"
                ? "Shipper đang lấy đồ ăn"
                : order.status === "delivering"
                ? "Shipper đang giao đồ tới bạn"
                : order.status === "complete"
                ? "Giao hàng thành công"
                : "Đơn hàng đã bị hủy"}
            </span>
          </div>
          <ul className="detail-list">
            <div className="detail-list__title">
              <span style={{ color: "#939297" }}>
                {order.detail.foods.reduce(
                  (arr, curr) => arr + curr.quantity,
                  0
                )}{" "}
                món
              </span>
            </div>
            {order.detail.foods.map((dish, index) => (
              <li className="detail-list__item">
                <span>{dish.name}</span> <span>x {dish.quantity}</span>
              </li>
            ))}
            <div className="detail-list__title">
              <span>Tổng tiền</span>
              <span>
                {validatePrice(
                  order.detail.total + order.detail.fee - order.detail.discount
                )}{" "}
                đ
              </span>
            </div>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function Chat({ order, setOrder }) {
  const [chatMessage, setChatMessage] = useState("");
  const { chat, deliverId } = order;
  const handleActionChat = () => {
    if (chatMessage) {
      socket.emit("chatAction", {
        order_id: order._id,
        type: 1,
        message: chatMessage,
      });
      setOrder({
        ...order,
        chat: [...order.chat, { type: 1, content: chatMessage }],
      });
      setChatMessage("");
    }
  };
  socket.on("chatAction", (message) => {
    if (message.type === 0)
      setOrder({ ...order, chat: [...order.chat, message] });
  });
  return (
    <div className="main-info__item">
      <div className="item-chat">
        <div className="item-chat__partner">
          <img src={deliverId.avt} alt="avt-partner" />
          <span>{deliverId.name}</span>
        </div>
        <ScrollToBottom className="item-chat__content">
          <div>
            {chat.length > 0
              ? chat.map((chat, index) =>
                  chat.type == 0 ? (
                    <div key={index} className="content-parter">
                      <img
                        src={order.deliverId.avt}
                        alt="partnerAvt"
                        width="32"
                      />
                      <div className="content">{chat.content}</div>
                    </div>
                  ) : (
                    <div key={index} className="content-user">
                      <div className="content">{chat.content}</div>
                      <img
                        src={order.userOrderId.info.avt}
                        alt="userAvt"
                        width="32"
                      />
                    </div>
                  )
                )
              : ""}
          </div>
        </ScrollToBottom>

        <div className="item-chat__input">
          <input
            type="text"
            className="input-text"
            placeholder="Type a message..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <span className="input-send" onClick={() => handleActionChat()}>
            <IoSend className="input-send__icon" />
          </span>
        </div>
      </div>
    </div>
  );
}
