import React, { useState } from "react";
import "./styleModal.scss";
import "assets/css/base.scss";
import { MdClear } from "react-icons/md";
import userApi from "api/userApi";
import { useDispatch } from "react-redux";
import { getProfile } from "redux/loginUserAppSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalFormChangePhone({ changeShowModalPhone }) {
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const sendData = () => {
    changeShowModalPhone(false);
  };
  const dispatch = useDispatch();

  const changeFail = (
    message = "Cập nhật thông tin thất bại, vui lòng kiểm tra lại thông tin!"
  ) => toast.error("🤔" + message);

  const changePhone = async () => {
    if (phone.length !== 10 || phone[0] !== "0") {
      changeFail();
      return;
    }

    const newPhone = {
      phone: phone,
      pass: pass,
    };
    const res = await userApi.changePhone(newPhone);
    if (typeof res !== "undefined" && res.info) {
      const actionGetProfile = getProfile(res);
      console.log(res);
      dispatch(actionGetProfile);
    } else changeFail("Mật khẩu hiện tại không đúng!");
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
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="off"
              name="phone_new"
            />
          </div>

          <div className="form-item">
            <label htmlFor="password_current">Nhập mật khẩu hiện tại</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="off"
              name="password_current"
            />
          </div>

          <div className="form-item">
            <button
              className="btn form-item__button--save"
              onClick={() => changePhone()}
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
