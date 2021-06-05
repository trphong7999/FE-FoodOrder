import React, { useEffect, useState } from "react";
import { formatDatetimeToString, validatePrice } from "func";
import { AiFillProfile } from "react-icons/ai";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { useParams } from "react-router";
import partnerApi from "api/partnerApi";
import { FaStar } from "react-icons/fa";
import avtDefault from "assets/image/avartar/slide1.jpg";
import reviewApi from "api/review";
import "./style.scss";
import merchantApi from "api/orderApi";

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
            <div className="col l-2">
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
                ) : taskBar === 3 ? (
                  <Review partner={partner}/>
                ) : (
                  <HistoryOrder partner={partner}/>
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
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function Review({ partner }) {
  const [allReview, setAllReview] = useState([]);

  useEffect(() => {
    const getAllReviewByMer = async () => {
      const res = await reviewApi.getReviewByMerId({id: partner._id, type: 2});
      res.reverse();
      setAllReview(res);
      console.log(res)
    };
    getAllReviewByMer();
  }, []);

  

  return (
    <div className="task-shop">
      <div className="brand-review">
        {allReview.map((review, idx) => (
          <div key={idx} className="brand-reviewm__item">
            <div className="item-head">
              <div className="item-head__left">
                <img
                  src={
                    review.reviewer.info.avt === ""
                      ? avtDefault
                      : review.reviewer.info.avt
                  }
                  alt="avt-user-review"
                />
                <div className="user">
                  <span>{review.reviewer.info.name}</span>
                  <span>
                    {formatDatetimeToString(
                      new Date(parseInt(review.timeReview))
                    )}
                  </span>
                </div>
              </div>
              <div className="item-head__right">
                {[...Array(review.rate)].map((star, i) => {
                  return (
                    <label className="review-star__wrap" key={i}>
                      <FaStar
                        className="icon-star"
                        color={"#ffc107"}
                        size={12}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="item-body">
              <span>{review.text}</span>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryOrder({partner}) {
  const [historyOrder, setHistoryOrder] = useState([])

  useEffect(() => {
    const getHistoryOrder = async () => {
      const res = await merchantApi.getOrderByPartner(partner._id)
      setHistoryOrder(res)
    }
    getHistoryOrder()
  }, [])
  console.log(historyOrder)
  return(<div>hello</div>)
}
