import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { MdClear } from "react-icons/md";

import img1 from "assets/image/slide1.jpg";
import img2 from "assets/image/slide2.jpg";
import img3 from "assets/image/slide3.jpg";
import img4 from "assets/image/slide4.jpg";
import img5 from "assets/image/slide5.jpg";
import img6 from "assets/image/slide6.jpg";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0, 0),
    borderRadius: "8px",
  },
}));

const listImg = [
  {
    img: img1,
    title: "tặng bạn mã 20k",
    content:
      "Nắng chiếu lung linh muôn hoa vàng, thèm Phúc Long là phải lên Loship liền nghen! Giảm liền 30K cho đơn từ 100K, lại còn freeship tận tay. Sao lại chần chừ chưa đặt ngay! Nhớ nhập mã PHUCLONGNHA bạn nhé!",
  },
  {
    img: img2,
    title: "tặng bạn mã 10k",
    content:
      "Muộn rồi mà sao còn chưa đặt tiệc to tháng Năm này với mã giảm TIECTOTHANG5, nhập ngay giảm liền 30K cho đơn 150K, lại freeship 5km. Đừng bỏ lỡ, đặt ngay 😘😘",
  },
  {
    img: img3,
    title: "tặng bạn mã 50k",
    content:
      "Đến hẹn lại lên, Loship công bố top 20 cửa hàng được yêu thích nhất trên Loship của tháng qua. Đảm bảo bạn sẽ có được những món ăn ngon mỗi ngày, không cần đắn đo suy nghĩ lại còn freeship mỗi ngày 😘😘",
  },
  {
    img: img4,
    title: "tặng bạn mã 60k",
    content:
      "Còn gì tuyệt hơn khi lên Loship có ngay đại tiệc trà sữa hấp dẫn như TocoToco, Tiger Sugar, Royal Tea, Haocha,... tuyệt ngon mà tất cả chỉ từ 25.000 đồng. Miễn phí giao hàng 5km, không giới hạn số lượng đặt trong ngày. Đặt ngay!!",
  },
  {
    img: img5,
    title: "tặng bạn mã 30k",
    content:
      "Anh ơi anh muốn đi ăn gì đâу ? Ăn chè haу là bánh giò. Hôm naу em muốn đi ăn thật no cho nên anh đừng tiếc tiền. À i á i a i à.. Đặt nhanh thôi anh ơi em đói rồi. Nhập mã THANG5 giảm ngay 10K cho đơn 60K lại freeship tận nơi 😎😎",
  },
  {
    img: img6,
    title: "tặng bạn mã 15k",
    content:
      "Còn gì tuyệt hơn khi lên Loship có ngay đại tiệc trà sữa hấp dẫn như TocoToco, Tiger Sugar, Royal Tea, Haocha,... tuyệt ngon mà tất cả chỉ từ 25.000 đồng. Miễn phí giao hàng 5km, không giới hạn số lượng đặt trong ngày. Đặt ngay!!",
  },
];

export default function SlickList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [slide, setSlide] = useState({});

  const handleOpen = (val) => {
    setSlide(val);
    setOpen(true);
  };

  const handleClose = () => {
    setSlide({});
    setOpen(false);
  };

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="grid wide slide-wrapper">
      <Slider {...settings}>
        {listImg.map((slide, idx) => (
          <div
            key={idx}
            className="slide-item"
            style={{ display: "inline-block" }}
          >
            <div
              className="slide-img"
              style={{ backgroundImage: `url(${slide.img})` }}
              onClick={() => handleOpen(slide)}
            ></div>
          </div>
        ))}
      </Slider>
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
            <div className="modal-discount">
              <div className="discount-title">
                {slide.title}{" "}
                <MdClear
                  className="discount-title__icon"
                  onClick={handleClose}
                />
              </div>
              <div className="discount-content">
                <img
                  src={slide.img}
                  alt="img-discount"
                  className="discount-img"
                />
                <div className="discount-head">{slide.title}</div>
                <div className="discount-text">{slide.content}</div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
