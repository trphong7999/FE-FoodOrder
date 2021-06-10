import {
  formatDatetimeToString,
  formatDatetimeToStringDate,
  formatDatetimeToStringDateWithoutYear,
  validatePrice,
} from "func";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import "./style.scss";

function Report() {
  const ordersMonth = useLocation().state.ordersMonth;
  const userInMonth = useLocation().state.userInMonth;
  const partnerMonth = useLocation().state.partnerMonth;
  const totalInMonth = useLocation().state.totalInMonth;
  const merchantMonth = useLocation().state.merchantMonth;

  const [groupByMerchant, setGroupByMerchant] = useState([]);
  const [groupByPartner, setGroupByPartner] = useState([]);

  useEffect(() => {
    let rs = ordersMonth.filter((od) => od.status == "complete");
    rs = rs.map((item) => {
      return {
        merchantId: item.merchantId,
        total: item.detail.total,
        discount: item.detail.discount,
      };
    });

    let merchants = [].concat.apply([], rs);

    let mix = merchants.reduce((val, item) => {
      let index = val.findIndex(
        (val) => val.merchantId._id == item.merchantId._id
      );
      if (index > -1) {
        val[index].count = val[index].count ? val[index].count + item.count : 1;
        val[index].total = val[index].total + item.total;
        val[index].discount = val[index].discount + item.discount;
      } else val.push(item);
      return val;
    }, []);
    setGroupByMerchant(mix);
  }, []);

  useEffect(() => {
    let rs = ordersMonth.filter((od) => od.status == "complete");
    rs = rs.map((item) => {
      return {
        deliverId: item.deliverId,
        fee: item.detail.fee,
      };
    });

    let merchants = [].concat.apply([], rs);

    let mix = merchants.reduce((val, item) => {
      let index = val.findIndex(
        (val) => val.deliverId._id == item.deliverId._id
      );
      if (index > -1) {
        val[index].count = val[index].count ? val[index].count + item.count : 1;
        val[index].fee = val[index].fee + item.fee;
      } else val.push(item);
      return val;
    }, []);
    setGroupByPartner(mix);
  }, []);

  console.log(groupByMerchant);

  return (
    <div
      style={{
        border: "1px solid black",
        width: "70%",
        margin: "0 auto",
        padding: " 1rem 2rem",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Báo cáo tháng{" "}
        {formatDatetimeToStringDate(new Date())
          .split("/")
          .splice(1, 3)
          .join("/")}
      </h1>
      <h2>Công ty TNHH H2P</h2>
      <table className="print-receipt">
        <tr>
          <th>Tổng đơn bán</th>
          <th>Tăng trưởng người dùng</th>
          <th>Tăng trưởng đối tác giao vận</th>
          <th>Tăng trưởng cơ sở bán hàng</th>
          <th style={{ textAlign: "center" }}>
            Tổng doanh thu <br />
            (=Chiết khấu cơ sở + chiết khấu đối tác)
          </th>
        </tr>

        <tr>
          <th>{ordersMonth.length}</th>
          <th>{userInMonth.length}</th>
          <th>{partnerMonth.length}</th>
          <th>{merchantMonth.length}</th>
          <th>{validatePrice(totalInMonth)} vnd</th>
        </tr>
      </table>
      <h2>Doanh thu từ cửa hàng</h2>
      <table className="print-receipt">
        <tr>
          <th>STT</th>
          <th>Tên cơ sở</th>
          <th>Số lượng đơn</th>
          <th>Tổng giá trị giao dịch</th>
          <th>Tổng giảm giá</th>
          <th>% Chiết khấu</th>
        </tr>
        {groupByMerchant.map((item, index) => (
          <tr>
            <th>{index + 1}</th>
            <th>{item.merchantId.name}</th>
            <th>{item.count}</th>
            <th>{validatePrice(item.total)} vnd</th>
            <th>{validatePrice(item.discount)} vnd</th>
            <th>{validatePrice(item.total * 0.1 - item.discount)} vnd</th>
          </tr>
        ))}
        <tr>
          <th colSpan="5" style={{ textAlign: "right" }}>
            Tổng
          </th>
          <th>
            {validatePrice(
              groupByMerchant.reduce(
                (val, item) => val + (item.total * 0.1 - item.discount),
                0
              )
            )}{" "}
            vnd
          </th>
        </tr>
      </table>
      <h2>Doanh thu từ đối tác giao vận</h2>
      <table className="print-receipt">
        <tr>
          <th>STT</th>
          <th>Tên đối tác</th>
          <th>Số lượng đơn</th>
          <th>Tổng giá trị vận chuyển</th>
          <th>% Chiết khấu</th>
        </tr>
        {groupByPartner.map((item, index) => (
          <tr>
            <th>{index + 1}</th>
            <th>{item.deliverId.name}</th>
            <th>{item.count}</th>
            <th>{validatePrice(item.fee)} vnd</th>
            <th>{validatePrice(item.fee * 0.1)} vnd</th>
          </tr>
        ))}
        <tr>
          <th colSpan="4" style={{ textAlign: "right" }}>
            Tổng
          </th>
          <th>
            {validatePrice(
              groupByPartner.reduce((val, item) => val + item.fee * 0.1, 0)
            )}{" "}
            vnd
          </th>
        </tr>
      </table>
      <div
        style={{
          textAlign: "center",
          marginLeft: "44rem",
          marginTop: "3rem",
        }}
      >
        <i style={{ fontSize: "1.5rem", margin: "2rem 0" }}>
          Hải Phòng ngày ... tháng ... năm ...
        </i>
        <h2>Chữ ký quản lý</h2>
        <i>Ký và ghi rõ họ tên</i>
      </div>
      <button className="hide-on-print" onClick={() => window.print()}>
        Print
      </button>
    </div>
  );
}

export default Report;
