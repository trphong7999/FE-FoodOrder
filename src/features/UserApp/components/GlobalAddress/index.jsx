import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa";
import "./style.scss";
import FormAddressSearch from "./FormAddressSearch/FormAddressSearch";
import Modal from "react-modal";
import { useSelector } from "react-redux";

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
  const user = useSelector((state) => state.loginUserApp.profile);
  // ----------------------------------Map---------------
  const [location, setLocation] = useState({
    address: "",
    currentAddress: user.info.location.address,
    lat: user.info.location.lat,
    lng: user.info.location.lng,
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
