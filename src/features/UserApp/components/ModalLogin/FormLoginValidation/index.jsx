import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import logo from "assets/image/logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "redux/loginUserAppSlice";

import "./style.scss";

export default function FormLoginValidation() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
  const dispatch = useDispatch();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const action = login({
      userName: userName,
      password: password,
      loggedIn: true,
    });
    dispatch(action);
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

      <Link to="/" className="link-register">
        Đăng ký
      </Link>

      <input type="submit" value="Đăng nhập" />
    </form>
  );
}
