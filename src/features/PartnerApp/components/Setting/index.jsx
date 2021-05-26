import partnerApi from "api/partnerApi";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUserLock, FaAngleLeft } from "react-icons/fa";
import { RiMapPinRangeFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { getProfile } from "redux/loginPartnerAppSlice";
import "./style.scss";

export default function Setting({ callBackCloseSetting }) {
  const [numShow, setNumShow] = useState(0);

  const sendDataCallBackClose = (data) => {
    callBackCloseSetting(data);
  };

  const handleClose = () => {
    setNumShow(0);
  };

  return (
    <div className="setting">
      <div className="setting-head">
        <FaAngleLeft
          className="setting-head__icon"
          onClick={() => sendDataCallBackClose("setting")}
        />
        <span>Cài đặt</span>
      </div>
      <div className="setting-content">
        <ul className="setting-content__list">
          <li onClick={() => setNumShow(1)}>
            <div className="setting-list__item">
              <FaLock className="list__item-icon" />
              <span>Đổi mật khẩu</span>
            </div>
          </li>

          <li onClick={() => setNumShow(2)}>
            <div className="setting-list__item">
              <FaUserLock className="list__item-icon" />
              <span>Thay đổi thông tin</span>
            </div>
          </li>

          <li onClick={() => setNumShow(3)}>
            <div className="setting-list__item">
              <RiMapPinRangeFill className="list__item-icon" />
              <span>Thiết lập</span>
            </div>
          </li>
        </ul>
      </div>
      {numShow === 1 ? (
        <ChangePass close={handleClose} />
      ) : numShow === 2 ? (
        <ChangeInfo close={handleClose} />
      ) : numShow === 3 ? (
        <SetUp close={handleClose} />
      ) : (
        ""
      )}
    </div>
  );
}

function ChangeInfo({ close }) {
  const dispatch = useDispatch();
  const { handleSubmit, register, error } = useForm();
  const profile = JSON.parse(localStorage.profile);

  const submitForm = async (data) => {
    let res = await partnerApi.changeInfo(data);

    if (typeof res === "object" && res.status !== 400 && res.status !== 404) {
      let action = getProfile(res);
      dispatch(action);
      alert("Thay đổi thông tin cá nhân thành công");
    } else {
      alert("Thay đổi thông tin cá nhân không thành công");
    }
  };
  const resetInput = (e) => {
    e.target.value = "";
  };
  return (
    <div className="setting-child">
      <div className="setting-child__item">
        <div className="item-head">
          <FaAngleLeft className="item-head__icon" onClick={close} />
          <span>Thay đổi thông tin cá nhân</span>
        </div>
        <div className="item-content">
          <form
            className="item-cotent__form"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email")}
                defaultValue={profile.email}
                onFocus={(e) => resetInput(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="number"
                name="phone"
                id="phone"
                {...register("phone")}
                defaultValue={profile.phone}
                onFocus={(e) => resetInput(e)}
              />
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                name="address"
                {...register("address")}
                defaultValue={profile.address}
                onFocus={(e) => resetInput(e)}
              />
            </div>
            <div className="form-group">
              <label>Giới tính</label>
              <select {...register("gender")} defaultValue={profile.gender}>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="form-action">
              <button>Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ChangePass({ close }) {
  const { handleSubmit, register, error } = useForm();

  const submitForm = async (data) => {
    if (data.newPass !== data.confirmPass) {
      alert("Mật khẩu xác nhận không trùng khớp!");
    } else {
      let res = await partnerApi.changePass(data);
      if (res === "fail1") {
        alert("Mật khẩu mới trùng với mật khẩu cũ");
      } else if (res === "fail2") {
        alert("Mật khẩu cũ không đúng");
      } else {
        alert("Thay đổi mật khẩu thành công");
        close();
      }
    }
  };

  return (
    <div className="setting-child">
      <div className="setting-child__item">
        <div className="item-head">
          <FaAngleLeft className="item-head__icon" onClick={close} />
          <span>Đổi mật khẩu</span>
        </div>
        <div className="item-content">
          <form
            className="item-cotent__form"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="form-group">
              <label>Mật khẩu cũ</label>
              <input type="password" {...register("oldPass")} />
            </div>
            <div className="form-group">
              <label>Mật khẩu mới</label>
              <input type="password" {...register("newPass")} />
            </div>
            <div className="form-group">
              <label>Nhập lại mật khẩu</label>
              <input type="password" {...register("confirmPass")} />
            </div>

            <div className="form-action">
              <button>Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function SetUp({ close }) {
  const dispatch = useDispatch();
  const setUp = JSON.parse(localStorage.profile).setting;
  const listRadiusWork = [
    { text: "1", value: 1000 },
    { text: "2", value: 2000 },
    { text: "3", value: 3000 },
    { text: "4", value: 4000 },
    { text: "5", value: 5000 },
    { text: "6", value: 6000 },
    { text: "7", value: 7000 },
    { text: "8", value: 8000 },
  ];
  const { handleSubmit, register, error } = useForm();

  const submitForm = async (data) => {
    let newS = { radiusWorking: parseInt(data.radiusWorking) };
    let res = await partnerApi.updateSetting(newS);

    if (res.status !== 400) {
      let action = getProfile(res);
      dispatch(action);
      alert("Đã thay đổi phạm vi hoạt động");
    } else {
      alert("Thay đổi phạm vi hoạt động thất bại");
    }
  };

  return (
    <div className="setting-child">
      <div className="setting-child__item">
        <div className="item-head">
          <FaAngleLeft className="item-head__icon" onClick={close} />
          <span>Thiết lập</span>
        </div>
        <div className="item-content">
          <form
            className="item-cotent__form"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="form-group">
              <label>Phạm vi hoạt động (km)</label>
              <select
                name="radiusWork"
                defaultValue={setUp.radiusWorking}
                {...register("radiusWorking")}
              >
                {listRadiusWork.map((i, idx) => (
                  <option key={idx} value={i.value}>
                    {i.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-action">
              <button>Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
