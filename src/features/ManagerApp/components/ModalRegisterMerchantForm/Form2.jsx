import React from "react";

function Form2({
  representative,
  setRepresentative,
  uploadImg,
  identFontImg,
  setIdentFontImg,
  identBackImg,
  setIdentBackImg,
  number,
  setNumber,
}) {
  const { name, address, phone } = representative;
  return (
    <form className="form-apply-validation">
      <h1 style={{ textAlign: "start", margin: "0 0 2rem 0" }}>
        Thông tin người đại diện
      </h1>
      <div className="field-wrap">
        <label className="required-field">Họ và tên</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) =>
            setRepresentative({ ...representative, name: e.target.value })
          }
          placeholder="Nhập tên"
          required
        />
      </div>
      <div className="field-wrap">
        <label className="required-field">Địa chỉ</label>
        <input
          type="text"
          name="name"
          value={address}
          onChange={(e) =>
            setRepresentative({ ...representative, address: e.target.value })
          }
          placeholder="Nhập địa chỉ"
          required
        />
      </div>
      <div className="field-wrap">
        <label className="required-field">SĐT</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) =>
            setRepresentative({ ...representative, phone: e.target.value })
          }
          placeholder="Số điện thoại cá nhân"
          required
        />
      </div>
      <div className="field-wrap">
        <label className="required-field">Số Căn Cước</label>
        <input
          type="text"
          name="identity"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Nhập số căn cước"
          required
        />
      </div>
      <h2>Ảnh Căn Cước</h2>
      <div className="field-wrap">
        <div style={{ flexBasis: "45%" }}>
          <label htmlFor="" className="required-field">
            Mặt trước
          </label>
          <input
            type="file"
            placeholder="Image font CMND"
            onChange={(e) => {
              const files = e.target.files;
              const data = new FormData();
              data.append("file", files[0]);
              data.append("upload_preset", "foodorder");
              uploadImg(data, setIdentFontImg);
            }}
          />
        </div>
        <div style={{ flexBasis: "45%" }}>
          <label htmlFor="" className="required-field">
            Mặt sau
          </label>
          <input
            type="file"
            placeholder="Image back CMND "
            onChange={(e) => {
              const files = e.target.files;
              const data = new FormData();
              data.append("file", files[0]);
              data.append("upload_preset", "foodorder");
              uploadImg(data, setIdentBackImg);
            }}
          />
        </div>
      </div>
      <h2>Preview ảnh căn cước </h2>
      <div className="field-wrap">
        <div>
          <label>Mặt trước</label>
          {identFontImg ? (
            <img src={identFontImg} alt="contract" width="256" />
          ) : (
            ""
          )}
        </div>
        <div>
          <label>Mặt sau</label>
          {identBackImg ? (
            <img src={identBackImg} alt="contract" width="256" />
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
}

export default Form2;
