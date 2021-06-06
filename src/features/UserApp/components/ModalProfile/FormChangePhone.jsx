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
  const [auth, setAuth] = useState(false);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(false);
  const sendData = () => {
    changeShowModalPhone(false);
  };
  const dispatch = useDispatch();

  const changeFail = (message = "Số điện thoại không hợp lệ!") =>
    toast.error("🤔" + message);

  const changePhone = async () => {
    if (!auth) {
      changeFail("Vui lòng xác thực số điện thoại");
    } else if (code == "1111") {
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
    } else changeFail("Mã code xác thực sai, vui lòng kiểm tra lại");
  };

  const authPhone = async () => {
    if (phone.length !== 10 || phone[0] !== "0") {
      changeFail();
      return;
    } else {
      console.log("asdasd", phone);
      const res = await userApi.checkUniquePhone(phone);
      if (res.status == 200 || !res.status) {
        setMessage("Vui lòng kiểm tra tin nhắn!");
        setAuth(true);
      } else changeFail("Số điện thoại đã bị đăng ký");
    }
  };

  return (
    <div className="modal">
      <ToastContainer />
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
            <div style={{ display: "flex" }}>
              <input
                type="number"
                value={phone}
                onChange={(e) => {
                  setMessage("");
                  setCode("");
                  setPhone(e.target.value);
                }}
                autoComplete="off"
                name="phone_new"
              />
              <button
                onClick={() => authPhone()}
                style={{
                  width: "10rem",
                  borderRadius: "8px",
                  background: "var(--primary-color)",
                  color: "white",
                }}
              >
                Xác thực
              </button>
            </div>
          </div>

          {message ? (
            <div>
              <div
                style={{
                  textAlign: "center",
                  color: "green",
                  margin: "-1rem 0 1rem 0",
                }}
              >
                {message}
              </div>
              <div>
                <span>Nhập mã xác thực </span>
                <input
                  style={{
                    width: "11rem",
                    height: "4rem",
                    outline: "none",
                    padding: "0.5rem 1rem",
                    fontSize: "1.5rem",
                    letterSpacing: "1.3rem",
                    border: "1px solid #ccc",
                    borderRadius: "15px",
                    margin: "1rem 0",
                  }}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength="4"
                  placeholder="____"
                  type="text"
                />
              </div>
            </div>
          ) : (
            ""
          )}

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
