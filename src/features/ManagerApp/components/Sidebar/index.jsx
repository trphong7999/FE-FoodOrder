import React, { useState } from "react";
import SidebarElement from "../SidebarElement";
import {
  FaClipboardList,
  FaStore,
  FaMotorcycle,
  FaUserAlt,
} from "react-icons/fa";
import "./style.scss";
import { FcSearch } from "react-icons/fc";
import { FaPhoneAlt } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";
import { RiFileCopyLine, RiCoupon3Line } from "react-icons/ri";
import Modal from "@material-ui/core/Modal";
import { Link, useRouteMatch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import orderApi from "api/orderApi";
import { formatDatetimeToString, sumTotal, validatePrice } from "func";

const StylesModal = {
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.4rem",
  },
};

function Sidebar({ setSidebar }) {
  const [menubar, setMenubar] = useState([
    {
      Icon: FaClipboardList,
      content: "Dashboard",
      active: +localStorage.navManager === 0,
    },
    {
      Icon: FaStore,
      content: "Merchant",
      active: +localStorage.navManager === 1,
    },
    {
      Icon: FaMotorcycle,
      content: "Partner",
      active: +localStorage.navManager === 2,
    },
    {
      Icon: FaUserAlt,
      content: "Customer",
      active: +localStorage.navManager === 3,
    },
    {
      Icon: RiCoupon3Line,
      content: "Voucher",
      active: +localStorage.navManager === 4,
    },
  ]);
  const [orderId, setOrderId] = useState("");
  const [open, setOpen] = useState(true);
  const [order, setOrder] = useState(null);
  const orderFindFail = () =>
    toast.error(
      <div>
        <span style={{ fontSize: "2.5rem" }}>🤚</span>Không tìm thấy đơn hàng
      </div>
    );

  const changeActive = (index) => {
    const bar = menubar.map((item, i) => {
      if (i === index) item.active = true;
      else item.active = false;
      return item;
    });
    setMenubar(bar);
    setSidebar(index + 1);
    localStorage.navManager = index;
  };

  const findOrder = async () => {
    const order = await orderApi.getOrderById(orderId);
    if (order.status != 400) {
      setOpen(true);
      setOrder(order);
    } else orderFindFail();
  };
  return (
    <div className="side-bar">
      <div className="create">
        <div className="search-order">
          <ToastContainer />
          <FcSearch
            style={{ fontSize: "3rem", cursor: "pointer" }}
            onClick={() => findOrder()}
          />
          <input
            type="text"
            placeholder="ID order"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          {order ? (
            <Modal
              open={open}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              style={StylesModal}
              onClose={() => setOpen(false)}
            >
              <OrderDetail order={order} />
            </Modal>
          ) : (
            ""
          )}
        </div>
      </div>
      {menubar.map((item, index) => (
        <SidebarElement
          item={item}
          key={index}
          index={index}
          changeActive={changeActive}
          setSidebar={setSidebar}
        />
      ))}
    </div>
  );
}

export default Sidebar;

