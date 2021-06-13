import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Switch } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ImageUploader from "react-images-upload";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import NavBar from "../NavBar";
import merchantApi from "api/merchantApi";
import areas from "assets/data/districtName";
import Address2Geocode from "../PlaceAutoAddressMer";
import TogglePickTime from "../TogglePickTime";

import "./style.scss";

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
    width: "90vw",
    outline: "none",
  },
}));

export default function Setting() {
  const merchantId = localStorage.getItem("merchantId");
  const [numberShow, setNumberShow] = useState(0);
  const [profile, setProfile] = useState({});

  const handleChangeShow = (num) => {
    setNumberShow(num);
  };

  const handleCallBackData = (newData) => {
    if (numberShow === 1) {
      setProfile({ ...profile, category: newData });
    } else {
      setProfile({ ...profile, location: newData });
    }
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
          <div
            className="setting-content__item"
            onClick={() => {
              handleChangeShow(2);
            }}
          >
            <span>Địa chỉ</span>
            <FaAngleRight className="icon" />
          </div>
          <div
            className="setting-content__item"
            onClick={() => {
              handleChangeShow(3);
            }}
          >
            <span>Thời gian mở cửa</span>
            <FaAngleRight className="icon" />
          </div>
          <div
            className="setting-content__item"
            onClick={() => {
              handleChangeShow(4);
            }}
          >
            <span>Trạng thái</span>
            <FaAngleRight className="icon" />
          </div>
        </div>
      </div>

      {numberShow === 1 ? (
        <ChildContent
          numberShow={1}
          data={profile.category || []}
          changeShow={handleChangeShow}
          title={"danh mục"}
          callBackData={handleCallBackData}
        />
      ) : numberShow === 2 ? (
        <ChildContent
          numberShow={2}
          data={profile.location || []}
          changeShow={handleChangeShow}
          title={"địa chỉ"}
          callBackData={handleCallBackData}
        />
      ) : numberShow === 3 ? (
        <ChildContent
          numberShow={3}
          data={profile.openTime || []}
          changeShow={handleChangeShow}
          title={"thời gian mở cửa"}
        />
      ) : numberShow === 4 ? (
        <ChildContent
          numberShow={4}
          data={profile.status || []}
          changeShow={handleChangeShow}
          title={"trạng thái"}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function ChildContent({ data, changeShow, title, numberShow, callBackData }) {
  const sendNumCallBackShow = (num) => {
    changeShow(num);
  };

  const getNewDataFromChild = (data) => {
    callBackData(data);
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
        <span>{title}</span>
      </div>
      <div className="child-content__main">
        {numberShow === 1 ? (
          <Categories cat={data} recover={getNewDataFromChild} />
        ) : numberShow === 2 ? (
          <Address address={data} recover={getNewDataFromChild} />
        ) : numberShow === 3 ? (
          <OpenTime />
        ) : numberShow === 4 ? (
          <Status data={data} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function Categories({ cat, recover }) {
  const [currentCatList, setCurrentCatList] = useState(cat);
  const [currentCat, setCurrentCat] = useState({});
  const [actionEdit, setActionEdit] = useState("");
  const [typeForm, setTypeForm] = useState(0);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, errors } = useForm({});

  const submitFormEdit = async (data) => {
    let res;
    if (actionEdit === "update") {
      let catChange = { ...currentCat, name: data.changeCatName };
      let catListClone = currentCatList;

      const newCatList = await catListClone.map((cat, index) =>
        cat._id === catChange._id ? catChange : cat
      );

      res = await merchantApi.changeCategory(newCatList);
      alert("Thay đổi tên danh mục thành công");
    } else if (actionEdit === "remove") {
      let catId = currentCat._id;
      res = await merchantApi.removeCategory({ catId: catId });
      alert("Xóa danh mục thành công");
    } else {
      res = await merchantApi.addCategory({ name: data.addCatName });
      alert("Thêm danh mục thành công");
    }

    handleClose();
    setCurrentCatList(res.category);
    recover(res.category);
  };

  const submitFormAdd = async (data) => {
    const res = await merchantApi.addCategory({ name: data.addCatName });
    setCurrentCatList(res.category);
    recover(res.category);
    alert("Thêm danh mục thành công");
    handleClose();
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
        <button onClick={handleOpenFormAdd}>Thêm mới danh mục</button>
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
            <form
              onSubmit={handleSubmit(submitFormEdit)}
              className="main-cat__form"
            >
              {typeForm === 0 ? (
                <div>
                  <h3>Thay đổi tên danh mục</h3>
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
                </div>
              ) : (
                <div>
                  <h3>Thêm tên danh mục</h3>
                  <input
                    type="text"
                    {...register("addCatName")}
                    className="form-input"
                    placeholder="Nhập tên mới ..."
                    autoComplete={false}
                  />
                  <div>
                    <input
                      type="submit"
                      value="Xác nhận"
                      className="form-action"
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Address({ address, recover }) {
  const { register, handleSubmit, errors } = useForm();
  const [addressCurrent, setAddressCurrent] = useState(address.address);

  const geoMerchant =
    address.lat && address.lng
      ? {
          lat: address.lat,
          lng: address.lng,
        }
      : false;
  const [geo, setGeo] = useState(geoMerchant);

  const submitLocation = async (data) => {
    let newData = {
      address: addressCurrent,
      district: parseInt(data.district),
      lat: String(geo.lat),
      lng: String(geo.lng),
    };
    const res = await merchantApi.addressEdit(newData);
    if (res) {
      alert("Thay đổi thông tin địa chỉ thành công");
    } else {
      alert("Thay đổi thông tin địa chỉ không thành công");
    }
    recover(res.location);
  };

  return (
    <div className="child-content__main-address">
      <form className="form-address" onSubmit={handleSubmit(submitLocation)}>
        <div className="form-address__group">
          <div className="group-label">Khu vực</div>
          <div>
            <select name="district" {...register("district")}>
              {areas.map((area, idx) =>
                address.district === area.key ? (
                  <option key={idx} value={area.value} selected={true}>
                    {area.value}
                  </option>
                ) : (
                  <option key={idx} value={area.key}>
                    {area.value}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="form-address__group">
          <div className="group-label">Địa chỉ</div>
          <Address2Geocode
            location={addressCurrent}
            setLocation={setAddressCurrent}
            geo={geo}
            setGeo={setGeo}
          />
        </div>
        <MapContainer
          center={[geo.lat, geo.lng]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "350px", width: "100%" }}
          whenReady={(map) => {
            map.target.on("click", function (e) {
              const { lat, lng } = e.latlng;
              setGeo({ lat: lat, lng: lng });
            });
          }}
        >
          <ChangeView center={[geo.lat, geo.lng]} zoom={15} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[geo.lat, geo.lng]}>
            <Popup>Location</Popup>
          </Marker>
        </MapContainer>

        <div className="form-address__btn">
          <button className="button-address">
            {`Cập nhật địa chỉ & khu vực`}{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

function OpenTime() {
  const [openTime, setOpenTime] = useState([]);

  const handleUpdateOpenTime = async () => {
    const newRes = await merchantApi.updateOpenTime(openTime);
    delete newRes["_id"];
    alert("Cập nhật thành công");
    setOpenTime(newRes);
  };

  useEffect(() => {
    const getOpenTime = async () => {
      const res = await merchantApi.getOpenTime();
      delete res["_id"];
      setOpenTime(res);
    };
    getOpenTime();
  }, []);

  return (
    <div className="child-content__main-time">
      <div className="main-time__field-wrap ">
        <div className="field-wrap__list" style={{ flexBasis: "70%" }}>
          {openTime &&
            Object.keys(openTime).map((item, id) => (
              <TogglePickTime
                item={item}
                openTime={openTime}
                setOpenTime={setOpenTime}
                key={id}
              />
            ))}
        </div>
      </div>
      <div className="main-time__button">
        <button className="button-time" onClick={handleUpdateOpenTime}>
          Cập nhật thời gian mở cửa
        </button>
      </div>
    </div>
  );
}

function Status({ data }) {
  const [statusMer, setStatusMer] = useState(false);
  const [originStatus, setOriginStatus] = useState(null);
  // const statusOrder = (time) => {
  //   const { openTime } = merchant;
  //   const openTimeToDay = openTime[getStrDayOfWeek()];
  //   const [timeOpen, timeClose] = openTimeToDay.time.split("-");
  //   const [hourOpen, minuteOpen] = timeOpen.split(":");
  //   const [hourClose, minuteClose] = timeClose.split(":");
  //   let now = new Date(+time);
  //   console.log(hourOpen, now.getHours(), hourClose);
  //   if (
  //     (hourOpen < now.getHours() && now.getHours() < hourClose) ||
  //     (hourOpen === now.getHours() && minuteOpen <= now.getMinutes()) ||
  //     (now.getHours() === hourClose && now.getMinutes() < minuteClose)
  //   )
  //     return true;

  //   return false;
  // };

  const handleToggleSwitchStatus = () => {
    setStatusMer(!statusMer);
  };

  const handleChangeStatus = async () => {
    let newStatus = statusMer ? "open" : "close";
    const res = await merchantApi.updateStatus({ status: newStatus });
    if (res === "close") setStatusMer(false);
    else setStatusMer(true);
    alert(`Bạn đã ${statusMer ? "mở" : "đóng"} cửa hàng`);
    console.log();
  };

  useEffect(() => {
    let getStatusMer = async () => {
      const res = await merchantApi.getStatus();
      if (res === "close") setStatusMer(false);
      else setStatusMer(true);
      setOriginStatus(res);
    };
    getStatusMer();
  }, []);

  return (
    <div className="child-content__main-status">
      <div className="note">
        <span>Chú ý</span> : gạt thanh bên dưới để mở/đóng cửa hàng
      </div>
      <div className="title">Trạng thái cửa hàng:</div>
      <div className="main">
        {originStatus !== "suspend" ? (
          <React.Fragment>
            {" "}
            <span style={{ color: `${statusMer ? "green" : "red"}` }}>
              {statusMer ? "Mở cửa" : "Đóng cửa"}
            </span>
            <Switch
              checked={statusMer}
              onChange={handleToggleSwitchStatus}
              color="primary"
              name="statusMer"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </React.Fragment>
        ) : (
          <span style={{ color: `red` }}>Đình chỉ</span>
        )}
      </div>
      <div className="main-status__btn">
        <button onClick={handleChangeStatus}>Xác nhận</button>
      </div>
    </div>
  );
}
