import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { BsThreeDots } from "react-icons/bs";
import mi1 from "assets/image/dishes/mi1.jpg";
import "./style.scss";
import { validatePrice } from "func";
import axios from "axios";
import { get } from "react-hook-form";
import merchantApi from "api/merchantApi";
import { set } from "lodash-es";

export default function FoodMenu({ categories }) {
  const merchantId = sessionStorage.merchantId;
  const [category, setCategory] = useState([]);
  const [menu, setMenu] = useState([]);

  const noMenu = !menu || (menu && menu.length === 0);

  const fetchMerchant = async () => {
    try {
      const res = await merchantApi.get(merchantId);
      if (res.status !== 400) {
        setCategory(res.category);
      }
      const list = res.category.reduce(
        (acc, curr) => acc.concat(curr.foods),
        []
      );
      setMenu(list);
    } catch (error) {
      console.log("Failed to fetch merchant info: ", error);
    }
  };

  useEffect(() => {
    fetchMerchant();
  }, []);

  return (
    <div className="grid">
      <NavBar />

      <div className="food-menu">
        <div className="food-menu__head">
          <select className="top-select">
            <option value="">Nhóm</option>
            <option value="all">Tất cả</option>
            {category.map((item, index) => (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            ))}
          </select>
          <select className="top-select">
            <option value="">Trạng thái</option>
            <option value="0">Tất cả</option>
            <option value="1">Còn</option>
            <option value="2">Hết</option>
          </select>
        </div>

        <div className="food-menu__body">
          <div className="body-title">Thực đơn ({menu.length})</div>
          <div className="body-list">
            <h2 style={menu ? { display: "none" } : { display: "block" }}>
              Hiện tại không có món ăn nào
            </h2>
            {menu.map((item, index) => (
              <div className="body-list__item" key={index}>
                <div
                  className="item-img"
                  style={{ backgroundImage: `url(${mi1})` }}
                ></div>
                <div className="item-content">
                  <div className="item-content__name">{item.name}</div>
                  <div className="item-content__price">
                    {validatePrice(item.price)} <span>đ</span>
                  </div>
                </div>
                <div className="item-action">
                  <BsThreeDots className="item-action__icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
