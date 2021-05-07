import React, { useState, useEffect } from "react";
import { GrLocation } from "react-icons/gr";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { incQuantity, decQuantity } from "redux/cartOrderSlice";
import { validatePrice } from "func.js";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CartOrder({ merchantId }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const listCartOrder = useSelector((state) => state.cartOrder);
  const listItem = listCartOrder.filter(
    (item) => item.merchantId === merchantId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const cartList = document.getElementById("cart2");
    const sticky = cartList.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        cartList.classList.add("sticky-order-cart");
      } else {
        cartList.classList.remove("sticky-order-cart");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  const handleIncQuantity = (merchantId, name) => {
    const dish = { merchantId: merchantId, name: name };
    const action = incQuantity(dish);
    dispatch(action);
  };

  const handleDecQuantity = (merchantId, name) => {
    const dish = { merchantId: merchantId, name: name };
    const action = decQuantity(dish);
    dispatch(action);
  };

  const handleSumTotal = listItem.reduce((pre, item) => {
    return pre + item.price * item.quantity;
  }, 0);

  return (
    <div id="cart2" className="order">
      <div className="order__promotion">
        <div className="promotion__title">Ưu đãi</div>
        <div className="promotion__content">
          <GrLocation className="promotion__icon" />
          Freeship đơn hàng dưới 2km
        </div>
      </div>

      <div className="order__cart-list">
        <div className="list__title">Đơn hàng của bạn</div>
        <div className="list__item">
          {listItem.map((item, index) => (
            <div className="item" key={index}>
              <div className="item-name">{item.name} </div>
              <div className="item-update">
                <button
                  className="item-update__down"
                  onClick={() => handleDecQuantity(item.merchantId, item.name)}
                >
                  -
                </button>
                <div className="item-update__quantity">{item.quantity}</div>
                <button
                  className="item-update__up"
                  onClick={() => handleIncQuantity(item.merchantId, item.name)}
                >
                  +
                </button>
              </div>
              <div className="item-price">
                {validatePrice(item.price * item.quantity)}
                <span
                  style={{
                    fontWeight: "400",
                    position: "relative",
                    top: "-9px",
                    fontSize: "10px",
                    right: "0",
                  }}
                >
                  đ
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="list__amount">
          Tổng :
          <div className="amount__num">
            ≈{validatePrice(handleSumTotal)}
            <span
              style={{
                fontWeight: "400",
                position: "relative",
                top: "-9px",
                fontSize: "10px",
                right: "0",
              }}
            >
              đ
            </span>
          </div>
        </div>
      </div>

      <div className="order__button" onClick={handleOpen}>
        Tiếp tục
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
            <CheckOut />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

function CheckOut() {
  return <div className="check-out"></div>;
}
