import React from "react";
import "features/UserApp/css/styleModal.scss";
import "assets/css/base.scss";
import { Link } from "react-router-dom";

export default function ModalAddCard({ link, changeShow }) {
  const sendData = () => {
    changeShow(false);
  };
  return (
    <div className="modal">
      <div className="modal__overlay"></div>

      <div className="modal__body">
        <div className="modal__form">
          <div className="form-header">
            <h3 className="form-header__title">Thay đổi số điện thoại</h3>
          </div>

          <div className="form-item">
            <span className="form-item__span">
              Thêm thẻ giúp đặt hàng nhanh hơn mà không phải nhập lại số thẻ.
            </span>
          </div>

          <div className="form-item">
            <span className="form-item__span">
              Khi thêm thẻ, Loship sẽ trừ 2.000đ vào thẻ của bạn nhằm xác nhận
              chủ thẻ.
            </span>
          </div>

          <div className="form-item">
            <span className="form-item__span">
              Bạn có thể gỡ thẻ đã lưu tại trang Quản lý thẻ.
            </span>
          </div>

          <div className="form-item">
            <span className="form-item__span">
              Nhấn <b>Tiếp tục</b> để tiến hành thêm thẻ.
            </span>
          </div>

          <div className="form-item">
            <Link to={link} className="btn form-item__link">
              Tiếp tục
            </Link>
            <button className="btn form-item__btn--back" onClick={sendData}>
              Trở lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