function OrderDetail({ order }) {
  const { userOrderId: user, merchantId: merchant, deliverId: partner } = order;
  return (
    <div className="received-order-detail">
      <div className="detail-head">
        <div className="detail-head__link">Thông tin User</div>
      </div>

      <div className="detail-customer">
        <div
          className="customer-avatar"
          style={{ backgroundImage: `url(${user.info.avt})` }}
        ></div>
        <div className="customer-info">
          <div className="wrap-info-line">
            <div className="wrap-info">
              <div class="title-info">Username </div>
              <div className="info-render">
                {user.username}{" "}
                <RiFileCopyLine
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: "-2rem",
                  }}
                  onClick={() => document.execCommand("copy")}
                />
              </div>
            </div>
            <div className="wrap-info">
              <div class="title-info">Số điện thoại</div>
              <div className="info-render">
                {user.info.phone}
                <RiFileCopyLine
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: "-2rem",
                  }}
                  onClick={() => document.execCommand("copy")}
                />
              </div>
            </div>
          </div>
          <div className="wrap-info-line">
            <div className="wrap-info">
              <div class="title-info">Họ và tên</div>
              <div className="info-render">{user.info.name}</div>
            </div>
            <div className="wrap-info">
              <div class="title-info">Địa chỉ giao</div>
              <div className="info-render">{order.detail.location.address}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-head">
        <div className="detail-head__link">Thông tin Partner</div>
      </div>
      {partner ? (
        <div className="detail-partner">
          <div
            className="partner-avatar"
            style={{ backgroundImage: `url(${partner.avt})` }}
          ></div>
          <div className="partner-info">
            <div className="wrap-info-line">
              <div className="wrap-info">
                <div class="title-info">Email</div>
                <div className="info-render">
                  {partner.email}
                  <RiFileCopyLine
                    style={{
                      position: "absolute",
                      cursor: "pointer",
                      top: 0,
                      left: "-2rem",
                    }}
                    onClick={() => document.execCommand("copy")}
                  />
                </div>
              </div>
              <div className="wrap-info">
                <div class="title-info">Số điện thoại</div>
                <div className="info-render">{partner.phone}</div>
              </div>
            </div>
            <div className="wrap-info-line">
              <div className="wrap-info">
                <div class="title-info">Họ và tên</div>
                <div className="info-render">{partner.name}</div>
              </div>
              <div className="wrap-info">
                <div class="title-info">Địa chỉ</div>
                <div className="info-render">{partner.location}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="detail-head">
        <div className="detail-head__link">Thông tin Merchant</div>
      </div>
      {merchant ? (
        <div className="detail-partner">
          <div className="partner-avatar"></div>
          <div className="partner-info">
            <div className="wrap-info-line">
              <div className="wrap-info">
                <div class="title-info">Email</div>
                <div className="info-render">
                  {merchant.email}
                  <RiFileCopyLine
                    style={{
                      position: "absolute",
                      cursor: "pointer",
                      top: 0,
                      left: "-2rem",
                    }}
                    onClick={() => document.execCommand("copy")}
                  />
                </div>
              </div>
              <div className="wrap-info">
                <div class="title-info">Số điện thoại shop</div>
                <div className="info-render">{merchant.phone}</div>
              </div>
            </div>
            <div className="wrap-info-line">
              <div className="wrap-info">
                <div class="title-info">Tên shop</div>
                <div className="info-render">{merchant.name}</div>
              </div>
              <div className="wrap-info">
                <div class="title-info">Địa chỉ </div>
                <div className="info-render">{merchant.location.address}</div>
              </div>
            </div>
            <div className="wrap-info-line">
              <div className="wrap-info">
                <div class="title-info">Người đại diện</div>
                <div className="info-render">
                  {merchant.representative.name}
                </div>
              </div>
              <div className="wrap-info">
                <div class="title-info">CMND</div>
                <div className="info-render">
                  {merchant.representative.number}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="detail-head">
        <div className="detail-head__link">Thông tin Đơn hàng</div>
      </div>
      <div className="detail-note">
        <span>Ghi chú khách hàng:</span>
        <span>{order.note}</span>
      </div>
      <div className="detail-dishes">
        <div className="detail-dishes__list">
          {order.detail.foods.map((food) => (
            <div className="detail-dishes__item">
              <div className="item-quantity">{food.quantity} x</div>
              <div className="item-name">{food.name}</div>
              <div className="item-total">{food.total}</div>
            </div>
          ))}
        </div>

        <div className="detail-dishes__count">
          <div className="count-cost">
            <span>Tổng tiền món (giá gốc)</span>
            <span>
              {validatePrice(order.detail.foods.reduce(sumTotal, 0))} đ
            </span>
          </div>
          <div className="count-discount">
            <span>Phí ship</span>
            <span>{validatePrice(order.detail.fee)} đ</span>
          </div>
          <div className="count-commission" style={{ color: "green" }}>
            <span>Tiền hoa hồng({merchant.deduct}%)</span>
            <span>
              {validatePrice(
                (order.detail.foods.reduce(sumTotal, 0) *
                  parseInt(merchant.deduct)) /
                  100
              )}{" "}
              đ
            </span>
          </div>

          <div className="count-discount" style={{ color: "green" }}>
            <span>Chiết khấu ship (10%)</span>
            <span>{validatePrice((order.detail.fee * 10) / 100)} đ</span>
          </div>
          <div className="count-discount" style={{ color: "red" }}>
            <span>Giảm giá</span>
            <span>{validatePrice(order.detail.discount)} đ</span>
          </div>
          <div
            className="count-discount"
            style={{
              color: "green",
              borderTop: "1px solid #bbb",
              fontWeight: "bold",
            }}
          >
            <span>Thu</span>
            <span>
              {validatePrice(
                (order.detail.fee * 10) / 100 +
                  (order.detail.foods.reduce(sumTotal, 0) *
                    parseInt(merchant.deduct)) /
                    100
              )}{" "}
              đ
            </span>
          </div>

          <div className="count-total" style={{ borderTop: "1px solid gray" }}>
            <span>Tổng tiền Merchant nhận (3 món)</span>
            <span>
              {validatePrice(
                order.detail.total -
                  (order.detail.foods.reduce(sumTotal, 0) *
                    parseInt(merchant.deduct)) /
                    100
              )}{" "}
              đ
            </span>
          </div>
          <div className="count-total" style={{ borderTop: "1px solid gray" }}>
            <span>Tổng tiền Partner nhận</span>
            <span>
              {validatePrice(order.detail.fee - (order.detail.fee * 10) / 100)}{" "}
              đ
            </span>
          </div>
        </div>
      </div>

      <div className="detail-bot">
        <div className="detail-bot__id">
          <span>Mã Đơn Hàng</span>
          <span>{order._id}</span>
        </div>
        <div className="detail-bot__time">
          <span>Thời gian đặt đơn</span>
          <span>
            {formatDatetimeToString(new Date(parseInt(order.timeOrder)))}
          </span>
        </div>
        <div className="detail-bot__space">
          <span>Khoảng cách</span>
          <span>{order.distance}km</span>
        </div>
      </div>
    </div>
  );
}
