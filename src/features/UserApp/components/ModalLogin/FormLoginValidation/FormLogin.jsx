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
        .required(),
      password: Yup.string()
        .min(6, "Password should be longer than 6 characters")
        .required(),
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
    if (typeof res === "string") {
      const action = login({ username: userName, token: res });
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

      <label htmlFor="username">Tên tài khoản</label>
      <input
        type="text"
        placeholder="Nhập tài khoản"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        name="username"
=======
>>>>>>> 166f7a186110516ace7274a45ee1e67c456e3f15
=======
>>>>>>> 166f7a186110516ace7274a45ee1e67c456e3f15
=======
>>>>>>> 166f7a186110516ace7274a45ee1e67c456e3f15
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
