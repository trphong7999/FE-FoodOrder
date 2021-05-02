import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { BsChevronLeft } from "react-icons/bs";
import loading from "assets/image/icons/loading.png";
import "./style.scss";
import { useForm } from "react-hook-form";

export default function FoodMenuEdit() {
  const history = useHistory();
  const location = useLocation();
  const infoFood = location.state.foodDetail;
  const category = location.state.catList;
  console.log(location.state);
  const { register, handleSubmit, errors } = useForm();

  const submitFormEdit = (data) => {
    console.log(data);
  };

  return (
    <div className="food-menu-edit">
      <div className="edit-head">
        <div
          onClick={() => {
            history.goBack();
          }}
          className="edit-head__link"
        >
          <BsChevronLeft className="edit-head__icon" />
          <span>Sửa món</span>
        </div>
      </div>

      <div
        className="edit-img"
        style={{ backgroundImage: `url(${loading})` }}
      ></div>

      <div className="edit-form">
        <form onSubmit={handleSubmit(submitFormEdit)}>
          <div className="edit-form__group">
            <label htmlFor="nameFood">Tên Món</label>
            <input
              type="text"
              name="nameFood"
              defaultValue={infoFood.name}
              {...register("nameFood")}
            />
          </div>

          <div className="edit-form__group">
            <label htmlFor="priceFood">Giá</label>
            <input
              type="text"
              name="priceFood"
              defaultValue={infoFood.price}
              {...register("priceFood")}
            />
          </div>

          <div className="edit-form__group">
            <label htmlFor="catFood">Nhóm</label>
            <select name="catFood" {...register("catFood")}>
              {category.map((val, idx) => (
                <option key={val.name} value={val.name}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>

          <div className="edit-form__group">
            <label htmlFor="statusFood">Trạng thái</label>

            <label className="switch">
              <input
                type="checkbox"
                name="statusFood"
                {...register("statusFood")}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="edit-form__action">
            <input type="submit" value="Lưu" />
          </div>
        </form>
      </div>
    </div>
  );
}
