import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import logo from "assets/image/logo.png";
import { useDispatch } from "react-redux";
import { login, getProfile } from "redux/loginUserAppSlice";
import userApi from "api/userApi";

import "./style.scss";

export default function FormLoginValidation({ clickSwitchForm }) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema: Yup.object({
      username: Yup.string()
        .max(10, "Login must be shorter than 10 characters")
        .required("Tên tài khoản không được để trống"),
      password: Yup.string()
        .min(6, "Password should be longer than 6 characters")
        .required("Mật khẩu không được để trống"),
    }),
  });

  // ------------------ SWITCH FORM REGISTER----------------
  const callBackClickSwitchForm = () => {
    clickSwitchForm(false);
  };

  // ----------------- HANDLE LOGIN ------------
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    let res = await userApi.login({ username: userName, password });
    console.log(res);
    const noti = document.querySelector("#notify");
    if (res.status && res.status !== 200) {
      noti.textContent = res.data;
    } else if (typeof res === "object" && res.status !== 400) {
      const action = login({
        username: userName,
        token: res.token,
        id: res.id,
      });
      dispatch(action);
      const profile = await userApi.getProfile();
      const actionGetProfile = getProfile(profile);
      dispatch(actionGetProfile);
    }
  };

  // ---------------------------------------------

  return (
    <form className="form-input" onSubmit={(e) => handleSubmitLogin(e)}>
      <img src={logo} alt="logo" />

      <h1>Chào mừng đến với FoodLovers</h1>
      <p id="notify" style={{ color: "red" }}></p>
      <label htmlFor="username">Tên tài khoản</label>
      <input
        type="text"
        placeholder="Nhập tài khoản"
        name="username"
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

      <div className="link-register">
        Bạn chưa có tài khoản?{" "}
        <span onClick={() => callBackClickSwitchForm()}>Đăng ký</span>
      </div>

      <input type="submit" value="Đăng nhập" />
    </form>
  );
}
