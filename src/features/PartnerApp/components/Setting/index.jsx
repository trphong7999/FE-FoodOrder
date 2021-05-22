import React, { useState } from "react";
import { FaLock, FaUserLock, FaAngleLeft } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { RiMapPinRangeFill } from "react-icons/ri";

import "./style.scss";

export default function Setting({ callBackCloseSetting }) {
  const setUp = JSON.parse(localStorage.profile).setting;
  const [numShow, setNumShow] = useState(0);
  const sendDataCallBackClose = (data) => {
    callBackCloseSetting(data);
  };

  console.log(setUp);
  return (
    <div className="setting">
      <div className="setting-head">
        <FaAngleLeft
          className="setting-head__icon"
          onClick={() => sendDataCallBackClose("setting")}
        />
        <span>Cài đặt</span>
      </div>
      <div className="setting-content">
        <ul className="setting-content__list">
          <li>
            <div className="setting-list__item">
              <FaLock className="list__item-icon" />
              <span>Đổi mật khẩu</span>
            </div>
          </li>

          <li>
            <div className="setting-list__item">
              <FaUserLock className="list__item-icon" />
              <span>Thay đổi thông tin</span>
            </div>
          </li>

          <li>
            <div className="setting-list__item">
              <IoLocation className="list__item-icon" />
              <span>Cập nhật vị trí</span>
            </div>
          </li>

          <li>
            <div className="setting-list__item">
              <RiMapPinRangeFill className="list__item-icon" />
              <span>Thiết lập</span>
            </div>
          </li>
        </ul>
      </div>
      {numShow === 0 ? <SetUp /> : ""}
    </div>
  );
}

function SetUp() {
  return (
    <div className="setting-child">
      <div className="setting-child__item">
        <div className="child-head">
          <FaAngleLeft
            className="child-head__icon"
            //   onClick={() => sendDataCallBackClose("setting")}
          />
          <span>Thiết lập</span>
        </div>
        <div className="child-content">hello</div>
      </div>
    </div>
  );
}
