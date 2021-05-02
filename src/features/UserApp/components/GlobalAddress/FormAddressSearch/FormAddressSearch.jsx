import React, { useState } from "react";
import "./style.scss";
import "assets/css/base.scss";
import { MdLocationOn } from "react-icons/md";
import { ImArrowLeft2 } from "react-icons/im";
import { RiFocus3Line } from "react-icons/ri";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import PlaceAutoComplete from "features/UserApp/components/PlaceAutoComplete";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function FormAddressSearch({
  closeModal,
  location,
  setLocation,
}) {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  function handleChangeCurrentAddress() {
    setLocation({ ...location, address: "", currentAddress: location.address });
  }

  //--------GET ADDRESS FROM LAT LNG--------------
  // function ChangeAddress(lat, lng) {
  //   Geocode.setApiKey("AIzaSyDsb7F-VyBJn7r4LilYH_lRHBpPfgyUga8");
  //   Geocode.enableDebug();

  //   Geocode.fromLatLng(lat, lng).then(
  //     (response) => {
  //       const address = response.results[0].formatted_address;
  //       setLocation({ ...location, address: address });
  //       console.log(address);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  return (
    <div className="">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height: "250px", width: "570px" }}
        whenReady={(map) => {
          map.target.on("click", function (e) {
            const { lat, lng } = e.latlng;
            setLocation({ ...location, lat: lat, lng: lng });
          });
        }}
      >
        <ChangeView center={[location.lat, location.lng]} zoom={18} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

      <div className="modal-search__form">
        <div className="form-header">
          <h1 className="form-header__title">Chọn nơi giao hàng</h1>
        </div>

        <div className="form-item">
          <MdLocationOn className="form-item__icon" />
          <div className="form-item__address">
            <PlaceAutoComplete location={location} setLocation={setLocation} />
          </div>
        </div>

        <div className="form-item">
          <RiFocus3Line className="form-item__icon form-item__icon--color" />
          <div className="form-item__address-current">
            <h4>Vị trí hiện tại</h4>
            <div>{location.currentAddress}</div>
          </div>
        </div>

        <div className="form-btn">
          <button className="btn form-item__btn--back" onClick={closeModal}>
            <ImArrowLeft2 className="form-item__btn-icon" />
            Trở lại
          </button>
          <button className="btn" onClick={handleChangeCurrentAddress}>
            Giao tới vị trí này
          </button>
        </div>
      </div>
    </div>
  );
}
