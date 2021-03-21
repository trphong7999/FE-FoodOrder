import React from "react";
import GoogleMapReact from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";
import Address2Geocode from "components/Address2Geocode";
import area from "./data";
import { BsPhone } from "react-icons/bs";
const AnyReactComponent = () => (
  <div>
    <HiLocationMarker style={{ fontSize: "3rem", color: "#781de1" }} />
  </div>
);
function Form2({ representative, setRepresentative }) {
  const { name, address, identity, phone } = representative;
  return (
    <form className="form-apply-validation">
      <h1 style={{ textAlign: "start", margin: "0 0 2rem 0" }}>
        Thông tin người đại diện
      </h1>
      <div className="field-wrap">
        <label>Họ và tên</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) =>
            setRepresentative({ ...representative, name: e.target.value })
          }
          placeholder="Nhập tên"
          required
        />
      </div>
      <div className="field-wrap">
        <label>Địa chỉ</label>
        <input
          type="text"
          name="name"
          value={address}
          onChange={(e) =>
            setRepresentative({ ...representative, address: e.target.value })
          }
          placeholder="Nhập địa chỉ"
          required
        />
      </div>
      <div className="field-wrap">
        <label>Số CMND</label>
        <input
          type="text"
          name="identity"
          value={identity}
          onChange={(e) =>
            setRepresentative({ ...representative, identity: e.target.value })
          }
          placeholder="Nhập số CMND"
          required
        />
      </div>
      <div className="field-wrap">
        <label>SĐT</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) =>
            setRepresentative({ ...representative, phone: e.target.value })
          }
          placeholder="Số điện thoại cá nhân"
          required
        />
      </div>
    </form>
  );
}

export default Form2;
