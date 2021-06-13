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
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { tagNameReviewPartner } from "assets/data/tagNameReview";

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
                ) : taskBar === 3 ? (
                  <Review partner={partner} />
                ) : (
                  <HistoryOrder partner={partner} />
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

function Review({ partner }) {
  const [allReview, setAllReview] = useState([]);
  const [showStar, setShowStar] = useState(0);
  const [reviewClone, setReviewClone] = useState([]);
  const [tagReview, setTagReview] = useState(0);

  const handleChangeListReview = (idx) => {
    setShowStar(idx);
    if (idx === 0) {
      setAllReview(reviewClone);
    } else {
      const list = reviewClone;
      const reviews = list.filter((rw) => rw.rate === idx);
      setAllReview(reviews);
    }
  };

  const changeReviewsByTag = (num) => {
    setTagReview(num);

    const list = reviewClone;
    const reviews = list.filter((rw) => rw.tagReview === num);
    setAllReview(reviews);
  };

  const getTagNameReview = (num) => {
    let name = tagNameReviewPartner.find((item) => item.value === num);
    return name ? name.text : "";
  };

  useEffect(() => {
    const getAllReviewByMer = async () => {
      const res = await reviewApi.getReviewByMerId({
        id: partner._id,
        type: 2,
      });
      res.reverse();
      setAllReview(res);
      setReviewClone(res);
    };
    setShowStar(0);
    getAllReviewByMer();
  }, []);

  return (
    <div>
      <div className="brand-star">
        {[...Array(6)].map((s, idx) =>
          idx === 0 ? (
            <div
              className={
                showStar === idx
                  ? "brand-star__item brand-star__item--active"
                  : "brand-star__item"
              }
              key={idx}
              onClick={() => handleChangeListReview(idx)}
            >
              Tất cả
            </div>
          ) : (
            <div
              className={
                showStar === idx
                  ? "brand-star__item brand-star__item--active"
                  : "brand-star__item"
              }
              key={idx}
              onClick={() => handleChangeListReview(idx)}
            >
              <span>{idx}</span>
              <FaStar className="icon-star" color={"#ffc107"} size={16} />
              <span>
                (
                {reviewClone.reduce(
                  (arr, curr) => (curr.rate === idx ? arr + 1 : arr),
                  0
                )}
                )
              </span>
            </div>
          )
        )}
      </div>

      <div className="manage-review-tag">
        {tagNameReviewPartner.map((item, idx) => (
          <div
            key={idx}
            className={`manage-tag-item ${
              tagReview === item.value ? "manage-tag-item--active" : ""
            }`}
            onClick={() => changeReviewsByTag(item.value)}
          >
            {item.text} (
            {reviewClone.reduce(
              (arr, curr) => (curr.tagReview === item.value ? arr + 1 : arr),
              0
            )}
            )
          </div>
        ))}
      </div>

      <div className="brand-review">
        {allReview.length > 0 ? (
          allReview.map((review, idx) => (
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
                <span className="tag-item">
                  {getTagNameReview(review.tagReview)}
                </span>
                <div className="text-item">{review.text}</div>
              </div>
            </div>
          ))
        ) : (
          <h1>Hiện không có đánh giá nào</h1>
        )}
      </div>
    </div>
  );
}

function HistoryOrder({ partner }) {
  const [historyOrder, setHistoryOrder] = useState([]);

  useEffect(() => {
    const getHistoryOrder = async () => {
      const res = await merchantApi.getOrderByPartner(partner._id);
      setHistoryOrder(res);
    };
    getHistoryOrder();
  }, []);

  console.log(historyOrder);
  return (
    <div className="history-order__list">
      {historyOrder.length > 0 ? (
        <table className="table-order">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đơn hàng</th>
              <th>Thời gian</th>
              <th>Cửa hàng</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Thu nhập</th>
              <th>Trạng thái</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          {historyOrder.map((o, idx) => (
            <tbody>
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{o._id}</td>
                <td>
                  <div>Thời gian đặt</div>
                  <div style={{ marginBottom: "1rem" }}>
                    {formatDatetimeToString(new Date(+o.timeOrder))}
                  </div>
                  <div>Thời gian giao</div>
                  <div>
                    {o.timeDeliverDone
                      ? formatDatetimeToString(new Date(+o.timeDeliverDone))
                      : "Không có"}
                  </div>
                </td>
                <td>
                  <div style={{ marginBottom: "1rem" }}>
                    {o.merchantId.name}
                  </div>
                  <div>{o.merchantId.location.address}</div>
                </td>
                <td>
                  <div
                    style={{ marginBottom: "1rem", textTransform: "uppercase" }}
                  >
                    {o.userOrderId.info.name}
                  </div>
                  <div>{o.userOrderId.info.phone}</div>
                </td>
                <td>
                  <div>{validatePrice(o.detail.total + o.detail.fee)} đ</div>
                </td>
                <td>
                  <div style={{ color: "green" }}>
                    + {validatePrice(o.detail.fee * 0.9)} đ
                  </div>
                </td>
                <td>
                  {o.status === "complete" ? (
                    <div
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "1rem 0",
                        borderRadius: "8px",
                        margin: "0.5rem",
                      }}
                    >
                      Đã giao
                    </div>
                  ) : (
                    <div
                      style={{
                        color: "white",
                        padding: "1rem 0",
                        borderRadius: "8px",
                        margin: "0.5rem",
                        backgroundColor: "red",
                      }}
                    >
                      Đã hủy
                    </div>
                  )}
                </td>
                <td>
                  {o.status === "complete" ? (
                    <Chat order={o} />
                  ) : (
                    <div
                      reasonCancel={o.reasonCancel}
                      style={{ marginBottom: "1rem", cursor: "pointer" }}
                    >
                      Lý do hủy
                    </div>
                  )}

                  <DetailFood order={o} />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        ""
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,

    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
    outline: "none",
  },
}));

function Chat({ order }) {
  const { chat, deliverId } = order;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="item__chat">
      <span onClick={handleOpen}>Lịch sử chat</span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div>
              {chat.length > 0
                ? chat.map((chat, index) =>
                    chat.type == 0 ? (
                      <div key={index} className="content-parter">
                        <img
                          src={order.deliverId.avt}
                          alt="partnerAvt"
                          width="32"
                          height="32"
                        />
                        <div className="content-parter__text">
                          {chat.content}
                        </div>
                      </div>
                    ) : (
                      <div key={index} className="content-user">
                        <div className="content-user__text">{chat.content}</div>
                        <img
                          src={order.userOrderId.info.avt}
                          alt="userAvt"
                          width="32"
                          height="32"
                        />
                      </div>
                    )
                  )
                : ""}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

function DetailFood({ order }) {
  const { detail } = order;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="item__dishes">
      <span onClick={handleOpen}>Chi tiết món</span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="dishes-detail__manager">
              <div className="list-dishes">
                <div className="dish">
                  <div className="dish-name">Tên món</div>
                  <div className="dish-quantity">SL</div>
                  <div className="dish-total">Thành tiền</div>
                </div>
                {detail.foods.map((dish, idx) => (
                  <div className="dish" key={idx}>
                    <div className="dish-name">{dish.name}</div>
                    <div className="dish-quantity">x {dish.quantity}</div>
                    <div className="dish-total">
                      {validatePrice(dish.total)} đ
                    </div>
                  </div>
                ))}
              </div>
              <div className="amount">
                <span>Tổng </span>
                {validatePrice(detail.total)} đ
              </div>
              <div className="amount">
                <span>Ship </span>
                {validatePrice(detail.fee)} đ
              </div>
              <div className="amount">
                <span>Tổng chi phí </span>
                {validatePrice(detail.total + detail.fee)} đ
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
