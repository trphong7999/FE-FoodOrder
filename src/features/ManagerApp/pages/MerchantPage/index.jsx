import merchantApi from "api/merchantApi";
import { formatDatetimeToString } from "func";
import React, { useEffect, useState } from "react";
import { AiFillProfile, AiFillShop } from "react-icons/ai";
import { RiAccountPinCircleFill, RiTimeFill } from "react-icons/ri";
import { useParams } from "react-router";
import area from "assets/data/districtName";
import "./style.scss";

function MerchantPage() {
  let { id } = useParams();
  const [merchant, setMerchant] = useState(null);
  const [taskBar, setTaskBar] = useState(1);

  useEffect(() => {
    console.log(id);
    const getMerchantById = async () => {
      const res = await merchantApi.get(id);
      setMerchant(res);
      console.log(res);
    };
    getMerchantById();
  }, []);

  return (
    <div className="manager-merchant-page">
      <div className="grid__full-width">
        <div className="row">
          <div className="col l-2">
            <div className="task-bar">
              <div
                className="task-bar__item"
                onClick={() => {
                  setTaskBar(1);
                }}
              >
                <RiAccountPinCircleFill className="task-bar__icon" />
                Thông tin đại diện
              </div>
              <div
                className="task-bar__item"
                onClick={() => {
                  setTaskBar(2);
                }}
              >
                <AiFillShop className="task-bar__icon" />
                Thông tin cửa hàng
              </div>
              <div
                className="task-bar__item"
                onClick={() => {
                  setTaskBar(3);
                }}
              >
                <AiFillProfile className="task-bar__icon" />
                Danh mục
              </div>
              <div
                className="task-bar__item"
                onClick={() => {
                  setTaskBar(4);
                }}
              >
                <RiTimeFill className="task-bar__icon" />
                Thời gian mở cửa
              </div>
            </div>
          </div>
          <div className="col l-10">
            <div className="content-task">
              {taskBar === 1 ? (
                <Represent merchant={merchant} />
              ) : taskBar === 2 ? (
                <Shop merchant={merchant} />
              ) : taskBar === 3 ? (
                "danh mục"
              ) : (
                "thời gian"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Represent({ merchant }) {
  return (
    <div className="task-shop">
      {merchant ? (
        <div>
          <div className="task-shop__item">
            <div className="item-title">Tên người đại diện</div>
            <div className="item-content">{merchant.representative.name}</div>
          </div>
          <div className="task-shop__item">
            <div className="item-title">Địa chỉ</div>
            <div className="item-content">
              {merchant.representative.address}
            </div>
          </div>
          <div className="task-shop__item">
            <div className="item-title">Số điện thoại</div>
            <div className="item-content">{merchant.representative.phone}</div>
          </div>
          <div className="task-shop__item">
            <div className="item-title">CCCD</div>
            <div className="item-content">
              {merchant.representative.identity.number}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function Shop({ merchant }) {
  return (
    <div className="task-shop">
      <div className="task-shop__item">
        <div className="item-title">Tên cửa hàng</div>
        <div className="item-content">{merchant.name}</div>
      </div>
      <div className="task-shop__item">
        <div className="item-title">Trạng thái</div>
        <div className="item-content">
          {merchant.status === "close" ? "Đóng cửa" : "Mở cửa"}
        </div>
      </div>
      <div className="task-shop__item">
        <div className="item-title">Số điện thoại</div>
        <div className="item-content">{merchant.phone}</div>
      </div>
      <div className="task-shop__item">
        <div className="item-title">Email</div>
        <div className="item-content">{merchant.email}</div>
      </div>
      <div className="task-shop__item">
        <div className="item-title">Địa chỉ</div>
        <div className="item-content">{merchant.location.address}</div>
      </div>
      <div className="task-shop__item">
        <div className="item-title">Khu vực</div>
        <div className="item-content">
          {area.find((a) => merchant.deduct === a.key).value}
        </div>
      </div>
      <div className="task-shop__item">
        <div className="item-title">Thời gian đăng ký</div>
        <div className="item-content">
          {formatDatetimeToString(new Date(parseInt(merchant.dateCreate)))}
        </div>
      </div>
    </div>
  );
}

export default MerchantPage;
