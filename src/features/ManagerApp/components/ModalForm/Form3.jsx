import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import TogglePickTime from "../TogglePickTime";
import ImageUploader from "react-images-upload";

function Form3(props) {
  const { dataImg, setDataImg, infoDetail, setInfoDetail } = props;
  const { phone, dayPart, typeFood, openTime } = infoDetail;
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

      <div className="checkbox-wrap">
        <label
          className="wrap-left required-field"
          style={{ flexBasis: "30%" }}
        >
          Thời điểm trong ngày
        </label>

        <div className="wrap-right">
          <div className="item">
            <label htmlFor="" className="label">
              Buổi sáng
            </label>
            <Checkbox
              defaultChecked
              checked={dayPart.indexOf(0) !== -1}
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              className="input-check"
              onChange={() => {
                dayPart.indexOf(0) !== -1
                  ? dayPart.splice(dayPart.indexOf(0), 1)
                  : dayPart.push(0);
                setInfoDetail({ ...infoDetail, dayPart: dayPart });
              }}
            />
            {/* <input type="checkbox"  /> */}
          </div>
          <div className="item">
            <label htmlFor="" className="label">
              Buổi trưa
            </label>
            <Checkbox
              checked={dayPart.indexOf(1) !== -1}
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              className="input-check"
              onChange={() => {
                dayPart.indexOf(1) !== -1
                  ? dayPart.splice(dayPart.indexOf(1), 1)
                  : dayPart.push(1);
                setInfoDetail({ ...infoDetail, dayPart: dayPart });
              }}
            />
          </div>
          <div className="item">
            <label htmlFor="" className="label">
              Buổi tối
            </label>
            <Checkbox
              checked={dayPart.indexOf(2) !== -1}
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              className="input-check"
              onChange={() => {
                dayPart.indexOf(2) !== -1
                  ? dayPart.splice(dayPart.indexOf(2), 1)
                  : dayPart.push(2);
                setInfoDetail({ ...infoDetail, dayPart: dayPart });
              }}
            />
          </div>
        </div>
      </div>
      <div className="field-wrap required-field">
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
        <label htmlFor="">Khấu trừ</label>
        <input type="text" readOnly value="10%" />
      </div>
      <div>
        <label htmlFor="" className="required-field">
          Ảnh đại diện
        </label>
        {/* <ImageUploader
          withPreview={true}
          withIcon={false}
          buttonText="Choose images"
          onChange={(pic) => {
            setInfoDetail({ ...infoDetail, avt: pic });
          }}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        /> */}
        <input
          type="file"
          placeholder="Upload an image"
          onChange={(e) => {
            const files = e.target.files;
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", "foodorder");
            setDataImg(data);
          }}
        />
      </div>
    </form>
  );
}

export default Form3;
