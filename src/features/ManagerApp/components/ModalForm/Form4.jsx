import React from "react";

function Form4({ error, infoDetail, setInfoDetail, onSubmitForm }) {
  return (
    <form className="form-apply-validation">
      <h2>Đăng ký Ứng dụng NowMerchant</h2>
      Tài khoản đăng nhập hiện tại của bạn sẽ được dùng để tạo tài khoản quản lý
      đơn hàng Ứng dụng NowMerchant. Bạn có thể dùng tài khoản này để đăng nhập
      vào ứng dụng NowMerchant sau khi được duyệt
      <div className="field-wrap">
        <label className="required-field" htmlFor="">
          Email đăng ký
        </label>
        <input
          type="text"
          value={infoDetail.email}
          onChange={(e) =>
            setInfoDetail({ ...infoDetail, email: e.target.value })
          }
        />
      </div>
      {error && (
        <label htmlFor="" style={{ color: "red", textAlign: "center" }}>
          Có lỗi khi tạo Merchant: {error}
        </label>
      )}
      <button
        className="doneBtn"
        onClick={(e) => {
          e.preventDefault();
          onSubmitForm();
        }}
      >
        Create
      </button>
    </form>
  );
}
export default Form4;
