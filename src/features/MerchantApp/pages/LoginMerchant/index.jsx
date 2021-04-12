import React from 'react'
import {MdPhoneAndroid} from 'react-icons/md'
import {BsFillPersonFill} from 'react-icons/bs'
import {FaPhoneAlt} from 'react-icons/fa'
import './style.scss'
import logo from 'assets/image/merchantlogo.png'
import { Link } from 'react-router-dom'

function LoginMerchant() {
    return (
        <div className="grid">
            <div className="login-merchant">
                <div className="login-logo">
                    <img src={logo} alt="merchant-logo"/>
                    
                </div>
                <span className="login__title">Đăng nhập</span>
                <div className="login__with-phone">
                    <MdPhoneAndroid className="with-phone__icon"/>
                    <span>Số điện thoại</span>
                </div>
                <span className="login__text-change">Hoặc đăng nhập bằng tài khoản của bạn</span>
                <div className="login__input">
                    <label htmlFor="inputEmail" className="control-label">Email</label>
                    <input 
                        id="inputEmail"
                        type="text" 
                        placeholder="nhập email" 
                        onFocus={(e) => e.target.placeholder =""} 
                        onBlur={(e) => e.target.placeholder='nhập email'}
                    />
                </div>
                <div className="login__input">
                    <label htmlFor="inputPassword" className="control-label">Mật khẩu</label>
                    <input 
                        id="inputPassword"
                        type="password" 
                        placeholder="nhập mật khẩu" 
                        onFocus={(e) => e.target.placeholder =""} 
                        onBlur={(e) => e.target.placeholder='nhập mật khẩu'}
                    />
                </div>
                <Link className="login__link">Quên mật khẩu</Link>
                <button className="login__button login__button--main">đăng nhập</button>
                <button className="login__button">Đăng ký tài khoản cửa hàng</button>
                <div className="login__support">
                    <div className="login__support-item">
                        <BsFillPersonFill className="item-icon"/>
                        <span>Hỗ trợ KH</span>
                    </div>
                    <div className="login__support-item">
                        <span>0345 029 068</span>
                        <FaPhoneAlt className="item-icon phone"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginMerchant;
