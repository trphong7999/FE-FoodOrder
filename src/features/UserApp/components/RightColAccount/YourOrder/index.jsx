import React, { useState } from "react";
import "./style.scss";
import { sumQuantity, validatePrice, formatDatetimeToString } from "func";
import Modal from "react-modal";
import "assets/css/base.scss";
import { FaChevronLeft } from "react-icons/fa";
import merchantApi from "api/merchantApi";

export default function YourOrder({ historyOrders }) {
  const [currenOrder, setCurrenOrder] = useState("");

  const sumQuantity = (list) => {
    let newList = list.reduce((arr, curr) => arr + curr.quantity, 0);
    return newList;
  };

  const convertTimeTodate = (time) => {
    var now = new Date(time);
    return now.toLocaleString();
  };

  const handleOpen = async (order) => {
    setCurrenOrder(order);
  };

  const handleClose = () => {
    setCurrenOrder("");
  };

  return (
    <div className="history-table">
      {/* ---------------- LIST HISTORY ORDER PC START -------------- */}
      <div className="history-table-row history-table-heading">
        <div className="history-table-cell history-table-col1">STT</div>
        <div className="history-table-cell history-table-col2">Mã đơn hàng</div>
        <div
          className="history-table-cell history-table-col3"
          // style={{ textAlign: "center" }}
        >
          Thời gian
        </div>
        <div className="history-table-cell history-table-col4">Địa điểm</div>
        <div className="history-table-cell history-table-col5">Nhân viên</div>
        <div className="history-table-cell history-table-col6">Tổng tiền</div>
        <div className="history-table-cell history-table-col7">Trạng thái</div>
        <div
          className="history-table-cell history-table-col8"
          style={{ textAlign: "center" }}
        >
          Chi tiết
        </div>
      </div>
      {historyOrders.map((od, idx) =>
        od.status === "complete" || od.status === "cancel" ? (
          <OrderLine order={od} idx={idx + 1} />
        ) : (
          ""
        )
      )}
      {/* ---------------- LIST HISTORY ORDER PC END -------------- */}

      {/* ---------------- LIST HISTORY ORDER MOBILE START -------------- */}
      <div className="history-table__mobile">
        {historyOrders.map((order, index) => (
          <div
            key={index}
            className="history-item"
            onClick={() => handleOpen(order)}
          >
            <div className="history-item__head">
              <div className="head-id">#{order._id}</div>
              <div className="head-date">
                {convertTimeTodate(parseInt(order.timeOrder))}
              </div>
            </div>
            <div className="history-item__body">
              <div className="body-amount">
                <div className="body-amount__dish">
                  {sumQuantity(order.detail.foods)} món
                </div>
                <div className="body-amount__total">
                  {validatePrice(order.detail.total)}{" "}
                  <span style={{ color: "red" }}>đ</span>
                </div>
              </div>
            </div>
            <div className="history-item__status">
              <div
                style={{
                  textAlign: "right",
                  fontWeight: "500",
                  color: `${order.status === "cancel" ? "red" : "green"}`,
                  paddingTop: "1rem",
                }}
              >
                {order.status === "cancel" ? "Đã hủy" : "Đã giao"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --------- ORDER DETAIL ------------- */}
      {currenOrder === "" ? (
        ""
      ) : (
        <div className="modal">
          <div className="modal__overlay"></div>
          <div className="modal__body">
            <div className="history-detail__mobile">
              <div className="history-header">
                <div className="history-header__icon">
                  <FaChevronLeft onClick={() => handleClose()} />
                </div>
                <div className="history-header__title">Chi tiết đơn hàng</div>
              </div>
              <div className="history-body">
                <div className="history-body__item">
                  <div className="item-id">#{currenOrder._id}</div>
                  <div className="item-date">
                    <span>
                      {convertTimeTodate(parseInt(currenOrder.timeOrder))}
                    </span>
                    <span
                      style={{
                        color: `${
                          currenOrder.status === "cancel" ? "red" : "green"
                        }`,
                      }}
                    >
                      {currenOrder.status === "cancel" ? "Đã hủy" : "Đã giao"}
                    </span>
                  </div>
                  <div className="item-address">
                    <span>Giao tới địa chỉ</span>
                    <div>193 Văn Cao, Ngô Quyền, Hải Phòng, Việt Nam</div>
                  </div>
                </div>

                <div className="history-body__item">
                  <div className="item-infomation">
                    <span>{currenOrder.merchantId.name}</span>
                    <div>{currenOrder.merchantId.location.address}</div>
                  </div>
                  {currenOrder.partnerId ? (
                    <div className="item-infomation">
                      <span>tên người giao</span>
                      <div>số phone</div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="item-infomation">
                    <span>Phương thức thanh toán</span>
                    <div>Tiền mặt</div>
                  </div>
                </div>

                <div className="history-body__item">
                  <ul className="item-list">
                    {currenOrder.detail.foods.map((dish, idx) => (
                      <li className="item-list__li">
                        <div
                          className="item-list__name"
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          {dish.name} {dish.name} {dish.name}
                        </div>
                        <div className="item-list__quantity">
                          x {dish.quantity}
                        </div>
                        <div className="item-list__total">
                          {validatePrice(dish.total)}{" "}
                          <span style={{ color: "red" }}>đ</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="history-body__item">
                  <div className="item-amount">
                    <span>Tổng tiền món</span>
                    <span className="item-amount__number">
                      {validatePrice(currenOrder.detail.total)}{" "}
                      <span style={{ color: "red" }}>đ</span>
                    </span>
                  </div>
                  <div className="item-amount">
                    <span>Phí ship</span>
                    <span className="item-amount__number">
                      {validatePrice(currenOrder.detail.fee)}{" "}
                      <span style={{ color: "red" }}>đ</span>
                    </span>
                  </div>
                  <div className="item-amount">
                    <span>Giảm giá</span>
                    <span className="item-amount__number">
                      {validatePrice(currenOrder.detail.discount)}{" "}
                      <span style={{ color: "red" }}>đ</span>
                    </span>
                  </div>
                  <div className="item-amount">
                    <span>Số tiền trả</span>
                    <span className="item-amount__number">
                      {validatePrice(
                        currenOrder.detail.fee + currenOrder.detail.total
                      )}{" "}
                      <span style={{ color: "red" }}>đ</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ---------------- LIST HISTORY ORDER MOBILE END -------------- */}
    </div>
  );
}

function OrderLine({ order, idx }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openChatHistory, setOpenChatHistory] = useState(false);
  const [openReasonsCancel, setOpenReasonsCancel] = useState(false);
  const openModalDetail = () => {
    setOpenDetail(true);
  };

  function closeModalDetail() {
    setOpenDetail(false);
  }
  const openModalChatHistory = () => {
    setOpenChatHistory(true);
  };

  function closeModalChatHistory() {
    setOpenChatHistory(false);
  }
  function closeModalReasonsCancel() {
    setOpenReasonsCancel(false);
  }
  return (
    <div className="history-table-row ">
      <div className="history-table-cell history-table-col1">{idx}</div>
      <div
        className="history-table-cell history-table-col2"
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        <strong>{order._id}</strong>
      </div>
      <div
        className="history-table-cell history-table-col3"
        // style={{ textAlign: "center" }}
      >
        <div>Thời gian đặt</div>
        <div style={{ marginBottom: "0.5rem" }}>
          {formatDatetimeToString(new Date(parseInt(order.timeOrder)))}
        </div>
        <div>Thời gian giao</div>
        <div>
          {order.timeDeliverDone !== "0" && order.timeDeliverDone !== null
            ? formatDatetimeToString(new Date(parseInt(order.timeDeliverDone)))
            : "Không có"}
        </div>
      </div>
      <div className="history-table-cell history-table-col4">
        <a
          href={"/user/quan-an/" + order.merchantId._id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text-body">
            <strong className="d-block text-truncate">
              {order.merchantId.name}
            </strong>
            <span className="d-block  text-truncate text-truncate-address">
              {order.merchantId.location.address}
            </span>
          </div>
        </a>
      </div>
      <div className="history-table-cell history-table-col5">
        <strong className="d-block text-truncate">
          {order.deliverId ? order.deliverId.name : "Không có"}
        </strong>
        <br></br>
        <a href="" className="font-weight-bold" data-toggle="modal">
          {order.deliverId ? "Đánh giá" : ""}
        </a>
      </div>
      <div className="history-table-cell history-table-col6">
        <div style={{ fontWeight: "bold" }}>
          <span>
            {validatePrice(
              order.detail.total + order.detail.fee - order.detail.discount
            )}
            đ
          </span>
        </div>
        <div>
          <span>{order.detail.foods.reduce(sumQuantity, 0)} items</span>
        </div>
        <div style={{ color: "green", fontWeight: "bold" }}>Tiền mặt</div>
      </div>
      <div className="history-table-cell history-table-col7">
        {order.status === "complete" ? (
          <div className="font-weight-bold history-table-status green">
            Complete
          </div>
        ) : (
          <div className="font-weight-bold history-table-status red">
            Cancel
          </div>
        )}
      </div>
      <div
        className="history-table-cell history-table-col8"
        style={{ textAlign: "center" }}
      >
        {order.status === "cancel" ? (
          <div
            className="d-block mb-1"
            onClick={() =>
              order.reasonCancel.length > 0 ? setOpenReasonsCancel(true) : ""
            }
          >
            Lý do hủy
          </div>
        ) : (
          ""
        )}
        <div className="d-block mb-1" onClick={() => openModalDetail()}>
          Chi tiết đơn hàng
        </div>
        <div className="d-block mb-1" onClick={() => openModalChatHistory()}>
          Lịch sử chat
        </div>
        <Modal
          isOpen={openDetail}
          onRequestClose={closeModalDetail}
          style={customStyles}
        >
          <DetailOrder order={order} />
        </Modal>
        <Modal
          isOpen={openChatHistory}
          onRequestClose={closeModalChatHistory}
          style={customStyles}
        >
          <HistoryChat order={order} />
        </Modal>
        <Modal
          isOpen={openReasonsCancel}
          onRequestClose={closeModalReasonsCancel}
          style={StylesCancel}
        >
          <ReasonsCancel reasons={order.reasonCancel} />
        </Modal>
      </div>
    </div>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    width: "70%",
    height: "47%",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
};

const StylesCancel = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.4rem",
    width: "auto",
    height: "auto",
  },
};

function DetailOrder({ order }) {
  const items = order.detail.foods;
  return (
    <div>
      {" "}
      <div className="checkout--detail-order--order">
        <div className="checkout--order--top">
          <h1>Chi tiết đơn hàng</h1>
          <div className="checkout--foods">
            {items.map((item, index) => (
              <div className="checkout--food" key={index}>
                <div>
                  <span className="qty">{item.quantity}</span>
                  <span className="food-name">{item.name}</span>
                </div>
                <p>{validatePrice(item.price * item.quantity)} đ</p>
              </div>
            ))}
          </div>
        </div>
        <div className="checkout--order--bot">
          <div className="checkout-sum">
            <p>
              Tổng cộng{" "}
              <span style={{ fontWeight: "bold" }}>
                {items.reduce((value, item) => value + item.quantity, 0)}
              </span>{" "}
              phần
            </p>
            <p>{validatePrice(order.detail.total)} đ</p>
          </div>
          <div className="checkout-feeship">
            <p>Phí vận chuyển: </p>
            <p>{validatePrice(order.detail.fee)} đ</p>
          </div>
          <div className="checkout-feeship">
            <p>Giảm giá: </p>
            <p>{validatePrice(order.detail.discount)} đ</p>
          </div>
          <div className="checkout-total">
            <p>Tổng cộng</p>
            <p>
              {validatePrice(
                order.detail.total + order.detail.fee - order.detail.discount
              )}{" "}
              đ
            </p>
          </div>

          <div className="checkout-payment">
            <p
              style={{
                fontSize: "2rem",
                color: "black",
                fontWeight: "bold",
                textAlign: "right",
                marginRight: "1rem",
              }}
            >
              Tiền mặt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryChat({ order }) {
  const { chat, deliverId } = order;
  return (
    <div className="main-info__item">
      <div className="item-chat">
        {order.deliverId ? (
          <React.Fragment>
            <div className="item-chat__partner">
              <span>Lịch sử chat</span>
            </div>
            <div>
              {chat.length > 0
                ? chat.map((chat, index) =>
                    chat.type == 0 ? (
                      <div key={index} className="content-parter">
                        <img
                          src={order.deliverId.avt}
                          alt="partnerAvt"
                          width="32"
                        />
                        <div className="content">{chat.content}</div>
                      </div>
                    ) : (
                      <div key={index} className="content-user">
                        <div className="content">{chat.content}</div>
                        <img
                          src={order.userOrderId.info.avt}
                          alt="userAvt"
                          width="32"
                        />
                      </div>
                    )
                  )
                : ""}
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function ReasonsCancel({ reasons }) {
  return (
    <div>
      <div>Lý do hủy :</div>
      {reasons.map((rs) => (
        <p style={{ marginLeft: "2rem" }}>{rs}</p>
      ))}
    </div>
  );
}
