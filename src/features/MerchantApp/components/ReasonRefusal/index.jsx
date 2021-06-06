import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import "./style.scss";
import socket from "socket-io";
import { ToastContainer, toast } from "react-toastify";

export default function ReasonRefusal() {
  const history = useHistory();
  const location = useLocation();
  const orderNeedCancel = location.state.detailOrderNeedCancel;
  const [reasons, setReasons] = useState([
    {
      title: "Hết món",
      id: 1,
      checked: false,
    },
    {
      title: "Sai giá",
      id: 2,
      checked: false,
    },
    {
      title: "Quán quá tải",
      id: 3,
      checked: false,
    },
    {
      title: "Quán đã nghỉ",
      id: 4,
      checked: false,
    },
  ]);

  const changeFail = (message) => toast.error("🤔" + message);

  const handleConfirmRemove = () => {
    const wasChoose = reasons.reduce((val, item) => {
      return val ? val : item.checked;
    }, false);
    if (wasChoose) {
      socket.emit("merchantCancelOrder", {
        order_id: orderNeedCancel._id,
        reasons: reasons
          .filter((rs) => rs.checked === true)
          .map((rs) => rs.title),
      });
      history.goBack();
    } else return changeFail("Vui lòng chọn ít nhất một lý do");
  };

  const handleChooseReason = (e) => {
    const reason = reasons.map((rs) => {
      if (rs.id == e.target.id) rs.checked = e.target.checked;
      return rs;
    });
    reason.checked = e.target.checked;
    setReasons([...reason]);
  };

  return (
    <div className="reason-refusal">
      <ToastContainer />
      <div className="reason-refusal__head">
        <div
          className="reason-refusal__link"
          onClick={() => {
            history.goBack();
          }}
        >
          <BsChevronLeft className="reason-refusal__icon" />
          <span>Lý do từ chối</span>
        </div>
      </div>

      <div className="reason-refusal__body">
        <ul className="reason-refusal__list">
          <li className="reason-refusal__item">
            <span>Hết món</span>
            <input
              type="checkbox"
              id="1"
              name="1"
              value="Hết món"
              onChange={(e) => handleChooseReason(e)}
              className="item__input-check"
            />
          </li>
          <li className="reason-refusal__item">
            <span>Sai giá</span>
            <input
              type="checkbox"
              id="2"
              name="2"
              value="Sai giá"
              onChange={(e) => handleChooseReason(e)}
              className="item__input-check"
            />
          </li>
          <li className="reason-refusal__item">
            <span>Quán quá tải</span>
            <input
              type="checkbox"
              id="3"
              name="3"
              value="Quán quá tải"
              onChange={(e) => handleChooseReason(e)}
              className="item__input-check"
            />
          </li>
          <li className="reason-refusal__item">
            <span>Quán đã nghỉ</span>
            <input
              type="checkbox"
              id="4"
              name="4"
              value="Quán đã nghỉ"
              onChange={(e) => handleChooseReason(e)}
              className="item__input-check"
            />
          </li>
        </ul>
      </div>

      <div className="reason-refusal__bot">
        <button
          className="reason-refusal__bot-button"
          onClick={() => {
            handleConfirmRemove();
          }}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}
