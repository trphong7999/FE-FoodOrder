import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import ModalAddCard from "./ModalAddCard";
import "./style.scss";

export default function CardManagement() {
  const link = {
    visa: "#",
    atm: "#",
  };

  const [show, setShow] = useState(false);

  const changeShow = () => {
    setShow(true);
  };

  const callBackChangeShow = (childData) => {
    setShow(childData);
  };

  return (
    <div className="card-manage">
      <div className="card-manage__head">Thêm thẻ</div>
      <div className="card-manage__content">
        <div className="card-manage__link" onClick={changeShow}>
          <GoPlus className="card-manage__icon" />
          <span>Thêm Thẻ quốc tế (VISA/Master/JCB)</span>
        </div>
        <div className="card-manage__link" onClick={changeShow}>
          <GoPlus className="card-manage__icon" />
          <span>Thêm ATM nội địa / Internet Banking</span>
        </div>
      </div>

      {show ? (
        <ModalAddCard link={link.visa} changeShow={callBackChangeShow} />
      ) : null}
    </div>
  );
}
