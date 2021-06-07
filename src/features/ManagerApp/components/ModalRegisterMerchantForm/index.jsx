import { useState } from "react";
import MultiStep from "./react-multistep";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import "./style.scss";
import Form4 from "./Form4";
import managerApi from "api/managerApi";

const { makeStyles } = require("@material-ui/core");
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "70rem",
    height: "70rem",
    top: "calc((100vh - 70rem)/2)",
    left: "calc((100vw - 70rem)/2)",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2.5, 6, 3),
  },
}));

const nextStyle = {
  background: "#781de1",
  borderWidth: "2px",
  padding: "1rem 2rem",
  borderRadius: "8px",
  color: "#f1f1f1",
  position: "absolute",
  bottom: "2rem",
  right: "5.5rem",
};

const prevStyle = {
  ...nextStyle,
  left: "5.5rem",
};

function ModalRegisterMerchant({ handleClose }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState({
    address: "",
    district: 1,
  });
  const [geo, setGeo] = useState({
    lat: "20.828790101307185",
    lng: "106.71664668177716",
  });
  const [representative, setRepresentative] = useState("");
  const [infoDetail, setInfoDetail] = useState({
    email: "",
    typeFood: null,
    phone: "",
    openTime: {
      mon: {
        label: "Thứ 2",
        enable: true,
        time: "09:00-22:00",
      },
      tue: {
        label: "Thứ 3",
        enable: true,
        time: "09:00-22:00",
      },
      wed: {
        label: "Thứ 4",
        enable: true,
        time: "09:00-22:00",
      },
      thu: {
        label: "Thứ 5",
        enable: true,
        time: "09:00-22:00",
      },
      fri: {
        label: "Thứ 6",
        enable: true,
        time: "09:00-22:00",
      },
      sat: {
        label: "Thứ 7",
        enable: true,
        time: "09:00-22:00",
      },
      sun: {
        label: "Chủ nhật",
        enable: true,
        time: "09:00-22:00",
      },
    },
    deduct: 10,
  });
  const [number, setNumber] = useState();
  const [avt, setAvt] = useState(null);
  const [identFontImg, setIdentFontImg] = useState(null);
  const [identBackImg, setIdentBackImg] = useState(null);
  const [contractImg, setContractImg] = useState(null);
  const [error, setError] = useState("");
  const classes = useStyles();

  const uploadImg = async (dataImg, setMethod) => {
    const resUploadImg = await fetch(
      "https://api.cloudinary.com/v1_1/vmu/image/upload",
      {
        method: "POST",
        body: dataImg,
      }
    );
    const res = await resUploadImg.json();
    setMethod(res.secure_url);
  };

  const onSubmitForm = async () => {
    if (!avt) return setError("Chưa thêm ảnh cho quán");

    const merchantObj = {
      name: name,
      ...infoDetail,
      representative: {
        ...representative,
        identity: {
          number,
          fontImg: identFontImg,
          backImg: identBackImg,
        },
      },
      location: {
        ...location,
        lat: geo.lat.toString(),
        lng: geo.lng.toString(),
      },
      avt,
      contract: contractImg,
    };
    const res = await managerApi.registerMerchant(merchantObj);
    if (!res.status || res.status === 200) handleClose();
    else if (res.data) setError(res.data);
    else setError("Email đã được đăng ký từ trước");
  };

  const steps = [
    {
      name: "Thông tin quán - Cơ bản",
      component: (
        <Form1
          name={name}
          setName={setName}
          location={location}
          setLocation={setLocation}
          geo={geo}
          setGeo={setGeo}
        />
      ),
    },
    {
      name: "Thông tin người đại diện",
      component: (
        <Form2
          representative={representative}
          setRepresentative={setRepresentative}
          uploadImg={uploadImg}
          identFontImg={identFontImg}
          setIdentFontImg={setIdentFontImg}
          identBackImg={identBackImg}
          setIdentBackImg={setIdentBackImg}
          number={number}
          setNumber={setNumber}
        />
      ),
    },
    {
      name: "Thông tin quán - Chi tiết",
      component: (
        <Form3
          avt={avt}
          setAvt={setAvt}
          contractImg={contractImg}
          setContractImg={setContractImg}
          uploadImg={uploadImg}
          infoDetail={infoDetail}
          setInfoDetail={setInfoDetail}
        />
      ),
    },
    {
      name: "Đăng ký ứng dụng Merchant",
      component: (
        <Form4
          infoDetail={infoDetail}
          setInfoDetail={setInfoDetail}
          onSubmitForm={onSubmitForm}
          error={error}
        />
      ),
    },
  ];

  return (
    <div className={classes.paper}>
      <button
        style={{
          position: "absolute",
          padding: "0.5rem 1rem",
          right: 20,
          top: 15,
          fontSize: "1.5rem",
          backgroundColor: "rgb(120, 29, 225)",
          borderRadius: "8px",
          color: "rgb(241, 241, 241)",
        }}
        onClick={() => handleClose()}
      >
        Hủy
      </button>
      <div className="modal-container">
        <MultiStep steps={steps} prevStyle={prevStyle} nextStyle={nextStyle} />
      </div>
    </div>
  );
}

export default ModalRegisterMerchant;
