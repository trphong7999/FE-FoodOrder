import React, { useState } from "react";
import "./style.scss";
import { HiLightBulb } from "react-icons/hi";
import { AiFillPushpin } from "react-icons/ai";
import { IoWallet } from "react-icons/io5";
import { Link, useRouteMatch } from "react-router-dom";
import NavBar from "../NavBar";
import TabMenu from "../TabMenu";

function ReceivedOrder() {
  const match = useRouteMatch();
  const [listConfirm, setListConfirm] = useState([
    { id: 0, title: "Xác nhận bởi cửa hàng", active: true },
    { id: 1, title: "Đang chuẩn bị", active: false },
    { id: 2, title: "Chờ đến lấy", active: false },
  ]);

  const handleActiveReceivedTabList = (index) => {
    const newList = listConfirm;
    listConfirm.map((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setListConfirm(newList);
    console.log(index);
    console.log(newList);
  };

  return (
    <div className="grid">
      <NavBar />
      <TabMenu />
      <div className="received-order">
        <div className="received-tab">
          <ul className="received-tab__list">
            {listConfirm.map((item, index) => (
              <li
                key={item.id}
                index={index}
                className={
                  item.active === false
                    ? "received-tab__list-item"
                    : "received-tab__list-item received-tab__list-item--active"
                }
                onClick={() => {
                  handleActiveReceivedTabList(index);
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="received-note">
          <div className="note-wrap">
            <div className="note-icon">
              <HiLightBulb className="icon" />
            </div>
            <div className="note-content">
              Vui lòng xem chi tiết đơn hàng để xác nhận đơn hàng. Nếu không,
              đơn có thể bị khách hủy
            </div>
          </div>
        </div>

        <div className="received-list">
          <Link to={`${match.url}/1`}>
            <div className="list-item">
              <div className="list-item__top">
                <div className="list-item__top-number">
                  <div>23</div>
                  <div>#0229</div>
                </div>
                <AiFillPushpin className="list-item__top-icon" />
              </div>
              <div className="list-item__time">
                <span>Giao hàng lúc 23:10 (trong - 17h 12m)</span>
              </div>
              <div className="list-item__customer">
                <span>Huynh Nhi</span>
              </div>
              <div className="list-item__status-driver">
                <span>Trạng thái:</span>
                <span>Đang chỉ định tài xế</span>
              </div>
              <div className="list-item__bot">
                <span>3 món</span>
                <div className="list-item__bot-total">
                  <IoWallet className="list-item__bot-icon" />
                  <span>49.700 đ</span>
                </div>
              </div>
            </div>
          </Link>

          <div className="list-item">
            <div className="list-item__top">
              <div className="list-item__top-number">
                <div>23</div>
                <div>#0229</div>
              </div>
              <AiFillPushpin className="list-item__top-icon" />
            </div>

            <div className="list-item__time">
              <span>Giao hàng lúc 23:10 (trong - 17h 12m)</span>
            </div>
            <div className="list-item__customer">
              <span>Huynh Nhi</span>
            </div>
            <div className="list-item__status-driver">
              <span>Trạng thái:</span>
              <span>Đang chỉ định tài xế</span>
            </div>

            <div className="list-item__bot">
              <span>3 món</span>
              <div className="list-item__bot-total">
                <IoWallet className="list-item__bot-icon" />
                <span>49.700 đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceivedOrder;
