import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import logo from "assets/image/logo.png";

import "./style.scss";
import userApi from "api/userApi";

export default function FormLoginValidation({ clickSwitchForm }) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema: Yup.object({
      username: Yup.string()
        .max(10, "Login must be shorter than 10 characters")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password should be longer than 6 characters")
        .required(),
      confirmPassword: Yup.string()
        .min(6, "Password should be longer than 6 characters")
        .required(),
    }),
  });

  // ----------------- HANDLE REGISTER ------------
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    userApi
      .register({
        username: userName,
        password: password,
      })
      .then(() => {
        const noti = document.querySelector("#notify");
        noti.textContent = "Bạn đã đăng ký thành công";
      });

    setUserName("");
    setPassword("");
    setConfirmPassword("");
  };

  // ------------------ SWITCH FORM LOGIN----------------
  const callBackClickSwitchForm = () => {
    clickSwitchForm(true);
  };
  // ---------------------------------------------

  return (
    <form className="form-input" onSubmit={(e) => handleSubmitRegister(e)}>
      <img src={logo} alt="logo" />

      <h1>Chào mừng đến với FoodLovers</h1>
      <p id="notify"></p>

      <label htmlFor="username">Tên tài khoản</label>
      <input
        type="text"
        name="username"
        placeholder="Nhập tài khoản"
        {...register("username")}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <label htmlFor="password">Mật khẩu</label>
      <input
        type="password"
        name="password"
        placeholder="Nhập mật khẩu"
        {...register("password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="password">Nhập lại mật khẩu</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Nhập mật khẩu"
        {...register("confirmPassword")}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className="link-register">
        Bạn đã có tài khoản?{" "}
        <span onClick={callBackClickSwitchForm}>Đăng nhập</span>
      </div>

      <input type="submit" value="Đăng ký" />
    </form>
  );
}
