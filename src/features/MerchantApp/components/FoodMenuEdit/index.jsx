import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { BsChevronLeft } from "react-icons/bs";
import loading from "assets/image/icons/loading.png";
import camera from "assets/image/icons/photo-camera.png";
import merchantApi from "api/merchantApi";
import "./style.scss";
import axios from "axios";

export default function FoodMenuEdit() {
  const history = useHistory();
  const location = useLocation();
  const infoFood = location.state.foodData;
  const category = location.state.catList;
  const currentCatId = location.state.currentCatId;
  const { register, handleSubmit, errors } = useForm();
  const [status, setStatus] = useState(infoFood.status);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");

  const getNameCatOfFood = () => {
    return category.find((cat) => cat.foods.includes(infoFood));
  };

  const catOfFood = getNameCatOfFood();

  const submitFormEdit = async (newData) => {
    let imgFood = infoFood.img;

    if (!newData.name || !newData.price) {
      alert("Bạn chưa điền đủ thông tin!");
      return;
    }
    if (newData.foodImg.length === 0 && infoFood.img === "") {
      alert("Bạn chưa chọn ảnh");
      return;
    }
    if (newData.foodImg.length === 1) {
      const formData = new FormData();
      const file = newData.foodImg;
      formData.append("file", file[0]);
      formData.append("upload_preset", "zjd6i9ar");

      imgFood = await axios
        .post("https://api.cloudinary.com/v1_1/soosoo/image/upload", formData)
        .then((res) => {
          return res.data.secure_url;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const data = {
      ...newData,
      _id: infoFood._id,
      status: status,
      img: imgFood,
    };
    let newDetail = { ...data, catIdCurrent: catOfFood._id };
    const res = await merchantApi.foodEdit(newDetail);

    if (res.status !== 400) {
      alert("Chỉnh sửa món ăn thành công");
      history.goBack();
    } else {
      alert("Chỉnh sửa món ăn không thành công");
    }
  };

  const handleChangeStatus = (e) => {
    setStatus(!status);
  };

  const resetInput = (e) => {
    e.target.value = "";
  };

  const fillInput = (e, value) => {
    e.target.value = value;
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

      <div className="edit-form">
        <form onSubmit={handleSubmit(submitFormEdit)}>
          <div
            className="edit-img"
            style={{
              backgroundImage: `url(${
                infoFood.img === "" ? loading : infoFood.img
              })`,
            }}
          >
            <label htmlFor="file-input-image">
              <img src={camera} alt="img-food" />
            </label>
            <input
              id="file-input-image"
              type="file"
              className="edit-img__input"
              hidden
              {...register("foodImg")}
            />
          </div>
          <div className="edit-form__group">
            <label htmlFor="nameFood">Tên Món</label>
            <input
              type="text"
              name="name"
              defaultValue={infoFood.name}
              {...register("name")}
              onFocus={(e) => resetInput(e)}
              onChange={(e) => setFoodName(e.target.value)}
              onBlur={(e) => fillInput(e, foodName)}
            />
          </div>

          <div className="edit-form__group">
            <label htmlFor="priceFood">Giá</label>
            <input
              type="number"
              name="price"
              defaultValue={infoFood.price}
              {...register("price")}
              onFocus={(e) => resetInput(e)}
              onChange={(e) => setFoodPrice(e.target.value)}
              onBlur={(e) => fillInput(e, foodPrice)}
            />
          </div>

          <div className="edit-form__group">
            <label htmlFor="catFood">Nhóm</label>
            <select
              name="catFood"
              {...register("catIdNew")}
              defaultValue={currentCatId}
            >
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
