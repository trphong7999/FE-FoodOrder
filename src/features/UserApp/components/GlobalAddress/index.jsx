import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa";
import "./style.scss";
import FormAddressSearch from "./FormAddressSearch/FormAddressSearch";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
};

function GlobalAddress(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }
  // ----------------------------------Map---------------
  const [location, setLocation] = useState({
    address: "",
    currentAddress:
      "Số 8 ngõ 33 Kiều Sơn, Đằng Lâm, Hải An, Hải Phòng, Việt Nam",
    lat: "20.828790101307185",
    lng: "106.71664668177716",
  });

  return (
    <div id="yourAppElement" className="global-address-search">
      <section className="grid wide">
        <div className="global-address__wrap" onClick={openModal}>
          <span className="global-address__title">Giao tới địa chỉ</span>
          <div className="global-address__content">
            <HiLocationMarker className="icon-location" />
            <div className="content">{location.currentAddress}</div>
            <FaAngleRight className="icon-right" />
          </div>
        </div>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <FormAddressSearch
          closeModal={closeModal}
          location={location}
          setLocation={setLocation}
        />
      </Modal>
    </div>
  );
}

export default GlobalAddress;
