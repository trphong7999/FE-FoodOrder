import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import logo from "assets/image/logo.png";
import { useDispatch } from "react-redux";
import { login } from "redux/loginUserAppSlice";
import userApi from "api/userApi";

import "./style.scss";

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
    }),
  });

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
    }
  };

  // ------------------ SWITCH FORM LOGIN----------------
  const callBackClickSwitchForm = () => {
    clickSwitchForm(true);
  };
  // ---------------------------------------------

  return (
    <form
      className="form-apply-validation"
      onSubmit={(e) => handleSubmitLogin(e)}
    >
      <img src={logo} alt="logo" />

      <h1>Chào mừng đến với FoodLovers</h1>

      <label htmlFor="username">Tên tài khoản</label>
      <input
        type="text"
        name="username"
        placeholder="Nhập tài khoản"
        ref={register}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      {errors.username && <div>{errors.username.message}</div>}

      <label htmlFor="password">Mật khẩu</label>
      <input
        type="password"
        name="password"
        placeholder="Nhập mật khẩu"
        ref={register}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <div>{errors.password.message}</div>}

      <label htmlFor="password">Nhập lại mật khẩu</label>
      <input
        type="password"
        name="password"
        placeholder="Nhập mật khẩu"
        ref={register}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <div>{errors.password.message}</div>}

      <div className="link-register">
        Bạn đã có tài khoản?{" "}
        <span onClick={callBackClickSwitchForm}>Đăng nhập</span>
      </div>

      <input type="submit" value="Đăng ký" />
    </form>
  );
}
