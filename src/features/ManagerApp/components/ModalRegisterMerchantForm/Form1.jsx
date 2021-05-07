import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Address2Geocode from "components/Address2Geocode";
import area from "assets/data/districtName";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

function Form1(props) {
  const { name, setName, location, setLocation, geo, setGeo } = props;
  const { lat, lng } = geo;
  const { address, district } = location;

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <form className="form-apply-validation">
      <h1 style={{ textAlign: "start", margin: "0 0 2rem 0" }}>
        Thông tin quán - Cơ bản
      </h1>
      <div className="field-wrap">
        <label className="required-field">Tên cơ sở</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên cơ sở"
          required
        />
      </div>
      <div className="field-wrap">
        <label className="required-field">Quận</label>
        <select
          name="district"
          value={district}
          onChange={(e) => {
            setLocation({ ...location, district: e.target.value });
          }}
        >
          {area.map((item, index) => (
            <option key={index} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
      </div>
      <div className="field-wrap">
        <label className="required-field">Địa chỉ</label>
        <Address2Geocode
          location={location}
          setLocation={setLocation}
          geo={geo}
          setGeo={setGeo}
        />
      </div>
      <br />
      <div>
        <MapContainer
          center={[lat, lng]}
          zoom={18}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "100%" }}
          whenReady={(map) => {
            map.target.on("click", function (e) {
              const { lat, lng } = e.latlng;
              setGeo({ lat: lat, lng: lng });
            });
          }}
        >
          <ChangeView center={[lat, lng]} zoom={18} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>Location</Popup>
          </Marker>
        </MapContainer>
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA66KwUrjxcFG5u0exynlJ45CrbrNe3hEc" }}
          center={{ lat: parseInt(lat), lng: parseInt(lng) }}
          defaultZoom={17}
          yesIWantToUseGoogleMapApiInternals
        >
          <AnyReactComponent lat={lat} lng={lng} />
        </GoogleMapReact> */}
      </div>
    </form>
  );
}

export default Form1;
