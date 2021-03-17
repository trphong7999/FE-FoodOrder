import React from "react";
import "features/UserApp/css/styleModal.scss";
import "assets/css/base.scss";
import { MdClear } from "react-icons/md";

export default function ModalFormChangePass({ changeShowModalPass }) {
  const sendData = () => {
    changeShowModalPass(false);
  };
  return (
    <div className="modal">
      <div className="modal__overlay"></div>

      <div className="modal__body">
        <div className="modal__form">
          <div className="form-header">
            <h3 className="form-header__title">Đổi mật khẩu</h3>
            <MdClear className="form-header__icon" onClick={sendData} />
          </div>

          <div className="form-item">
            <label htmlFor="password_current">Mật khẩu hiện tại</label>
            <input type="password" autoComplete="off" name="password_current" />
          </div>

          <div className="form-item">
            <label htmlFor="password_new">Mật khẩu mới</label>
            <input type="password" autoComplete="off" name="password_new" />
          </div>

          <div className="form-item">
            <label htmlFor="password_confirm">Nhập lại mật khẩu mới</label>
            <input type="password" autoComplete="off" name="password_confirm" />
          </div>

          <div className="form-item">
            <button className="btn form-item__button--save">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
