import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { makeStyles } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";

import area from "./data";
const AnyReactComponent = () => (
  <div>
    <HiLocationMarker style={{ fontSize: "3rem" }} />
  </div>
);
function Form1({ email, setEmail, emailConfirm, setEmailConfirm }) {
  const [lat, setLat] = useState(20.828790101307185);
  const [lng, setLng] = useState(106.71664668177716);
  return (
    <form className="form-apply-validation">
      <div className="field-wrap">
        <label>Tên cơ sở</label>
        <input type="text" name="name" placeholder="Tên cơ sở" required />
      </div>
      <div className="field-wrap">
        <label>Quận</label>
        <select name="area">
          {area.map((item) => (
            <option key={item.key}>{item.value}</option>
          ))}
        </select>
      </div>
      <div className="field-wrap">
        <label>Địa chỉ</label>
        <input type="text" name="address" placeholder="Địa chỉ" required />
      </div>
      <h1>Vị trí trên bản đồ</h1>
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA66KwUrjxcFG5u0exynlJ45CrbrNe3hEc" }}
          defaultCenter={{ lat, lng }}
          defaultZoom={17}
          yesIWantToUseGoogleMapApiInternals
          onClick={(e) => {
            console.log(e);
            setLat(e.lat - 0.00000307185);
            setLng(e.lng - 0.00000307185);
          }}
        >
          <AnyReactComponent lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </form>
  );
}

export default Form1;
