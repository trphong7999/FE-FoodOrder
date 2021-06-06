import React, { useEffect, useState } from "react";
import { formatDatetimeToString, validatePrice } from "func";
import { AiFillProfile } from "react-icons/ai";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { useParams } from "react-router";
import partnerApi from "api/partnerApi";
import { FaStar } from "react-icons/fa";
import "./style.scss";

export default function PartnerPage() {
  let { id } = useParams();
  const [taskBar, setTaskBar] = useState(1);
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    const getPartnerById = async () => {
      const res = await partnerApi.get(id);
      setPartner(res);
    };

    getPartnerById();
  }, []);
  console.log(partner);
  return (
    <div className="grid__full-width">
      {partner ? (
        <div className="manager-partner-page">
          <div className="row">
            <div className="col l-2" style={{ height: "150vh" }}>
              <div className="task-bar">
                <div className="task-bar__item">
                  <div className="task-bar__img">
                    <img src={partner.avt ? partner.avt : ""} alt="" />
                  </div>
                </div>
                <div
                  className="task-bar__item"
                  onClick={() => {
                    setTaskBar(1);
                  }}
                >
                  <RiAccountPinCircleFill className="task-bar__icon" />
                  Thông tin tài xế
                </div>
                <div
                  className="task-bar__item"
                  onClick={() => {
                    setTaskBar(2);
                  }}
                >
                  <AiFillProfile className="task-bar__icon" />
                  Lịch sử đơn hàng
                </div>
                <div
                  className="task-bar__item"
                  onClick={() => {
                    setTaskBar(3);
                  }}
                >
                  <FaStar className="task-bar__icon" />
                  Review
                </div>
              </div>
            </div>
            <div className="col l-10">
              <div className="content-task">
                {taskBar === 1 ? (
                  <Profile partner={partner} />
                ) : taskBar === 2 ? (
                  "đơn"
                ) : (
                  "review"
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function Profile({ partner }) {
  return (
    <div className="partner-profile">
      {partner ? (
        <div className="row">
          <div className="col l-6">
            <div className="profile-item">
              <div className="item-title">họ và tên</div>
              <div className="item-content">{partner.name}</div>
            </div>
          </div>
          <div className="col l-6">
            <div className="profile-item">
              <div className="item-title">địa chỉ</div>
              <div className="item-content">{partner.address}</div>
            </div>
          </div>
          <div className="col l-6">
            <div className="profile-item">
              <div className="item-title">email</div>
              <div className="item-content">{partner.email}</div>
            </div>
          </div>
          <div className="col l-6">
            <div className="profile-item">
              <div className="item-title">điện thoại</div>
              <div className="item-content">{partner.phone}</div>
            </div>
          </div>
          <div className="col l-6">
            <div className="profile-item">
              <div className="item-title">giới tính</div>
              <div className="item-content">
                {partner.gender === "male"
                  ? "Nam"
                  : partner.gender === "female"
                  ? "Nữ"
                  : "Khác"}
              </div>
            </div>
          </div>
          <div className="col l-6">
            <div className="profile-item">
              <div className="item-title">ngày đăng ký</div>
              <div className="item-content">
                {formatDatetimeToString(new Date(parseInt(partner.dateCreate)))}
              </div>
            </div>
          </div>
          <div className="col l-12">
            <div className="profile-item">
              <div className="item-title">CMND/CCCD</div>
              <div className="item-content">
                Mã số: {partner.identity.number}
              </div>
              <div className="item-img">
                <img src={partner.identity.fontImg} alt="" />
                <img src={partner.identity.backImg} alt="" />
              </div>
            </div>
          </div>
          <div className="col l-12">
            <div className="profile-item" style={{ textAlign: "center" }}>
              <div className="item-title">Hợp đồng</div>
              <img src={partner.contract} width="512" alt="contract" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
