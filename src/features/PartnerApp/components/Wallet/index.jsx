import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { BsBoxArrowInUp, BsBoxArrowInDown } from "react-icons/bs";
import { IoReloadCircleOutline } from "react-icons/io5";
import "./style.scss";

export default function Wallet() {
  return (
    <div className="wallet">
      <div className="wallet-head">
        {/* <FaAngleLeft className="wallet-head__icon" /> */}
        <span>ví tiền</span>
      </div>
      <div className="wallet-content">
        <div className="wallet-content__card">
          <div className="card-head">
            <div className="card-head__title">Tài khoản chính</div>
            <div className="card-head__number" style={{ color: "#b82632" }}>
              -360,972đ
            </div>
          </div>
          <div className="card-action">
            <div className="card-action__item">
              <BsBoxArrowInUp />
              <div>Nạp tiền</div>
            </div>
            <div className="card-action__item">
              <BsBoxArrowInDown />
              <div>Rút tiền</div>
            </div>
            <div className="card-action__item">
              <IoReloadCircleOutline />
              <div>Lịch sử</div>
            </div>
          </div>
          <div className="card-peding">
            <span>Tiền rút đang xử lý</span>
            <span>0đ</span>
          </div>
        </div>

        <div
          className="wallet-content__card"
          style={{ backgroundColor: "#57a248" }}
        >
          <div className="card-head">
            <div className="card-head__title">Tài khoản chính</div>
            <div className="card-head__number">2,000,000đ</div>
          </div>
          <div className="card-action">
            <div className="card-action__item">
              <BsBoxArrowInUp />
              <div>Nạp tiền</div>
            </div>

            <div className="card-action__item">
              <IoReloadCircleOutline />
              <div>Lịch sử</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
