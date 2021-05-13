import React, { useState } from "react";
import "./styleModal.scss";
import "assets/css/base.scss";
import { MdClear } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Address2Geocode from "components/Address2Geocode";
import userApi from "api/userApi";
import { useDispatch } from "react-redux";
import { getProfile } from "redux/loginUserAppSlice";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function ModalFormChangeInfo({ account, changeShowModalInfo }) {
  const { name, email, location, gender } = account;
  const dispatch = useDispatch();
  const geoUser =
    location.lat && location.lng
      ? {
          lat: location.lat,
          lng: location.lng,
        }
      : false;

  const sendData = () => {
    changeShowModalInfo(false);
  };
  // CHANGE GIOI TINH
  const [gioitinh, setGioitinh] = useState(gender);
  const handleChangeGioitinh = (event) => {
    setGioitinh(event.target.value);
  };

  const [ten, setTen] = useState(name);
  const handleChangeName = (event) => {
    setTen(event.target.value);
  };

  const [mail, setMail] = useState(email);
  const handleChangeMail = (event) => {
    setMail(event.target.value);
  };

  const [geo, setGeo] = useState(
    geoUser || {
      lat: localStorage.getItem("lat") || 20.828790101307185,
      lng: localStorage.getItem("lng") || 106.71664668177716,
    }
  );
  const [address, setAddress] = useState(location.address || "");
  const { lat, lng } = geo;
  console.log(address);
  const ChangeInfo = async () => {
    if (!ten || !gioitinh || !mail || !address || !geo) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const newProfile = {
      name: ten,
      gender: gioitinh,
      email: mail,
      location: {
        address: address,
        lat: geo.lat,
        lng: geo.lng,
      },
    };
    const res = await userApi.changeProfile(newProfile);
    const actionGetProfile = getProfile(res);
    dispatch(actionGetProfile);
    alert("Cập nhật thành công!");
  };

  return (
    <div className="modal">
      <div className="modal__overlay"></div>

      <div className="modal__body">
        <div className="modal__form">
          <div className="form-header">
            <h3 className="form-header__title">Thay đổi thông tin cá nhân</h3>
            <MdClear className="form-header__icon" onClick={sendData} />
          </div>

          <div className="form-item">
            <label htmlFor="name">Tên thường gọi</label>
            <input
              type="text"
              autoComplete="off"
              name="name"
              value={ten}
              onChange={handleChangeName}
            />
          </div>

          <div className="form-item">
            <label htmlFor="sex">Giới tính</label>
            <select
              className="form-item__select"
              value={gioitinh}
              onChange={handleChangeGioitinh}
            >
              <option value="">--Chọn giới tính--</option>
              <option value={"male"}>Nam</option>
              <option value={"female"}>Nữ</option>
              <option value={""}>Không chọn</option>
            </select>
          </div>

          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              autoComplete="off"
              name="email"
              value={mail}
              onChange={handleChangeMail}
            />
          </div>

          <div className="form-item">
            <label htmlFor="email">Địa chỉ</label>
            <Address2Geocode
              location={address}
              setLocation={setAddress}
              geo={geo}
              setGeo={setGeo}
            />
          </div>

          <MapContainer
            center={[lat, lng]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
            whenReady={(map) => {
              map.target.on("click", function (e) {
                const { lat, lng } = e.latlng;
                setGeo({ lat: lat, lng: lng });
              });
            }}
          >
            <ChangeView center={[lat, lng]} zoom={15} />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]}>
              <Popup>Location</Popup>
            </Marker>
          </MapContainer>

          <div className="form-item">
            <button
              onClick={() => ChangeInfo()}
              className="btn form-item__button--save"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
