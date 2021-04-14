import React from "react";
import { IoWallet } from "react-icons/io5";
import { BiNotepad } from "react-icons/bi";
import "./style.scss";

function NewOrder() {
  return (
    <div className="content">
      <div className="content-title">
        <span className="title-name">Tran Duy Phong</span>
        <span className="title-quantity">Đã đặt: 7 đơn</span>
      </div>

      <div className="content-time">
        <div className="time-left">
          <span className="time-left__limit">
            Lấy trong <span>17</span> phút(16:55)
          </span>
          <span className="time-left__space">cách: 0.4 km</span>
        </div>
        <div className="time-right">
          <button className="time-right__button">Trì hoãn</button>
        </div>
      </div>

      <div className="content-order">
        <div className="content-note">
          <span className="note-title">Ghi chú khách hàng: </span>
          <span className="note-content">
            Lấy dụng cụ ăn uống, bỏ đá riêng giúp mình Lấy dụng cụ ăn uống, bỏ
            đá riêng giúp mình
          </span>
        </div>

        <div className="content-order__item">
          <div className="item-quantity">1 x</div>
          <div className="item-food">
            <div className="item-food__name">Bún bò</div>
          </div>
          <div className="item-total">50,000</div>
        </div>

        <div className="content-order__item">
          <div className="item-quantity">1 x</div>
          <div className="item-food">
            <div className="item-food__name">
              Trà đào cam sả - thạch đào ngon
            </div>

            <div className="item-food__note">
              <BiNotepad />
              <span>Không bỏ hành giúp mình</span>
            </div>
          </div>
          <div className="item-total">49,000</div>
        </div>

        <div className="content-order__item">
          <div className="item-quantity">1 x</div>
          <div className="item-food">
            <div className="item-food__name">Trà sen vàng</div>
          </div>
          <div className="item-total">30,000</div>
        </div>

        <div className="content-order__item">
          <div className="item-quantity">1 x</div>
          <div className="item-food">
            <div className="item-food__name">Trà sen vàng</div>
          </div>
          <div className="item-total">30,000</div>
        </div>

        <div className="content-order__item">
          <div className="item-quantity">1 x</div>
          <div className="item-food">
            <div className="item-food__name">Trà sen vàng</div>
          </div>
          <div className="item-total">30,000</div>
        </div>

        <div className="content-order__item">
          <div className="item-quantity">1 x</div>
          <div className="item-food">
            <div className="item-food__name">Trà sen vàng</div>
          </div>
          <div className="item-total">30,000</div>
        </div>
      </div>

      <div className="confirm-order">
        <div className="confirm-order__text">
          <span>Thu của khách hàng (6 món)</span>
          <div className="text-total">
            <IoWallet className="text-total__icon" />
            <span>219.000 đ</span>
          </div>
        </div>

        <div className="confirm-order__button">
          <button>Từ chối</button>
          <button>Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
