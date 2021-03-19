import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa";
import "./style.scss";
import FormAddressSearch from "../ModalProfile/FormAddressSearch";

function GlobalAddress(props) {
  return (
    <div className="global-address-search">
      <section className="grid wide">
        <div className="global-address__wrap">
          <span className="global-address__title">Giao tới địa chỉ</span>
          <div className="global-address__content">
            <HiLocationMarker className="icon-location" />
            <div className="content">
              Số 8 ngõ 33 Kiều Sơn, Đằng Lâm, Hải An, Hải Phòng, Việt Nam
            </div>
            <FaAngleRight className="icon-right" />
          </div>
        </div>
      </section>
      {/* <FormAddressSearch /> */}
    </div>
  );
}

export default GlobalAddress;
