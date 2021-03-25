import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import logo from 'assets/image/logo.png';
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {login} from "redux/loginUserAppSlice"

import "./style.scss";

export default function FormLoginValidation() {
    const { register, errors, handleSubmit, watch } = useForm({
        criteriaMode: "all"
    });

    // ----------------- HANDLE LOGIN ------------
    const {userName, setUserName} = useState("");
    const {password, setPassword} = useState("");

    const dispatch = useDispatch();

    const handleSubmitLogin = (e) => {
      e.preventDefault();

      dispatch(login({
        userName: userName,
        password: password,
        loggedIn: true
      }))
    }
    
    // ---------------------------------------------

  return (
    <form class="form-apply-validation" onSubmit={(e) => handleSubmitLogin(e)}>
      <img src={logo} alt="logo"/>
      <h1>Chào mừng đến với FoodLovers</h1>
      <label>Tên tài khoản</label>
      <input
        type="text"
        name="userName"
        placeholder="Nhập tài khoản"
        ref={register({
            required: "This input is required.",
            minLength: {
              value: 20,
              message: "This input must exceed 19 characters"
            }
        })}
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <ErrorMessage
        errors={errors}
        name="userName"
        render={({ messages }) => {
          console.log("messages", messages);
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
     

      <label>Mật khẩu</label>
      <input 
        type="password" 
        name="password" 
        placeholder="Nhập mật khẩu"
        ref={register({ required: "This input is required." })} 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ messages }) => {
          console.log("messages", messages);
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
    
      <Link to="/" className="link-register">Đăng ký</Link>
      <input type="submit" value="Đăng nhập"/>
    </form>

    
  );
}