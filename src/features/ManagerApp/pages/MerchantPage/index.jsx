import merchantApi from "api/merchantApi";
import { formatDatetimeToString, validatePrice } from "func";
import React, { useEffect, useState } from "react";
import { AiFillProfile, AiFillShop } from "react-icons/ai";
import { RiAccountPinCircleFill, RiTimeFill } from "react-icons/ri";
import { useParams } from "react-router";
import area from "assets/data/districtName";
import loading from "assets/image/icons/loading.png";
import "./style.scss";
import TogglePickTime from "features/ManagerApp/components/TogglePickTime2";

function MerchantPage() {
  let { id } = useParams();
  const [merchant, setMerchant] = useState(null);
  const [taskBar, setTaskBar] = useState(1);
  const [openTime, setOpenTime] = useState();

  useEffect(() => {
    const getMerchantById = async () => {
      const res = await merchantApi.get(id);
      setMerchant(res);

      const time = res.openTime;
      delete time["_id"];
      setOpenTime(time);
    };

    getMerchantById();
  }, []);

  return (
    <div className="grid__full-width">
      <div className="manager-merchant-page">
        <div className="row">
          <div className="col l-2" style={{ height: "150vh" }}>
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
                <Categories merchant={merchant} />
              ) : (
                <OpenTime newtime={openTime} />
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
        <div className="row">
          <div className="col l-6">
            <div className="task-shop__item">
              <div className="item-title">Tên người đại diện</div>
              <div className="item-content">{merchant.representative.name}</div>
            </div>
          </div>
          <div className="col l-6">
            <div className="task-shop__item">
              <div className="item-title">Địa chỉ</div>
              <div className="item-content">
                {merchant.representative.address}
              </div>
            </div>
          </div>
          <div className="col l-6">
            <div className="task-shop__item">
              <div className="item-title">Số điện thoại</div>
              <div className="item-content">
                {merchant.representative.phone}
              </div>
            </div>
          </div>
          <div className="col l-6">
            <div className="task-shop__item">
              <div className="item-title">CCCD</div>
              <div className="item-content">
                {merchant.representative.identity.number}
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

function Shop({ merchant }) {
  return (
    <div className="task-shop">
      <div className="row">
        <div className="col l-6">
          <div className="task-shop__item ">
            <div className="item-title">Tên cửa hàng</div>
            <div className="item-content">{merchant.name}</div>
          </div>
        </div>
        <div className="col l-6">
          <div className="task-shop__item ">
            <div className="item-title">Trạng thái</div>
            <div className="item-content">
              {merchant.status === "close" ? "Đóng cửa" : "Mở cửa"}
            </div>
          </div>
        </div>
        <div className="col l-6">
          <div className="task-shop__item ">
            <div className="item-title">Số điện thoại cửa hàng</div>
            <div className="item-content">{merchant.phone}</div>
          </div>
        </div>
        <div className="col l-6">
          <div className="task-shop__item ">
            <div className="item-title">Email</div>
            <div className="item-content">{merchant.email}</div>
          </div>
        </div>
        <div className="col l-6">
          <div className="task-shop__item ">
            <div className="item-title">Địa chỉ</div>
            <div className="item-content">{merchant.location.address}</div>
          </div>
        </div>
        <div className="col l-6">
          <div className="task-shop__item ">
            <div className="item-title">Khu vực</div>
            <div className="item-content">
              {area.find((a) => merchant.location.district === a.key).value}
            </div>
          </div>
        </div>
        <div className="col l-6">
          <div className="task-shop__item ">
            <div className="item-title">Triết khấu</div>
            <div className="item-content">{merchant.deduct} %</div>
          </div>
        </div>
        <div className="col l-6">
          <div className="task-shop__item ">
            <div className="item-title">Thời gian đăng ký</div>
            <div className="item-content">
              {formatDatetimeToString(new Date(parseInt(merchant.dateCreate)))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Categories({ merchant }) {
  const [dishes, setDishes] = useState([]);

  const getDishes = () => {
    let listDishes = merchant.category.reduce(
      (arr, curr) => arr.concat(curr.foods),
      []
    );
    setDishes(listDishes);
  };

  useEffect(() => {
    getDishes();
  }, []);
  console.log(merchant.category);

  return (
    <div className="task-shop">
      {merchant ? (
        <div className="row">
          {dishes.map((dish, idx) => (
            <div className="col l-2-4" key={idx}>
              <div className="task-shop__dish">
                <img src={dish.img === "" ? loading : dish.img} alt="" />
                <div className="dish-content">{dish.name}</div>
                <div className="dish-content">
                  {validatePrice(dish.price)} đ
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function OpenTime({ newtime }) {
  const [time, setTime] = useState(newtime);

  return (
    <div className="task-shop">
      {time ? (
        <div className="time-wrap">
          <div className="time-wrap__list" style={{ marginRight: "10rem" }}>
            {time &&
              Object.keys(time).map((item, id) => (
                <TogglePickTime
                  item={item}
                  openTime={time}
                  setOpenTime={setTime}
                  key={id}
                />
              ))}
          </div>
        </div>
      ) : (
        ""
      )}

      {/* <div className="main-time__button">
        <button className="button-time">Cập nhật thời gian mở cửa</button>
      </div> */}
    </div>
  );
}

export default MerchantPage;
