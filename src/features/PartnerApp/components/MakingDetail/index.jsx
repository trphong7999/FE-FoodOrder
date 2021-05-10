import React, { useState } from "react";
import { AiOutlineArrowLeft, AiFillPhone, AiFillWechat } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { IoWallet } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import avtDefault from "assets/image/avartar/avt-default.jpg";

import "./style.scss";
import { validatePrice } from "func";
import { useHistory } from "react-router";

export default function MakingDetail() {
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [pickUpStatus, setPickUpStatus] = useState(true);
  const [data, setData] = useState([
    {
      name: "Ăn vặt thời đại",
      address: "20 Nguyễn Văn Hới, Cát Bi, Hải An",
      totalAmount: 81900,
      time: "09:20",
      type: 0,
    },
    {
      name: "wind6579",
      address: "193 Văn Cao, Đằng Giang, Ngô Quyền",
      totalAmount: 101900,
      time: "09:50",
      type: 1,
    },
  ]);

  const handleChangeShowHead = () => {
    setShow(!show);
  };

  const handleChangePickUpStatus = (data) => {
    setPickUpStatus(data);
  };

  return (
    <div className="grid">
      <div
        className="making-detail"
        style={
          pickUpStatus
            ? { "--height-action": "118px" }
            : { "--height-action": "86px" }
        }
      >
        <div className="making-detail__head">
          <div className="making-detail__head-top">
            <div
              className="head-back"
              onClick={() => {
                history.goBack();
              }}
            >
              <AiOutlineArrowLeft />
            </div>
            <div
              className={`head-shop ${
                show === true ? "head-item--active" : ""
              }`}
              onClick={handleChangeShowHead}
            >
              <div className="head-shop__title">
                <span>Delivery</span>
                <BsDot className="head-shop__title-icon" />
                <span>Quán</span>
              </div>
              <div className="head-shop__code">06345-63454234</div>
            </div>
            <div
              className={`head-customer ${
                show === false ? "head-item--active" : ""
              }`}
              onClick={handleChangeShowHead}
            >
              Khách
            </div>
          </div>

          <div className="making-detail__head-bot">
            {show === true ? (
              <Infomation data={data[0]} />
            ) : (
              <Infomation data={data[1]} />
            )}
          </div>
        </div>

        <div className="making-detail__content">
          <div className="content-main">
            {pickUpStatus ? <ContentOrder /> : <DeliveryFinish />}
          </div>
        </div>

        <div className="making-detail__action">
          {pickUpStatus ? (
            <MakingAction pickUpCallback={handleChangePickUpStatus} />
          ) : (
            <FinisedAction />
          )}
        </div>
      </div>
    </div>
  );
}

function MakingAction({ pickUpCallback }) {
  const sendDataPickUpStatus = (data) => {
    pickUpCallback(data);
  };

  return (
    <div className="action-pending">
      <div className="action-row">
        <div className="action-row__item">
          <AiFillPhone className="action-row__item-icon" />
          Gọi
        </div>
        <div className="action-row__item">
          <AiFillWechat className="action-row__item-icon" />
          Chat
        </div>
        <div className="action-row__item">
          <TiDelete className="action-row__item-icon" />
          Hủy
        </div>
      </div>
      <div className="action-row">
        <div className="action-row__itemx2">
          <div
            style={{ "&::before": { content: "30'" } }}
            onClick={() => sendDataPickUpStatus(false)}
          >
            Đã lấy hàng
          </div>
        </div>
        <div className="action-row__item">
          <IoWallet className="action-row__item-icon" />
          Ví
        </div>
      </div>
    </div>
  );
}

function FinisedAction() {
  return (
    <div className="action-finised">
      <span>Vui lòng chuyển trạng thái đơn hàng</span>
      <button className="finised-button">Đã giao xong</button>
    </div>
  );
}

function Infomation({ data }) {
  return (
    <div className="head-bot">
      <div className="head-bot__name">{data.name}</div>
      <div className="head-bot__address">{data.address}</div>
      <div className="head-bot__tool">
        <div className="tool-item">
          {data.type === 0 ? "Trả" : "Thu"}
          <span className="tool-item__price">
            {validatePrice(data.totalAmount)}đ
          </span>
        </div>
        <BsDot />
        <div className="tool-item">
          {data.type === 0 ? "Lấy" : "Giao"}
          <span className="tool-item__time">{data.time}</span>
        </div>
        <BsDot />
        <div className="tool-item">
          {data.type === 0 ? "Quán tools" : "ASAP"}
        </div>
      </div>
    </div>
  );
}

