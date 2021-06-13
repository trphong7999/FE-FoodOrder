import { formatDatetimeToString } from "func";
import React, { useState } from "react";
import { useLocation } from "react-router";
import "./style.scss";

export default function Invoice() {
  const location = useLocation();
  const od = location.state.order;

  return (
    <div className="report">
      <div className="report-head">
        <div className="report-head__title">
          <h1>HÓA ĐƠN BÁN HÀNG</h1>
          <div>Ngày ...... tháng ...... năm .........</div>
        </div>
        <div className="report-head__code">
          <div className="code-item">
            Mẫu số: <span>01GTKT2/001</span>
          </div>
          <div className="code-item">
            Ký hiệu: <span>UA/13P</span>
          </div>
          <div className="code-item">Số:</div>
        </div>
      </div>
      <div className="report-body">
        <div className="body-item">
          <span>Cơ sở:</span>
          <span className="body-item--bold">{od.merchantId.name}</span>
        </div>
        <div className="body-item">
          <span>Đia chỉ:</span>
          <span>{od.merchantId.location.address}</span>
        </div>
        <div className="body-item">
          <span>Điện thoại:</span>
          <span>{od.merchantId.phone}</span>
        </div>
        <div className="body-item">
          <span>Tên khách hàng: </span>
          <span style={{ fontWeight: "bold" }}>{od.userOrderId.info.name}</span>
        </div>
        <div className="body-item">
          <span>Địa chỉ:</span>
          <span>{od.userOrderId.info.location.address}</span>
        </div>
        <div className="body-item">
          <span>Hình thức thanh toán: </span>
          <span style={{ fontWeight: "bold" }}> Tiền mặt</span>
        </div>
        <table className="body-table">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>STT</th>
              <th style={{ width: "35%" }}>Tên món</th>
              <th style={{ width: "10%" }}>Số lượng</th>
              <th style={{ width: "20%" }}>Đơn giá</th>
              <th style={{ width: "20%" }}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {od.detail.foods.map((food, idx) => (
              <tr>
                <td>{idx}</td>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.price}</td>
                <td>{food.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="body-table body-table-2">
          <tr>
            <td
              style={{
                width: "78%",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Tổng tiền:
            </td>
            <td>{od.detail.total}</td>
          </tr>
        </table>
      </div>
      <div className="report-sign">
        <div className="sign-item">
          <div>Khách hàng</div>
          <div>(Ký, ghi rõ họ tên)</div>
        </div>
        <div className="sign-item">
          <div>Cơ sở</div>
          <div>(Ký, dóng dấu)</div>
        </div>
      </div>
      <hr />
      <div className="footer">
        Cơ sở {od.merchantId.name}
        <br />
        Hotline: {od.merchantId.phone}
      </div>
    </div>
  );
}
