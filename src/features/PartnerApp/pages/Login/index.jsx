import React, { useState } from "react";
import { MdPhoneAndroid } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import "./style.scss";
import logo from "assets/image/merchantlogo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginPartner, getProfile } from "redux/loginPartnerAppSlice";
import partnerApi from "api/partnerApi";
import socket from "socket-io.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const Login = async (event) => {
    event.preventDefault();
    let res = await partnerApi.login({ email: email, password });
    if (typeof res === "object" && res.status !== 400) {
      const action = loginPartner({
        email: email,
        token: res,
        partnerId: res.id,
      });
      console.log("start dispatch login");
      dispatch(action);
      console.log("start call getprofile login");
      const profile = await partnerApi.getProfile();
      console.log("get profile api", profile);
      const actionGetProfile = getProfile(profile);
      dispatch(actionGetProfile);
      socket.emit("storeClientInfo", { id: res.id, type: "partner" });
    }
  };

  return (
    <div className="grid">
      <div className="login-partner">
        <div className="login-logo">
          <img src={logo} alt="partner-logo" />
        </div>
        <span className="login__title">Đăng nhập</span>
        <div className="login__with-phone">
          <MdPhoneAndroid className="with-phone__icon" />
          <span>Số điện thoại</span>
        </div>
        <span className="login__text-change">
          Hoặc đăng nhập bằng tài khoản của bạn
        </span>
        <div className="login__input">
          <label htmlFor="inputEmail" className="control-label">
            Email
          </label>
          <input
            id="inputEmail"
            type="text"
            placeholder="nhập email"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "nhập email")}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login__input">
          <label htmlFor="inputPassword" className="control-label">
            Mật khẩu
          </label>
          <input
            id="inputPassword"
            type="password"
            placeholder="nhập mật khẩu"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "nhập mật khẩu")}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="" className="login__link">
          Quên mật khẩu
        </Link>
        <button
          className="login__button login__button--main"
          onClick={(e) => Login(e)}
        >
          đăng nhập
        </button>
        <button className="login__button">Đăng ký tài khoản cửa hàng</button>
        <div className="login__support">
          <div className="login__support-item">
            <BsFillPersonFill className="item-icon" />
            <span>Hỗ trợ KH</span>
          </div>
          <div className="login__support-item">
            <span>0345 029 068</span>
            <FaPhoneAlt
              className="item-icon phone"
              onClick={() => window.open("tel:0345 029 068")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
