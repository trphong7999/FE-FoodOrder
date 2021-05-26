import React from "react";
import { Link } from "react-router-dom";
import logo from "assets/image/logo.png";
import "./style.scss";
import { ImFacebook2 } from "react-icons/im";
import { SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
    <div className="footer-wrap">
      <div className="grid wide">
        <div className="row">
          <section className="footer-item col l-4 m-12 c-12">
            <div className="footer-logo">
              <img src={logo} alt="logo" className="footer-logo" />
            </div>
            <p className="name-company">Công ty TNHH H2P Việt Nam</p>
            <p className="location-company">
              484 Lạch Tray - Đổng Quốc Bình - Lê Chân - TP. Hải Phòng
            </p>
            <p className="email-company">Email: foodlovers.h2p@gmail.com</p>
            <p className="hotline-company">Hotline: 1900.999.999</p>
          </section>
          <section className="footer-item col l-2 m-6 c-12">
            <h3 className="footer-title">Dịch vụ</h3>
            <Link to="/" className="footer-link">
              FoodShip - giao đồ ăn
            </Link>
          </section>
          <section className="footer-item col l-2 m-6 c-12">
            <h3 className="footer-title">FoodLovers khu vực</h3>
            <Link to="/" className="footer-link">
              FoodLovers - Hải Phòng
            </Link>
          </section>
          <section className="footer-item col l-2 m-6 c-12">
            <h3 className="footer-title">Media</h3>
            <Link to="/" className="footer-link">
              Giới thiệu về FoodLovers
            </Link>
          </section>
          <section className="footer-item col l-2 m-6 c-12">
            <h3 className="footer-title">Kết nối với chúng tôi</h3>
            <Link to="/" className="footer-link icon">
              <ImFacebook2 className="footer-icon" /> Facebook
            </Link>
            <Link to="/" className="footer-link icon">
              <SiInstagram className="footer-icon" />
              Instagram
            </Link>
          </section>
        </div>
        <div className="footer-copyright">
          <span>© 2021 TranPhong. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}
