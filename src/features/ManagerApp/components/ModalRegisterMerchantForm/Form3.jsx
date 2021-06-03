import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import TogglePickTime from "../TogglePickTime";
import ImageUploader from "react-images-upload";

function Form3(props) {
  const {
    avt,
    setAvt,
    contractImg,
    setContractImg,
    uploadImg,
    infoDetail,
    setInfoDetail,
  } = props;
  const { phone, deduct, typeFood, openTime } = infoDetail;
  return (
    <form className="form-apply-validation">
      <h1 style={{ textAlign: "start", margin: "0 0 2rem 0" }}>
        Thông tin quán - Chi tiết
      </h1>
      <div className="field-wrap ">
        <label className="required-field">Thời gian mở</label>
        <div style={{ flexBasis: "70%" }}>
          {openTime &&
            Object.keys(openTime).map((item, id) => (
              <TogglePickTime
                item={item}
                infoDetail={infoDetail}
                setInfoDetail={setInfoDetail}
                key={item}
              />
            ))}
        </div>
      </div>

      <div className="checkbox-wrap">
        <label
          className="wrap-left required-field"
          style={{ flexBasis: "30%" }}
        >
          Loại món ăn
        </label>

        <div className="wrap-right">
          <div className="item">
            <label htmlFor="" className="label">
              Đồ ăn
            </label>
            <Checkbox
              defaultChecked
              checked={typeFood === 0}
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              className="input-check"
              onChange={() => setInfoDetail({ ...infoDetail, typeFood: 0 })}
            />
          </div>
          <div className="item">
            <label htmlFor="" className="label">
              Đồ uống
            </label>
            <Checkbox
              checked={typeFood === 1}
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              className="input-check"
              onChange={() => setInfoDetail({ ...infoDetail, typeFood: 1 })}
            />
          </div>
        </div>
      </div>

      <div className="field-wrap ">
        <label htmlFor="" className="required-field">
          Số điện thoại
        </label>
        <input
          type="text"
          value={phone}
          maxLength="10"
          onChange={(e) =>
            setInfoDetail({ ...infoDetail, phone: e.target.value })
          }
        />
      </div>
      <div className="field-wrap">
        <label htmlFor="" className="required-field">
          Khấu trừ %
        </label>
        <input
          type="text"
          value={deduct}
          onChange={(e) =>
            setInfoDetail({ ...infoDetail, deduct: e.target.value })
          }
        />
      </div>

      <div
        className="field-wrap"
        style={{ borderTop: "1px solid gray", paddingTop: "1rem" }}
      >
        <label htmlFor="" className="required-field">
          Ảnh đại diện
        </label>
        <input
          type="file"
          placeholder="Image avatar"
          onChange={(e) => {
            const files = e.target.files;
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", "foodorder");
            uploadImg(data, setAvt);
          }}
        />
      </div>
      <div className="field-wrap">
        <label style={{ flexBasis: "30%" }}>Preview ảnh đại diện</label>
        {avt ? <img src={avt} alt="avt" width="256" /> : ""}
      </div>

      <div
        className="field-wrap"
        style={{ borderTop: "1px solid gray", paddingTop: "1rem" }}
      >
        <label htmlFor="" className="required-field">
          Ảnh hợp đồng
        </label>
        <input
          type="file"
          placeholder="Image contract"
          onChange={(e) => {
            const files = e.target.files;
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", "foodorder");
            uploadImg(data, setContractImg);
          }}
        />
      </div>

      <div className="field-wrap">
        <label style={{ flexBasis: "30%" }}>Preview ảnh hợp đồng</label>
        {contractImg ? (
          <img src={contractImg} alt="contractImg" width="256" />
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default Form3;
