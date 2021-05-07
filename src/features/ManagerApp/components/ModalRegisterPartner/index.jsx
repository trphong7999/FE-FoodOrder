import React, { useState } from "react";
import "./style.scss";
// import MultiImageInput from "react-multiple-image-input";
import managerApi from "api/managerApi";
import ImageUploader from "react-images-upload";

function ModalRegisterPartner({ handleClose }) {
  const [img, setImg] = useState({ 0: null });
  const [identityFont, setIdentityFont] = useState({ 0: null });
  const [identityBack, setIdentityBack] = useState({ 0: null });
  const [partner, setPartner] = useState({
    name: "",
    gender: "male",
    address: "",
    phone: "",
    email: "",
    identity: {
      number: "",
      fontImg: "",
      backImg: "",
    },
  });
  const [error, setError] = useState("");

  // const crop = {
  //   unit: "%",
  //   aspect: 4 / 3,
  //   width: "100",
  //   height: "70",
  // };

  const createPartner = async () => {
    const avtData = new FormData();
    avtData.append("file", img[0]);
    avtData.append("upload_preset", "foodorder");

    const fontData = new FormData();
    fontData.append("file", identityFont[0]);
    fontData.append("upload_preset", "foodorder");

    const backData = new FormData();
    backData.append("file", identityBack[0]);
    backData.append("upload_preset", "foodorder");

    const resUploadAvt = await fetch(
      "https://api.cloudinary.com/v1_1/vmu/image/upload",
      {
        method: "POST",
        body: avtData,
      }
    );
    const resUploadIdenFont = await fetch(
      "https://api.cloudinary.com/v1_1/vmu/image/upload",
      {
        method: "POST",
        body: fontData,
      }
    );
    const resUploadIdenBack = await fetch(
      "https://api.cloudinary.com/v1_1/vmu/image/upload",
      {
        method: "POST",
        body: backData,
      }
    );
    const avt = await resUploadAvt.json();
    const idenFont = await resUploadIdenFont.json();
    const idenBack = await resUploadIdenBack.json();
    const partnerObj = {
      ...partner,
      avt: avt.secure_url,
      identity: {
        ...partner.identity,
        fontImg: idenFont.secure_url,
        backImg: idenBack.secure_url,
      },
    };
    const res = await managerApi.registerPartner(partnerObj);
    if (res.status === "200" || !res.status) handleClose();
    else if (res.data) setError(res.data);
    else if (avt.error) setError("Chưa thêm ảnh đại diện");
    else if (idenFont.error) setError("Chưa thêm ảnh CMND mặt trước");
    else if (idenBack.error) setError("Chưa thêm ảnh CMND mặt sau");
    else setError("");
  };

  return (
    <>
      <div className="modal-register-partner" style={{ overflowY: "scroll" }}>
        <h1>Thông tin đối tác giao vận</h1>
        <div className="field-wrap">
          <label className="required-field">Họ và tên</label>
          <input
            type="text"
            value={partner.name}
            onChange={(e) => setPartner({ ...partner, name: e.target.value })}
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Giới tính</label>
          <select
            name="gender"
            value={partner.gender}
            onChange={(e) => setPartner({ ...partner, gender: e.target.value })}
          >
            <option key="male" value="male">
              Nam
            </option>
            <option key="female" value="female">
              Nữ
            </option>
          </select>
        </div>
        <div className="field-wrap">
          <label className="required-field">Địa chỉ</label>
          <input
            type="text"
            value={partner.address}
            onChange={(e) =>
              setPartner({ ...partner, address: e.target.value })
            }
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Số điện thoại</label>
          <input
            type="text"
            value={partner.phone}
            onChange={(e) => setPartner({ ...partner, phone: e.target.value })}
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Email (Tạo tài khoản)</label>
          <input
            type="text"
            value={partner.email}
            onChange={(e) => setPartner({ ...partner, email: e.target.value })}
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Ảnh đại diện</label>
          {/* <MultiImageInput
          images={img}
          setImages={}
          cropConfig={{ crop, ruleOfThirds: true }}
          max={1}
          theme="light"
        /> */}
          <ImageUploader
            singleImage={true}
            withIcon={true}
            withPreview={true}
            buttonText="Choose images"
            onChange={(e) => setImg(e)}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Số CMND</label>
          <div className="field-wrap">
            <input
              type="text"
              value={partner.identity.number}
              onChange={(e) =>
                setPartner({
                  ...partner,
                  identity: { ...partner.identity, number: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="field-wrap">
          <div style={{ marginLeft: "10%" }}>
            <label>Ảnh mặt trước</label>
            {/* <MultiImageInput
            images={identityFont}
            setImages={setIdentityFont}
            cropConfig={{ crop, ruleOfThirds: true }}
            max={1}
            theme="light"
          /> */}
            <ImageUploader
              singleImage={true}
              withIcon={true}
              withPreview={true}
              buttonText="Choose images"
              onChange={(e) => setIdentityFont(e)}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          </div>
          <div style={{ marginLeft: "10rem" }}>
            <label>Ảnh mặt sau</label>
            {/* <MultiImageInput
            images={identityBack}
            setImages={setIdentityBack}
            cropConfig={{ crop, ruleOfThirds: true }}
            max={1}
            theme="light"
          /> */}
            <ImageUploader
              singleImage={true}
              withIcon={true}
              withPreview={true}
              buttonText="Choose images"
              onChange={(e) => setIdentityBack(e)}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          </div>
        </div>
      </div>
      <button
        style={{
          position: "absolute",
          padding: "0.5rem 1rem",
          top: "calc((100vh - 68rem) / 2)",
          right: "calc((100vw - 63rem) / 2)",
          fontSize: "1.5rem",
          backgroundColor: "rgb(120, 29, 225)",
          color: "rgb(241, 241, 241)",
          borderRadius: "8px",
        }}
        onClick={() => handleClose()}
      >
        Hủy
      </button>
      <button
        style={{
          padding: "0.5rem 1rem",
          position: "absolute",
          bottom: "calc((100vh - 68rem) / 2)",
          right: "calc((100vw - 63rem) / 2)",
          fontSize: "1.5rem",
          backgroundColor: "rgb(120, 29, 225)",
          color: "rgb(241, 241, 241)",
          borderRadius: "8px",
        }}
        onClick={() => createPartner()}
      >
        Tạo
      </button>
      <p
        style={{
          position: "absolute",
          bottom: "calc((100vh - 68rem) / 2)",
          right: "calc((100vw - 50rem) / 2)",
        }}
      >
        {error}
      </p>
    </>
  );
}

export default ModalRegisterPartner;
