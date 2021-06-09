import { formatDatetimeToStringDateWithoutYear, validatePrice } from "func";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import "./style.scss";

function PrintReport() {
  const orders = useLocation().state.orders;
  const monday = useLocation().state.monday;
  const totalReturn = useLocation().state.totalReturn;
  const minisecondOfHour = 86400000;
  const getTimeStartDay = (date) => {
    return new Date(new Date(new Date(date).setHours(0)).setMinutes(1));
  };
  const getTimeEndDay = (date) => {
    return new Date(new Date(new Date(date).setHours(23)).setMinutes(59));
  };
  const getIncomeOfDayByDatetime = (time) => {
    const start = +getTimeStartDay(time);
    const end = +getTimeEndDay(time);
    return orders.reduce((val, od) => {
      if (
        end > +od.timeOrder &&
        +od.timeOrder > start &&
        od.timePartnerGetFood
      ) {
        return (
          val + od.detail.total * ((100 - parseInt(od.merchantId.deduct)) / 100)
        );
      }
      return val;
    }, 0);
  };

  const getCountByDay = (time) => {
    const start = +getTimeStartDay(time);
    const end = +getTimeEndDay(time);
    return orders.reduce((val, od) => {
      if (
        end > +od.timeOrder &&
        +od.timeOrder > start &&
        od.timePartnerGetFood
      ) {
        return val + 1;
      }
      return val;
    }, 0);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ textAlign: "center" }}>Báo cáo doanh thu tuần</h1>
      <table class="print-receipt">
        <tr>
          <th>Ngày</th>
          <th>Lượng đơn bán</th>
          <th>Doanh thu sau chiết khấu</th>
        </tr>
        {[...Array(7)].map((val, index) => (
          <tr>
            <td>
              {" "}
              {formatDatetimeToStringDateWithoutYear(
                new Date(monday + minisecondOfHour * index)
              )}
            </td>
            <td>
              {getCountByDay(new Date(monday + minisecondOfHour * index))}
            </td>
            <td>
              {" "}
              {validatePrice(
                getIncomeOfDayByDatetime(
                  new Date(monday + minisecondOfHour * index)
                )
              )}
              đ
            </td>
          </tr>
        ))}
        <tr>
          <th>Tổng</th>
          <th></th>
          <th>{validatePrice(totalReturn)}</th>
        </tr>
      </table>
      <button class="hide-on-print" onClick={() => window.print()}>
        Print
      </button>
    </div>
  );
}

export default PrintReport;
