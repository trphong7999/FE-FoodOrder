import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import logo from 'assets/image/logo.png';
import { Link } from 'react-router-dom';

import "./style.scss";

export default function FormApplyValidation() {
    const { register, errors, handleSubmit, watch } = useForm({
        criteriaMode: "all"
    });

    const onSubmit = data => console.log(data); // your form submit function which will invoke after successful validation

    console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <form class="form-apply-validation" onSubmit={handleSubmit(onSubmit)}>
      <img src={logo} alt="logo"/>
      <h1>Chào mừng đến với FoodLovers</h1>
      <label>Tên tài khoản</label>
      <input
        type="text"
        name="userName"
        ref={register({
            required: "This input is required.",
            minLength: {
              value: 20,
              message: "This input must exceed 19 characters"
            }
        })}
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
        ref={register({ required: "This input is required." })} 
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