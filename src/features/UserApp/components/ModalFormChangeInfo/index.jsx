import React, { useState } from "react";
import "features/UserApp/css/styleModal.scss";
import "assets/css/base.scss";
import { MdClear } from "react-icons/md";

export default function ModalFormChangeInfo({ account, changeShowModalInfo }) {
  const { name, email, dateOfBirth, phone, sex } = account;

  const sendData = () => {
    changeShowModalInfo(false);
  };

  // CHANGE GIOI TINH
  const [gioitinh, setGioitinh] = useState(sex);
  const handleChangeGioitinh = (event) => {
    setGioitinh(event.target.value);
  };

  const [ten, setTen] = useState(name);
  const handleChangeName = (event) => {
    setTen(event.target.value);
  };

  const [mail, setMail] = useState(email);
  const handleChangeMail = (event) => {
    setMail(event.target.value);
  };

  return (
    <div className="modal">
      <div className="modal__overlay"></div>

      <div className="modal__body">
        <div className="modal__form">
          <div className="form-header">
            <h3 className="form-header__title">Thay đổi thông tin cá nhân</h3>
            <MdClear className="form-header__icon" onClick={sendData} />
          </div>

          <div className="form-item">
            <label htmlFor="name">Tên thường gọi</label>
            <input
              type="text"
              autoComplete="off"
              name="name"
              value={ten}
              onChange={handleChangeName}
            />
          </div>

          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              autoComplete="off"
              name="email"
              value={mail}
              onChange={handleChangeMail}
            />
          </div>

          <div className="form-item">
            <label htmlFor="date">Ngày Sinh</label>
            <input type="date" name="Date" />
          </div>

          <div className="form-item">
            <label htmlFor="sex">Giới tính</label>
            <select
              className="form-item__select"
              value={gioitinh}
              onChange={handleChangeGioitinh}
            >
              <option value="">--Chọn giới tính--</option>
              <option value={0}>Name</option>
              <option value={1}>Nữ</option>
              <option value={2}>Khác</option>
            </select>
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
