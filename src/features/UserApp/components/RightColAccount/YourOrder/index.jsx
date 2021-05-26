import React, { useState } from "react";
import "./style.scss";
import { sumQuantity, validatePrice } from "func";
import Modal from "react-modal";

export default function YourOrder({ historyOrders }) {
  console.log(historyOrders);
  return (
    <div className="history-table">
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
    </div>
  );
}

function OrderLine({ order, idx }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openChatHistory, setOpenChatHistory] = useState(false);
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
        <div style={{ marginBottom: "0.5rem" }}>28/09/2019 11:24</div>
        <div>Thời gian giao</div>
        <div>28/09/2019 11:45</div>
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
            {order.detail.total + order.detail.fee - order.detail.discount}đ
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
        <div className="d-block mb-1">Lý do hủy</div>
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
    height: "40%",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
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
