import React, { useState } from "react";
import { FiPower } from "react-icons/fi";
import { AiFillShop } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Address2Geocode from "components/Address2Geocode";
import area from "assets/data/districtName";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "./style.scss";
import { validatePrice } from "func";
import { useHistory, useRouteMatch } from "react-router";

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

export default function OrderManager() {
  const [tab, setTab] = useState(0);

  const handleChangeTab = (tab) => {
    setTab(tab);
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
          <li className="tab-list__item">
            <FiPower />
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
    </div>
  );
}

function MapPick() {
  const [geo, setGeo] = useState({
    lat: "20.828790101307185",
    lng: "106.71664668177716",
  });
  return (
    <MapContainer
      center={[geo.lat, geo.lng]}
      zoom={18}
      scrollWheelZoom={false}
      style={{ height: `calc(100vh - 40px)`, width: "100%" }}
      whenReady={(map) => {
        map.target.on("click", function (e) {
          const { lat, lng } = e.latlng;
          setGeo({ lat: lat, lng: lng });
        });
      }}
    >
      <ChangeView center={[geo.lat, geo.lng]} zoom={18} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[geo.lat, geo.lng]}>
        <Popup>Location</Popup>
      </Marker>
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
