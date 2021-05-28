import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { BsThreeDots } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import mi1 from "assets/image/dishes/mi1.jpg";
import "./style.scss";
import { validatePrice } from "func";
import merchantApi from "api/merchantApi";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";
import loading from "assets/image/icons/loading.png";
import axios from "axios";
import { Image } from "cloudinary-react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "6px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 2, 2),
    width: "96vw",
  },
}));

export default function FoodMenu() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [menu, setMenu] = useState([]);
  const [showAction, setShowAction] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const merchantId = localStorage.merchantId;

  const noMenu = !menu || (menu && menu.length === 0);

  const handleOpenShow = (value) => {
    setShowAction(true);
    setDataModal(value);
  };

  const handleChangeCat = (newCat) => {
    let newMenu = getDataMenu(newCat);
    setCategory(newCat);
    setMenu(newMenu);
  };

  const getNewCatAfterAction = (data) => {
    handleChangeCat(data);
    setShowAction(false);
    alert("Xóa món ăn thành công");
  };

  const getDataMenu = (arr) => {
    const list = arr.reduce((acc, curr) => acc.concat(curr.foods), []);
    return list;
  };

  const fetchMerchant = async () => {
    try {
      const res = await merchantApi.get(merchantId);
      if (res.status !== 400) {
        setCategory(res.category);
      }
      const newMenu = getDataMenu(res.category);
      setMenu(newMenu);
    } catch (error) {
      console.log("Failed to fetch merchant info: ", error);
    }
  };

  const handleSelectStatus = (e) => {
    let status = e.target.value;
    let dishes = getDataMenu(category);

    if (status === "0") {
      setMenu(dishes);
    }
    if (status === "true") {
      let newMenuByStatus = dishes.filter((dish, idx) => dish.status === true);
      setMenu(newMenuByStatus);
    }
    if (status === "false") {
      let newMenuByStatus = dishes.filter((dish, idx) => dish.status === false);
      setMenu(newMenuByStatus);
    }
  };

  const handleSelectCategories = (e) => {
    let nameCat = e.target.value;
    let dishOfCat = category.find((element) => element.name === nameCat);
    let newList;
    if (nameCat === "all" || nameCat === "") {
      let allList = getDataMenu(category);
      newList = allList;
    } else {
      newList = dishOfCat.foods;
    }

    setMenu(newList);
  };

  useEffect(() => {
    fetchMerchant();
  }, []);

  return (
    <div className="grid">
      <NavBar />

      <div className="food-menu">
        <div className="food-menu__head">
          <select
            name="categories"
            className="top-select"
            onChange={(e) => {
              handleSelectCategories(e);
            }}
          >
            <option value="" disabled selected={true}>
              Nhóm
            </option>
            <option value="all">Tất cả</option>
            {category.map((item, index) => (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            className="top-select"
            onChange={(e) => {
              handleSelectStatus(e);
            }}
          >
            <option value="" disabled selected={true}>
              Trạng thái
            </option>
            <option value="0">Tất cả</option>
            <option value={true}>Còn hàng</option>
            <option value={false}>Hết hàng</option>
          </select>
        </div>

        <div className="food-menu__body">
          <div className="body-title">Thực đơn ({menu.length})</div>
          <div className="body-list">
            <h2 style={!noMenu ? { display: "none" } : { display: "block" }}>
              Hiện tại không có món ăn nào
            </h2>
            {menu.map((item, index) => (
              <div className="body-list__item" key={index}>
                <div
                  className="item-img"
                  style={{
                    backgroundImage: `url(${item.img === "" ? mi1 : item.img})`,
                  }}
                ></div>
                <div className="item-content">
                  <div className="item-content__name">{item.name}</div>
                  <div className="item-content__price">
                    {validatePrice(item.price)} <span>đ</span>
                  </div>
                  {item.status ? (
                    <div className="item-content__status--true">
                      <GoPrimitiveDot /> Còn hàng
                    </div>
                  ) : (
                    <div className="item-content__status--false">
                      <GoPrimitiveDot /> Hêt hàng
                    </div>
                  )}
                </div>
                <div
                  className="item-action"
                  onClick={() => handleOpenShow(item)}
                >
                  <BsThreeDots className="item-action__icon" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="food-menu__add">
          <button onClick={handleOpen}>Thêm mới</button>
        </div>

        <Action
          dataModal={dataModal}
          showAction={showAction}
          category={category}
          callBackCloseShow={() => {
            setShowAction(false);
          }}
          callBackNewCategories={getNewCatAfterAction}
        />

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <FormAddFood
                categoris={category}
                changeCatCallBack={handleChangeCat}
                closeForm={handleClose}
              />
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

function FormAddFood({ categoris, changeCatCallBack, closeForm }) {
  const { handleSubmit, register, errors } = useForm();

  const submitFormAddFood = async (data) => {
    if (data.foodImg.length === 0 || !data.name || !data.price) {
      alert("Bạn chưa điền đủ thông tin!");
      return;
    }

    const formData = new FormData();
    const file = data.foodImg;
    formData.append("file", file[0]);
    formData.append("upload_preset", "zjd6i9ar");

    let imgFood = await axios
      .post("https://api.cloudinary.com/v1_1/soosoo/image/upload", formData)
      .then((res) => {
        return res.data.secure_url;
      })
      .catch((error) => {
        alert("Bạn chưa chọn ảnh");
        return;
      });

    const res = await merchantApi.foodAdd({ ...data, foodImg: imgFood });
    sendDataChangeCat(res.category);
    closeForm();
    alert("Thêm món ăn thành công");
  };

  const sendDataChangeCat = (data) => {
    changeCatCallBack(data);
  };

  return (
    <div>
      <form
        className="form-food__add"
        onSubmit={handleSubmit(submitFormAddFood)}
        encType="multipart/form-data"
      >
        <h2>Thêm món ăn</h2>
        <div className="add-group">
          <label>Tên món ăn</label>
          <input
            type="text"
            name="foodName"
            placeholder="Nhập tên món"
            {...register("name")}
          />
        </div>
        <div className="add-group">
          <label>Giá món ăn</label>
          <input
            type="text"
            name="foodPrice"
            placeholder="Nhập giá món"
            {...register("price")}
          />
        </div>
        <div className="add-group">
          <label>Loại đồ ăn</label>
          <select name="catId" {...register("catId")}>
            {categoris.map((cat, index) => (
              <option key={index} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="add-group">
          <label htmlFor="foodImg">Ảnh</label>
          <input
            type="file"
            filename="foodImg"
            name="foodImg"
            {...register("foodImg")}
          />
        </div>
        <div className="add-action">
          <input type="submit" value="Thêm mới" />
        </div>
      </form>
    </div>
  );
}

function Action({
  showAction,
  dataModal,
  category,
  callBackCloseShow,
  callBackNewCategories,
}) {
  const history = useHistory();
  const match = useRouteMatch();

  const getNameCatOfFood = () => {
    return category.find((cat) => cat.foods.includes(dataModal));
  };

  const changeUrlToDetailFood = () => {
    let catNewFind = getNameCatOfFood();
    const location = {
      pathname: `${match.url}/thuc-don/${dataModal._id}`,
      state: {
        foodData: dataModal,
        catList: category,
        currentCatId: catNewFind._id,
      },
    };
    history.push(location);
    history.replace(location);
  };

  const handleDeleteFood = async () => {
    let foodId = dataModal._id;
    let catNewFind = getNameCatOfFood();

    const res = await merchantApi.foodRemove({
      foodId: foodId,
      catId: catNewFind._id,
    });
    callBackNewCategories(res.category);
  };

  return (
    <div
      className="modal-action"
      style={showAction ? { display: "block" } : { display: "none" }}
    >
      <div
        className="modal-action__overlay"
        onClick={() => callBackCloseShow()}
        style={showAction ? { opacity: 0.4 } : { display: 0 }}
      ></div>
      <div
        className={`modal-action__content ${
          showAction
            ? "modal-action__content--open"
            : ".modal-action__content--close"
        }`}
      >
        <ul className="content-list">
          <li className="content-list__item" onClick={changeUrlToDetailFood}>
            Xem chi tiết
          </li>
          <li
            className="content-list__item"
            onClick={() => {
              handleDeleteFood();
            }}
          >
            Xóa
          </li>
        </ul>
        <div className="content-close">
          <div
            className="content-close__click"
            onClick={() => callBackCloseShow()}
          >
            Hủy
          </div>
        </div>
      </div>
    </div>
  );
}
