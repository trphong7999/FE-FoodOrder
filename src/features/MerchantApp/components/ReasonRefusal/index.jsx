import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import axios from "axios";
import "./style.scss";

export default function ReasonRefusal() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const orderNeedCancel = location.state.detailOrderNeedCancel;

  const addCancelOrder = async (order) => {
    await axios.post(`http://localhost:5000/canceledOrder`, order);
  };

  const removeListNewOrderItem = async (idNewOrder) => {
    await axios.delete(`http://localhost:5000/newListOrder/${idNewOrder}`);
  };

  const handleConfirmRemove = () => {
    addCancelOrder({ ...orderNeedCancel, reason: [] });
    removeListNewOrderItem(id);
    history.goBack();
  };

  return (
    <div className="reason-refusal">
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
              id="reason1"
              name="reason1"
              value="1"
              className="item__input-check"
            />
          </li>
          <li className="reason-refusal__item">
            <span>Sai giá</span>
            <input
              type="checkbox"
              id="reason2"
              name="reason1"
              value="2"
              className="item__input-check"
            />
          </li>
          <li className="reason-refusal__item">
            <span>Quán quá tải</span>
            <input
              type="checkbox"
              id="reason3"
              name="reason1"
              value="3"
              className="item__input-check"
            />
          </li>
          <li className="reason-refusal__item">
            <span>Quán đã nghỉ</span>
            <input
              type="checkbox"
              id="reason4"
              name="reason1"
              value="4"
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
