import React from "react";
import "features/UserApp/css/styleModal.scss";
import "assets/css/base.scss";
import { MdClear } from "react-icons/md";

export default function ModalFormChangePhone({ changeShowModalPhone }) {
  const sendData = () => {
    changeShowModalPhone(false);
  };
  return (
    <div className="modal">
      <div className="modal__overlay"></div>

      <div className="modal__body">
        <div className="modal__form">
          <div className="form-header">
            <h3 className="form-header__title">Thay đổi số điện thoại</h3>
            <MdClear className="form-header__icon" onClick={sendData} />
          </div>

          <div className="form-item">
            <span>Lưu ý:</span>
            <span className="form-item__note">
              Sau khi đổi số điện thoại, bạn sẽ không sử dụng số cũ để đăng nhập
              được nữa.
            </span>
          </div>

          <div className="form-item">
            <label htmlFor="phone_new">Nhập số điện thoại mới của bạn</label>
            <input type="text" autoComplete="off" name="phone_new" />
          </div>

          <div className="form-item">
            <label htmlFor="password_current">Nhập mật khẩu hiện tại</label>
            <input type="password" autoComplete="off" name="password_current" />
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
