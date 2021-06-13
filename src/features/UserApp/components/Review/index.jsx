import React, { useEffect, useState } from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import "./style.scss";
import { FaStar } from "react-icons/fa";
import reviewApi from "api/review";
import {
  tagNameReviewMerchant,
  tagNameReviewPartner,
} from "assets/data/tagNameReview";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "none",
    boxShadow: theme.shadows[5],
    width: "96%",
    outline: "none",
    borderRadius: "6px",
  },
}));

function Review({ orderId, data, type }) {
  console.log(type);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [tagReview, setTagReview] = useState(0);
  const [textReview, setTextReview] = useState("");
  const [review, setReview] = useState(null);

  const [tagNameReview, setTagNameReview] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    getReview();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTagNameReview = (num) => {
    let name = tagNameReview.find((item) => item.value === num);
    return name ? name.text : "";
  };

  const handleSubmitReview = async () => {
    const dataReview = {
      rate: rating,
      text: textReview,
      typeReview: +type,
      orderId: orderId,
      reviewer: localStorage.userId,
      beReviewerId: data._id,
      tagReview: tagReview,
    };
    console.log(dataReview);
    const res = await reviewApi.postNewReview(dataReview);

    if (res === "NotRate") {
      alert("Bạn chưa đánh sao");
    } else {
      alert("Bạn đã đánh giá thành công");
      setOpen(false);
    }
  };

  const getReview = async () => {
    const review = await reviewApi.getReview({ id: orderId, type: type });
    if (review === "NotFound") {
      setReview(null);
    } else {
      setReview(review);
    }

    console.log(review);
  };

  useEffect(() => {
    const getTagNameReview = () => {
      if (type == 1) {
        setTagNameReview(tagNameReviewMerchant);
      } else {
        setTagNameReview(tagNameReviewPartner);
      }
    };
    getTagNameReview();
  }, []);

  return (
    <div className="review">
      <div className="review-item" onClick={handleOpen}>
        <span>Đánh giá</span>
        <BsFillCaretRightFill />
      </div>

      <div className="review-pc" onClick={handleOpen}>
        <span>Đánh giá</span>
      </div>

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
            <div className="review-modal">
              <div className="review-modal__title">
                Vui lòng đánh giá dịch vụ FoodLovers
              </div>
              <div className="review-modal__content">
                <span>
                  {type === "1" ? "Đánh giá cửa hàng" : "Đánh giá tài xế"}
                </span>
                <img src={data.avt} alt="avt" />
                <span className="name">{data.name}</span>
                <span>{type === "1" ? "(Merchant)" : "(Driver)"}</span>

                {review === null ? (
                  <div className="review-star" id="#rating">
                    {[...Array(5)].map((star, i) => {
                      const ratingValue = i + 1;
                      return (
                        <label className="review-star__wrap" key={i}>
                          <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                          />
                          <FaStar
                            className="icon-star"
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            color={
                              ratingValue <= (hover || rating)
                                ? "#ffc107"
                                : "#e4e5e9"
                            }
                          />
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <div className="review-star" id="#rating">
                    {[...Array(review.rate)].map((star, i) => {
                      return (
                        <label className="review-star__wrap" key={i}>
                          <FaStar className="icon-star" color={"#ffc107"} />
                        </label>
                      );
                    })}
                  </div>
                )}

                {review === null ? (
                  <div className="review-tag">
                    {tagNameReview.map((item, idx) => (
                      <div
                        key={idx}
                        className="tag-item"
                        onClick={() => setTagReview(item.value)}
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="review-tag">
                    <div className="tag-item">
                      {getTagNameReview(review.tagReview)}
                    </div>
                  </div>
                )}

                {review === null ? (
                  <textarea
                    name="review"
                    id="review-driver"
                    cols="40"
                    rows="6"
                    onChange={(e) => {
                      setTextReview(e.target.value);
                    }}
                    placeholder="Chia sẻ đánh giá của bạn. Đánh giá và bình luận của bạn sẽ được giữ dưới chế độ ẩn danh"
                  ></textarea>
                ) : (
                  <span>{review.text}</span>
                )}
              </div>

              {/* ---- ACTION ------ */}
              {review === null ? (
                <div className="review-modal__action">
                  <button onClick={handleSubmitReview}>Xác nhận</button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Review;