function ContentOrder() {
  return (
    <div className="content-main__order">
      <div className="order-status">
        <span>Trạng thái</span>
        <BsDot />
        <span>Đã nhận đơn hàng</span>
      </div>
      <div className="order-note">
        <div className="order-note__avatar">
          <img src={avtDefault} alt="" />
        </div>
        <div className="order-note__text">
          <span>Khách ghi chú</span>
          <span>bạn xin thêm dùm giá với hành ạ</span>
        </div>
      </div>

      <div className="order-detail">
        <div className="order-detail__head">
          <span>Chi tiết đơn hàng</span>
          <span>Số lượng: 3</span>
        </div>
        <div className="order-detail__body">
          <table>
            <thead>
              <tr>
                <th style={{ width: "60%" }}>#Tên món</th>
                <th style={{ width: "10%" }}>SL</th>
                <th style={{ width: "30%" }}>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01. Phở thập cẩm</td>
                <td>1</td>
                <td>47.000đ</td>
              </tr>
              <tr>
                <td>02. Phở thập bò tái</td>
                <td>1</td>
                <td>47.000đ</td>
              </tr>
              <tr>
                <td>03. Phở thập bò tái</td>
                <td>1</td>
                <td>47.000đ</td>
              </tr>
              <tr>
                <td>04. Phở thập bò tái</td>
                <td>1</td>
                <td>47.000đ</td>
              </tr>
              <tr>
                <td>05. Phở thập bò tái</td>
                <td>1</td>
                <td>47.000đ</td>
              </tr>
              <tr>
                <td>06. Phở thập bò tái</td>
                <td>1</td>
                <td>47.000đ</td>
              </tr>
              <tr>
                <td>07. Phở thập bò tái</td>
                <td>1</td>
                <td>47.000đ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="order-bill">
        <DeliveryPending />
      </div>
    </div>
  );
}

function DeliveryPending() {
  return (
    <div className="delivery-pending">
      <div className="delivery-mission">
        <ul className="delivery-mission__list">
          <li className="list-item">
            <span>Hóa đơn quán</span>
          </li>
          <li className="list-item">
            <span>Tổng đơn hàng</span>
            <span>126,000đ</span>
          </li>
          <li className="list-item">
            <span>Quán giảm giá</span>
            <span>-25,200đ</span>
          </li>
          <li className="list-item">
            <span>Quán phụ thu</span>
            <span>0đ</span>
          </li>
          <li className="list-item">
            <span>Tổng tiền trả cho quán</span>
            <span className="list-item--red">81,900đ</span>
          </li>
        </ul>
        <div className="delivery-mission__title">
          <RiMoneyDollarCircleFill className="delivery-mission__title-icon" />
          Thanh toán ngay khi lấy hàng
        </div>
      </div>

      <div className="delivery-mission">
        <ul className="delivery-mission__list">
          <li className="list-item">
            <span>Hóa đơn khách</span>
          </li>
          <li className="list-item">
            <span>Phí dịch vụ</span>
            <span>0đ</span>
          </li>
          <li className="list-item">
            <span>Ship</span>
            <span>15,000đ</span>
          </li>
          <li className="list-item">
            <span>Giảm giá</span>
            <span>-37,800đ</span>
          </li>
          <li className="list-item">
            <span>Tổng tiền thu khách</span>
            <span className="list-item--green">103,200đ</span>
          </li>
        </ul>
        <div className="delivery-mission__title">
          <RiMoneyDollarCircleFill className="delivery-mission__title-icon" />
          Thanh toán tiền mặt
        </div>
      </div>
    </div>
  );
}

function DeliveryFinish() {
  return (
    <div className="content-main__delivery">
      <div className="delivery-finished">
        <div className="delivery-finished__head">
          <div>Chi tiết đơn hàng</div>
          <div>Số lượng: 3</div>
        </div>
        <div className="delivery-finished__content">
          <table>
            <thead>
              <tr>
                <th>#Tên món</th>
                <th>SL</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01. Phở thập cẩm</td>
                <td>1</td>
                <td>{validatePrice(47000)}đ</td>
              </tr>
              <tr>
                <td>02. Phở bò tái</td>
                <td>1</td>
                <td>{validatePrice(47000)}đ</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="delivery-finished__bot">
          <div>
            <span>Tổng đơn hàng</span>
            <span>157,000đ</span>
          </div>
          <div>
            <span>Quán giảm giá</span>
            <span>-18,800đ</span>
          </div>
          <div>
            <span>Quán phụ thu</span>
            <span>0đ</span>
          </div>
          <div>
            <span>Tổng tiền thu</span>
            <span>138,200đ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
