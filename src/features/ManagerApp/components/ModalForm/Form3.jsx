import React from "react";

function Form3({ email, setEmail, emailConfirm, setEmailConfirm }) {
  return (
    <form className="form-apply-validation">
      <h1 style={{ textAlign: "start", margin: "0 0 2rem 0" }}>
        Thông tin quán - Chi tiết
      </h1>
      <div className="field-wrap">
        <label>Thời gian mở</label>
        <input
          type="time"
          name="time-start"
          // value={name}
          onChange={(e) => console.log(typeof e.target.value)}
          required
          style={{ flexBasis: "30%" }}
        />

        <input
          type="time"
          name="time-end"
          // value={name}
          onChange={(e) => console.log(typeof e.target.value)}
          required
          style={{ flexBasis: "30%" }}
        />
      </div>
      {/* <div className="field-wrap">
        <label>Địa chỉ</label>
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
        <label>Số CMND</label>
        <input
          type="text"
          name="identity"
          value={identity}
          onChange={(e) =>
            setRepresentative({ ...representative, identity: e.target.value })
          }
          placeholder="Nhập số CMND"
          required
        />
      </div>
      <div className="field-wrap">
        <label>SĐT</label>
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
      </div> */}
    </form>
  );
}

export default Form3;
