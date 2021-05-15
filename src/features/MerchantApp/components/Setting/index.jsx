import merchantApi from "api/merchantApi";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import React, { useState, useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import NavBar from "../NavBar";
import "./style.scss";
import { useForm } from "react-hook-form";

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
  },
}));

export default function Setting() {
  const merchantId = localStorage.getItem("merchantId");
  const [numberShow, setNumberShow] = useState(0);
  const [profile, setProfile] = useState({});

  const handleChangeShow = (num) => {
    setNumberShow(num);
  };

  useEffect(() => {
    const getPrifleMerchant = async () => {
      try {
        const res = await merchantApi.get(merchantId);
        if (res) {
          setProfile(res);
        }
      } catch (error) {
        console.log("Failed get profile merchant:", error);
      }
    };
    getPrifleMerchant();
  }, []);

  return (
    <div className="grid">
      <NavBar />
      <div className="setting">
        <div className="setting-content">
          <div
            className="setting-content__item"
            onClick={() => {
              handleChangeShow(1);
            }}
          >
            <span>Danh mục</span>
            <FaAngleRight className="icon" />
          </div>
          <div className="setting-content__item">
            <span>Địa chỉ</span>
            <FaAngleRight className="icon" />
          </div>
          <div className="setting-content__item">
            <span>Thời gian mở cửa</span>
            <FaAngleRight className="icon" />
          </div>
          <div className="setting-content__item">
            <span>Trạng thái</span>
            <FaAngleRight className="icon" />
          </div>
        </div>
      </div>

      {numberShow === 1 ? (
        <ChildContent
          data={profile.category || []}
          changeShow={handleChangeShow}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function ChildContent({ data, changeShow }) {
  const sendNumCallBackShow = (num) => {
    changeShow(num);
  };
  return (
    <div className="child-content">
      <div className="child-content__head">
        <FaAngleLeft
          className="icon"
          onClick={() => {
            sendNumCallBackShow(0);
          }}
        />
        <span>danh mục</span>
      </div>
      <div className="child-content__main">
        <Categories cat={data} />
      </div>
    </div>
  );
}

function Categories({ cat }) {
  const [currentCatList, setCurrentCatList] = useState(cat);
  const [currentCat, setCurrentCat] = useState({});
  const [actionEdit, setActionEdit] = useState("");
  const [typeForm, setTypeForm] = useState(0);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, errors, setValue } = useForm({});

  const submitFormEdit = async (data) => {
    if (actionEdit === "update") {
      let catChange = { ...currentCat, name: data.changeCatName };
      let catListClone = currentCatList;

      const newCatList = await catListClone.map((cat, index) =>
        cat._id === catChange._id ? catChange : cat
      );

      const res = await merchantApi.changeCategory(newCatList);

      setCurrentCatList(res.category);
      handleClose();
      alert("Thay đổi tên danh mục thành công");
    }

    if (actionEdit === "remove") {
      let catId = currentCat._id;
      console.log("remove cat", catId);

      const res = await merchantApi.removeCategory({ catId: catId });

      setCurrentCatList(res.category);
      handleClose();
      alert("Xóa danh mục thành công");
    }
  };

  const submitFormAdd = async (data) => {
    const res = await merchantApi.addCategory({ name: data.addCatName });
    console.log(res.category);
    setCurrentCatList(res.category);
  };

  const handleOpen = (i) => {
    setTypeForm(0);
    setOpen(true);
    setCurrentCat(i);
  };

  const handleOpenFormAdd = () => {
    setTypeForm(1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="child-content__main-cat">
      {currentCatList.map((i, index) => (
        <div
          className="main-cat__item"
          key={i._id}
          onClick={() => {
            handleOpen(i);
          }}
        >
          <span>{index + 1}.</span>
          <span>{i.name}</span>
          <FaAngleRight className="icon" />
        </div>
      ))}

      <div className="main-cat__add">
        <button onClick={handleOpenFormAdd}>Thêm mới</button>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {typeForm === 0 ? (
              <form
                onSubmit={handleSubmit(submitFormEdit)}
                className="main-cat__form"
              >
                <h2>Thay đổi tên danh mục</h2>
                <label className="form-label">{currentCat.name}</label>
                <input
                  type="text"
                  {...register("changeCatName")}
                  className="form-input"
                  placeholder="Nhập tên thay đổi ..."
                />
                <div>
                  <input
                    type="submit"
                    value="Cập nhật"
                    className="form-action"
                    onClick={() => {
                      setActionEdit("update");
                    }}
                  />
                  <input
                    type="submit"
                    value="Xóa"
                    className="form-action"
                    onClick={() => {
                      setActionEdit("remove");
                    }}
                  />
                </div>
              </form>
            ) : (
              <form
                onSubmit={handleSubmit(submitFormAdd)}
                className="main-cat__form"
              >
                <h2>Thêm tên danh mục</h2>
                <input
                  type="text"
                  {...register("addCatName")}
                  className="form-input"
                  placeholder="Nhập tên mới ..."
                />
                <div>
                  <input
                    type="submit"
                    value="Xác nhận"
                    className="form-action"
                  />
                </div>
              </form>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
