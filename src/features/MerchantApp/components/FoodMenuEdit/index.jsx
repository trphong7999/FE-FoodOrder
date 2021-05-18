import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { BsChevronLeft } from "react-icons/bs";
import loading from "assets/image/icons/loading.png";
import "./style.scss";
import { useForm } from "react-hook-form";
import merchantApi from "api/merchantApi";

export default function FoodMenuEdit() {
  const history = useHistory();
  const location = useLocation();
  const infoFood = location.state.foodData;
  const category = location.state.catList;
  const { register, handleSubmit, errors } = useForm();
  const [status, setStatus] = useState(infoFood.status);

  const getNameCatOfFood = () => {
    return category.find((cat) => cat.foods.includes(infoFood));
  };

  const catOfFood = getNameCatOfFood();

  const submitFormEdit = async (newData) => {
    const data = { ...newData, _id: infoFood._id, status: status };
    let newDetail = { ...data, catIdCurrent: catOfFood._id };
    await merchantApi.foodEdit(newDetail);

    alert("Chỉnh sửa món ăn thành công");
    history.goBack();
  };

  const handleChangeStatus = (e) => {
    setStatus(!status);
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
        style={{
          backgroundImage: `url(${
            infoFood.img === "" ? loading : infoFood.img
          })`,
        }}
      ></div>

      <div className="edit-form">
        <form onSubmit={handleSubmit(submitFormEdit)}>
          <div className="edit-form__group">
            <label htmlFor="nameFood">Tên Món</label>
            <input
              type="text"
              name="name"
              defaultValue={infoFood.name}
              {...register("name")}
            />
          </div>

          <div className="edit-form__group">
            <label htmlFor="priceFood">Giá</label>
            <input
              type="text"
              name="price"
              defaultValue={infoFood.price}
              {...register("price")}
            />
          </div>

          <div className="edit-form__group">
            <label htmlFor="catFood">Nhóm</label>
            <select name="catFood" {...register("catIdNew")}>
              {category.map((val, idx) => (
                <option key={idx} value={val._id}>
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
                name="status"
                {...register("status")}
                checked={status}
                onClick={handleChangeStatus}
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
